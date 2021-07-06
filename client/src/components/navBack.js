import React from 'react'
import Logo from '../image/logo.png';
import Phone from '../icons/phone.svg';
import Clock from '../icons/clock.svg';

function NavBack() {
    return (
        <div class="nav-background">
                    <a href='/' class="mobile-logo">
                        <img src={Logo} alt="" />
                    </a>
                    <div class="mobile-nav">
                        <div class="nav-top">
                            <ul>
                                <li>
                                    <a href="/">Home</a>
                                </li>
                                <li>
                                    <a href="#about">About us</a>
                                </li>
                                                              
                                <li>
                                    <a href="#service">Services</a>
                                </li>
                                <li>
                                    <a href="#contact">Contact us</a>
                                </li>
                               
                            </ul>
                        </div>
                        <div class="contact d-flex items-align-center">
                            <img src={Phone} alt="" />
                            <div>
                                <h5>Call us: 017 888 48236</h5>
                                <h6>E-mail : support@fastfly.com.bd</h6>
                            </div>
                        </div>
                        <div class="time d-flex items-align-center">
                            <img src={Clock} alt="" />
                            <div>
                                <h5>Working Hours:</h5>
                                <h6>Sat - Thurs (10.00am - 10.00pm)</h6>
                            </div>
                        </div>
                    </div>
                </div>
    )
}

export default NavBack
