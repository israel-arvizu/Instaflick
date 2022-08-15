# InstaFlick
An Instagram Clone that is made exactly like instgram to post pictures and comment to socialize and meet new people from all over the world! Please not that this is not associated with instagram and is just a educational project.

Start Socializing Today at [InstaFlick](https://insta-flick.herokuapp.com/)

## SplashPage/Log-in
![image](https://user-images.githubusercontent.com/99637335/184594897-1db32792-f5ca-4c9c-b927-33de6ee50a9e.png)

## Sign-Up Page
![image](https://user-images.githubusercontent.com/99637335/184594943-cc51613e-c1f1-421e-b643-6d1d7544f4c8.png)

## Home Page
![image](https://user-images.githubusercontent.com/99637335/184594709-664f09d5-df60-4b18-ad53-32918d4581d4.png)

## Profile Page
![image](https://user-images.githubusercontent.com/99637335/184594783-e6f2ae9e-a632-45f2-92a6-fab264924481.png)

## Create a post Page
![image](https://user-images.githubusercontent.com/99637335/184594833-5a438c37-d085-4c73-b5e2-14371df9897d.png)


## Technologies Used
#### Front End: -React, -HTML5, -JavaScript, -Redux
#### Back End: -Python, -Node.JS, -Sequelize, -Express.JS, -GIT, -PostGres -AWS S3 Buckets
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![Heroku](https://img.shields.io/badge/heroku-%23430098.svg?style=for-the-badge&logo=heroku&logoColor=white)
![Amazon S3](https://img.shields.io/badge/-Amazon%20S3-569A31?logo=amazons3&logoColor=white&style=for-the-badge)

## Future Feautures
Im hoping to implement these feautures
- Likes
- Followers
- Explore Page

# Getting Started with the Repo
1. Clone or download this repo https://github.com/israel-arvizu/Instaflick.git
2. pipenv install ``--dev -r dev-requirements.txt && pipenv install -r requirements.txt``
3. Setup your PostgreSQL user, password and database and make sure it matches your .env file
4. Add an ``.env`` file and update with the required information, look at ``.env-example`` for infomation
5. Get into your pipenv, migrate your database, seed your database, and run your flask app
  ``pipenv shell``
  ``flask db upgrade``
  ``flask seed all``
  ``flask run``
6. Start your react front-end with npm start command 
8. Done! Just navigate to where you set up your locahost in the `.env` file
