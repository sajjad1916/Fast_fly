import React, { useState,useEffect } from 'react'
import isEmpty from 'validator/lib/isEmpty';
import isEmail from 'validator/lib/isEmail';
import { useHistory } from 'react-router-dom'
import { showLoading } from '../../helper/loading'
import { showSuccessMsg, showErrorMsg } from '../../helper/message'
import axios from 'axios';
import Logo from '../../image/logo.png';
import NavTrigger from '../navTrigger';
import Topbar from '../topbar';
import Sidenav from '../sidenav';
import NavBackDash from '../navbackdash';

function UpdateProfile() {
    let history = useHistory();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        companyName: '',
        companyFbLink: '',
        address: '',
        successMsg: false,
        errorMsg: false,
        loading: false
    })
    const {
        name,
        email,
        companyName,
        companyFbLink,
        address,
        successMsg,
        errorMsg,
        loading} = formData;

    useEffect(()=>{
        loadOrder();
    },[]);

      const loadOrder =() => {
         axios.get('/api/profile/get')
        .then((response)=> {
           const data = response.data.profile;
            setFormData({
                name:data[0].name,
                email:data[0].email,
                companyName:data[0].companyName,
                companyFbLink:data[0].companyFbLink,
                address:data[0].address
            });
            console.log('data has been received');
        })
        .catch(err =>{
            console.log(err);
            console.log('data is not received')
        }) 
    }
    
        /****************************
* EVENT HANDLERS
***************************/
const handleChange = (evt) => {
    // console.log(evt);
    setFormData({
        ...formData,
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
        setFormData({
            ...formData,
            errorMsg: 'All fields are required',
        });
    } else if (!isEmail(email)) {
        setFormData({
            ...formData,
            errorMsg: 'Need valid email',
        });
    }
    else {
        const { name, email, companyFbLink, companyName, address } = formData;
        const payload = { name, email, companyFbLink, companyName, address };

        setFormData({ ...formData, loading: true });

        await axios({
            url: '/api/profile/update',
            method: 'POST',
            data: payload
        })
            .then((response) => {
                console.log('Axios profile success: ', response);
                setFormData({
                    name: name,
                    email: email,
                    companyName: companyName,
                    companyFbLink: companyFbLink,
                    address: address,
                    loading: false,
                    successMsg: response.data.successMessage,
                    post:[]
                });
                history.push('/viewprofile')
            })
            .catch((err) => {
                console.log('Axios profile error: ', err);
                setFormData({
                    ...formData,
                    loading: false,
                    errorMsg: err.response.data.errorMessage,
                });
            });

    }
}

    const showProfile = () => (
            <form onSubmit={handleSubmit}>
            <div class="contact-form row">
                <div class="form-field col-lg-6">
                    <input class="input-text" id="name" type="text" name="name"
                    value={name}
                    onChange={handleChange}
                    />
                    <label for="name" class="label">name</label>
                </div>
                <div class="form-field col-lg-6">
                    <input class="input-text" id="email" type="email" name="email"
                    value={email}
                    onChange={handleChange} 
                    />
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
                    onChange={handleChange} 
                    />
                    <label for="phone" class="label">Company Facebook Link</label>
                </div>
                <div class="form-field col-lg-12">
                    <input id="message" type="text" class="input-text" name="address"
                    value={address}
                    onChange={handleChange} 
                    />
                    <label for="phone" class="label">Address</label>
                </div>
                <div class="form-field col-lg-12">
                    <input type="submit" class="submit-btn" value="update" name="" />
                </div>

            </div>
        </form>

        )
    return (
        <>
            <div class="main-wrapper">
                <NavBackDash />
                <div class="site-content-wrapper">
                    <Topbar />
                    <NavTrigger />
                    <div class="site-content">
                        <div class='sidenav'>
                            <Sidenav />
                            <div className='page-content p-2' id='content'>
                                <div style={{ textAlign: 'center' }}>
                                    <a href='/' class="branding">
                                        <img src={Logo} alt="" />
                                    </a>
                                </div>
                                <section class="get_in_touch">
                                    <h1 class="title">
                                        Update your profile
                            </h1>
                                    {successMsg && showSuccessMsg(successMsg)}
                            {errorMsg && showErrorMsg(errorMsg)}
                            {loading && showLoading()}
                                    <div class="container">
                                        {showProfile()}
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UpdateProfile
