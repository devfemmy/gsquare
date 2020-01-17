import React, { Component } from 'react';
import './home.css';
import logoWhite from '../assets/logo_white.svg';
import Headers from '../Headers/headers';
import { Card, CardBody, Col, Row } from 'reactstrap';
import currentBalIcon from '../assets/current-bal-icon.svg'
import pointsIcon from '../assets/points-gained-icon.svg'

class Home extends Component {
    state = {  }
   
    render() { 
        const firstname = localStorage.getItem('grandFirstname');
        const firstLetter = firstname.charAt(0)
        const membershipId = localStorage.getItem('grandMembershipId');
        const availableBal = localStorage.getItem('grandAvailableBal');
        const roundAB =  parseInt(availableBal);
        const blockedPoints = localStorage.getItem('grandBlockedPoints');
        const roundBP = parseInt(blockedPoints)

        const headerName = "Home"
        return ( 
          
            <div className= "home-page">
                <Headers id= "sticky-header" name = {headerName} />
                <div className= "home-details">
                    <div className= "home-bg">
                        <div>
                       <img className= "home-logo" src = {logoWhite} alt= "logo_white" />
                        <div className= "lower-div">
                            <div className= "circular-div">
                                <h5>{firstLetter}</h5>
                            </div>
                            <h4>{firstname}</h4>
                            <p>Membership ID: {membershipId}</p>
                        </div>
                        </div>
                       
                    </div>
                    <div className = "card-details">
                        <Card>
                            <CardBody>
                                <Row>
                                    <Col xs= "9" sm= "6">
                                      <h5>Available Balance</h5>
                                      <p>{roundAB.toFixed()}</p>
                                    </Col>
                                    <Col xs="3" sm= "6">
                                        <img src= {currentBalIcon} alt= "points" />
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                        <Card>
                            <CardBody>
                                <Row>
                                    <Col xs= "9" sm= "6">
                                      <h5>Blocked Points</h5>
                                      <p>{roundBP.toFixed()}</p>
                                    </Col>
                                    <Col xs="3" sm= "6">
                                        <img src= {pointsIcon} alt= "points" />
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>
         );
    }
}
 
export default Home;