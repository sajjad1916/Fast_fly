import React from 'react';
import fifty from '../../../../image/price1.gif'
import sixtyfive from '../../../../image/price2.gif'
import eighty from '../../../../image/price3.gif'
import hundred from '../../../../image/price4.gif'
import hundredtwenty from '../../../../image/price5.gif'
import pre from '../../../../icons/pre.svg';
import next from '../../../../icons/next.svg';
function Pricing() {
    return (
        <section class="top-products" id='pricing'>
                         <div class="containers">
                        <h1 class="section-heading">Our Pricing</h1>
                        <div class="slider">
                            <button class="slider-btn prev-btn"><img src={pre} alt="" /></button>
                            <button class="slider-btn next-btn"><img src={next} alt="" /></button>
                            <div class="food-slider">
                                <div class="food-card magic-shadow-sm">
                                    <div class="product-image flex items-center justify-center">
                                        <img src={fifty} alt="" />
                                    </div>
                                    <hr />
                                    <div>
                                        <h2 class="text-center">Inside Dhaka</h2>
                                        
                                        {/* <div class="price text-center">
                                            $ 1.25
                                        </div> */}
                                        <div class="d-flex justify-content-center">
                                            <button className="btn btn-danger">
                                                Order Now
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div class="food-card magic-shadow-sm">
                                    <div class="product-image flex items-center justify-center">
                                        <img src={sixtyfive} alt="" />
                                    </div>
                                    <hr />
                                    <div>
                                        <h2 class="text-center">Inside Dhaka</h2>
                                        
                                        <div class="d-flex justify-content-center">
                                            <button className="btn btn-danger">
                                                Order Now
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div class="food-card magic-shadow-sm">
                                    <div class="product-image flex items-center justify-center">
                                        <img src={eighty} alt="" />
                                    </div>
                                    <hr />
                                    <div>
                                        <h2 class="text-center">Inside Dhaka</h2>
                                        <div class="d-flex justify-content-center">
                                            <button className="btn btn-danger">
                                                Order Now
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div class="food-card magic-shadow-sm">
                                    <div class="product-image flex items-center justify-center">
                                        <img src={hundred} alt="" />
                                    </div>
                                    <hr />
                                    <div>
                                        <h2 class="text-center">Inside Dhaka</h2>
                                        
                                        <div class="d-flex justify-content-center">
                                            <button className="btn btn-danger">
                                                Order Now
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div class="food-card magic-shadow-sm">
                                    <div class="product-image flex items-center justify-center">
                                        <img src={hundredtwenty} alt="" />
                                    </div>
                                    <hr />
                                    <div>
                                        <h2 class="text-center">Inside Dhaka</h2>
                                        <div class="d-flex justify-content-center">
                                            <button className="btn btn-danger">
                                                Order Now
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <div class="text-center btn-wrapper">
                            <button class="btn btn-secondary">View More</button>
                        </div> */}
                    </div>
                </section>
    )
}

export default Pricing
