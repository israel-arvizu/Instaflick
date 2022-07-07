from .db import db
from .likes import Like


class Post(db.Model):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey("users.id"))
    photoUrl = db.Column(db.String(999), nullable=False)
    postBio = db.Column(db.Text)
    likeCount = db.Column(db.Integer, nullable=False)
    commentCount = db.Column(db.Integer)
    dateCreated = db.Column(db.Date, nullable=False)

    users = db.relationship("User", backref="users", cascade="all, delete")
    comments = db.relationship("Comment", back_populates='posts', cascade="all, delete-orphan")
    likes = db.relationship("Like", back_populates="posts", cascade="all, delete-orphan")

    def to_dict(self):
        return {
            "id": self.id,
            "userId": self.userId,
            "photoUrl": self.photoUrl,
            "postBio": self.postBio,
            "comments": self.commentCount,
            "likes": self.likeCount,
            "dateCreated": self.dateCreated,
        }
