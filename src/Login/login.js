import React, { Component } from 'react';
import './login.css';
import logo from '../assets/logo.svg';
import username from '../assets/username.svg';
import password from '../assets/password.svg';
import axios from '../axios-req';
import { InputGroup, Alert, InputGroupAddon, InputGroupText, Input, Button} from 'reactstrap';
import Spinners from '../UI/Spinner/spinner';
import errorHandler from '../ErrorHandler/errorHandler';

class LoginPage extends Component {
    state = {  
        isPasswordShown: false,
        statusMsg: null,
        loader: true,
        formSubmitted: false,
        error: false
    }
    logInUser = () => {
        const email = document.querySelector('#username').value;
        const password = document.querySelector('#password').value;

        if (email === '' || password === '') {
            alert('please fill in correct details')
        } else {
            this.setState({loader: false})
            const data  = {
                email: document.querySelector('#username').value,
                password: document.querySelector('#password').value,
            }
            // axios.post('grandloyalty/login', {...data})
            axios.post('bheerhugz_api_post.php?api_endpoint=grandloyalty/login', {...data})
            .then(res => {
                console.log(res)
                const data = res.data.response;
                const msg = data.message;
                if (data.status === 1) {
                    this.setState({loader: false})
                    const token = data.success.token;
                    const firstname = data.success.user.First_name;
                    const availableBal = data.success.user.Available_balance;
                    const blockedPoints = data.success.user.Blocked_points;
                    const Membership_id = data.success.user.Membership_id;
                    localStorage.setItem('grandToken', "Bearer "+token)
                    localStorage.setItem('grandFirstname', firstname)
                    localStorage.setItem('grandAvailableBal', availableBal)
                    localStorage.setItem('grandBlockedPoints', blockedPoints)
                    localStorage.setItem('grandMembershipId', Membership_id)
                    this.props.history.push({
                        pathname: '/home'
                    })
                }else {
                    this.setState({loader: true, statusMsg:msg, formSubmitted: true})
                }
                
            }).catch(err => {
                this.setState({error: true, loader: true})
                console.log(err)
            })
        }

       
    }
    goToResetPassword = () => {
        this.props.history.push({
            pathname: '/resetpassword'
        })
    }
    togglePasswordVisibility = () => {
        const {isPasswordShown} = this.state;
        this.setState({isPasswordShown: !isPasswordShown});
    }
    render() {
        let AlertDisplay = null
        if(this.state.formSubmitted) {
   
            AlertDisplay = <Alert  color="info">
            {this.state.statusMsg}
          </Alert>
            setTimeout(() => {
                this.setState({formSubmitted: false})
               
            }, 5000);
        }
        const {isPasswordShown} = this.state;
        let showLogin =<Spinners />
        if (this.state.loader) {
            showLogin = (
                <div className = "login-details">
                {AlertDisplay}
                <h2>Login</h2>
                <p>Login to your Grandsquare Account</p>
                <div>
                <InputGroup className= "login-input">
                    <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                        <img className= "username-img" src = {username} alt= "user-icon" />
                    </InputGroupText>
                    </InputGroupAddon>
                    <Input type="text" name="text" id="username" placeholder= "Username" />
                    <InputGroupAddon addonType="append">
                    <InputGroupText>
                    <i id= "material1" style= {{color: 'blue', display: 'none'}} className="material-icons">done</i>
                    </InputGroupText>
                    </InputGroupAddon>
                </InputGroup>

                <InputGroup className= "login-input">
                    <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                        <img className= "pass-img" src = {password} alt= "user-icon" />
                    </InputGroupText>
                    </InputGroupAddon>
                    <Input type={(isPasswordShown) ? "text" : "password"} name="password" id="password" placeholder= "Password" />
                    <InputGroupAddon addonType="append">
                    <InputGroupText>
                    <i style= {{fontSize: '24px'}}
                    onClick= {this.togglePasswordVisibility}
                    className={(isPasswordShown) ? "fa fa-eye-slash": "fa fa-eye" } id= "password-icon"></i>
                    </InputGroupText>
                    </InputGroupAddon>
                </InputGroup>
             
                </div>
            <Button onClick= {this.logInUser} className= "login-button">LOGIN</Button>
            <h5 onClick={this.goToResetPassword}>Forgot Password?</h5>
            </div>
            )
        }
       
        return ( 
            <div className = "login-wrapper">
                <div className= "logo-wrapper">
                <img src={logo} className="login-logo" alt="logo" />
                </div>

              {showLogin}
              
            </div>
         );
    }
}
 
export default errorHandler (LoginPage, axios);