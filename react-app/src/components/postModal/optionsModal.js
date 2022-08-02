import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePost } from "../../store/posts";

export default function OptionsModal({closeOptions, closeModal, id}) {
    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch();
    const userId = user.id

    function delePost() {
        dispatch(deletePost(id, userId))
        closeOptions()
        closeModal()
    }

    return (
        <div className="modal-container">
            <div className="modal-outside-container">
                <div className="modal-options-content">
                    <div className="modal-delete-post">
                        <p onClick={() => delePost()} style={{color: 'red', fontWeight: '500'}}>Delete</p>
                    </div>
                    <div className="modal-goback-post" onClick={() => closeOptions()}>
                        <p>Go Back</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
