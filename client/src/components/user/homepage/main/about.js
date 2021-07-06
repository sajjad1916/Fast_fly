import React from 'react'
import Video from '../../../../image/1.mp4';

function About() {
    return (
    <section class="about py-5" id='about'>
    <h1 class="section-heading">About Us</h1>
    <div class="row align-items-center containers my-5 mx-auto">
        <div class="text col-lg-6 col-md-6 col-12 w-50 pb-5">
            <h6>We are here to help you</h6>
            <h2>We deliver your product with secure and safe.</h2>
            <p>Fast Fly Bangladesh aims to aid the expanding e-commerce sector of Bangladesh by providing tech-first logistics support. With exclusive features and a talented workforce, Fast Fly set to give the Delivery Service industry of Bangladesh a brand new pace.</p>
            {/* <a href="#">Learn more</a> */}
        </div>
        <div class="video col-lg-6 col-md-6 col-12">
            <video  className='embed-responsive' autoPlay loop muted width='650px' height='450px'>
                <source src={Video} type='video/mp4' />
            </video>
        </div>
    </div>
</section>
    )
}

export default About
