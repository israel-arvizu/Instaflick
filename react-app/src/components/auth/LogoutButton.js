import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';

const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
  };

  return (
    <div className='dropdown-section-logout' onClick={onLogout}>
      <button className='log-out-button-main'>Logout</button>
    </div>
  )
};

export default LogoutButton;
