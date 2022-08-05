from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, db
from app.forms.profile_form import ProfileForm
from app.aws_upload import (
    upload_file_to_s3, allowed_file, get_unique_filename)

user_routes = Blueprint('users', __name__)


@user_routes.route('/updateBio', methods=['PUT'])
@login_required
def updateUserBio():
    req = request.get_json()

    bio = req['bio']

    currUser = User.query.get(current_user.id);

    currUser.bio = bio;

    db.session.commit()

    currUser = User.query.get(current_user.id);
    return currUser.to_dict()



@user_routes.route('/updateUser', methods=["PUT"])
@login_required
def updateUser():

    form = ProfileForm()
    newBio =form['bio'].data
    uploaded_file = request.files

    currUser = User.query.get(current_user.id);

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

    currUser.profile_picture = url;
    currUser.bio = newBio

    db.session.commit()

    currUser = User.query.get(current_user.id);
    updatedUser = currUser.to_dict()

    return updatedUser
