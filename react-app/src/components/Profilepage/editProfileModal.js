import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateProfile } from "../../store/session";
import { RotatingLines } from  'react-loader-spinner'
import './editProfileModal.css'

export default function EditProfile({user, onClose}) {
    let userBio = ""
    if(user.bio !== null){
        userBio = user.bio
    }
    const [photo, setPhoto] = useState([])
    const [bio, setBio] = useState(userBio)
    const [change, setChange] = useState(false)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    function closeModal(){
        onClose()
    }

    const submitEdit = async() => {
        document.getElementById('file').click()
    }

    const changeProfile = async () => {
        if(bio === userBio && photo !== undefined && photo.length <= 0){
            setChange(false)
        }else{
            if(!bio){
                setBio("")
                return
            }
            setLoading(true)
            let formData = new FormData()
            formData.append('image', photo)
            formData.append('bio', bio)
            await dispatch(updateProfile(formData, photo, bio))
            onClose()
            setLoading(false)
            window.location.reload()
            return
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
                                <label id='form-label-edit-header'>Edit Profile</label>
                                </div>
                                <input type="button" id="loadProfilePic" value="Change Profile Photo" onClick={() => submitEdit()} />
                                <div id='form-label-bio-box'>
                                    <label id='form-bio-label-text'>Bio</label>
                                    <textarea
                                    id='form-label-bio'
                                    type="textarea"
                                    value={bio}
                                    placeholder='Update Bio'
                                    maxLength='100'
                                    onChange={changeBio}/>
                                </div>
                                <input
                                type="file"
                                style={{display: "none"}}
                                accept=".png, .jpg, .jpeg"
                                onChange={addImage}
                                id="file" name="file"/>
                                {/* {change ? <button type="submit" id="submitEditActive">Save Changes</button>
                                : <label id="submitEditUnActive">*Please add an image or edit caption*</label>} */}
                                {change ? <button type="submit" id="submitEditActive">
                                {loading ?
                                <RotatingLines
                                    strokeColor='gray'
                                    strokeWidth='4'
                                    width='20'
                                    animationDuration='1'
                                /> : "Submit"}
                                </button>
                                : <label id="submitEdit">Submit</label>}
                                {/* <button type="submit" id={change ? "submitEditActive" : "submitEdit"}>Submit</button> */}
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
