from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from sqlalchemy import desc, text
from datetime import datetime, date
from app.forms.post_form import PostForm
from app.models import Post, User, Like, db
from app.aws_upload import (
    upload_file_to_s3, allowed_file, get_unique_filename)

post_routes = Blueprint('posts', __name__)


@post_routes.route('/new', methods=["post"])
@login_required
def createPost():
    form  = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    now = datetime.now()
    date_time = now.strftime("%Y-%m-%d %H:%M:%S")
    form['createdAt'].data = date_time
    form['updatedAt'].data = date_time


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
        dateCreated = date_time
    )

    db.session.add(newPost)
    db.session.commit()
    return newPost.to_dict()


@post_routes.route('/get')
@login_required
def getPosts():
    posts = Post.query.order_by(desc(Post.dateCreated)).limit(15);
    posts = list(posts);
    recentPosts = [post.to_dict() for post in posts]
    return jsonify(recentPosts)


@post_routes.route('/<int:id>')
@login_required
def userPosts(id):
    posts = Post.query.filter(Post.userId == id).order_by(Post.dateCreated.desc()).all();
    posts = list(posts);
    recentPosts = [post.to_dict() for post in posts]
    return jsonify(recentPosts)

@post_routes.route('/delete/<int:id>', methods=['DELETE'])
@login_required
def deletePost(id):
    req = request.get_json()
    user = req

    post = Post.query.get(id)
    db.session.delete(post)
    db.session.commit()

    posts = Post.query.filter(Post.userId == user).order_by(Post.dateCreated.desc()).all();
    posts = list(posts);
    recentPosts = [post.to_dict() for post in posts]
    return jsonify(recentPosts)

@post_routes.route('/update/<int:id>', methods=['PUT'])
@login_required
def updatePost(id):
    req = request.get_json()
    newCaption = req['caption']
    postId = req['postId']

    post = Post.query.get(postId)

    post.postBio = newCaption;
    db.session.commit()

    posts = Post.query.filter(Post.userId == post.userId).order_by(Post.dateCreated.desc()).all();
    posts = list(posts);
    recentPosts = [post.to_dict() for post in posts]
    return jsonify(recentPosts)

@post_routes.route('<int:id>/likes', methods=['PUT'])
@login_required
def updateLikes(id):
    req = request.get_json();
    userId = req['userId']
    postId = req['postId']

    post = Post.query.get(postId)

    likeExist = Like.query.filter(Like.userId == userId, Like.postId == postId).one_or_none();

    if(likeExist == None):
        post.likeCount += 1;
        newLike = Like(
            userId = userId,
            postId = postId
        )

        db.session.add(newLike)
        db.session.commit()
        print("ADD LIKE")
    else:
        if post.likeCount != 0:
            post.likeCount -= 1

        db.session.delete(likeExist)
        db.session.commit()
        print('REMOVE LIKES')

    posts = Post.query.order_by(desc(Post.dateCreated)).limit(15);
    posts = list(posts);
    recentPosts = [post.to_dict() for post in posts]
    return jsonify(recentPosts)
