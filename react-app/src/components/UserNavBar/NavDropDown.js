import React from 'react';
import LogoutButton from '../auth/LogoutButton';
import './UserNavBar.css'

function NavDropDown({user}) {
        return (
            <div className='dropdown-container'>
                <div className='dropdown-section'>
                    <i class="fa-regular fa-circle-user"></i>
                    <a className='drop-anchor-tag-section' href={`/${user.username}`}>Profile</a>
                </div>
                <div className='dropdown-section'>
                    <i class="fa-solid fa-gear"></i>
                    <a className='drop-anchor-tag-section' href='/settings'>Settings</a>
                </div>
                <LogoutButton />
            </div>
        );
}

export default NavDropDown;
