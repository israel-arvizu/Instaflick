import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import NavBar from '../../components/NavBar';

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
    <div>
      <NavBar />
      <div className='left-picture-container'>

      </div>
      <div className='right-form-container'>
        <form onSubmit={onLogin}>
          <div>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div>
            <label htmlFor='email'>Email</label>
            <input
              name='email'
              type='email'
              placeholder='Email'
              value={email}
              onChange={updateEmail}
              required
            />
          </div>
          <div>
            <label htmlFor='password'>Password</label>
            <input
              name='password'
              type='password'
              minLength={4}
              placeholder='Password'
              value={password}
              onChange={updatePassword}
              required
            />
            <button type='submit'>Login</button>
          </div>
        </form>
      </div>
      <div className='right-form-sign-up-container'>
        <div>
            <span>Dont have an account?</span>
            <a href='/sign-up'>Sign-Up</a>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
