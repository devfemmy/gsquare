import React, { Component } from 'react';
import {Row, Col} from 'reactstrap'
import './statements.css';
import Headers from '../Headers/headers';
import axios from '../axios-req';
import Spinners from '../UI/Spinner/spinner';
import errorHandler from '../ErrorHandler/errorHandler';

class Statements extends Component {
    state = { 
        loader: false,
        statements: [],
        error: true,
     }
    componentDidMount() {
        const data = {
            token: localStorage.getItem('grandToken'),
            from_date:"10/10/2012",
            to_date: "11/28/2020"
          

        }
        // axios.post('statement', data)
        axios.post('bheerhugz_api_post.php?api_endpoint=statement', data)
        .then(res => {
            console.log(res)
            const response = res.data.response;
            const statements = response.user_statements.data;
            this.setState({loader: true, statements: statements})
        })
        .catch(err => 
            {this.setState({loader: true, error: true})}
            )
    }
    render() { 
        let showTable = <Spinners />
        if (this.state.loader) {
            showTable = (
                this.state.statements.map((statement, index) => {
                    const date = new Date (statement.Transaction_date);
                    const day = date.getDate();
                    const mm = date.getUTCMonth();
                    var month = [];
                        month[0] = "January";
                        month[1] = "February";
                        month[2] = "March";
                        month[3] = "April";
                        month[4] = "May";
                        month[5] = "June";
                        month[6] = "July";
                        month[7] = "August";
                        month[8] = "September";
                        month[9] = "October";
                        month[10] = "November";
                        month[11] = "December";
                    const newMonth = month[mm]
                    const year = date.getFullYear();
                    const displayDate = `${newMonth} ${day}, ${year}`
                    if (statement.Points_used) {
                       return (
                        <div key= {index} className= "display-statement2">
                        <Row>
                            <Col xs= "8" sm= "8">
                                <p className= "bold-text4">{statement.Transaction_type}</p>
                            </Col>
                            <Col xs= "3" sm= "3">
                                <p className= "bold-text4">{statement.Points_gained}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                            <p className= "bold-text2">Description:</p>
                            </Col>
                           
                        </Row>
                        <Row>
                            <Col>
                            <p className= "bold-text3">
                               {statement.Description}
                            </p>
                            </Col>
                           
                        </Row>
                        <Row>
                            <Col>
                                <h6>
                                    {displayDate}
                                </h6>
                            </Col>
                        </Row>
                    </div>
                       ) 
                    }else {
                        return (
                            <div className= "display-statement">
                            <Row>
                                <Col xs= "8" sm= "8">
                                    <p className= "bold-text">{statement.Transaction_type}</p>
                                </Col>
                                <Col xs= "3" sm= "3">
                                    <p className= "bold-text">{statement.Points_used}</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                <p className= "bold-text2">Description:</p>
                                </Col>
                               
                            </Row>
                            <Row>
                                <Col>
                                <p className= "bold-text3">
                                    {statement.Description}
                                </p>
                                </Col>
                               
                            </Row>
                            <Row>
                                <Col>
                                    <h6>
                                        {displayDate}
                                    </h6>
                                </Col>
                            </Row>
                        </div>
                        )
                    }
                })
            
 
                 
              
            )
        }
        return ( 
            <div className= "statement-wrapper">
                <Headers style= {{paddingLeft: '3%'}} name = "Recent Transactions" />
                {showTable}
            </div>
         );
    }
}
 
export default errorHandler (Statements, axios);