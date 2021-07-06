import React from 'react'
import Facebook from '../../../../icons/facebook.svg';
import GooglePlay from '../../../../image/googleplay.png';
function Footer() {
    return (
        <>
            <footer>
                            <div class="container">
                                <div class="box">
                                    <h3>About us</h3>
                                    <p>Fast Fly Bangladesh aims to aid the expanding e-commerce sector of Bangladesh by providing tech-first logistics support. With exclusive features and a talented workforce, Fast Fly set to give the Delivery Service industry of Bangladesh a brand new pace.</p>
                                    <button class="btn btn-danger">Read More</button>
                                </div>
                                <div class="box">
                                    <h3>Quik Links</h3>
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
                                <div class="box">
                                    <h3>Follow Us</h3>
                                    <div>
                                        <ul>
                                            <li>
                                                <a href="https://www.facebook.com/fastdeliverybd" target='_blank'>
                                                    <img src={Facebook} alt="" />
                                                    <span>Facebook</span>
                                                </a>
                                            </li>
                                             <li>
                                                <a href="https://play.google.com/store/apps/details?id=com.xplore24.courier" target="_blank">
                                                <span style={{marginTop:"20px",marginLeft:"10px"}}>Download our app</span>
                                                <img src={GooglePlay} alt="" style={{width:"180px",display:"block"}}/>
                                                    
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </footer>
                        <footer class="copyright" style={{color:"#fff"}}>
                            <div>
                              <p>Copyright © 2020 .All rights reserved by <a href="https://www.facebook.com/mdsajjadhasan.talha" target='_blank'>Fastfly</a>.
                              </p></div>
                        </footer> 
        </>
    )
}

export default Footer
