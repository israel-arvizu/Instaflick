import React from 'react';
import LogoutButton from '../auth/LogoutButton';
import './UserNavBar.css'

function NavDropDown({user}) {
        return (
            <div className='dropdown-container'>
                <a className='dropdown-section-profile' href={`/${user.username}`}>
                    <i class="fa-regular fa-circle-user" id='icon-person-section' ></i>
                    <p className='drop-p-tag-section'>Profile</p>
                </a>
                <div className='dropdown-section'>
                    <i class="fa-solid fa-gear"></i>
                    <a className='drop-anchor-tag-section' href='/about-us'>About Us</a>
                </div>
                <LogoutButton />
            </div>
        );
}

export default NavDropDown;
