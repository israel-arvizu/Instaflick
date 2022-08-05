import React, { useState } from "react";
import { useDispatch } from "react-redux";
import './editProfileModal.css'

export default function EditProfile({user, onClose}) {
    let userBio = ""
    if(user.bio !== null){
        userBio = user.bio
    }
    const [photo, setPhoto] = useState([])
    const [bio, setBio] = useState(userBio)
    const [change, setChange] = useState(false)
    const dispatch = useDispatch()

    function closeModal(){
        onClose()
    }

    const submitEdit = async() => {
        document.getElementById('file').click()
    }

    const changeProfile = (e) => {
        e.preventDefault()
        if(bio === userBio && photo.length <= 0){
            setChange(false)
        }else{
            if(!bio){
                setBio("")
            }
            if(photo.length <= 0){
                // dispatch(updateBio(bio))
                return
            }
            // dispatch(updateProfile(photo, bio))
            onClose()
        }
    }

    const changeBio = (e) => {
        setBio(e.target.value)
        setChange(true)
    }

    const addImage = (e) => {
        const file = e.target.files[0];
        setPhoto(file)
        setChange(true)
    }

    return(
        <div className="modal-container">
            <div className="modal-edit-outside-container">
                <div className="modal-edit-options-content">
                    <div>
                        <form onSubmit={changeProfile} className="modal-options-form">
                            <div className="modal-options-container">
                                <div className="form-label-edit-container">
                                <label id='form-label-edit-header'>Change Profile Photo</label>
                                </div>
                                <div id='form-label-bio-box'>
                                    <label id='form-bio-label-text'>Bio</label>
                                    <textarea id='form-label-bio' type="textarea" value={bio} placeholder='Update Bio' onChange={changeBio}/>
                                </div>
                                <input type="button" id="loadProfilePic" value="Upload Photo" onClick={() => submitEdit()} />
                                <input
                                type="file"
                                style={{display: "none"}}
                                accept=".png, .jpg, .jpeg"
                                onChange={addImage}
                                id="file" name="file"/>
                                <button type="submit" id={change ? "submitEditActive" : "submitEdit"}>Submit</button>
                            </div>
                        </form>
                    </div>
                    <div onClick={() => closeModal()} className='modal-goback-container'>
                        <p style={{margin: '0px'}}>Cancel</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
