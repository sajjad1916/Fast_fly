import React, { useState,useEffect } from 'react'
import Sidenav from '../sidenav';
import Logo from '../../image/logo.png';
import NavTrigger from '../navTrigger';
import Topbar from '../topbar';
import isEmpty from 'validator/lib/isEmpty';
import isMobilePhone from 'validator/lib/isMobilePhone';
import { showLoading } from '../../helper/loading';
import { showSuccessMsg, showErrorMsg } from '../../helper/message';
import { order } from '../../api/order';
import NavBackDash from '../navbackdash';
import axios from 'axios';
const Order = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: '',
        pickupAddress:'',
        merchentPhone:'',
        money: '',
        deliveryCharge: '',
        deliveryArea: '',
        refferenceID: '',
        merchentName:'',
        companyName:"",
        deliveryStatus: '',
        successMsg: false,
        errorMsg: false,
        loading: false,
    });
    const {
        name, phone, address, money,pickupAddress, merchentPhone,successMsg, errorMsg, loading, deliveryCharge, deliveryArea, deliveryStatus, refferenceID,merchentName,companyName,
    } = formData;


    useEffect(()=>{
        loadOrder();
    },[]);

      const loadOrder =() => {
         axios.get('/api/profile/get')
        .then((response)=> {
           const data = response.data.profile;
            setFormData({
                pickupAddress:data[0].address,
                merchentPhone:data[0].phone,
                  merchentName:data[0].name,
                companyName:data[0].companyName,
            });
            console.log('data has been received');
        })
        .catch(err =>{
            console.log(err);
            console.log('data is not received')
        }) 
    }


    const handleChange = (evt) => {
        setFormData({
            ...formData,
            [evt.target.name]: evt.target.value,
            successMsg: '',
            errorMsg: '',
        });
    };
    const handleSubmit = (evt) => {
        evt.preventDefault();

        // client-side validation
        if (
            isEmpty(name) ||
            isEmpty(phone) ||
            isEmpty(address) ||
            isEmpty(money) ||
            isEmpty(refferenceID) ||
            isEmpty(pickupAddress) ||
            isEmpty(merchentPhone)||
            isEmpty(deliveryCharge) ||
            isEmpty(deliveryArea)||
            isEmpty(deliveryStatus)
        ) {
            setFormData({
                ...formData,
                errorMsg: 'All fields are required',
            });
        } else if (!isMobilePhone(phone, ["bn-BD"])) {
            setFormData({
                ...formData,
                errorMsg: 'Need valid phone-Number',
            });
        }
        else {
            const { name, phone, address, money, deliveryCharge,refferenceID,merchentPhone,pickupAddress,merchentName,companyName, } = formData;
            const data = { name, phone, address, money, deliveryCharge,refferenceID,merchentPhone,pickupAddress,merchentName,companyName, };

            setFormData({ ...formData, loading: true });

            order(data)
                .then((response) => {
                    console.log('Axios profile success: ', response);
                    setFormData({
                        name: '',
                        phone: '',
                        address: '',
                        money: '',
                        deliveryArea:'',
                        deliveryCharge:'',
                        deliveryStatus:'',
                        refferenceID:'',
                        loading: false,
                        successMsg: response.data.successMessage,
                    });
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
    const showOrder = () => (
        <section class="get_in_touch">
            <h1 class="title">
                Order Now
        </h1>
            <div class="container">

                {successMsg && showSuccessMsg(successMsg)}
                {errorMsg && showErrorMsg(errorMsg)}
                {loading && showLoading()}
                <form onSubmit={handleSubmit}>
                    <div class="contact-form row">
                        <div class="form-field col-lg-12">
                            <input class="input-text" type="text" name="pickupAddress" value={pickupAddress} onChange={handleChange} />
                            <label class="label">Pickup Address</label>
                        </div>
                        <div class="form-field col-lg-6">
                            <input class="input-text" type="text" name="merchentPhone" value={merchentPhone} onChange={handleChange} />
                            <label class="label">Merchent Phone Number</label>
                        </div>
                        <div class="form-field col-lg-6">
                            <input class="input-text" value={name} onChange={handleChange} type="text" name="name" />
                            <label class="label">Customer Name</label>
                        </div>
                        <div class="form-field col-lg-6">
                            <input class="input-text" type="text" name="phone" value={phone} onChange={handleChange} />
                            <label class="label">Customer Phone Number</label>
                        </div>
                        <div className="form-field col-lg-12">
                            <label class='label'> Delivery Area </label>
                            <select
                                value={deliveryArea}
                                onChange={(e) => {
                                    const DeliveryArea = e.target.value;
                                    setFormData({
                                        ...formData,
                                        deliveryCharge: '',
                                        money: "",
                                        deliveryArea: DeliveryArea
                                    })
                                }}>
                                <option>Choose One</option>
                                <option value="inside">Inside City</option>
                                <option value="outside">Outside City</option>
                            </select>
                        </div>
                        <div class="form-field col-lg-12">
                            <input type="text" class="input-text" name="address" value={address} onChange={handleChange} />
                            <label class="label">Delivery Address</label>
                        </div>
                        <div class="form-field col-lg-6">
                            <input type="text" class="input-text"
                                placeholder="any group of unique number or letter" name="refferenceID" value={refferenceID} onChange={handleChange} />
                            <label class="label">Refference Number</label>
                        </div>
                        {
                            formData.deliveryArea == 'inside' ?
                                <>
                                    <div className="form-field col-lg-12">
                                        <label class='label'> Delivery Status </label>
                                        <select
                                            value={deliveryStatus}
                                            onChange={(e) => {
                                                const DeliveryStatus = e.target.value;
                                                setFormData({
                                                    ...formData,
                                                    deliveryCharge: '',
                                                    money: '',
                                                    deliveryStatus: DeliveryStatus
                                                })
                                            }}
                                        >

                                            <option>Choose One</option>
                                            <option value="0">Only Delivery (All Paid)</option>
                                            <option value="1">Delivery Charge + Collection money</option>
                                            <option value="2">Delivery Charge (Unpaid)</option>
                                        </select>
                                    </div>
                                    
                                    {

                                        formData.deliveryStatus == '0' ?
                                            <>
                                                <div class="form-field col-lg-6">
                                                    <label class="label">Product Weight</label>
                                                    <select style={{ width: '100%', marginTop: '25px' }}
                                                        typeof='text'
                                                        value={deliveryCharge}
                                                        onChange={(e) => {
                                                            const Delivery = e.target.value;
                                                            setFormData({
                                                                ...formData,
                                                                deliveryCharge: '',
                                                                money: '',
                                                                deliveryCharge: Delivery
                                                            })
                                                        }}
                                                    >
                                                        <option>Choose One</option>
                                                        <option value='0'>0 to 1kg</option>
                                                        <option value='0'>1 to 2kg</option>
                                                        <option value='0'>2 to 3kg</option>
                                                        <option value='0'>3 to 4kg</option>
                                                        <option value='0'>4 to 5kg</option>
                                                    </select>

                                                </div>
                                                <div class="form-field col-lg-12">
                                                    <input class="input-text" type="text" name="money" value={formData.money = '0'} />
                                                    <label class="label"> Product Price</label>
                                                </div>
                                                <div class="form-field col-lg-12">
                                                    <label class="label"  >Delivery Charge = {deliveryCharge}</label>
                                                </div>
                                                <div class="form-field col-lg-12">
                                                    <label class="label">
                                                        Total Charge = {money} + {deliveryCharge}
                                                    </label>
                                                </div>

                                            </>
                                            : null
                                    }
                                    {

                                        formData.deliveryStatus == '1' ?
                                            <>
                                                <div class="form-field col-lg-6">
                                                    <label class="label">Product Weight</label>
                                                    <select style={{ width: '100%', marginTop: '25px' }}
                                                        typeof='text'
                                                        value={deliveryCharge}
                                                        onChange={(e) => {
                                                            const Delivery = e.target.value;
                                                            setFormData({
                                                                ...formData,
                                                                deliveryCharge: '',
                                                                money: '',
                                                                deliveryCharge: Delivery
                                                            })
                                                        }}
                                                    >
                                                        <option>Choose One</option>
                                                        <option value='50'>0 to 1kg</option>
                                                        <option value='65'>1 to 2kg</option>
                                                        <option value='80'>2 to 3kg</option>
                                                        <option value='100'>3 to 4kg</option>
                                                        <option value='120'>4 to 5kg</option>
                                                    </select>

                                                </div>

                                                <div class="form-field col-lg-12">
                                                    <input class="input-text" type="text" name="money" value={money} onChange={handleChange} />
                                                    <label class="label"> Product Price</label>
                                                </div>
                                                <div class="form-field col-lg-12">
                                                    <label class="label">Delivery Charge = {deliveryCharge}</label>
                                                </div>
                                                <div class="form-field col-lg-12">
                                                    <label class="label">
                                                        Total Charge = {money} + {deliveryCharge}
                                                    </label>
                                                </div>
                                            </>
                                            :null
                                            }
                                    {
                                     formData.deliveryStatus == '2' ?
                                   <>
                                    <div class="form-field col-lg-6">
                                        <label class="label">Product Weight</label>
                                        <select style={{ width: '100%', marginTop: '25px' }}
                                            typeof='text'
                                            value={deliveryCharge}
                                            onChange={(e) => {
                                                const Delivery = e.target.value;
                                                setFormData({
                                                    ...formData,
                                                    deliveryCharge: '',
                                                    money: '',
                                                    deliveryCharge: Delivery
                                                })
                                            }}
                                        >
                                            <option>Choose One</option>
                                            <option value='50'>0 to 1kg</option>
                                            <option value='65'>1 to 2kg</option>
                                            <option value='80'>2 to 3kg</option>
                                            <option value='100'>3 to 4kg</option>
                                            <option value='120'>4 to 5kg</option>
                                        </select>

                                    </div>

                                    <div class="form-field col-lg-12">
                                        <input class="input-text" type="text" name="money" value={formData.money = '0'} onChange={handleChange} />
                                        <label class="label"> Product Price</label>
                                    </div>
                                    <div class="form-field col-lg-12">
                                        <label class="label">Delivery Charge = {deliveryCharge}</label>
                                    </div>
                                    <div class="form-field col-lg-12">
                                        <label class="label">
                                            Total Charge = {money} + {deliveryCharge}
                                        </label>
                                    </div>
                                </>
                                :
                                null
                               }

                               </>:null

                        }
                        
                        {
                            formData.deliveryArea == 'outside' ?
                                <>
                                    <div className="form-field col-lg-12">
                                        <label class='label'> Delivery Status </label>
                                        <select
                                            value={deliveryStatus}
                                            onChange={(e) => {
                                                const DeliveryStatus = e.target.value;
                                                setFormData({
                                                    ...formData,
                                                    deliveryCharge: '',
                                                    money: '',
                                                    deliveryStatus: DeliveryStatus
                                                })
                                            }}
                                        >

                                            <option>Choose One</option>
                                            <option value="0">Only Delivery (All Paid)</option>
                                            <option value="1">Delivery Charge + Collection money</option>
                                            <option value="2">Delivery Charge (Unpaid)</option>
                                        </select>
                                    </div>
                                    {

                                        formData.deliveryStatus == '0' ?
                                            <>


                                                <div class="form-field col-lg-6">
                                                    <label class="label">Product Weight</label>
                                                    <select style={{ width: '100%', marginTop: '25px' }}
                                                        typeof='text'
                                                        value={deliveryCharge}
                                                        onChange={(e) => {
                                                            const Delivery = e.target.value;
                                                            setFormData({
                                                                ...formData,
                                                                deliveryCharge: '',
                                                                money: '',
                                                                deliveryCharge: Delivery
                                                            })
                                                        }}
                                                    >
                                                        <option>Choose One</option>
                                                        <option value='0'>0 to 1kg</option>
                                                        <option value='0'>1 to 2kg</option>
                                                        <option value='0'>2 to 3kg</option>
                                                        <option value='0'>3 to 4kg</option>
                                                        <option value='0'>4 to 5kg</option>
                                                    </select>

                                                </div>
                                                <div class="form-field col-lg-12">
                                                    <input class="input-text" type="text" name="money" value={formData.money = '0'} />
                                                    <label class="label"> Product Price</label>
                                                </div>
                                                <div class="form-field col-lg-12">
                                                    <label class="label"  >Delivery Charge = {deliveryCharge}</label>
                                                </div>
                                                <div class="form-field col-lg-12">
                                                    <label class="label">
                                                        Total Charge = {money} + {deliveryCharge}
                                                    </label>
                                                </div>

                                            </>
                                            : null
                                    }
                                    {

                                        formData.deliveryStatus == '1' ?
                                            <>
                                                <div class="form-field col-lg-6">
                                                    <label class="label">Product Weight</label>
                                                    <select style={{ width: '100%', marginTop: '25px' }}
                                                        typeof='text'
                                                        value={deliveryCharge}
                                                        onChange={(e) => {
                                                            const Delivery = e.target.value;
                                                            setFormData({
                                                                ...formData,
                                                                deliveryCharge: '',
                                                                money: '',
                                                                deliveryCharge: Delivery
                                                            })
                                                        }}
                                                    >
                                                        <option>Choose One</option>
                                                        <option value='100'>0 to 1kg</option>
                                                        <option value='110'>1 to 2kg</option>
                                                        <option value='120'>2 to 3kg</option>
                                                        <option value='135'>3 to 4kg</option>
                                                        <option value='150'>4 to 5kg</option>
                                                    </select>

                                                </div>

                                                <div class="form-field col-lg-12">
                                                    <input class="input-text" type="text" name="money" value={money} onChange={handleChange} />
                                                    <label class="label"> Product Price</label>
                                                </div>
                                                <div class="form-field col-lg-12">
                                                    <label class="label">Delivery Charge = {deliveryCharge}</label>
                                                </div>
                                                <div class="form-field col-lg-12">
                                                    <label class="label">
                                                        Total Charge = {money} + {deliveryCharge}
                                                    </label>
                                                </div>
                                            </>
                                            : null
                                    }
                                    {
                            formData.deliveryStatus == '2' ?
                                <>
                                    <div class="form-field col-lg-6">
                                        <label class="label">Product Weight</label>
                                        <select style={{ width: '100%', marginTop: '25px' }}
                                            typeof='text'
                                            value={deliveryCharge}
                                            onChange={(e) => {
                                                const Delivery = e.target.value;
                                                setFormData({
                                                    ...formData,
                                                    deliveryCharge: '',
                                                    money: '',
                                                    deliveryCharge: Delivery
                                                })
                                            }}
                                        >
                                            <option>Choose One</option>
                                            <option value='100'>0 to 1kg</option>
                                            <option value='110'>1 to 2kg</option>
                                            <option value='120'>2 to 3kg</option>
                                            <option value='135'>3 to 4kg</option>
                                            <option value='150'>4 to 5kg</option>
                                        </select>

                                    </div>

                                    <div class="form-field col-lg-12">
                                        <input class="input-text" type="text" name="money" value={formData.money = '0'} onChange={handleChange} />
                                        <label class="label"> Product Price</label>
                                    </div>
                                    <div class="form-field col-lg-12">
                                        <label class="label">Delivery Charge = {deliveryCharge}</label>
                                    </div>
                                    <div class="form-field col-lg-12">
                                        <label class="label">
                                            Total Charge = {money} + {deliveryCharge}
                                        </label>
                                    </div>
                                </>
                                :
                                null

                        }

                                </>

                                :
                                null

                        }
                        



                        <div class="form-field col-lg-12">
                            <button class='submit-btn'>Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    )
    return (
        <div class="main-wrapper">
            <NavBackDash />
            <div class="site-content-wrapper">
                <Topbar />
                <NavTrigger />
                <div class="site-content">
                    <div class='sidenav'>
                        <Sidenav />
                        <div className='page-content' id='content'>
                            <div style={{ textAlign: 'center' }}>
                                <a href='/' class="branding">
                                    <img src={Logo} alt="" />
                                </a>
                            </div>
                            {showOrder()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Order
