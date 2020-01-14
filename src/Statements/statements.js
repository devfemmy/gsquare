import React, { Component } from 'react';
import {Table} from 'reactstrap'
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
                <div>
                    <Table className= "stat-table" striped>
                    <thead>
                        <tr>
                        <th id= "first-row-statement">Date</th>
                        <th>Type</th>
                        <th>Description</th>
                        <th>amount</th>
                        </tr>
                    </thead>
                    {this.state.statements.map(
                        statement => {
                            return (
                                <tbody key = {statement.Transaction_type_id}>
                                    <tr>
                                    <th  scope="row">{statement.Transaction_date.slice(0, 10)}</th>
                                    <td>{statement.Transaction_type}</td>
                                    <td>{statement.Description}</td>
                                    <td>{statement.Points_gained}</td>
                                    </tr>
                                </tbody>
                            )
                        }
                    )}
                    </Table>
                </div>
            )
        }
        return ( 
            <div>
                <Headers style= {{paddingLeft: '3%'}} name = "Recent Transactions" />
                {showTable}
            </div>
         );
    }
}
 
export default errorHandler (Statements, axios);