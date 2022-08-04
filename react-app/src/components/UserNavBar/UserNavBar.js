import React, {useState, useRef, useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import NavDropDown from './NavDropDown';
import './UserNavBar.css'

function UserNavBar({user}) {
    const [dropDown, setDropDown] = useState(false)
    const ref = useRef()
    useEffect(() => {
        const checkIfClickedOutside = (e) => {
            if(dropDown && ref.current && !ref.current.contains(e.target)){
                setDropDown(false)
            }
        }
        document.addEventListener("click", checkIfClickedOutside);
        return () => {
            document.removeEventListener("click", checkIfClickedOutside);
        }
    }, [dropDown])

    return (
        <div className='nav-bar-container'>
            <div className='nav-bar-content'>
                <div id='logo-nav-bar-container'>
                    <img id='nav-logo-image' src='/static/Instaflick-logo.png' alt='logo'/>
                </div>
                <div id='nav-bar-search-container'>
                    <input
                    type='text'
                    placeholder='Search'
                    ></input>
                </div>
                <nav id='nav-bar-buttons-container'>
                    <NavLink to='/home' style={{color: 'black'}}>
                        <i class="fa-solid fa-house fa-fw" style={{marginRight: '10px', marginLeft: '10px', fontSize: "25px"}}></i>
                    </NavLink>
                    <NavLink to='/posts/new' style={{color: 'black'}}>
                        <i class="fa-regular fa-square-plus fa-fw" style={{marginRight: '10px', marginLeft: '10px', fontSize: "27px"}}></i>
                    </NavLink>
                    {/* <NavLink to={`${user.username}`}> */}
                    <div onClick={() => setDropDown(!dropDown)} ref={ref}>
                        <i class="fa-regular fa-circle fa-fw" style={{marginRight: '10px', marginLeft: '10px', fontSize: "25px", cursor: "pointer"}}></i>
                        {dropDown && <NavDropDown user={user}/>}
                    </div>
                    {/* </NavLink> */}
                </nav>
            </div>
        </div>
    );
}

export default UserNavBar;
