import React, { useEffect, useState } from 'react'
import AddComment from '../comments'
import OptionsModal from './optionsModal'
import { loadPostComments } from '../../store/comments'
import './modalPost.css'
import { useDispatch, useSelector } from 'react-redux'

export default function Modal({onClose, post}){
    const dispatch = useDispatch()
    const [optionModal, setOptionModal] = useState(false)
    const comments = useSelector(state => state.comments.postComments)
    const userId = useSelector(state => state.session.user.id)
    let postId = post.id

    useEffect(() => {
        dispatch(loadPostComments(postId))
    }, [dispatch])

    function closeModal(){
        setOptionModal(false)
    }

    if(comments === undefined)
        return null

    return (
        <div className='modal-container'>\
            <div onClick={() => onClose()} className='close-modal-btn'>
                <i class="fa-solid fa-xmark fa-xl" style={{color: 'white', cursor: 'pointer'}}></i>
            </div>
            <div className='modal-content'>
                <div className='modal-image'>
                    <img src={post.photoUrl} className='modal-image-content'/>
                </div>
                <div className='modal-profile-container'>
                    <div className='top-modal-profile-header'>
                        <div className='modal-header-user'>
                            <img src={post.UserPhotoUrl} className='modal-user-photo'/>
                            <p className='modal-header-username-bold'>{post.OwnerUsername}</p>
                        </div>
                        <div className='modal-post-options' onClick={() => setOptionModal(true)}>
                            <i class="fa-solid fa-ellipsis fa-lg"></i>
                        </div>
                    </div>
                    <div className='modal-comments-container'>
                        {comments.map((comment) => {
                            return (

                                <div className='comment-container'>
                                    <div className='modal-comment-image-container'>
                                        <img src={comment.ownerPhotoUrl} className='comment-image-content'/>
                                    </div>
                                    <div className='comment-content-text'>
                                        <div>
                                            <span style={{marginRight: '5px', fontWeight: '500'}}>{comment.username}</span>
                                            <span>{comment.text}</span>
                                        </div>
                                        {comment.userId === userId ?
                                                <div className='comment-edit-buttons'>
                                                    <span className='comment-edit-btn' style={{cursor: 'pointer'}}>Edit</span>
                                                    <span className='comment-dlt-btn' style={{cursor: 'pointer'}}>Delete</span>
                                                </div> : null
                                        }
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className='modal-add-comments-container'>
                        <div>
                            <i class="fa-regular fa-heart fa-xl" style={{marginRight: '10px'}}></i>
                            <i class="fa-regular fa-comment fa-xl"></i>
                        </div>
                        <div>
                            Li
                        </div>
                        <AddComment post={post}/>
                    </div>
                </div>
            </div>
            {optionModal && <OptionsModal closeOptions={closeModal} id={post.id} closeModal={onClose}/>}
        </div>
    )
}
