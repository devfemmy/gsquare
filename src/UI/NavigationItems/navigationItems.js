import React from 'react';
// import './navigationItems.css'
import './navigationItems.css';
import '../SideDrawer/sideDrawer.css';
import home from '../../assets/home.svg';
import profile from '../../assets/profile.svg';
import notications from '../../assets/notification.svg';
import transactions from '../../assets/statements.svg';
import security from '../../assets/security.svg';
import logOut from '../../assets/logout.svg';
// import logOut from '../../../assets/logout.svg';
import NavigationItem from '../NavigationItem/navigationItem';

const NavigationItems = (props) => (
    <ul className = "NavigationItems">
        
    <NavigationItem link= '/home'>
    <p className= "side-icons">
        <strong><span>
        <img src={home} className="side-logo" alt="logo" />
        </span>&nbsp;&nbsp;&nbsp;<span >Home</span></strong>
    </p>
    </NavigationItem>
    <NavigationItem link= '/profile'>
    <p className= "side-icons">
        <strong><span>
        <img src={profile} className="side-logo" alt="logo" />
        </span>&nbsp;&nbsp;&nbsp;<span >Profile</span></strong>
    </p>
    </NavigationItem>
    <NavigationItem link= '/notification'>
    <p className= "side-icons">
        <strong><span>
        <img src={notications} className="side-logo" alt="logo" />
        </span>&nbsp;&nbsp;&nbsp;<span >Notifications</span></strong>
    </p>
    </NavigationItem>
    <NavigationItem link= '/statement'>
    <p className= "side-icons">
        <strong><span>
        <img src={transactions} className="side-logo" alt="logo" />
        </span>&nbsp;&nbsp;&nbsp;<span >Statement</span></strong>
    </p>
    </NavigationItem>
    <NavigationItem link= '/security'>
    <p className= "side-icons">
        <strong><span>
        <img src={security} className="side-logo" alt="logo" />
        </span>&nbsp;&nbsp;&nbsp;<span >Security</span></strong>
    </p>
    </NavigationItem>
    <NavigationItem link= '/'>
    <p id= "side-logout" className= "side-icons">
        <strong><span>
        <img src={logOut} className="side-logo" alt="logo" />
        </span>&nbsp;&nbsp;&nbsp;<span >Log Out</span></strong>
    </p>
    </NavigationItem>
    </ul>
);

export default NavigationItems