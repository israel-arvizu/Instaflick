import React from 'react';
import LogoutButton from '../auth/LogoutButton';

function NavDropDown() {
        return (
            <div className='dropdown-container'>
                <ul className='dropdown-list-content'>
                    <li>Profile</li>
                    <li>Settings</li>
                </ul>
                <div className='dropdown-logout-btn'>
                    <LogoutButton />
                </div>
            </div>
        );
}

export default NavDropDown;
