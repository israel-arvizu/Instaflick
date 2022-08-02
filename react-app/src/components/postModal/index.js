import React, { useState } from 'react'
import AddComment from '../comments'
import OptionsModal from './optionsModal'
import './modalPost.css'

export default function Modal({onClose, post}){
    const [optionModal, setOptionModal] = useState(false)

    function closeModal(){
        setOptionModal(false)
    }

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
                        <p>{post.userId}</p>
                        <div className='modal-post-options' onClick={() => setOptionModal(true)}>
                            <i class="fa-solid fa-ellipsis fa-lg"></i>
                        </div>
                    </div>
                    <div className='modal-comments-container'>
                        Comments
                    </div>
                    <div className='modal-add-comments-container'>
                        <div>
                            <i class="fa-regular fa-heart fa-xl" style={{marginRight: '10px'}}></i>
                            <i class="fa-regular fa-comment fa-xl"></i>
                        </div>
                        <div>
                            Liked by
                        </div>
                        <AddComment />
                    </div>
                </div>
            </div>
            {optionModal && <OptionsModal closeOptions={closeModal} id={post.id} closeModal={onClose}/>}
        </div>
    )
}
