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
                    <div className="post-articles-content-cont">
                        <div className='post-article-container-aboutUs'>
                            <a className='post-header' style={{width: '90%'}}>
                                <img src='/static/PortraitPicture.png' id='homepage-post-pic' alt='Profile Picture'/>
                                <p id='homepage-post-username'>israelarvizu</p>
                            </a>
                            <div className='post-picture-content' style={{width: '90%'}}>
                                <img src='/static/PortraitPicture.png' className='homepage-post-image' style={{backgroundColor: "#cfdddd"}}/>
                            </div>
                            <div className='post-bottom-content-aboutUs' style={{borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px', width: '90%'}}>
                                <p className='post-like-section' style={{marginLeft: '13px'}}>1,302,492 likes</p>
                                <div className='post-owner-bio-container-aboutUs' style={{marginLeft: '13px', marginRight: '13px'}}>
                                    <span className='post-owner-username-section'>israelarvizu</span>
                                    <span className='post-owner-bio-section'>I'm a 21 year old software engineer from Orange County, CA.
                                    My passion is all-things tech and I cant wait to keep improving my skills and see what I am able to accomplish</span>
                                </div>
                                <p className='post-bottom-comments-head' style={{marginBottom: '3px', marginLeft: '13px'}}>View all socials below</p>
                                <div id='aboutUs-social-container' style={{marginLeft: '13px'}}>
                                    <a href="https://github.com/israel-arvizu">
                                        <img id='aboutUs-github-Logo' src="/static/github-logo.png" alt='github Logo'/>
                                    </a>
                                    <a href="https://www.linkedin.com/in/israel-arvizu-a11b87218/">
                                        <img id='aboutUs-linkedIn-Logo' src="/static/linkedIn-logo.png" alt='linkedIn Logo' />
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className='post-article-container-aboutUs-1'>
                            <a className='post-header' style={{width: '70%'}}>
                                <img src='/static/PortraitPicture.png' id='homepage-post-pic' alt='Profile Picture'/>
                                <p id='homepage-post-username'>israelarvizu</p>
                            </a>
                            <div className='post-picture-content' style={{width: '70%'}}>
                                <img src='/static/aboutUs-2.jpg' className='homepage-post-image' style={{backgroundColor: "#cfdddd"}}/>
                            </div>
                            <div className='post-bottom-content-aboutUs' style={{borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px', width: '70%'}}>
                                <p className='post-like-section' style={{marginLeft: '13px'}}>402,290 likes</p>
                                <div className='post-owner-bio-container-aboutUs' style={{marginLeft: '13px', marginRight: '13px'}}>
                                    <span className='post-owner-username-section'>israelarvizu</span>
                                    <span className='post-owner-bio-section'>I love to experience new things, meet new people, and create spontaneous
                                    adventures. That is part of the reason why I love programming so much! There are so many possibilities with what you can do.</span>
                                </div>
                                <p className='post-bottom-comments-head' style={{marginBottom: '3px', marginLeft: '13px'}}>View all socials below</p>
                                <div id='aboutUs-social-container' style={{marginLeft: '13px'}}>
                                    <a href="https://github.com/israel-arvizu">
                                        <img id='aboutUs-github-Logo' src="/static/github-logo.png" alt='github Logo'/>
                                    </a>
                                    <a href="https://www.linkedin.com/in/israel-arvizu-a11b87218/">
                                        <img id='aboutUs-linkedIn-Logo' src="/static/linkedIn-logo.png" alt='linkedIn Logo' />
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className='post-article-container-aboutUs-2'>
                            <a className='post-header' style={{width: '70%'}}>
                                <img src='/static/PortraitPicture.png' id='homepage-post-pic' alt='Profile Picture'/>
                                <p id='homepage-post-username'>israelarvizu</p>
                            </a>
                            <div className='post-picture-content' style={{width: '70%'}}>
                                <img src='/static/aboutUs-1.JPG' className='homepage-post-image' style={{backgroundColor: "#cfdddd"}}/>
                            </div>
                            <div className='post-bottom-content-aboutUs' style={{borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px', width: '70%'}}>
                                <p className='post-like-section' style={{marginLeft: '13px'}}>805,292 likes</p>
                                <div className='post-owner-bio-container-aboutUs' style={{marginLeft: '13px', marginRight: '13px'}}>
                                    <span className='post-owner-username-section'>israelarvizu</span>
                                    <span className='post-owner-bio-section'>I enjoy to travel, since I was a young my parents would take my family
                                    on trips every summer. I have been Mexico, France, Poland, Germany, Costa Rica, Israel and many other places. Hopefully
                                    I am able to keep traveling once I get more stable in my career</span>
                                </div>
                                <p className='post-bottom-comments-head' style={{marginBottom: '3px', marginLeft: '13px'}}>View all socials below</p>
                                <div id='aboutUs-social-container' style={{marginLeft: '13px'}}>
                                    <a href="https://github.com/israel-arvizu">
                                        <img id='aboutUs-github-Logo' src="/static/github-logo.png" alt='github Logo'/>
                                    </a>
                                    <a href="https://www.linkedin.com/in/israel-arvizu-a11b87218/">
                                        <img id='aboutUs-linkedIn-Logo' src="/static/linkedIn-logo.png" alt='linkedIn Logo' />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    {user ? null : <a href="/" id='return-aboutUs-button'>Return</a>}
                </div>
            </div>
        </div>
    )
}
