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
                <a className='dropdown-section-profile-aboutUs' href={`/about-us`}>
                    <i class="fa-regular fa-circle-question" id='icon-person-section'></i>
                    <p className='drop-p-tag-section'>About Us</p>
                </a>
                <LogoutButton />
            </div>
        );
}

export default NavDropDown;
