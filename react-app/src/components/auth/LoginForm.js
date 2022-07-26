import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import './loginform.css'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/home' />;
  }

  return (
    <div className='body-auth-container'>
      <div className='content-container'>
        <div className='top-form-container'>
          <div id='logo-container-login'>
            <img id='logo-login-image' src='/images/Instaflick-logo.png' alt='logo'/>
          </div>
          <form onSubmit={onLogin}>
            <div>
              {errors.map((error, ind) => (
                <div key={ind}>{error}</div>
              ))}
            </div>
            <div className='login-form-input-container'>
              <div>
                <input
                  className='login-input-container'
                  name='email'
                  type='email'
                  placeholder='Email or Username'
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
                  minLength={4}
                  placeholder='Password'
                  value={password}
                  onChange={updatePassword}
                  required
                />
              </div>
            </div>
            <button type='submit'>Login</button>
          </form>
        </div>
        <div className='bottom-form-container'>
          <div>
              <span>Dont have an account?</span>
              <a href='/sign-up'>Sign-Up</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
