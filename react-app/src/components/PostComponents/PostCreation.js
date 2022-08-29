import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createPost } from '../../store/posts';
import { RotatingLines } from  'react-loader-spinner'
import UserNavBar from '../UserNavBar/UserNavBar'
import './postCreation.css'

function PostCreation() {
    const history = useHistory()
    const dispatch = useDispatch()
    const [image, setImage] = useState([])
    const [btnText, setBtnText] = useState("Select from computer")
    const [bio, setBio] = useState('')
    const [activePost, setActivePost] = useState(false)
    const [wordCount, setWordCount] = useState(0)
    const [loading, setLoading] = useState(false)
    const user = useSelector(state => state.session.user)

    const processPost = async (e) => {
        e.preventDefault()
        setLoading(true)
        const postData = new FormData();
        const today = new Date()
        postData.append("image", image)
        postData.append("caption", bio)
        postData.append("createdAt", today)
        postData.append("updatedAt", today)
        await dispatch(createPost(postData))
        history.push(`/${user.username}`)
        setLoading(false)
    }


    const addImage = (e) => {
        const file = e.target.files[0];
        setImage(file)
        setBtnText("Change Image")
        setActivePost(true)
    }

    const updateCaption = (e) => {
        setBio(e.target.value);
        console.log(e.target.value.length)
        setWordCount(e.target.value.length)
    }
        return (
            <>
            <UserNavBar user={user}/>
            <div>
                <div className='outside-placeholder-post'>
                    <div className='content-container-box'>
                        <div className='top-header-post-container'>
                            <p id='top-header-post-text'>Create new post</p>
                        </div>
                        <div className='post-form-container'>
                            <form onSubmit={processPost}>
                                <div className='post-form-middle-content-cont'>
                                    <div className='post-form-display-icons'>
                                        <svg className='svg-icon-post-middle' ariaLabel="Icon to represent media such as images or videos" color="#262626" fill="#262626" height="77" role="img" viewBox="0 0 97.6 77.3" width="96"><path d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z" fill="currentColor"></path><path d="M84.7 18.4L58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5l-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z" fill="currentColor"></path><path d="M78.2 41.6L61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6l-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z" fill="currentColor"></path></svg>
                                        <span>Select photos below</span>
                                    </div>
                                    <label className='file-upload-label-cover'>
                                        <input
                                        className='post-file-button'
                                        type="file"
                                        name="postImage"
                                        required
                                        accept=".png, .jpg, .jpeg"
                                        onChange={addImage}
                                        />
                                        {btnText}
                                    </label>
                                </div>
                                <div className='bottom-post-bio-header'>
                                    <p>Add a caption?</p>
                                </div>
                                <div className='bottom-post-bio-container'>
                                    <input
                                    id='post-input-bio-container'
                                    type='text'
                                    name='postBio'
                                    placeholder='Write a caption...'
                                    maxLength='100'
                                    onChange={(e) => updateCaption(e)}
                                    />
                                    <div className='bottom-post-bio-wordcount'>
                                        {wordCount}/100
                                    </div>
                                </div>
                                <div className='bottom-post-submit-section'>
                                    {activePost ?
                                        <button className='submit-post-button' type='submit'>
                                        {loading ?
                                        <RotatingLines
                                        strokeColor='white'
                                        strokeWidth='4'
                                        width='20'
                                        animationDuration='1'
                                        /> : "Done"}
                                        </button>
                                        : <label className='submit-post-unactive-label'>Please upload an image</label>}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            </>
        );
}

export default PostCreation;
