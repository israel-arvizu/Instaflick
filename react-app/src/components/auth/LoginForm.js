import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import './loginform.css'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [buttonText, setButtonText] = useState('Log In')
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const demoLogin = async (e) => {
    e.preventDefault();
    setErrors([])
    setButtonText('Log In as Demo')
    setEmail('demo@demo.com')
    setPassword('demoPassword123')
  }

  const updateEmail = (e) => {
    setErrors([])
    setButtonText('Log In')
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setErrors([])
    setButtonText('Log In')
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/home' />;
  }

  return (
    <div className='overlay'>
      <div className='right-picture-container'>
        <img src='/static/InstaFlick-Home-Pic.JPG'></img>
      </div>
      <div className='content-container'>
        <div className='top-form-container'>
          <div id='logo-container-login'>
            <img id='logo-login-image' src='/static/Instaflick-logo.png' alt='logo'/>
          </div>
          <form onSubmit={onLogin}>
            <div className='error-outside-placeholder'>
              <div className={errors.length > 0 ?  'errors-container' : 'hidden-errors'}>
                {errors.map((error, ind) => (
                  <div key={ind}>{error}</div>
                ))}
              </div>
            </div>
            <div className='login-form-input-container'>
              <div>
                <input
                  className='login-input-container'
                  name='email'
                  type='email'
                  placeholder='Email'
                  value={email}
                  onChange={updateEmail}
                  required
                />
              </div>
              <div>
                <input
                  className='login-input-container'
                  name='password'
                  type='password'
                  minLength='4'
                  placeholder='Password'
                  value={password}
                  onChange={updatePassword}
                  required
                />
              </div>
              <div id='logo-container-login'>
                <button id='login-form-submit-btn' type='submit'>{buttonText}</button>
              </div>
            </div>
          </form>
          <div className='login-form-break-container'>
            <div className='login-form-line'></div>
            <div id='login-form-break-text'> OR </div>
            <div className='login-form-line'></div>
          </div>
          <div className='login-form-container-links'>
            <div>
              <button id='login-form-demo-btn' onClick={demoLogin}>Log in as Demo User</button>
            </div>
            <div>
              <a href='/about-us' id='about-us-login-text'>About Us</a>
            </div>
          </div>
        </div>
        <div className='bottom-form-container'>
          <div id='bottom-form-login-content'>
              <span id='button-form-right-text'>Dont have an account?</span>
              <a href='/sign-up' id='button-form-signup-text'>Sign Up</a>
          </div>
        </div>
        <div>
          <p>Get the app.</p>
        </div>
        <div className='login-images-container'>
          <img className='app-store-images-apple' src='/static/apple-store.png'></img>
          <img className='app-store-images' src='/static/play-store.png'></img>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
