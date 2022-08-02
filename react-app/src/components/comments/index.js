import React from "react";
import './comments.css'

export default function AddComment() {
    return (
        <div className='post-bottom-comment-sect'>
            <i class="fa-regular fa-face-smile fa-xl" style={{marginRight: '5px', marginLeft: '7px'}}></i>
            <form>
                <input
                type='text'
                className='post-bottom-comment-box'
                placeholder='Add a comment...'/>
                <button className='post-comment-btn'>Post</button>
            </form>
        </div>
    )
}
