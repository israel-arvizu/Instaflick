import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import UserNavBar from '../UserNavBar/UserNavBar';
import { getUsersPost } from '../../store/posts';
import { getUser } from '../../store/users';
import Modal from '../postModal'
import EditProfile from './editProfileModal';
import './profilepage.css'
import { useParams } from 'react-router-dom';

function ProfilePage() {
    const signedInUser = useSelector(state => state.session.user)
    const usersPost = useSelector(state => state.posts.userPosts)
    const user = useSelector(state => state.users.selected)
    const username = useParams().user
    const [errors, setErrors] = useState([])
    const [userFound, setUserFound] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const [loaded, setLoaded] = useState(false)
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

    useEffect(() => {
        (async() => {
            const userData = await dispatch(getUser(username))
            if (userData) {
                setErrors(userData)
                setUserFound(true)
            }
            })();
    }, [dispatch])

    if(user !== undefined && !loaded){
        dispatch(getUsersPost(user.id))
        setLoaded(true)
    }


    if(user === undefined || usersPost === undefined)
        return null

    if(userFound) {
        return (
            <>
                <UserNavBar user={user}/>
                <p>User not found!</p>
            </>
        )
    }

    return (
        <div>
            <UserNavBar user={signedInUser}/>
            <div className='top-profile-header'>
                <img src={user.profile_picture} id='profilePage-profile-pic'></img>
                <div className='profilepage-user-info'>
                    <div className='profile-user-edit'>
                        <h2 id='profile-username-header'>{user.username}</h2>
                        {signedInUser.id === user.id &&
                        <button id='profile-user-edit-btn' onClick={() => submitEditProfile()}>Edit Profile</button>}
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
