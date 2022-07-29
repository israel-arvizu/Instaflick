import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import UserNavBar from '../UserNavBar/UserNavBar';
import { getUsersPost } from '../../store/posts';
import './profilepage.css'

function ProfilePage() {
    const user = useSelector(state => state.session.user)
    const usersPost = useSelector(state => state.posts.userPosts)
    const [errors, setErrors] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {
        const data = dispatch(getUsersPost(user.id))
        if (data) {
            setErrors(data);
          }
    }, [dispatch])

    function openPost() {
        console.log('Post opened')
    }

    if(usersPost === undefined){
        return null
    }
    return (
        <div>
            <UserNavBar user={user}/>
            <div className='top-profile-header'>
                <img src='/images/profilepagePicture.png' id='profilePage-profile-pic'></img>
                <div className='profilepage-user-info'>
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
            </div>
            <hr></hr>
            <div className='bottom-body-profile-post'>
                <div>
                    <p>Posts</p>
                </div>
                <div>
                    {usersPost.map((post) => {
                        return (
                            <div className='profie-single-post' onClick={openPost} style={{cursor: 'pointer'}}>
                            <img src={post.photoUrl} id='profilepage-indv-post' alt='Post'/>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;
