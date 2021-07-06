import React from 'react'
import axios from 'axios';
import Sidenav from '../sidenav';
import Logo from '../../image/logo.png';
import NavBackDash from '../navbackdash';
import NavTrigger from '../navTrigger';
import Topbar from '../topbar';
class Userdashbaord extends React.Component {

    state = {
        posts: []
    }

    componentDidMount = () => {
        this.loadOrder();
    }

       loadOrder =() => {
         axios.get('/api/order/get')
        .then((response)=> {
           const data = response.data.order;
           console.log(data);
            this.setState({posts:data});
            console.log('data has been received');
        })
        .catch(err =>{
            console.log(err);
            console.log('data is not received')
        }) 
    }
    showTable = (post) => { 
      if (!post.length) return null
      return post.map((orders,index) => (
      
          <tr key = {index}>
            <th scope="row"> {orders._id} </th>
            <td>{orders.name}</td>
            <td>{orders.address}</td>
            <td>{orders.phone}</td>
            <td>{orders.paymentType}</td>
            <td>{orders.money}</td>
            <td>{orders.status}</td>
          </tr>
          
        
      )) 
      }
    render(){
        return(
          <div class="main-wrapper">
            <NavBackDash />
            <div class="site-content-wrapper">
                <Topbar />
                <NavTrigger />
          <div class='sidenav'>
          <Sidenav />
          <div className='page-content' id='content'>
                                <div style={{textAlign:'center'}}>
                                    <a href='/' class="branding">
                                        <img src={Logo} alt="" />
                                    </a>
                                </div>
                            
    <div class="container mt-5">
    <h3 class="text-center mb-3">Order Status</h3>
    <div class="container-fluid table-responsive">
    <table class="table table-striped table-bordered table-hover">
        <thead>
          <tr class="bg-dark text-white">
            <th scope="col">Order Id</th>
            <th scope="col">Name</th>
            <th scope="col">Address</th>
            <th scope="col">Phone</th>
            <th scope="col">Payment Type</th>
            <th scope="col">Collection money</th>
            <th scope="col">Order Status</th>
          </tr>
        </thead>
        <tbody>
      {this.showTable(this.state.posts)}
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
}


export default Userdashbaord
