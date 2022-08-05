from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired


class ProfileForm(FlaskForm):
    image = StringField('image', validators=[DataRequired()])
    bio = StringField('bio', validators=[DataRequired()])
