import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ModalAddComment from '../comments/AddCommentModal'
import OptionsModal from './optionsModal'
import { loadPostComments } from '../../store/comments'
import { deleteComment } from '../../store/comments'
import { editComment } from '../../store/comments'
import { updateCaption } from '../../store/posts'
import { getUsersPost } from '../../store/posts'
import './modalPost.css'

export default function Modal({onClose, post, checkLike, processLike}){
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

    useEffect(() => {
        setCaption(postCapt)
    }, [postCapt])

    function closeModal(){
        setOptionModal(false)
    }

   const removeComment = (commentId) => {
        dispatch(deleteComment(commentId, postId))
        setEditCommentBox(null)
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
                                {editPost ?
                                <>
                                    <div className='modal-comment-image-container'>
                                        <img src={post.UserPhotoUrl} className='comment-image-content'/>
                                    </div>
                                    <div className='comment-content-text'>
                                        <span style={{marginLeft: '3px', fontWeight: '500'}}>{post.OwnerUsername}</span>
                                        <form>
                                            <textarea
                                                className='comment-edit-box'
                                                // value={caption}
                                                placeholder={postCapt.length > 0 ? postCapt : "Add a caption"}
                                                onChange={(e) => setCaption(e.target.value)}
                                                required
                                                maxLength="100"/>
                                        </form>
                                    </div>
                                    <div className='comment-edit-buttons'>
                                        <span className='comment-edit-btn' style={{cursor: 'pointer'}} onClick={() => submitPostUpd(post.id)}>Edit</span>
                                        <span className='comment-edit-btn' style={{cursor: 'pointer'}} onClick={() => cancelPostEdit()}>Cancel</span>
                                    </div>
                                </>
                                :
                                postCapt.length > 0 || editPost ?
                                <div className='modal-caption-text-valid-conatiner'>
                                    <div className='modal-comment-image-container'>
                                        <img src={post.UserPhotoUrl} className='comment-image-content'/>
                                    </div>
                                    <div className='comment-content-user-caption'>
                                        <span style={{marginRight: '5px', fontWeight: '500'}}>{post.OwnerUsername}</span>
                                        <span className='comment-caption-modal'>{postCapt}</span>
                                    </div>
                                </div>  : null
                                }
                        </div>
                        {comments.map((comment) => {
                            return (
                                <div className='comment-container'>
                                    <div className='modal-comment-image-container'>
                                        <img src={comment.ownerPhotoUrl} className='comment-image-content'/>
                                    </div>
                                    <div className='comment-content-text'>
                                        {editCommentBox === comment.id ?
                                            <div className='comment-container-input-section'>
                                                <span style={{marginRight: '5px', fontWeight: '500'}}>{comment.username}</span>
                                                <form>
                                                    <textarea
                                                        className='comment-edit-box'
                                                        value={newComment}
                                                        onChange={(e) => setNewComment(e.target.value)}
                                                        required
                                                        maxLength="100"/>
                                                </form>
                                            </div>
                                        : <div className='post-comment-content-box'>
                                            <span style={{marginRight: '5px', fontWeight: '500'}}>{comment.username}</span>
                                            <span>{comment.text}</span>
                                        </div>}
                                        {comment.userId === userId ?
                                                <div className='comment-edit-buttons'>
                                                    <span className='comment-edit-btn' style={{cursor: 'pointer'}} onClick={() => edtComment(comment.id, comment.text)}>Edit</span>
                                                    {editCommentBox !== null && editCommentBox === comment.id &&
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
                    <div className='post-information-container'>
                        {/* <div className='post-info-icon-btns'>
                            {checkLike(post.likes) ?
                            <svg onClick={() => processLike(post.id)} id="post-like-button" ariaLabel="Unlike" class="_ab6-" color="#ed4956" fill="#ed4956" height="24" role="img" viewBox="0 0 48 48" width="24"><path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg>
                             : <svg onClick={() => processLike(post.id)}  id="post-like-button-grayed" ariaLabel="Like" class="_ab6-" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M16.792 3.904A4.989 4.989 0 0121.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 014.708-5.218 4.21 4.21 0 013.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 013.679-1.938m0-2a6.04 6.04 0 00-4.797 2.127 6.052 6.052 0 00-4.787-2.127A6.985 6.985 0 00.5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 003.518 3.018 2 2 0 002.174 0 45.263 45.263 0 003.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 00-6.708-7.218z"></path></svg>}
                            <i class="fa-regular fa-comment fa-xl" style={{cursor: "pointer"}}></i>
                        </div> */}
                        <div className='post-info-like-count'>{post.likes.length} likes</div>
                        <div className='post-info-date-created'>{post.dateCreated}</div>
                    </div>
                    <div className='modal-add-comments-container'>
                        <ModalAddComment post={post} />
                    </div>
                </div>
            </div>
            {optionModal && <OptionsModal closeOptions={closeModal} id={post.id} closeModal={onClose} editCaption={setEditPost} inputText={setCaption} bio={post.postBio}/>}
        </div>
    )
}
