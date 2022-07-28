import React from 'react';
import LogoutButton from '../auth/LogoutButton';

function NavDropDown({user}) {
        return (
            <div className='dropdown-container'>
                <div>
                <i class="fa-regular fa-circle-user"></i>
                <a href={`/${user.username}`}>Profile</a>
                </div>
                <div>
                <i class="fa-solid fa-gear"></i>
                <a href='/settings'>Settings</a>
                </div>
                <div className='dropdown-logout-btn'>
                    <LogoutButton />
                </div>
            </div>
        );
}

export default NavDropDown;
