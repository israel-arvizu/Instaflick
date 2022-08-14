import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import { getAllUsers } from "../../store/users";
import './searchbar.css'

export default function SearchBar() {
    const dispatch = useDispatch()
    const history = useHistory()
    const [input, setInput] = useState("")
    const [listDropDown, setListDropDown] = useState(false)
    const [results, setResults] = useState([])
    const [noResults, setNoResults] = useState(false)
    const userList = useSelector(state => state.users.allUsers);

    useEffect(() => {
       dispatch(getAllUsers())
    }, [dispatch])

    const handleChange = (textInput) => {
        setInput(textInput)
        if(textInput){
            setResults([])
            let inputSearch = textInput.toLowerCase();
            const result = userList.filter(user => user.username.toLowerCase().startsWith(inputSearch))
            if(result.length <= 0){
                setNoResults(true)
                setListDropDown(true)
            }else{
                setNoResults(false)
                setResults(result)
                setListDropDown(true)
            }
        } else {
            setListDropDown(false)
        }
    }

    if(userList === undefined)
        return null
    return(
        <>
            <div className="searchbox-outside-container">
                <div className="searchbox-input">
                    <i class="fa-solid fa-magnifying-glass" style={{color: '#757A88', marginLeft: '10px'}}></i>
                    <input
                        className="search-bar"
                        type="text"
                        placeholder="Search"
                        value={input}
                        onChange={(e) => handleChange(e.target.value)}
                        />
                </div>
               {listDropDown &&
                <div className="searchbox-results-container">
                    {results.map((user) => {
                        return(
                        <div className="result-dropdown-user-container">
                            <a className='result-user-link' href={`/${user.username}`}>
                                <img className='result-dropdown-picture' src={user.profile_picture} alt='profile picture'/>
                                <div className="result-dropdown-name-cont">
                                    <p className="result-dropdown-username">{user.username}</p>
                                    <p className="result-dropdown-name">{user.name}</p>
                                </div>
                            </a>
                        </div>
                        )
                        })}
                    {noResults &&
                        <div className="searchbox-noResults-container">
                            <p id='no-results-content'>No results found.</p>
                        </div>
                    }
                </div>}
            </div>
        </>
    )
}
