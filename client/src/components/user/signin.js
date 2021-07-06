import React,{useState , useEffect} from 'react'
import {useHistory} from 'react-router-dom';
import isEmpty from 'validator/lib/isEmpty';
import isMobilePhone from 'validator/lib/isMobilePhone';
import { setAuthentication, isAuthenticated } from '../../helper/auth';
import { showLoading } from '../../helper/loading';
import { showErrorMsg, showSuccessMsg } from '../../helper/message';
import {signin} from '../../api/auth';
import NavBack from '../navBack';
import NavTrigger from '../navTrigger';
import Topbar from '../topbar';
import MainNav from '../mainnav';
import Footer from './homepage/main/footer';
const Signin = () => {
    let history = useHistory();

    useEffect(() => {
        if (isAuthenticated() && isAuthenticated().role === 1) {
            history.push('/adminpanel');
        } else if (isAuthenticated() && isAuthenticated().role === 0) {
            history.push('/dashboard');
        }
    }, [history]);

    const [formData, setFormData] = useState({
        phone: '',
        password: '',
        successMsg: false,
        errorMsg: false,
        loading: false,
    });
    const {
        phone,
        password,
        successMsg,
        errorMsg,
        loading,
    } = formData;

    /****************************
    * EVENT HANDLERS
    ****************************/


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
            isEmpty(phone) ||
            isEmpty(password) 
        ) {
            setFormData({
                ...formData,
                errorMsg: 'All fields are required',
            });
        }else if (!isMobilePhone(phone, ['bn-BD'])) {
            setFormData({
                ...formData,
                errorMsg: 'Please give valid phone number',
            });
        } else {
            const {  phone, password } = formData;
            const data = {  phone, password };

            setFormData({ ...formData ,loading: true });

            signin(data)
            .then((response) => {
                setAuthentication(response.data.token, response.data.user);
                if (isAuthenticated() && isAuthenticated().role === 1) {
                    
                    history.push('/adminpanel');
                } else {
                    
                    history.push('/dashboard');
                }
            })
            .catch((err) => {
                console.log('signin API function error: ', err);
                setFormData({
                    ...formData,
                    loading: false,
                    errorMsg: err.response.data.errorMessage,
                });
            });
        }
    }
    
    
    const showSignIn = () => (
        <div className="container mt-3">
        <form  onSubmit={handleSubmit}>
        <input
              className="input" 
              type="text" 
              name="phone" 
              value ={phone} 
              placeholder="Phone Number" 
              onChange={handleChange}
    
              />
        <input 
              className="input"
              type="password" 
              name="password" 
              value={password} 
              placeholder="password" 
              onChange={handleChange}

              />
        <button className='btn btn-outline-danger'  type="submit">
            login
        </button>
        <p class="message">Not registered? <a href="/signup">Create an account</a></p>
    </form>
    </div>
    )

    return (
        <div class="main-wrapper">
            <NavBack />
            <div class="site-content-wrapper">
                <Topbar />
                <NavTrigger />
                <div class="site-content">
                    <MainNav />
                    <div id='recaptcha-container'></div>
                    <div class="form">
                    <h1 class="title mt-3">
                                Login your account
                                </h1>
                        {loading && showLoading()}
                        {successMsg && showSuccessMsg(successMsg)}
                        {errorMsg && showErrorMsg(errorMsg)}
                        {showSignIn()}
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    )
}

export default Signin;
