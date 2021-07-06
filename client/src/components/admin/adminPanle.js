import React,{useState,useEffect} from 'react'
import axios from 'axios';
import Sidenav from '../sidenav';
import Logo from '../../image/logo.png';
import NavBackDash from '../navbackdash';
import NavTrigger from '../navTrigger';
import Topbar from '../topbar';
import { delivery, options } from '../../api/order'

const AdminPanle = () => {
    const [formData,setFormData]=useState({
        allOrder:[],
        requestedOrder:[],
        placedOrder:[],
        pickedOrder:[],
        deliveredOrder:[],
        completedOrder:[],
        canceledOrder:[]

    });
    
    const {allOrder} = formData;

    useEffect(()=>{
        loadOrder();
    },[]);

      const loadOrder =() => {
         axios.get('/api/order/orders')
        .then((response)=> {
           const data = response.data.order;
            setFormData({allOrder:data});
            
        })
        .catch(err =>{
            }) 
    }
    return (
        <div class="main-wrapper">
            <NavBackDash />
            <div class="site-content-wrapper">
                <Topbar />
                <NavTrigger />
                <div class='sidenav'>
                    <Sidenav />
                    <div className='page-content'>
                        <div className='text-center d-flex align-items-center justify-content-center mt-2'>
                            <a href='/' class="branding">
                                <img src={Logo} alt="" />
                            </a>
                        </div>
                        <div className='container'>
                            <div className="d-flex justify-content-between align-items-center m-5"> 
                            <a href='/admin' class="btn btn-primary fs-5">
                                All 's Order <span class="badge bg-danger fs-6"> {allOrder.length} </span>
                            </a> 
                            <a href='/admin' class="btn btn-secondary fs-5">
                               Requested Order  <span class="badge bg-danger fs-6"> 1 </span>
                            </a> 
                            <a href='/admin' class="btn btn-warning">
                                Placed Order <span class="badge bg-danger fs-6"> 1 </span>
                            </a> 
                           
                            </div>  
                            <div className="d-flex justify-content-between align-items-center m-5"> 
                            <a href='/admin' class="btn btn-info fs-5">
                                Picked Order <span class="badge bg-danger fs-6"> 1 </span>
                            </a> 
                            <a href='/admin' class="btn btn-secondary fs-5">
                                Delivered Complete <span class="badge bg-danger fs-6"> 1 </span>
                            </a> 
                            <a href='/admin' class="btn btn-primary fs-5">
                                Payment Completed <span class="badge bg-danger fs-6"> 1 </span>
                            </a>  
                            </div>
                            <div className="d-flex justify-content-between align-items-center m-5"> 
                            <a href='/admin' class="btn btn-danger fs-5">
                                Order Canceled <span class="badge bg-primary fs-6"> 1 </span>
                            </a> 
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminPanle
