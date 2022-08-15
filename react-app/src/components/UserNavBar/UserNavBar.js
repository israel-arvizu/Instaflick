import React, {useState, useRef, useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import SearchBar from '../searchbar';
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
                <a id='logo-nav-bar-container' href='/home'>
                    <img id='nav-logo-image' src='/static/instaflick-updatedLogo.png' alt='logo'/>
                </a>
                <div id='nav-bar-search-container'>
                    <SearchBar />
                </div>
                <nav id='nav-bar-buttons-container'>
                    <NavLink to='/home' style={{color: 'black'}}>
                        <svg style={{marginRight: '10px', marginLeft: '10px', fontSize: "25px"}} ariaLabel="Home"  color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M9.005 16.545a2.997 2.997 0 012.997-2.997h0A2.997 2.997 0 0115 16.545V22h7V11.543L12 2 2 11.543V22h7.005z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path></svg>
                        {/* <i class="fa-solid fa-house fa-fw" style={{marginRight: '10px', marginLeft: '10px', fontSize: "25px"}}></i> */}
                    </NavLink>
                    <a href='/posts/new' style={{color: 'black'}}>
                        <svg style={{marginRight: '10px', marginLeft: '10px', fontSize: "27px"}} ariaLabel="New post" class="_ab6-" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M2 12v3.45c0 2.849.698 4.005 1.606 4.944.94.909 2.098 1.608 4.946 1.608h6.896c2.848 0 4.006-.7 4.946-1.608C21.302 19.455 22 18.3 22 15.45V8.552c0-2.849-.698-4.006-1.606-4.945C19.454 2.7 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.547 2 5.703 2 8.552z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="6.545" x2="17.455" y1="12.001" y2="12.001"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="12.003" x2="12.003" y1="6.545" y2="17.455"></line></svg>
                        {/* <i class="fa-regular fa-square-plus fa-fw" style={{marginRight: '10px', marginLeft: '10px', fontSize: "27px"}}></i> */}
                    </a>
                    <div onClick={() => setDropDown(!dropDown)} ref={ref}>
                        <img src={user.profile_picture} id='nav-bar-user-picture' alt='Profile Picture'/>
                        {dropDown && <NavDropDown user={user}/>}
                    </div>
                </nav>
            </div>
        </div>
    );
}

export default UserNavBar;
