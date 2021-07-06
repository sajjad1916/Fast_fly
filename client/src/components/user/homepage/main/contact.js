import React from 'react'
import Clock2 from '../../../../icons/clock-2.svg';
import Bag2 from '../../../../icons/bag-2.svg';
import Phone2 from '../../../../icons/phone-2.svg';
function Contact() {
    return (
        <section class="row contact-us d-flex" id='contact'>
                            <div class="col-lg-6 col-md-6 col-sm-12 contact-info-wrapper p-3" >
                                <h1 class="section-heading">Contact us</h1>
                                <div class="contact-info">
                                    <div>
                                        <div>
                                            <img src={Phone2} alt="" />
                                            <div>
                                                <span>Call us:</span>
                                                <span>017 888 48236</span>
                                            </div>
                                        </div>
                                        <div>
                                            <img src={Bag2} alt="" />
                                            <div>
                                                <span>E-mail ::</span>
                                                <span>support@fastfly.com.bd</span>
                                            </div>
                                        </div>
                                        <div>
                                            <img src={Clock2} alt="" />
                                            <div>
                                                <span>Working Hours:</span>
                                                <span>Sat - Fri (10.00am - 10.00pm)</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="map col-lg-6 col-md-6 col-12">
                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7302.44407413808!2d90.4059129729364!3d23.77510640666784!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7711041fe49%3A0x6724a7f9669fcc9e!2sNiketan%20Housing%20Project%2C%20Dhaka%201212!5e0!3m2!1sen!2sbd!4v1612196125251!5m2!1sen!2sbd"
                                    width="100%" height="100%" frameborder="0" style={{ border: 0 }} allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
                            </div>
                        </section>
    )
}

export default Contact
