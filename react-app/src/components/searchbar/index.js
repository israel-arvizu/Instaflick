import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../store/users";
import './searchbar.css'

export default function SearchBar() {
    const dispatch = useDispatch()
    const [input, setInput] = useState("")
    const [listDropDown, setListDropDown] = useState(false)
    const [results, setResults] = useState([])
    const userList = useSelector(state => state.users.allUsers);

    useEffect(() => {
       dispatch(getAllUsers())
    }, [dispatch])

    const handleChange = (textInput) => {
        setInput(textInput)
        if(textInput){
            const result = userList.filter(user => user.username.startsWith(textInput))
            setResults(result)
            setListDropDown(true)
            console.log(result)
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
                        <div>
                            {user.username}
                        </div>
                        )
                        })}
                </div>}
            </div>
        </>
    )
}
