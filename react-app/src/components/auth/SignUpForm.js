import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import { login } from '../../store/session';
import { RotatingLines } from  'react-loader-spinner'
import './signup.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false)
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    setLoading(true)
    if (password === repeatPassword) {
      const data = await dispatch(signUp(name, username, email, password));
      if (data) {
        setErrors(data)
      }
      setLoading(false)
    }else {
      setLoading(false)
      setErrors(["Error: Passwords dont match!"])
    }
  };

  const updateName = (e) => {
    setErrors([])
    setName(e.target.value);
  }

  const updateUsername = (e) => {
    setErrors([])
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setErrors([])
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setErrors([])
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setErrors([])
    setRepeatPassword(e.target.value);
  };

  const demoLogin = async (e) => {
    e.preventDefault();
    setErrors([])
    await dispatch(login("demo@demo.com", "demoPassword123"));
  }

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
          <div className='main-header-container'>
            <h2 className='main-header-signup-text'>Sign up to see photos and videos from your friends</h2>
          </div>
            <div className='main-header-demo-section'>
              <button id='login-form-submit-btn' onClick={demoLogin}>Log in as Demo User</button>
            </div>
            <div className='login-form-break-container'>
              <div className='login-form-line'></div>
              <div id='login-form-break-text'> OR </div>
              <div className='login-form-line'></div>
            </div>
            <div>
              <form onSubmit={onSignUp}>
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
                      type='email'
                      name='email'
                      minlength="3"
                      maxlength="40"
                      placeholder='Email'
                      onChange={updateEmail}
                      value={email}
                      required
                    ></input>
                  </div>
                  <div>
                    <input
                      className='login-input-container'
                      name='name'
                      type='text'
                      minlength="3"
                      maxlength="20"
                      placeholder='Full Name'
                      value={name}
                      required
                      onChange={updateName}/>
                  </div>
                  <div>
                    <input
                      className='login-input-container'
                      type='text'
                      name='username'
                      placeholder='Username'
                      minlength='3'
                      maxlength='12'
                      onChange={updateUsername}
                      value={username}
                      required
                    ></input>
                  </div>
                  <div>
                    <input
                      className='login-input-container'
                      type='password'
                      name='password'
                      placeholder='Password'
                      minlength='5'
                      onChange={updatePassword}
                      value={password}
                      required
                    />
                  </div>
                  <div>
                    <input
                      className='login-input-container'
                      type='password'
                      name='repeat_password'
                      placeholder='Confirm Password'
                      minlength='5'
                      maxLength='80'
                      onChange={updateRepeatPassword}
                      value={repeatPassword}
                      required={true}
                    />
                  </div>
                  <div className='bottom-text-warning-container'>
                    <p className='bottom-text-warning-one'>Please note that is not intended for commerical purposes or is anyway associated with Instagram© </p>
                    <p className='bottom-text-warning-one'>This website is for educational purposes only and any images or content belong to the original owner</p>
                  </div>
                  <button id='login-form-submit-btn' type='submit'>
                  {loading ? <RotatingLines
                    strokeColor='white'
                    strokeWidth='4'
                    width='20'
                    animationDuration='1'
                  /> : "Sign Up"}
                  </button>
              </div>
              </form>
            </div>
          </div>
          <div className='bottom-form-container'>
            <div id='bottom-form-login-content'>
                <span id='button-form-right-text'>Have an Account?</span>
                <a href='/login' id='button-form-signup-text'>Log In</a>
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

export default SignUpForm;
