from app.models import db, Post
from datetime import datetime

# Adds a demo user, you can add other users here if you want
def seed_posts():
    spongebob = Post(
        userId = 1,
        photoUrl='https://pbs.twimg.com/profile_images/726782245114105856/aP82I-Lx_400x400.jpg',
        postBio='I like to DJ on my off days',
        likeCount=0,
        commentCount=0,
        dateCreated= datetime.now()
    )

    db.session.add(spongebob)
    db.session.commit()

def undo_posts():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()
