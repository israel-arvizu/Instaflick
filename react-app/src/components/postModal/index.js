import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AddComment from '../comments'
import OptionsModal from './optionsModal'
import { loadPostComments } from '../../store/comments'
import { deleteComment } from '../../store/comments'
import { editComment } from '../../store/comments'
import { updateCaption } from '../../store/posts'
import { getUsersPost } from '../../store/posts'
import './modalPost.css'

export default function Modal({onClose, post}){
    const dispatch = useDispatch()
    const [optionModal, setOptionModal] = useState(false)
    const [editCommentBox, setEditCommentBox] = useState(null)
    const [newComment, setNewComment] = useState("")
    const [caption, setCaption] = useState("")
    const [editPost, setEditPost] = useState(false)
    const [postCapt, setPostCapt] = useState(post.postBio)
    const comments = useSelector(state => state.comments.postComments)
    const userId = useSelector(state => state.session.user.id)
    let postId = post.id

    useEffect(() => {
        dispatch(loadPostComments(postId))
    }, [dispatch])

    function closeModal(){
        setOptionModal(false)
    }

   const removeComment = (commentId) => {
        dispatch(deleteComment(commentId, postId))
    }

    const edtComment = (commentId, commentText) => {
        if(editCommentBox !== commentId){
            setEditCommentBox(commentId)
            setNewComment(commentText)
        }else{
            dispatch(editComment(commentId, postId, newComment))
            setNewComment("")
            setEditCommentBox(null)
        }
    }

    const submitPostUpd = () => {
        if(caption.length > 0){
            dispatch(updateCaption(caption, postId))
            setPostCapt(caption)
            setEditPost(false)
            setCaption("")
        }
    }

    const cancelEdit = () => {
        setEditCommentBox(null)
    }

    const cancelPostEdit = () => {
        setEditPost(false)
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
                        {userId === post.userId ?
                        <div className='modal-post-options' onClick={() => setOptionModal(true)}>
                            <i class="fa-solid fa-ellipsis fa-lg"></i>
                        </div>: null}
                    </div>
                    <div className='modal-comments-container'>
                        <div className='comment-container'>
                            <div className='modal-comment-image-container'>
                                <img src={post.UserPhotoUrl} className='comment-image-content'/>
                            </div>
                            <div className='comment-content-text'>
                                {editPost ?
                                <>
                                    <div>
                                        <span style={{marginRight: '5px', fontWeight: '500'}}>{post.OwnerUsername}</span>
                                        <form>
                                            <textarea
                                                className='comment-edit-box'
                                                value={caption}
                                                placeholder={"Must be at least 1 character"}
                                                onChange={(e) => setCaption(e.target.value)}
                                                required
                                                maxLength="346"/>
                                        </form>
                                    </div>
                                    <div className='comment-edit-buttons'>
                                        <span className='comment-edit-btn' style={{cursor: 'pointer'}} onClick={() => submitPostUpd(post.id)}>Edit</span>
                                        <span className='comment-edit-btn' style={{cursor: 'pointer'}} onClick={() => cancelPostEdit()}>Cancel</span>
                                    </div>
                                </>
                                :
                                <div>
                                    <span style={{marginRight: '5px', fontWeight: '500'}}>{post.OwnerUsername}</span>
                                    <span>{postCapt}</span>
                                </div>
                                }
                            </div>
                        </div>
                        {comments.map((comment) => {
                            return (
                                <div className='comment-container'>
                                    <div className='modal-comment-image-container'>
                                        <img src={comment.ownerPhotoUrl} className='comment-image-content'/>
                                    </div>
                                    <div className='comment-content-text'>
                                        {editCommentBox === comment.id ?
                                            <div>
                                                <span style={{marginRight: '5px', fontWeight: '500'}}>{comment.username}</span>
                                                <form>
                                                    <textarea
                                                        className='comment-edit-box'
                                                        value={newComment}
                                                        onChange={(e) => setNewComment(e.target.value)}
                                                        required
                                                        maxLength="346"/>
                                                </form>
                                            </div>
                                        :<div>
                                            <span style={{marginRight: '5px', fontWeight: '500'}}>{comment.username}</span>
                                            <span>{comment.text}</span>
                                        </div>}
                                        {comment.userId === userId ?
                                                <div className='comment-edit-buttons'>
                                                    <span className='comment-edit-btn' style={{cursor: 'pointer'}} onClick={() => edtComment(comment.id, comment.text)}>Edit</span>
                                                    {editCommentBox !== null &&
                                                    <span className='comment-edit-btn' style={{cursor: 'pointer'}} onClick={() => cancelEdit()}>Cancel</span>
                                                    }
                                                    <span className='comment-dlt-btn' style={{cursor: 'pointer'}} onClick={() => removeComment(comment.id)}>Delete</span>
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
                        <AddComment post={post}/>
                    </div>
                </div>
            </div>
            {optionModal && <OptionsModal closeOptions={closeModal} id={post.id} closeModal={onClose} editCaption={setEditPost} inputText={setCaption} bio={post.postBio}/>}
        </div>
    )
}
