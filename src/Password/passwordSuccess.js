import React, { Component } from 'react';
import './passwordSuccess.css';
import successIcon from '../assets/successful.svg';
import {Button} from 'reactstrap';



class PasswordSuccess extends Component {
    logInUser = () => {
        this.props.history.push({
            pathname: '/'
        })
    }
    render () {
        return (
            <div>
            <div className = "success-div">
                <img src= {successIcon} alt= "success-icon" className= "success-img" />
                <div className= "success-text">
                    <h3>Password Changed Successfully</h3>
                </div>
            </div>
            <div className= "profile-btn-div">
              <Button onClick= {this.logInUser} className= "success-btn">LOGIN NOW</Button>
            </div>
            </div>
        )
    }

}

export default PasswordSuccess;