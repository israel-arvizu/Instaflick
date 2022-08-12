import React from "react";
import { useSelector } from "react-redux";
import UserNavBar from "../UserNavBar/UserNavBar";
import './aboutUs.css'

export default function AboutUs (){
    const user = useSelector(state => state.session.user);

    return (
        <div>
            {user ? <UserNavBar user={user} /> : null}
            <div id='aboutUs-label-container'>
                <h1 id='about-us-main-h1'>
                    About Us
                </h1>
            </div>
        </div>
    )
}
