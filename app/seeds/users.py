from app.models import db, User
from werkzeug.security import generate_password_hash

# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        name='SpongeBob DemoPants',
        username='SpongeBob',
        email='demo@demo.com',
        hashed_password=generate_password_hash('demoPassword123'),
        bio="Hello Friends! Its me SpongeBob!",
        profile_picture='https://cdn.shopify.com/s/files/1/0150/0643/3380/products/Viacom_Spongebob_Pillow16inX16inPRTGENSLG16B_00043_RO_grande.jpg?v=1563223169',
        followers=0,
        following=0)

    patrick = User(
        name='Patrick Star',
        username='Patrick',
        email='patrick@demo.com',
        hashed_password=generate_password_hash('Gnumx12@'),
        bio="Hi Guys! I love to be in my rock and play with friends! Bestfriend: SpongeBob!",
        profile_picture='https://static.wikia.nocookie.net/nickelodeon-movies/images/7/7e/Patrick_Star.png/revision/latest?cb=20180107193038',
        followers=0,
        following=0)


    db.session.add(demo)
    db.session.add(patrick)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
