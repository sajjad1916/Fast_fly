import React from 'react'
import Logo from '../image/logo.png';
import Phone from '../icons/phone.svg';
import Clock from '../icons/clock.svg';
function MainNav() {
    return (
        <>
                        <nav>
                            <div class="top">
                                <div class="container d-flex justify-content-between">
                                    <div class="contact d-flex align-items-center">
                                        <img src={Phone} alt="" />
                                        <div>
                                            <h5>Call US: 017 888 48236</h5>
                                            <h6>E-mail : support@fastfly.com.bd</h6>
                                        </div>
                                    </div>
                                    <a href='/' class="branding">
                                        <img src={Logo} alt="" />
                                    </a>
                                    <div class="time d-flex align-items-center">
                                        <img src={Clock} alt="" />
                                        <div>
                                            <h5>Working Hours:</h5>
                                            <h6>Mon - Thurs (10.00am - 10.00pm)</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="navbar magic-shadow">
                                <div class="container d-flex justify-content-center">
                                    <a href="/" class="active">Home</a>
                                    <a href="#service">Service</a>
                                    <a href="#pricing">Pricing</a>
                                    <a href="#about">About Us</a>
                                    <a href="#contact">Contact us</a>
                                </div>
                            </div>
                        </nav>
        </>
    )
}

export default MainNav
