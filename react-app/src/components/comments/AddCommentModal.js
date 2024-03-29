import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSingleComment } from "../../store/comments";
import { getRecentPost } from '../../store/posts';
import './comments.css'

export default function ModalAddComment({post}) {
    const dispatch = useDispatch()
    const [comment, setComment] = useState('')
    const [wordCount, setWordCount] = useState(0)
    const userId = useSelector(state => state.session.user.id)
    let postId = post.id


    const processComment = async (e) => {
        e.preventDefault()
        if(comment.length > 0){
            await dispatch(addSingleComment(comment, userId, postId))
            setComment('')
        }
        setWordCount(0)
        dispatch(getRecentPost())
    }

    const updateComment = (e) => {
        setComment(e.target.value)
        setWordCount(e.target.value.length)
    }

    return (
        <div className='modal-bottom-comment-sect'>
            <i class="fa-regular fa-face-smile fa-xl" id="modal-comments-emoji-content"></i>
            <form onSubmit={(e) => processComment(e)} id="form-modal-comment">
                <div className="form-input-comment-container">
                    <input
                    type='text'
                    className='post-bottom-comment-box'
                    value={comment}
                    maxLength='100'
                    onChange={e => updateComment(e)}
                    placeholder='Add a comment...'/>
                    <div className="form-input-wordCount">
                        {wordCount}/100
                    </div>
                    {comment.length <= 0 ? <label className='modal-comments-unactive'>Post</label>
                    : <button type='submit' className='modal-comment-btn'>Post</button>}
                </div>
            </form>
        </div>
    )
}
