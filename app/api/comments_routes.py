from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Comment, Post, db

comments_routes = Blueprint('comments', __name__)

@comments_routes.route('/create', methods=["POST"])
@login_required
def createComment():
    req = request.get_json()
    postId = req['postId']

    newComment = Comment(
        userId = req['userId'],
        postId = req['postId'],
        text = req['comment']
    )

    db.session.add(newComment)
    db.session.commit()

    post = Post.query.get(postId)
    post.commentCount = post.commentCount + 1;
    db.session.commit()

    comments = Comment.query.filter(Comment.postId == postId).all()
    comments = list(comments)
    commentList = [comment.to_dict() for comment in comments]

    return jsonify(commentList);

@comments_routes.route('/post/<int:id>')
@login_required
def loadComments(id):
    comments = Comment.query.filter(Comment.postId == id).all()
    comments = list(comments)
    commentList = [comment.to_dict() for comment in comments]
    return jsonify(commentList)

@comments_routes.route('/delete/<int:postId>/<int:id>')
@login_required
def deleteComment(postId, id):
    comnt = Comment.query.get(id)

    db.session.delete(comnt)
    db.session.commit()

    post = Post.query.get(postId)
    post.commentCount = post.commentCount - 1;

    db.session.commit()

    comments = Comment.query.filter(Comment.postId == postId).all()
    comments = list(comments)
    commentList = [comment.to_dict() for comment in comments]
    return jsonify(commentList)
