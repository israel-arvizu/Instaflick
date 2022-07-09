import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createPost } from '../../store/posts';

function PostCreation() {
    const history = useHistory()
    const dispatch = useDispatch()
    const [image, setImage] = useState([])
    const [bio, setBio] = useState('')
    const [error, setErrors] = useState('')
    const username = useSelector(state => state.session.user.username)

    const processPost = async (e) => {
        e.preventDefault()
        const postData = new FormData();
        const today = new Date()
        postData.append("image", image)
        postData.append("caption", bio)
        postData.append("createdAt", today)
        postData.append("updatedAt", today)
        const data = await dispatch(createPost(postData))
        if(data){
            setErrors(data)
        }
        history.push(`/${username}`)
    }

    const addImage = (e) => {
        const file = e.target.files[0];
        setImage(file)
    }
        return (
            <div>
                <div>
                    <p>Create new post</p>
                    <div className='post-form-container'>
                        Upload an Image please!
                        <form onSubmit={processPost}>
                            <input
                            type="file"
                            name="postImage"
                            required
                            accept="image/jpeg"
                            onChange={addImage}
                             />
                            <button type='submit'>Done</button>
                            <label>bio:</label>
                            <input
                             type='text'
                             name='postBio'
                             onChange={e => setBio(e.target.value)}
                             />
                        </form>

                    </div>
                </div>
            </div>
        );
}

export default PostCreation;
