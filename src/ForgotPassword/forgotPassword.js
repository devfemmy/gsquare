import React, { Component } from 'react';
import './forgotPassword.css';
import logo from '../assets/logo.svg';
import arrowBack from '../assets/arrow-back-white.svg';
import { InputGroup,  Input, Button, Label } from 'reactstrap';

class ForgotPassword extends Component {
    state = {  }
    ToNextPage = () => {
        this.props.history.push({
            pathname: '/home'
        })
    }
    goBack = () => {
        this.props.history.goBack()
    }
    render() { 
        return ( 
            <div className= "password-wrapper">
                <div>
                <img onClick= {this.goBack} src={arrowBack} className= "arrowback" alt= "arrow"/>
                </div>
                <div className= "logo-wrapper">
                <div>
                <img src={logo} className="login-logo" alt="logo" />
                </div>
               
                </div>
                <div className= "password-details">
                    <h1>
                        Forgot Password
                    </h1>
                    <div className= "password-input">
                    <Label>Email Address:</Label>
                    <InputGroup className= "login-input">
                        <Input type="email" name="email" id="email" placeholder= "" />
                    </InputGroup>
                    </div>
                    <Button onClick= {this.ToNextPage} className= "password-button">RESEND PASSWORD</Button>
                </div>
            </div>
         );
    }
}
 
export default ForgotPassword;