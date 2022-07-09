from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from datetime import datetime
from app.forms.post_form import PostForm
from app.models import Post, db
from app.aws_upload import (
    upload_file_to_s3, allowed_file, get_unique_filename)

post_routes = Blueprint('posts', __name__)


@post_routes.route('/new', methods={"post"})
@login_required
def createPost():
    form  = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    form['createdAt'].data = datetime.now()
    form['updatedAt'].data = datetime.now()


    if "image" not in request.files:
        return {"errors": "image required"}, 400

    image = request.files["image"]

    if not allowed_file(image.filename):
        return {"errors": "file type not allowed"}, 400

    image.filename = get_unique_filename(image.filename)

    upload = upload_file_to_s3(image)

    # if the dictionary doesn't have a url key
    # it means that there was an error when we tried to upload
    # so we send back that error message -------
    if "url" not in upload:
        return upload, 400

    url = upload["url"]

    newPost = Post(
        userId = current_user.id,
        photoUrl = url,
        postBio = form['caption'].data,
        likeCount = 0,
        commentCount = 0,
        dateCreated = form['createdAt'].data
    )

    db.session.add(newPost)
    db.session.commit()
    return newPost.to_dict()
