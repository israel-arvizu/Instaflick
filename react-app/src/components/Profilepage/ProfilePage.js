import React from 'react';
import {useSelector} from 'react-redux'
import UserNavBar from '../UserNavBar/UserNavBar';

function ProfilePage() {
    const user = useSelector(state => state.session.user)

        return (
            <div>
                <UserNavBar user={user}/>
                <div className='top-profile-header'>
                    ProfilePicture
                    <h2>{user.username}</h2>
                    <div className='profile-info-section'>
                        <span> 0 posts</span>
                        <span> {user.followers} followers</span>
                        <span> {user.following} following</span>
                    </div>
                    <div className='profile-name-bio-section'>
                        <p>{user.name}</p>
                        <p>Bio{user.bio}</p>
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

export default ProfilePage;
