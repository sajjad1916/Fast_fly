import React from 'react';
import {isAuthenticated, logout} from '../helper/auth';
import {withRouter} from 'react-router-dom'
import Facebook from '../icons/facebook.svg';
import Instagram from '../icons/instagram.svg';
import Google from '../icons/google.svg';
import Search from '../icons/search.svg';
import Twitter from '../icons/twitter.svg';
import UserIcon from '../icons/user-icon.svg';
import Edit from '../icons/edit.svg';

const Topbar=({history})=> {
    const handleLogout = (evt) => {
        logout(() => {
            history.push('/signin');
        });
    };
    return (
        <header class="topbarAlways">
        <div class="container d-flex justify-content-between align-items-center">
            <div class="icons">
                <a href="https://www.facebook.com/fastdeliverybd" target='_blank'> <img src={Facebook} alt="" /> </a>
                 <a href="https://www.facebook.com/fastdeliverybd" target='_blank'> Join Now </a>
            </div>
            {!isAuthenticated() &&(
                <div class="auth d-flex align-items-center">
                <div>
                    <img src={UserIcon} alt="" />
                    <a href="/signin">Log in</a>
                </div>
                <span class="divider">|</span>
                <div>
                    <img src={Edit} alt="" />
                    <a href="/signup">Register</a>
                </div>
            </div>
            ) }

            {isAuthenticated() &&(
                <div class="auth d-flex align-items-center">
                <div>
                    <img src={UserIcon} alt="" />
                    <a href="/dashboard">Dashboard</a>
                </div>
                <span class="divider">|</span>
                <div>
                    <img src={Edit} alt="" />
                    <a onClick={handleLogout}>Logout</a>
                </div>
            </div>
            ) }
            
        </div>
    </header>
    )
}

export default withRouter(Topbar)
