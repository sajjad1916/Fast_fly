import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import isEmpty from 'validator/lib/isEmpty';
import equals from 'validator/lib/equals';
import isMobilePhone from 'validator/lib/isMobilePhone';
import { isAuthenticated, setAuthentication } from '../../helper/auth';
import { showLoading } from '../../helper/loading';
import { showErrorMsg, showSuccessMsg } from '../../helper/message';
import { signup } from '../../api/auth'
import firebase from './firebase';
import NavBack from '../navBack';
import NavTrigger from '../navTrigger';
import Topbar from '../topbar';
import MainNav from '../mainnav';
import Footer from './homepage/main/footer';
import {phoneCheck} from "../../api/auth"

const Signup = () => {
    let history = useHistory();
    useEffect(() => {
        if (isAuthenticated() && isAuthenticated().role === 1) {
            history.push('/admin');
        } else if (isAuthenticated() && isAuthenticated().role === 0) {
            history.push('/dashboard');
        }
    }, [history]);
    const [formData, setFormData] = useState({
        phone: '',
        password: '',
        password2: '',
        successMsg: false,
        errorMsg: false,
        loading: false,
    });
    const {
        phone,
        password,
        password2,
        successMsg,
        errorMsg,
        loading,
    } = formData;

    /****************************
     * EVENT HANDLERS
     ***************************/
    const handleChange = (evt) => {
        setFormData({
            ...formData,
            [evt.target.name]: evt.target.value,
            successMsg: '',
            errorMsg: '',
        });

    };

    const setUpRecaptcha = () => {
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
            'size': 'invisible',
            callback: (response) => {
                // reCAPTCHA solved, allow signInWithPhoneNumber.
                // onSignInSubmit();
                setFormData({ ...formData, loading: true });

            }
        });
    }
    const onSignInSubmit = () => {
        
        setFormData({ ...formData, loading: true });
        const { phone } = formData;
        const data1 = {phone};
        phoneCheck(data1)
        .then((response)=>{
            setUpRecaptcha();
        const phoneNumber = "+88" + phone;
        const appVerifier = window.recaptchaVerifier;
        firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
            .then((confirmationResult) => {
                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).
                window.confirmationResult = confirmationResult;
                const code = window.prompt('Enter your code', '');
                confirmationResult.confirm(code).then((result) => {
                    // User signed in successfully.
                    // const user = result.user;
                    console.log("user varified");
                    setFormData({ ...formData, successMsg: 'You are varified', loading: true });
                    const { phone, password } = formData;
                    const data = { phone, password };

                    setFormData({ ...formData, loading: true });

                    signup(data)
                        .then((response) => {
                            console.log('Axios signup success: ', response);
                            setFormData({
                                phone: '',
                                password: '',
                                password2: '',
                                loading: false,
                                successMsg: response.data.successMessage,
                            });
                            setAuthentication(response.data.token, response.data.user);
                            if (isAuthenticated() && isAuthenticated().role === 1) {
                                console.log('Redirecting to admin dashboard');
                                history.push('/admin');
                            } else {
                                console.log('Redirecting to user dashboard');
                                history.push('/profile');
                            }

                        })
                        .catch((err) => {
                            console.log('Axios signup error: ', err);
                            setFormData({
                                ...formData,
                                loading: false,
                                errorMsg: err.response.data.errorMessage,
                            });
                        });

                    // ...
                }).catch((error) => {
                    setFormData({
                        ...formData,
                        loading: false,
                        errorMsg: "code is not match",
                    });
                });
                // ...
            }).catch((error) => {
                console.log(error)
                setFormData({
                    ...formData,
                    loading: false,
                    errorMsg: "Please reload the page & add +88 before your number ",
                });
            });

        })
        .catch((err)=>{
            
            setFormData({ 
                ...formData,
                loading: false,
                errorMsg: err.response.data.errMessage,
            });
            
        })
        
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        // client-side validation
        if (
            isEmpty(phone) ||
            isEmpty(password) ||
            isEmpty(password2)
        ) {
            setFormData({
                ...formData,
                errorMsg: 'All fields are required',
            });
        } else if (!isMobilePhone(phone, ['bn-BD'])) {
            setFormData({
                ...formData,
                errorMsg: 'Need valid phone number',
            });
        }
        else if (!equals(password, password2)) {
            setFormData({
                ...formData,
                errorMsg: 'Passwords do not match',
            });
        }
        else {
            onSignInSubmit()

        }

    }
    return (
        <>
            <div class="main-wrapper">
                <NavBack />
                <div class="site-content-wrapper">
                    <Topbar />
                    <NavTrigger />
                    <div class="site-content">
                        <MainNav />
                        <div id='recaptcha-container'></div>
                        <div class="form">
                            <h1 class='title mt-3'>Create an Account</h1>
                            {successMsg && showSuccessMsg(successMsg)}
                            {errorMsg && showErrorMsg(errorMsg)}
                            {loading && showLoading()}
                            <div className="container mt-2">
                                <form onSubmit={handleSubmit}>

                                    <input
                                        className="input"
                                        type="text"
                                        name="phone"
                                        value={phone}
                                        placeholder="Phone No: (01*********)"
                                        onChange={handleChange}
                                    />


                                    <input
                                        className="input"
                                        type="password"
                                        name="password"
                                        value={password}
                                        placeholder="Password"
                                        onChange={handleChange}
                                    />


                                    <input
                                        className="input"
                                        type="password"
                                        name="password2"
                                        value={password2}
                                        placeholder="Confirm Password"
                                        onChange={handleChange}
                                    />

                                    <button class='btn btn-outline-danger' type="submit">Register</button>
                                    <p class="message">Want to Login <a href="/signin">Login</a></p>

                                </form>
                            </div>
                        </div>
                        <Footer />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signup;
