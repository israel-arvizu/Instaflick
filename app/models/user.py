from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .comments import Comment

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    bio = db.Column(db.Text)
    followers = db.Column(db.Integer, nullable=False)
    following = db.Column(db.Integer, nullable=False)

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'name' : self.name,
            'username': self.username,
            'email': self.email,
            'bio': self.bio,
            'followers': self.followers,
            'following': self.following,
        }

    comments = db.relationship("Comment", back_populates='users', cascade="all, delete-orphan")
    likes = db.relationship("Like", back_populates='users', cascade="all, delete-orphan")
