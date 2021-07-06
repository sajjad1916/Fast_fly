import React,{useState} from 'react';
import {showLoading} from '../../helper/loading';
import {showSuccessMsg, showErrorMsg} from '../../helper/message';
import {trackid} from '../../api/id';
import Logo from '../../image/logo.png';
import NavBack from '../navBack';
import NavTrigger from '../navTrigger';
import Topbar from '../topbar';
import Sidenav from '../sidenav';
import NavBackDash from '../navbackdash';

const Trackid = () => {
    const [formData, setFormData] = useState({
        id: '',
        successMsg:false,
        errorMsg: false,
        loading:false,
    });
    const {id, successMsg, errorMsg, loading} = formData; 

    const handleChange = (evt) => {
        //console.log(evt);
        setFormData({
            ...formData,
            [evt.target.name]: evt.target.value,
            successMsg: '',
            errorMsg: '',
        });
    };
    
    const handleSubmit = (evt) => {
        evt.preventDefault();
         
            const { id} = formData;
            const data = {  id };

            setFormData({ ...formData, loading: true });

            trackid(data)
            .then((response) => {
                alert('Your order ' + response.data.order.status);
                console.log('Axios profile success: ', response);
                setFormData({
                    id: '',
                    loading: false,
                    successMsg: response.data.successMessage,
                });
            //   history.push('/signin');
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
    
    const showTrackid = () => (
        <div class="main-wrapper">
        <NavBackDash />
        <div class="site-content-wrapper">
            <Topbar />
            <NavTrigger />
            <div class="site-content">
                <div class='sidenav'>
                    <Sidenav />
                    <div className='page-content p-2' id='content'>
                    <div style={{textAlign:'center'}}>
                                <a href='/' class="branding">
                                    <img src={Logo} alt="" />
                                </a>
                            </div>
  <div class="container mt-5">
        <div className='container-fluid'>
        <h1 style={{textAlign:'center', margin:'20px',padding: '20px', color: 'black' }}>
        Need Help? please contact at <span style={{color: 'red'}}>01963629753</span></h1>
        <div className='formprofile' style={{margin: '0px auto'}}>
            <h2>Track your id</h2>
                 {successMsg && showSuccessMsg(successMsg)}
                 {errorMsg && showErrorMsg(errorMsg)}
                 {loading && showLoading()}
            <form onSubmit={handleSubmit}>
            <label>Order Id<span>*</span>
                    <input 
                    type='text'
                    name= 'id'
                    value={id}
                    onChange={handleChange}
                    placeholder= 'Enter your Order Id'
                     /></label>
                     <button type="submit">
                    Submit
                   </button>
            </form>
        </div>
        </div>
        </div>
        </div>
        </div>
        </div>
        </div>
        </div>
    )
    return (
        <div>
                {showTrackid()}
        </div>
    )
}

export default Trackid;
