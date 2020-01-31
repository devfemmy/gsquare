import React, { Component } from 'react';
import './profile.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Headers from '../Headers/headers';
import {Input, InputGroup, Button, Alert} from 'reactstrap';
import axios from '../axios-req'
import Spinners from '../UI/Spinner/spinner';
// import errorHandler from '../ErrorHandler/errorHandler';

class Profile extends Component {
    state = { 
        startDate: null,
        current_address: null,
        state_id: null,
        country_id: null,
        city_id: null,
        loader: false,
        formSubmitted: false,
        statusMsg: null,
        error: false,
        firstName: null,
        lastName: null,
        email: null,
        phone_no: null,
        gender: ''
       
     }
     componentDidMount() {
        const data = {
            token: localStorage.getItem('grandToken')
        }
        // axios.get('/profile')
        // axios.get('profile', data)
        axios.post('bheerhugz_api_get.php?api_endpoint=profile', data)
        .then(res => {
            const response = res.data.response;
            const profile = response.profile;
            const firstname = profile.First_name;
            const lastname = profile.Last_name;
            // const phone = profile.Phone_no;
            const email = profile.User_email_id;
            this.setState({current_address: profile.Current_address,
                state_id: profile.State_id, country_id: 
                profile.Country_id,
                loader: true,
                firstName: firstname,
                lastName: lastname,
                email: email,
                profile: profile,
                phone_no: profile.Phone_no, 
                city_id: profile.City_id})
                document.querySelector('#first_name').value = profile.First_name;
                document.querySelector('#last_name').value = profile.Last_name;
                document.querySelector('#phone').value = profile.Phone_no;
                document.querySelector('#email').value = profile.User_email_id;
            
        }).catch(err => {
            this.setState({loader: true, error: true})
        })
     }
     saveProfile = () => {
        this.setState({loader: false})
        const data={
            token: localStorage.getItem('grandToken'),
            last_name:  document.querySelector('#last_name').value,
            first_name: document.querySelector('#first_name').value,
            city_id: this.state.city_id,
            current_address: this.state.current_address,
            state_id: this.state.state_id,
            country_id: this.state.country_id,
            phone_no: document.querySelector('#phone').value
        }
        //   axios.post('profile', data,)
          axios.post('bheerhugz_api_post.php?api_endpoint=profile', data,)
          .then(res => {
              console.log(res)
              const response = res.data.response;
              const message = response.message
              if (response.status === 1) {
                 this.setState({loader: true, formSubmitted: true, statusMsg: message})


              }
          }).catch(
              err => {
                  this.setState({loader: true, error: true})
              }
          )
     }
    handleChange = date => {
        this.setState({
          startDate: date
        });
      };
     eventChanged = (event) => {
        this.setState({lastName: event.target.value})
     }
     inputChanged = (event) => {
        this.setState({firstName: event.target.value})
     }
     phoneChanged = (event) => {
        this.setState({phone_no: event.target.value})
     }
     emailChanged = (event) => {
        this.setState({email: event.target.value})
     }
     genderChanged = (event) => {
        this.setState({gender: event.target.value})
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
        let showProfile = <Spinners />
        if (this.state.loader) {
            showProfile = (
                <div>
                <div className= "profile-div">
                {AlertDisplay}
                <InputGroup className= "profile-group">
                <Input value= {this.state.firstName} onChange= {this.inputChanged}  id= "first_name" type= "text" className = "profile-input" placeholder="First Name" />
                </InputGroup>
                <InputGroup className= "profile-group">
                <Input value= {this.state.lastName} onChange= {this.eventChanged}   id= "last_name" type= "text" className = "profile-input" placeholder="Last Name" />
                </InputGroup>
                <InputGroup className= "profile-group">
                <Input value= {this.state.phone_no} onChange= {this.phoneChanged}   id= "phone" type= "number" className = "profile-input" placeholder="Phone Number" />
                </InputGroup>
                <InputGroup className= "profile-group">
                <Input value= {this.state.email} onChange= {this.emailChanged}   id= "email" type= "email" className = "profile-input" placeholder="Email Address" />
                </InputGroup>
                <InputGroup className= "profile-group">
                <Input value= {this.state.gender} onChange= {this.genderChanged}  id= "phone" type= "select" className = "profile-input" placeholder="Gender">
                    <option>Gender</option>
                    <option>Male</option>
                    <option>Female</option>
                </Input>
                </InputGroup>
                <InputGroup className= "profile-group">
                    <DatePicker type= "select" id= "date-picker"
                        className= "profile-input" 
                        placeholderText = "Date of Birth"
                        selected={this.state.startDate}
                        onChange={this.handleChange}
                        />
                </InputGroup>
                </div>
                <div className= "profile-btn-div">
                    <Button onClick= {this.saveProfile} className= "profile-btn2">SAVE</Button>
                </div>
                </div>
            )
        }
        return (
            <div className= "page-container page">
                <div className= "profile-wrapper">
                <Headers name = {"Profile"} />
                {showProfile}
            </div>
            </div> 
            
         );
    }
}
 
export default  Profile