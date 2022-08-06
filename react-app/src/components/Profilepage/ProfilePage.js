import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import UserNavBar from '../UserNavBar/UserNavBar';
import { getUsersPost } from '../../store/posts';
import Modal from '../postModal'
import EditProfile from './editProfileModal';
import './profilepage.css'

function ProfilePage() {
    const user = useSelector(state => state.session.user)
    const usersPost = useSelector(state => state.posts.userPosts)
    const [errors, setErrors] = useState([])
    const [modalOpen, setModalOpen] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const [selectedPost, setSelectedPost] = useState(undefined)
    const dispatch = useDispatch()

    function selectPost(post){
        setSelectedPost(post)
        setModalOpen(true)
    }

    function closeModal() {
        setModalOpen(false)
    }

    function submitEditProfile() {
        setEditModal(true)
    }

    function closeEditProfileModal() {
        setEditModal(false)
    }


    //close
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
                <img src={user.profile_picture} id='profilePage-profile-pic'></img>
                <div className='profilepage-user-info'>
                    <div className='profile-user-edit'>
                        <h2 id='profile-username-header'>{user.username}</h2>
                        <button id='profile-user-edit-btn' onClick={() => submitEditProfile()}>Edit Profile</button>
                    </div>
                    <div className='profile-info-section'>
                        <div className='profile-short-info-container'>
                            <span className='profile-short-info-numbers'> {usersPost.length}</span>
                            <span className='profile-short-info-text'> posts </span>
                        </div>
                        <div className='profile-short-info-container'>
                            <span className='profile-short-info-numbers'> {user.followers}</span>
                            <span className='profile-short-info-text'> followers </span>
                        </div>
                        <div className='profile-short-info-container'>
                            <span className='profile-short-info-numbers'> {user.following}</span>
                            <span className='profile-short-info-text'> following </span>
                        </div>
                    </div>
                    <div className='profile-name-bio-section'>
                        <p id='profile-real-name-bold'>{user.name}</p>
                        <p id='profile-biography-user'>{user.bio}</p>
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
            {editModal && <EditProfile user={user} onClose={closeEditProfileModal}/>}
        </div>
    );
}

export default ProfilePage;
