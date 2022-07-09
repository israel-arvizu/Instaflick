import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';

function UserNavBar({user}) {
        return (
            <div className='nav-bar-conatiner'>
                <div>
                    LOGO
                </div>
                <div>
                    SearchBar
                </div>
                <nav>
                    <NavLink to='/home'>
                        <i class="fa-solid fa-house"></i>
                    </NavLink>
                    <NavLink to='/posts/new'>
                        <i class="fa-regular fa-square-plus"></i>
                    </NavLink>
                    <NavLink to={`${user.username}`}>
                        <i class="fa-regular fa-circle"></i>
                    </NavLink>
                    <LogoutButton />
                </nav>

            </div>
        );
}

export default UserNavBar;
