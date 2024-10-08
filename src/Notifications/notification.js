import React, { Component } from 'react';
import './notification.css';
import {Table} from 'reactstrap'
import Headers from '../Headers/headers';
import axios from '../axios-req'
import Spinners from '../UI/Spinner/spinner';
import backIcon from '../assets/back.svg';
import SwipeToDelete from 'react-swipe-to-delete';


class Notification extends Component {
    state = { 
        loader: false,
        notification: [],
        hide: false,
        showData: [],
        error: false
     }
    componentDidMount () {
        const token = localStorage.getItem('grandToken');
        // axios.get('notifications', {token})
        axios.post('bheerhugz_api_get.php?api_endpoint=notifications', {token})
        .then(res => {
            const response = res.data.response;
            const notification = response.data
            this.setState({notification: notification, loader: true})
            console.log(notification)
        }).catch(
            err => {
                this.setState({loader: true, error: true})
            }
        )
        
    }
    showTable = () => {
        this.setState({show: true, hide: false});
     }
    displayNotification = (data) => {
        console.log("notification", data)
        const token = localStorage.getItem('grandToken');
        axios.post(`api_get.php?api_endpoint=notification/${data}/read`, {token})
        .then(res => {
            console.log(res)
        }).catch(err=> {
            console.log(err)
        })

        // this.setState({hide: true, showData: data})
        
     }
     deleteNotification = (data) => {
      
        const token = localStorage.getItem('grandToken');
        // axios.post(`notifications/${data}`, {token})
        axios.post(`api_post.php?api_endpoint=notifications/${data}`, {token})
        .then(res => {
            console.log(res)
        }).catch(err => {
           this.setState({loader: true, error: true})
        })
     }
    render() { 
        let showNotification = <Spinners />

        if (this.state.loader) {
            showNotification = (
                <div className= "table-div">
                  <Table className= "notification-table" >
                      {this.state.notification.map(
                          (notify, index) => {
                            if (notify.Note_open === 0) {
                                return(
                                    <tbody key = {index}>
                                        <tr onClick= {() => this.displayNotification(notify.User_notification_id)} id = "third-row">
                                        <td id= "first-data">{notify.Creation_date}</td>
                                        <td id= "second-data">{notify.Transaction_type}</td>
                                        <td id= "third-data"><span className= "dot"></span></td>
                                        </tr> 
                                
                               
                                    </tbody>
                                )
                            }else {
                                return(
                                    <tbody key = {index}>
                                        <tr onClick= {() => this.displayNotification(notify.User_notification_id)} id = "third-row">
                                        <td id= "first-data">{notify.Creation_date}</td>
                                        <td id= "second-data">{notify.Transaction_type}</td>
                                        <td id= "third-data"><span className= "dot2"></span></td>
                                        </tr> 
                                
                               
                                    </tbody>
                                )
                            }
                      
                   
                          }
                      )}
                    </Table>
                  </div>
            )
        }
        if(this.state.hide) {
            showNotification = (
                <div className="">
                    <img onClick= {this.showTable} src= {backIcon} className= "img-text2" alt= "backIcon" />
                    <div className= "" dangerouslySetInnerHTML={{ __html: this.state.showData }}  /> 
                </div>
              
            )
        }
        return ( 
            <div className= "page-container page">
                <div className= "notification-wrapper">
                    <Headers name = {"Notification"} />
                    {showNotification}
                </div>
            </div> 
        
        );
    }
}
 
export default Notification;