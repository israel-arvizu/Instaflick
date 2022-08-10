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

    tesla = User(
        name='Tesla',
        username='teslamotors',
        email='teslamotors@gmail.com',
        hashed_password=generate_password_hash('teslaPassword123'),
        bio="electric cars, giant batteries and solar",
        profile_picture='https://media.socastsrm.com/wordpress/wp-content/blogs.dir/2404/files/2022/01/tesla-logo.png',
        followers=0,
        following=0
    )

    dwayne = User(
        name='Dwayne Johnson',
        username='therock',
        email='therock@gmail.com',
        hashed_password=generate_password_hash('rockPassword123'),
        bio="founder",
        profile_picture='https://www.pngall.com/wp-content/uploads/2018/05/Dwayne-Johnson-PNG-Image.png',
        followers=0,
        following=0
    )

    messi = User(
        name='Leo Messi',
        username='leomessi',
        email='leomessi@gmail.com',
        hashed_password=generate_password_hash('messiPassword123'),
        bio="Bienvenidos a la cuenta de Leo Messi / Welcome to the Leo Messi Instaflick account",
        profile_picture='https://i.pinimg.com/originals/cb/55/90/cb5590bcca9becc9b0f8e98f3998bdb9.png',
        followers=0,
        following=0
    )

    kylie = User(
        name='Kylie🤍',
        username='kyliejenner',
        email='kyliejenner@gmail.com',
        hashed_password=generate_password_hash('kyliePassword123'),
        bio="I really love InstaFlick",
        profile_picture='https://contents101.com/wp-content/uploads/2020/09/img_7680.jpg',
        followers=0,
        following=0
    )

    cristiano = User(
        name='Cristiano Ronaldo',
        username='cristiano',
        email='cristiano@gmail.com',
        hashed_password=generate_password_hash('cristianoPassword123'),
        bio="www.cristianoronaldo.com",
        profile_picture='https://imageio.forbes.com/specials-images/imageserve/62aa51710c3e65f16ed3b373/Manchester-United-v-Atalanta--Group-F---UEFA-Champions-League/0x0.jpg?format=jpg&crop=1928,1315,x214,y48,safe&width=960',
        followers=0,
        following=0
    )

    arianagrande = User (
        name='Ariana Grande',
        username='arianagrande',
        email='arianagrande@gmail.com',
        hashed_password=generate_password_hash('arianaPassword123'),
        bio="www.rembeauty.com",
        profile_picture='https://assets.teenvogue.com/photos/613b5fd248eda7f19679403c/4:3/w_1999,h_1499,c_limit/1235152164',
        followers=0,
        following=0
    )

    selenagomez = User (
        name='Selena Gomez',
        username='selenagomez',
        email='selenagomez@gmail.com',
        hashed_password=generate_password_hash('selenaPassword123'),
        bio='By grace, \n through faith. \n linktr.ee/selenagomez',
        profile_picture='https://media.glamour.com/photos/62a360397bfbfe8734fbfe3c/master/w_2560%2Cc_limit/1198930383',
        followers=0,
        following=0
    )

    kimkardashian = User (
        name='Kim Kardashian',
        username='kimkardashian',
        email='kimkardashian@gmail.com',
        hashed_password=generate_password_hash('kimPassword123'),
        bio='Tune in to The Kardashian, every Friday night exclusively on Hulu \n apple.com/beatsxkim',
        profile_picture='https://www.gannett-cdn.com/presto/2022/08/09/USAT/1e777526-88be-4b8f-8e0a-35adc64fecfd-Beats_x_Kim_2.png?width=660&height=424&fit=crop&format=pjpg&auto=webp',
        followers=0,
        following=0
    )


    db.session.add(demo)
    db.session.add(patrick)
    db.session.add(tesla)
    db.session.add(dwayne)
    db.session.add(messi)
    db.session.add(kylie)
    db.session.add(cristiano)
    db.session.add(arianagrande)
    db.session.add(selenagomez)
    db.session.add(kimkardashian)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
