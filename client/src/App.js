import React from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import Header from './components/user/homepage/Header';
import './App.css';
import Signup from './components/user/signup';
import Signin from './components/user/signin';
import Sidenav from './components/sidenav';
import UserRoute from './routes/UserRoute';
import Userdashboard from './components/user/UserDashboard';
import Profile from './components/user/profile'
import Order from './components/user/order';
import ProfileCreate from './components/user/createProfile';
import Trackid from './components/user/trackid';
import Admindashbaord from './components/admin/adminDashboard';
import AdminRoute from './routes/AdminRoute'
import Privacy from './components/privacy';
import UpdateProfile from './components/user/updateProfile';
import AdminPanle from './components/admin/adminPanle';
function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={Header} />
                <Route exact path='/sidenav' component={Sidenav} />
                <Route exact path='/signup' component={Signup} />
                <Route exact path='/signin' component={Signin} />
                <Route exact path='/user' component={Sidenav} />
                <Route exact path='/privacy' component={Privacy} />
                <UserRoute exact path='/dashboard' component={Userdashboard} />
                <UserRoute exact path='/viewprofile' component={Profile} />
                <UserRoute exact path='/order' component={Order} />
                <UserRoute exact path='/profile' component={ProfileCreate} />
                <UserRoute exact path='/track' component={Trackid} />
                <UserRoute exact path='/updateprofile' component={UpdateProfile} />
                <AdminRoute exact path='/admin' component={Admindashbaord} />
                <AdminRoute exact path='/adminpanel' component={AdminPanle} />

            </Switch>
        </BrowserRouter>
    )
}

export default App
