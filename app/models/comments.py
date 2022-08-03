from collections import UserString
from .db import db
from .user import User


class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'))
    postId = db.Column(db.Integer, db.ForeignKey('posts.id', ondelete='CASCADE'))
    text = db.Column(db.Text, nullable=False)

    usersComments = db.relationship("User", back_populates="user_comments")
    posts = db.relationship("Post", back_populates="comments")


    def to_dict(self):
        return {
            "id": self.id,
            "userId": self.userId,
            "postId": self.postId,
            "text": self.text,
            "username": User.query.get(self.userId).username
        }
