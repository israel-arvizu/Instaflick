import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logout } from '../../store/session';

const LogoutButton = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
    history.push('/')
  };

  return (
    <div className='dropdown-section-logout' onClick={onLogout}>
      <button className='log-out-button-main'>Logout</button>
    </div>
  )
};

export default LogoutButton;
