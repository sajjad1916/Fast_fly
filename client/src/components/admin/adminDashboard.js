import React,{useState,useEffect} from 'react'
import axios from 'axios';
import Sidenav from '../sidenav';
import Logo from '../../image/logo.png';
import NavBackDash from '../navbackdash';
import NavTrigger from '../navTrigger';
import Topbar from '../topbar';
import {delivery,options} from '../../api/order'
const  Admindashbaord =()=> {

    const [formData,setFormData]=useState({
        post:[]
    });
    const [optionData, setOptionData] = useState({
        status:'',
        orderId :''
    })
    const [deliveryData, setDeliveryData] = useState({
        deliveryBoy:'',
        orderId :''
    })
    
    const {post} = formData;

    useEffect(()=>{
        loadOrder();
    },[]);

      const loadOrder =() => {
         axios.get('/api/order/orders')
        .then((response)=> {
           const data = response.data.order;
            setFormData({post:data});
            console.log('data has been received');
        })
        .catch(err =>{
            console.log(err);
            console.log('data is not received')
        }) 
    }
    const showTable = (post) => { 
      if (!post.length) return null
      return post.map((orders,index) => (
      
          <tr key = {index}>
            <th scope="row"> {orders._id} </th>
            <td>{orders.name}</td>
            <td>{orders.address}</td>
            <td>{orders.phone}</td>
            <td>{orders.merchentName}</td>
            <td>{orders.merchentPhone}</td>
            <td>{orders.pickupAddress}</td>
            <td>{orders.money}</td>
            <td>{orders.status}</td>
            <td>
                <form onSubmit= {(evt) => {
                     evt.preventDefault();
                     const {status} = optionData;
                     const optionDatas = {status, userId: orders._id};
                     
                     options(optionDatas) 
                         .then((response) => {
                             console.log('Axios profile success: ', response);
                             setOptionData({
                                 status:'',
                             });
                     }).catch((err)=>{
                         console.log(err);
                     })
                 }}>
                     
                     <label for="status">Order Status:</label>
                  <select id="status" name="status" 
                  onChange={(e) => {setOptionData({[e.target.name]: e.target.value})}}
                  >
                      <option value="Order Requested"> {orders.status === 'Order Requested' ? '^' : ''} Order Requested</option>
                      <option value="Order Placed"> {orders.status === 'Order Placed' ? '^' : ''} Order Placed</option>
                      <option value="Order Picked">{orders.status === 'Order Picked' ? '^' : ''} picked</option>
                      <option value="Order Delivered">{orders.status === 'Order Delivered' ? '^' : ''} Order Delivered</option>
                      <option value="Payment Completed">{orders.status === 'Payment Completed' ? '^' : ''} completed</option>
                      <option value="Order Canceled">{orders.status === 'Order Canceled' ? '^' : ''} canceled</option>
                  </select>
                  <input type='submit' placeholder="submit" />
                 </form>
 
                </td>
            <td> 
            <form onSubmit= {(evt) => {
                     evt.preventDefault();
                     const {deliveryBoy} = deliveryData;
                     const optionDatas = {deliveryBoy, userId: orders._id};
                     
                     delivery(optionDatas) 
                         .then((response) => {
                             console.log('Axios profile success: ', response);
                             setDeliveryData({
                                 deliveryBoy:'',
                             });
                     }).catch((err)=>{
                         console.log(err);
                     })
                 }}>
                     
                     <label for="status">Delivery: </label>
                  <select id="deliveryBoy" name="deliveryBoy" 
                  onChange={(e) => {setDeliveryData({[e.target.name]: e.target.value})}}
                  >
                      <option value="0"> {orders.deliveryBoy == '0' ? '^' : ''} Boy 1</option>
                      <option value="1">{orders.deliveryBoy == '1' ? '^' : ''} Boy 2</option>
                      <option value="2">{orders.deliveryBoy == '2' ? '^' : ''} Boy 3</option>
                      <option value="3">{orders.deliveryBoy == '3' ? '^' : ''} Boy 4</option>
                      <option value="4">{orders.deliveryBoy == '4' ? '^' : ''} Boy 5</option>
                  </select>
                  <input type='submit' placeholder="submit" />
                 </form>
                  </td>
          </tr>
          
        
      )) 
      }
    
        return(
            <div class="main-wrapper">
                <NavBackDash />
                <div class="site-content-wrapper">
                    <Topbar />
                    <NavTrigger />
                    <div class='sidenav'>
                        {/* <Sidenav /> */}
                        <div className='' id=''>
                            <div style={{ textAlign: 'center' }}>
                                <a href='/' class="branding">
                                    <img src={Logo} alt="" />
                                </a>
                            </div>

                            <div class="mt-5">
                                <h3 class="text-center mb-3">Welcome to Admin Dashboard</h3>
                                <div class="table-responsive">
                                    <table class="table table-striped table-bordered table-hover">
                                        <thead>
                                            <tr class="bg-dark text-white">
                                                <th scope="col">Order Id</th>
                                                <th scope="col">Customer Name</th>
                                                <th scope="col">Delivery Address</th>
                                                <th scope="col">Customer Phone</th>

                                                <th scope="col">MerchentName</th>
                                                <th scope="col">Merchent Phone</th>
                                                <th scope="col">Pickup Address</th>
            
                                                <th scope="col">Collection money</th>
                                                <th scope="col">Order Status</th>
                                                <th scope="col">Update Option</th>
                                                <th scope="col">Delivery Boy</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {showTable(post)}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }



export default Admindashbaord
