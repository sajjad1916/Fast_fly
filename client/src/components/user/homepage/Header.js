import React from 'react'
import NavTrigger from '../../navTrigger';
import NavBack from '../../navBack';
import MainNav from '../../mainnav';
import Topbar from '../../topbar';
import Footer from './main/footer';
import Main from './main/main'
import Service from './main/service'
import About from './main/about'
import Pricing from './main/pricing'
import BigDeal from './main/big-deal';
import Contact from './main/contact';
import './homepage.css';
function Header() {
    return (
        <>
            <div class="main-wrapper">
                <NavBack />
                <div class="site-content-wrapper">
                   <Topbar />
                   <NavTrigger />
                    <div class="site-content">
                       <MainNav />
                         <Main />
                        <Service />
                        <About />
                        <Pricing />
                        <BigDeal />
                        <Contact />
                        <Footer />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header
