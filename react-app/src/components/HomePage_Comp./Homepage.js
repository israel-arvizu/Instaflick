import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserNavBar from '../UserNavBar/UserNavBar';
import AddComment from '../comments';
import { getRecentPost } from '../../store/posts';
import Modal from '../../components/postModal'
import './homepage.css'
import { getRecommendedUsers } from './helperFunctions';


function Homepage()  {
  const user = useSelector(state => state.session.user)
  const dispatch = useDispatch()
  const [errors, setErrors] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedPost, setSelectedPost] = useState(undefined)
  const allUsers = useSelector(state => state.users.allUsers)
  const recentPost = useSelector(state => state.posts.recentPosts)
  let recommendedUsers = undefined

  function selectPost(post){
    setSelectedPost(post)
    setModalOpen(true)
  }

  function closeModal() {
    setModalOpen(false)
    dispatch(getRecentPost())
  }

  useEffect(() => {
    const data = dispatch(getRecentPost())
    if (data) {
      setErrors(data);
    }
  }, [dispatch])

  if(recentPost === undefined){
    return null
  }

  if(allUsers !== undefined){
    recommendedUsers = getRecommendedUsers(allUsers)
  }

  return (
    <>
        <UserNavBar user={user} home="true"/>
        <div className='homepage-layout-container'>
          <div id='home-post-left-container'>
            {recentPost.map((post) => {
              return (
                <div className='post-article-container'>
                  <a className='post-header' href={`/${post.OwnerUsername}`}>
                    <img src={post.UserPhotoUrl} id='homepage-post-pic' alt='Profile Picture'/>
                    <p id='homepage-post-username'>{post.OwnerUsername}</p>
                  </a>
                  <div className='post-picture-content' onClick={() => selectPost(post)} style={{cursor: 'pointer'}}>
                    <img src={post.photoUrl} className='homepage-post-image'/>
                  </div>
                  <div className='post-bottom-content'>
                    {/* <div className='favorite-buttons-container'>
                      <i class="fa-regular fa-heart fa-xl" style={{marginRight: '10px'}}></i>
                      <i class="fa-regular fa-comment fa-xl"></i>
                    </div> */}
                    <p className='post-like-section'>{post.likes} likes</p>
                    <div className='post-owner-bio-container'>
                      <span className='post-owner-username-section'>{post.OwnerUsername}</span>
                      <span className='post-owner-bio-section'>{post.postBio}</span>
                    </div>
                    <p className='post-bottom-comments-head' onClick={() => selectPost(post)} style={{cursor: 'pointer'}}>View all {post.comments} comments</p>
                    <p className='post-bottom-dateCreated'>{post.dateCreated}</p>
                  </div>
                  <AddComment post={post}/>
                </div>
              )
            })}
          </div>
          <div id='home-right-container'>
            <a id='home-profile-section' href={`/${user.username}`}>
              <img src={user.profile_picture} id='homepage-profile-pic' alt='Profile Picture'/>
              <div id='home-profile-names'>
                  <div id='home-profile-username'>{user.name}</div>
                  <div id='home-profile-realname'>{user.username}</div>
              </div>
            </a>
            <div id='home-suggestion-container'>
                <span id='home-suggestions-text'>Suggestions For You</span>
                <div id='home-suggestion-container'>
                    {recommendedUsers === undefined ? <div>Loading</div> :
                      <div>
                        {recommendedUsers.map((currUser) => {
                            if(currUser.id !== user.id){
                              return (
                                <a className='outside-recommended-user' href={`/${currUser.username}`}>
                                  <img className='recommendedUser-profile-pic' src={currUser.profile_picture} alt='User profile picture' />
                                  <div className='recommendedUser-side-info'>
                                    <p className='recommendedUser-username'>{currUser.username}</p>
                                    <p className='recommendedUser-text-below'>Suggested for you</p>
                                  </div>
                                </a>
                              )
                            }
                          })}
                      </div>
                    }
                </div>
            </div>
          </div>
          {modalOpen && <Modal post={selectedPost} onClose={closeModal} />}
        </div>
      </>
  );
}

export default Homepage;
