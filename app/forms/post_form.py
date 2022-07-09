from flask_wtf import FlaskForm
from wtforms import StringField, DateField
from wtforms.validators import DataRequired


class PostForm(FlaskForm):
    image = StringField('image', validators=[DataRequired()])
    caption = StringField('caption', validators=[DataRequired()])
    createdAt = DateField('createdAt')
    updatedAt = DateField('updatedAt')
