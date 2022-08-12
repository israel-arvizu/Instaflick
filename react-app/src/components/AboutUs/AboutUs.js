import React from "react";
import { useSelector } from "react-redux";
import UserNavBar from "../UserNavBar/UserNavBar";
import './aboutUs.css'

export default function AboutUs (){
    const user = useSelector(state => state.session.user);

    return (
        <div>
            {user ? <UserNavBar user={user} /> : null}
            <div className={user ? "outside-underlay-container" : "outside-underlay-user-cont"}>
                <div id={user ? 'aboutUs-body-user-container' : 'aboutUs-body-container'}>
                    <img id='about-creator-logo' src='/static/AboutCreator.png' alt='About Creator' />
                    <div className='post-article-container'>
                        <a className='post-header'>
                            <img src='/static/PortraitPicture.png' id='homepage-post-pic' alt='Profile Picture'/>
                            <p id='homepage-post-username'>israelarvizu</p>
                        </a>
                        <div className='post-picture-content'>
                            <img src='/static/PortraitPicture.png' className='homepage-post-image' style={{}}/>
                        </div>
                        <div className='post-bottom-content' style={{borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px'}}>
                            {/* <div className='favorite-buttons-container'>
                            <i class="fa-regular fa-heart fa-xl" style={{marginRight: '10px'}}></i>
                            <i class="fa-regular fa-comment fa-xl"></i>
                            </div> */}
                            <p className='post-like-section'>10 likes</p>
                            <div className='post-owner-bio-container'>
                                <span className='post-owner-username-section'>israelarvizu</span>
                                <span className='post-owner-bio-section'>I'm a 21 year old software engineer from Orange County, CA.
                                My passion is all-things tech and I cant wait to keep improving my skills and see what I am able to accomplish</span>
                            </div>
                            <p className='post-bottom-comments-head' style={{marginBottom: '3px'}}>View all socials below</p>
                            <div id='aboutUs-social-container'>
                                <a href="https://github.com/israel-arvizu">
                                    <img id='aboutUs-github-Logo' src="/static/github-logo.png" alt='github Logo'/>
                                </a>
                                <a href="https://www.linkedin.com/in/israel-arvizu-a11b87218/">
                                    <img id='aboutUs-linkedIn-Logo' src="/static/linkedIn-logo.png" alt='linkedIn Logo' />
                                </a>
                            </div>
                        </div>
                    </div>
                    {user ? null : <a href="/" id='return-aboutUs-button'>Return</a>}
                </div>
            </div>
        </div>
    )
}
