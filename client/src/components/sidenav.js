import React from 'react'
import Profile from '../image/profile.png';
function Sidenav() {
    return (
        <>
    <div className='vertical-nav' id=''>
      <div className='py-4 px-3 mb-4 bg-light'>
        <div className='media d-flex align-items-center'>
          <img src={Profile} alt='..' width='80' height='80' className='mr-3 rounded-circle img-thumbnail shadow-sm' />
          <div className='media-body'>
            <h4>Hello  </h4>
            <p className='font-weight-normal text-muted mb-0'>Welcome to Fastfly</p>
          </div>
        </div>
      </div>
    
     <p className='text-gray font-weight-bold text-uppercase px-3 small pb-4 mb-0'>Dashboard</p>

    <ul className='nav flex-column mb-0'>
      <li className='nav-item'>
        <a href='/dashboard' className='nav-link text-light'>
          <i className='fa fa-th-large mr-3 text-primary fa-fw'></i>
          Home
        </a>
      </li>
      <li className='nav-item'>
        <a href='/order' className='nav-link text-light'>
          <i className='fa fa-cubes mr-3 text-primary fa-fw'></i>
          Order Now
        </a>
      </li>
      <li className='nav-item'>
        <a href='/viewprofile' className='nav-link text-light'>
          <i className='fa fa-address-card mr-3 text-primary fa-fw'></i>
          profile
        </a>
      </li>
      <li className='nav-item'>
        <a href='/track' className='nav-link text-light'>
          <i className='fa fa-truck mr-3 text-primary fa-fw'></i>
          Track Order
        </a>
      </li>
    </ul>
    </div>
    </>
    )
}

export default Sidenav
