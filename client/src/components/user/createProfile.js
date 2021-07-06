import React, { useState } from 'react';
import isEmpty from 'validator/lib/isEmpty';
import isEmail from 'validator/lib/isEmail';
import {useHistory} from 'react-router-dom'
import { showLoading } from '../../helper/loading'
import { showSuccessMsg, showErrorMsg } from '../../helper/message'
import axios from 'axios';
import Logo from '../../image/logo.png';
import NavTrigger from '../navTrigger';
import Topbar from '../topbar';
import Sidenav from '../sidenav';
import NavBackDash from '../navbackdash';
const ProfileCreate = () => {
    let history = useHistory();
    const [profileData, setProfileData] = useState({
        name: '',
        email: '',
        companyName: '',
        companyFbLink: '',
        address: '',
        successMsg: false,
        errorMsg: false,
        loading: false,
    });

    const {
        name,
        email,
        companyName,
        companyFbLink,
        address,
        successMsg,
        errorMsg,
        loading
    } = profileData;

    /****************************
* EVENT HANDLERS
***************************/
    const handleChange = (evt) => {
        //console.log(evt);
        setProfileData({
            ...profileData,
            [evt.target.name]: evt.target.value,
            successMsg: '',
            errorMsg: '',
        });
    };
    const handleSubmit = async (evt) => {
        evt.preventDefault();

        // client-side validation
        if (
            isEmpty(name) ||
            isEmpty(email) ||
            isEmpty(companyName) ||
            isEmpty(companyFbLink) ||
            isEmpty(address)

        ) {
            setProfileData({
                ...profileData,
                errorMsg: 'All fields are required',
            });
        } else if (!isEmail(email)) {
            setProfileData({
                ...profileData,
                errorMsg: 'Need valid email',
            });
        }
        else {
            const { name, email, companyFbLink, companyName, address } = profileData;
            const payload = { name, email, companyFbLink, companyName, address };

            setProfileData({ ...profileData, loading: true });

            await axios({
                url: '/api/profile/post',
                method: 'POST',
                data: payload
            })
                .then((response) => {
                    console.log('Axios profile success: ', response);
                    setProfileData({
                        name: name,
                        email: email,
                        companyName: companyName,
                        companyFbLink: companyFbLink,
                        address: address,
                        loading: false,
                        successMsg: response.data.successMessage,
                    });
                    history.push('/viewprofile')
                })
                .catch((err) => {
                    console.log('Axios profile error: ', err);
                    setProfileData({
                        ...profileData,
                        loading: false,
                        errorMsg: err.response.data.errorMessage,
                    });
                });

        }
    }

    const showProfile = () => (

        <div class="main-wrapper">
            <NavBackDash />
            <div class="site-content-wrapper">
                <Topbar />
                <NavTrigger />
                <div class="site-content">
                    <div class='sidenav'>
                        <Sidenav />
                        <div className='page-content p-2' id='content'>
                        <div style={{textAlign:'center'}}>
                                    <a href='/' class="branding">
                                        <img src={Logo} alt="" />
                                    </a>
                                </div>
                            <section class="get_in_touch">
                                <h1 class="title">
                                    Create your profile
                                </h1>
                                {successMsg && showSuccessMsg(successMsg)}
                                {errorMsg && showErrorMsg(errorMsg)}
                                {loading && showLoading()}
                                <div class="container">
                                    <form onSubmit={handleSubmit}>
                                        <div class="contact-form row">
                                            <div class="form-field col-lg-6">
                                                <input class="input-text" id="name" type="text" name="name"
                                                    value={name}
                                                    onChange={handleChange} />
                                                <label for="name" class="label">name</label>
                                            </div>
                                            <div class="form-field col-lg-6">
                                                <input class="input-text" id="email" type="email" name="email"
                                                    value={email}
                                                    onChange={handleChange} />
                                                <label for="email" class="label">email</label>
                                            </div>
                                            <div class="form-field col-lg-6">
                                                <input id="company" class="input-text" type="text" name="companyName"
                                                    value={companyName}
                                                    onChange={handleChange}
                                                />
                                                <label for="company" class="label">Company name</label>
                                            </div>
                                            <div class="form-field col-lg-6">
                                                <input id="phone" class="input-text" type="text" name="companyFbLink"
                                                    value={companyFbLink}
                                                    onChange={handleChange} />
                                                <label for="phone" class="label">Company Facebook Link</label>
                                            </div>
                                            <div class="form-field col-lg-12">
                                                <input id="message" type="text" class="input-text" name="address"
                                                    value={address}
                                                    onChange={handleChange} />
                                                <label for="phone" class="label">Address</label>
                                            </div>
                                            <div class="form-field col-lg-12">
                                                <input type="submit" class="submit-btn" value="submit" name="" />
                                            </div>

                                        </div>
                                    </form>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <div>
            {showProfile()}
        </div>
    )
}

export default ProfileCreate;