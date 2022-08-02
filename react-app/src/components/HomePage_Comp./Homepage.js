import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserNavBar from '../UserNavBar/UserNavBar';
import AddComment from '../comments';
import { getRecentPost } from '../../store/posts';
import './homepage.css'

function Homepage()  {
  const user = useSelector(state => state.session.user)
  const dipatch = useDispatch()
  const [errors, setErrors] = useState([])
  const recentPost = useSelector(state => state.posts.recentPosts)

  useEffect(() => {
    const data = dipatch(getRecentPost())
    if (data) {
      setErrors(data);
    }
  }, [dipatch])

  if(recentPost === undefined){
    return null
  }

  return (
    <>
        <UserNavBar user={user}/>
        <div className='homepage-layout-container'>
          <div id='home-post-left-container'>
            {/* <div>
              {errors.map((error, ind) => (
                <div key={ind}>{error}</div>
              ))}
            </div> */}
            {recentPost.map((post) => {
              return (
                <div className='post-article-container'>
                  <div className='post-header'>
                    <img src='/images/ProfilePicture.JPG' id='homepage-post-pic' alt='Profile Picture'/>
                    <p>{post.userId}</p>
                  </div>
                  <div className='post-picture-content'>
                    <img src={post.photoUrl} className='homepage-post-image'/>
                  </div>
                  <div className='post-bottom-content'>
                    <div className='favorite-buttons-container'>
                      <i class="fa-regular fa-heart fa-xl" style={{marginRight: '10px'}}></i>
                      <i class="fa-regular fa-comment fa-xl"></i>
                    </div>
                    <p>{post.likes} likes</p>
                    <p>{post.postBio}</p>
                    <p className='post-bottom-comments-head'>View all {post.comments} comments</p>
                    <p className='post-bottom-dateCreated'>{post.dateCreated}</p>
                  </div>
                  <AddComment />
                </div>
              )
            })}
          </div>
          <div id='home-left-container'>
            <div id='home-profile-section'>
                <img src='/images/ProfilePicture.JPG' id='homepage-profile-pic' alt='Profile Picture'/>
                <div id='home-profile-names'>
                  <div>{user.name}</div>
                  <div>{user.username}</div>
              </div>
            </div>
            <div>
                <span>Suggested For You</span>
                <div id='home-suggestion-container'>
                    <p>User Suggestion section</p>
                    <div>User.map...</div>
                </div>
            </div>
          </div>
        </div>
      </>
  );
}

export default Homepage;
