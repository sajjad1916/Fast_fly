import React from 'react';
import FastlfyMain from '../../../../image/fastflymain.gif'
function Main() {
    return (
        <section class="about  py-5">
                            <div class="row align-items-center container my-5 mx-auto">
                                <div class="text col-lg-6 col-md-6 col-12 pb-5">
                                    <h6>WELCOME TO FASTFLY</h6>
                                    <h2>YOUR PRODUCT, OUR <span class="text-warning"> SUPER FAST</span> DELIVERY</h2>
                                    <p>Fast Fly Bangladesh aims to aid the expanding e-commerce sector of Bangladesh by providing tech-first logistics support.</p>
                                    <a href="https://www.facebook.com/fastdeliverybd" target='_blank' className="bg-danger" >Join with Us</a>
                                </div>
                                <div class="img col-lg-6 col-md-6 col-12  pb-5">
                                    <img src={FastlfyMain} alt="" class="img-fluid" />
                                </div>
                            </div>
                        </section>
    )
}

export default Main
