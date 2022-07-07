import React, { Component } from 'react';

class ProfilePage extends Component {
    render() {
        return (
            <div>
                <div className='top-profile-header'>
                    ProfilePicture
                    <h2>Name</h2>
                    <div className='profile-info-section'>
                        <span> 0 posts</span>
                        <span> 0 followers</span>
                        <span> 0 following</span>
                    </div>
                    <div className='profile-name-bio-section'>
                        <p>Name</p>
                        <p>Bio</p>
                    </div>
                </div>
                <hr></hr>
                <div className='bottom-body-profile-post'>
                    <div>
                        <p>Posts</p>
                    </div>
                    <div>
                        ...map
                        <div className='profie-single-post'>
                            Picture
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProfilePage;
