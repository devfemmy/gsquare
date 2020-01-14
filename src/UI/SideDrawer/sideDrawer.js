import React, {Component} from 'react';
import './sideDrawer.css';
import '../../Login/login.css';
import Backdrop from '../Backdrop/backdrop';
import NavigationItems from '../NavigationItems/navigationItems';
import sidelogo from '../../assets/logo.svg'

// import logOut from '../../assets/logout.svg';


class SideDrawer extends Component {
    state = {  }
    
    render() { 
        let attachedClasses = ["SideDrawer", "Close" ];
        if (this.props.open) {
            attachedClasses =  ["SideDrawer", "Open" ];
        }
        return (
            <div>
                <Backdrop show = {this.props.open} clicked = {this.props.closed}/>
                
                <div className = {attachedClasses.join(' ')}>
                    <div className= "logo-container">
                        <img className= "sidelogo" src= {sidelogo} alt= "sidelogo"/>
                    </div>
                    <div className= "universal-pad2">
                        <NavigationItems />
                 
                    </div>
                </div>
                
            </div>
    
    
        );
    }
}
 
export default SideDrawer;

