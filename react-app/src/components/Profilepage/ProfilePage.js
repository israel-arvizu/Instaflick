import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import UserNavBar from '../UserNavBar/UserNavBar';
import { getUsersPost } from '../../store/posts';
import Modal from '../postModal'
import './profilepage.css'

function ProfilePage() {
    const user = useSelector(state => state.session.user)
    const usersPost = useSelector(state => state.posts.userPosts)
    const [errors, setErrors] = useState([])
    const [modalOpen, setModalOpen] = useState(false)
    const [selectedPost, setSelectedPost] = useState(undefined)
    const dispatch = useDispatch()

    function selectPost(post){
        setSelectedPost(post)
        setModalOpen(true)
    }

    function closeModal() {
        setModalOpen(false)
    }


    useEffect(() => {
        const data = dispatch(getUsersPost(user.id))
        if (data) {
            setErrors(data);
          }
    }, [dispatch])

    //CHANGE THIS TO JUST LOAD IN WHAT IS LOADED IN
    if(usersPost === undefined){
        return null
    }
    return (
        <div>
            <UserNavBar user={user}/>
            <div className='top-profile-header'>
                <img src='/static/profilepagePicture.png' id='profilePage-profile-pic'></img>
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
            <div className='bottom-body-profile-post'>
                <div className='post-container-block'>
                    {usersPost.map((post) => {
                        return (
                            <>
                                <div className={`profie-single-post`} id={`post-${post.id}`} style={{cursor: 'pointer'}} onClick={(e) => selectPost(post)}>
                                    <img src={post.photoUrl} className='profilepage-indv-post' alt='Post'/>
                                </div>
                            </>
                        )
                    })}
                </div>
            </div>
            {modalOpen && <Modal post={selectedPost} onClose={closeModal} />}
        </div>
    );
}

export default ProfilePage;
