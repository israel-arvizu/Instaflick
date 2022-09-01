from .db import db
from .likes import Like
from .user import User


class Post(db.Model):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey("users.id"))
    photoUrl = db.Column(db.String(999), nullable=False)
    postBio = db.Column(db.Text)
    likeCount = db.Column(db.Integer, nullable=False)
    commentCount = db.Column(db.Integer)
    dateCreated = db.Column(db.DateTime, nullable=False)

    userPost = db.relationship("User", back_populates="user_posts", lazy='joined')
    comments = db.relationship("Comment", back_populates='posts', cascade="all, delete")
    likes = db.relationship("Like", back_populates="posts", cascade="all, delete")

    def to_dict(self):
        return {
            "id": self.id,
            "userId": self.userId,
            "photoUrl": self.photoUrl,
            "postBio": self.postBio,
            "comments": self.commentCount,
            "likes": [like.to_dict() for like in list(Like.query.filter(self.id == Like.postId).all())],
            "dateCreated": self.dateCreated,
            "UserPhotoUrl": User.query.get(self.userId).profile_picture,
            "OwnerUsername": User.query.get(self.userId).username
        }
