import React, { Component } from 'react';
import './notification.css';
import {Table} from 'reactstrap'
import Headers from '../Headers/headers';
import axios from '../axios-req'
import Spinners from '../UI/Spinner/spinner';
import backIcon from '../assets/back.svg';
import SwipeToDelete from 'react-swipe-to-delete';
import errorHandler from '../ErrorHandler/errorHandler';

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
        this.setState({hide: true, showData: data})
        
     }
     deleteNotification = (data) => {
      
        const token = localStorage.getItem('grandToken');
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
                            return(
                                <tbody key = {index}>
                                <SwipeToDelete onDelete={() => this.deleteNotification(notify.User_notification_id)}>
                                    <tr onClick= {() => this.displayNotification(notify.Contents)} id = "third-row">
                                    <td id= "first-data">{notify.Creation_date}</td>
                                    <td id= "second-data">{notify.Transaction_type}</td>
                                    <td id= "third-data"><span className= "dot"></span></td>
                                    </tr> 
                                </SwipeToDelete>
                           
                                </tbody>
                            )
                   
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
            <div className= "notification-wrapper">
                  <Headers name = {"Notification"} />
                {showNotification}
            </div>
        );
    }
}
 
export default errorHandler (Notification, axios);