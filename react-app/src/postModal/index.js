import React from 'react'

import './modalPost.css'

export default function Modal({onClose, post}){

    return (
        <div className='modal-container'>\
            <div onClick={() => onClose()} className='close-modal-btn'>
                <i class="fa-solid fa-xmark fa-xl" style={{color: 'white', cursor: 'pointer'}}></i>
            </div>
            <div className='modal-content'>
                <div className='modal-image'>
                    <img src={post.photoUrl} className='modal-image-content'/>
                </div>
                <div className='modal-commment-section'>
                    <div>
                        Comments:
                    </div>
                </div>
            </div>
        </div>
    )
}
