import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserNavBar from '../UserNavBar/UserNavBar';
import AddComment from '../comments';
import { getRecentPost } from '../../store/posts';
import Modal from '../../components/postModal'
import { updateLikes } from '../../store/posts';
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

  function processLike(postId) {
    dispatch(updateLikes(user.id, postId))
  }

  function checkLike(likesArr){
    let activeLike = false;
    for(let i=0; i < likesArr.length; i++){
      if(likesArr[i]["userId"] == user.id){
        activeLike = true;
      }
    }
    return activeLike;
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
                    <div className='favorite-buttons-container'>
                      {checkLike(post.likes) ?
                      <svg onClick={() => processLike(post.id)}  id="post-like-button" ariaLabel="Unlike" class="_ab6-" color="#ed4956" fill="#ed4956" height="24" role="img" viewBox="0 0 48 48" width="24"><path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg>
                      : <svg onClick={() => processLike(post.id)}  id="post-like-button-grayed" ariaLabel="Like" class="_ab6-" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M16.792 3.904A4.989 4.989 0 0121.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 014.708-5.218 4.21 4.21 0 013.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 013.679-1.938m0-2a6.04 6.04 0 00-4.797 2.127 6.052 6.052 0 00-4.787-2.127A6.985 6.985 0 00.5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 003.518 3.018 2 2 0 002.174 0 45.263 45.263 0 003.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 00-6.708-7.218z"></path></svg>}
                      {/* <i class="fa-regular fa-heart fa-xl" id="post-like-button" onClick={() => processLike(post.id)}></i> */}
                      <i class="fa-regular fa-comment fa-xl" onClick={() => selectPost(post)} style={{cursor: "pointer"}}></i>
                    </div>
                    <p className='post-like-section'> {post.likes.length} likes</p>
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
          {modalOpen && <Modal post={selectedPost} onClose={closeModal} checkLike={checkLike} processLike={processLike}/>}
        </div>
      </>
  );
}

export default Homepage;
