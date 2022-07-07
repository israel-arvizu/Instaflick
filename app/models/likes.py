from collections import UserString
from .db import db
from sqlalchemy.orm import backref



class Like(db.Model):
    __tablename__ = 'likes'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'))
    postId = db.Column(db.Integer, db.ForeignKey('posts.id', ondelete='CASCADE'))

    users = db.relationship("User", back_populates="likes")
    posts = db.relationship("Post", back_populates="likes")


    def to_dict(self):
        return {
            "id": self.id,
            "userId": self.userId,
            "postId": self.postId,
        }
