import React, { Component } from 'react';
import Headers from '../Headers/headers';
import {Input,Button,Alert, InputGroup} from 'reactstrap';
import axios from '../axios-req'
import Spinners from '../UI/Spinner/spinner';
import errorHandler from '../ErrorHandler/errorHandler';

class ChangePassword extends Component {
    state = { 
        loader: true,
        statusMsg: null,
        formSubmitted: false,
        error: false
     }
    changePassword = () => {
        this.setState({loader: false})
        const data = {
            token: localStorage.getItem('grandToken'),
            current_password: document.querySelector('#password').value,
            new_password: document.querySelector("#new_password").value
        }
        // axios.post('change_password', data)
        axios.post('bheerhugz_api_post.php?api_endpoint=change_password', data)
        .then(res => {
            const response = res.data.response;
            if (response.status === 1) {
                this.props.history.push({
                    pathname: '/success'
                })
            }else {
                const message = response.message;
                this.setState({loader: true, formSubmitted: true, statusMsg: message})
            }
        
        }).catch(err => {
           this.setState({loader: true, error: true})
        })

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
        let showPas = <Spinners />
        if (this.state.loader) {
            showPas = (
                <div>
                    <div className= "profile-div">
                        {AlertDisplay}
                    <InputGroup className= "profile-group">
                    <Input  id= "password" type= "password" className = "profile-input" placeholder="Current Password" />
                    </InputGroup>
                    <InputGroup className= "profile-group">
                    <Input  id= "new_password" type= "password" className = "profile-input" placeholder="New Password" />
                    </InputGroup>
                    <InputGroup className= "profile-group">
                    <Input  id= "password3" type= "password" className = "profile-input" placeholder="New Password" />
                    </InputGroup>
                    </div>
                <div className= "profile-btn-div">
                    <Button onClick= {this.changePassword} className= "profile-btn">CHANGE PASSWORD</Button>
                </div>
                </div>
            )
        }
        return ( 
            <div className = "paswrd-wrapper ">
                <Headers name= {"Change Password"} />
              {showPas}
            </div>
         );
    }
}
 
export default errorHandler (ChangePassword, axios);