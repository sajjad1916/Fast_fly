import React from 'react';
import Service1 from '../../../../image/service1.png';
import Service2 from '../../../../image/service2.png';
import Service3 from '../../../../image/service3.png';
function Service() {
    return (
        <section class="service  py-1" id='service'>
                            <div class="col mx-auto align-items-center my-2" >
                                <div class="heading text-center pt-5">
                                    <h2 class='font-weight-bold text-dark section-heading'>Our Service</h2>
                                </div>
                                <div class="row mx-auto justify-content-center align-items-center text-center container">
                                    <div class="one col-lg-3 col-md-3 col-12  w-25% m-2">
                                        <img class="img-fluid w-75" src={Service1} alt="" />
                                        <h5 class="font-weight-bold pt-4">Best COD rates</h5>
                                        <p>We deliver your product safely with 0% COD allover Dhaka!</p>
                                    </div>
                                    <div class="one col-lg-3 col-md-3 col-12  w-25% m-2">
                                        <img class="img-fluid w-75" src={Service2} alt="" />
                                        <h5 class="font-weight-bold pt-4">Fastest delivery</h5>
                                        <p>Get your parcel deliver to your doorstep within 24 hours!</p>
                                    </div>
                                    <div class="one col-lg-3 col-md-3 col-12  w-25% m-2">
                                        <img class="img-fluid w-75" src={Service3} alt="" />
                                        <h5 class="font-weight-bold pt-4">Doorstep pickup and delivery</h5>
                                        <p>Collect product from client home and deliver it to customer door!</p>
                                    </div>
                                </div>
                            </div>
                        </section>
                       
    )
}

export default Service
