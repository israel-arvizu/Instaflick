from .db import db

class Posts(db.model):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey("users.id"))
    photoUrl = db.Column(db.String(999), nullable=False)
    postBio = db.Column(db.Text)
    commentCount = db.Column(db.Integer)
    likes = db.Column(db.Integer, nullable=False)
    dateCreated = db.Column(db.Date, nullable=False)

    users = db.relationship("User", back_populates="posts")

    def to_dict(self):
        return {
            "id": self.id,
            "userId": self.userId,
            "photoUrl": self.photoUrl,
            "postBio": self.postBio,
            "comments": self.commentCount,
            "likes": self.likes,
            "dateCreated": self.dateCreated,
        }
