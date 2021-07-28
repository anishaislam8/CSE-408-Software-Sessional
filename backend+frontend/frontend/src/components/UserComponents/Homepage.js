import React from 'react'
import axios from 'axios'
import _ from 'lodash';
import { Form, Button } from 'react-bootstrap';
import { Col } from 'react-grid-system';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import * as FaIcons from 'react-icons/fa';
import * as FcIcons from 'react-icons/fc';
import * as BsIcons from 'react-icons/bs';
import * as AiIcons from 'react-icons/ai';

import bgimage from './../../img/userHome.png';
import UserHeader from './Header';

class UserHome extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            users : [],
            user_id : this.props.match.params.id,
            user_name : "",
            user:""
        }
    }
    componentDidMount(){
        let apiUrl = "http://localhost:7000/api/user";
        axios.get(apiUrl)
        .then(response => {
            this.setState({
                users:response.data.data,
                user : response.data.data.filter((user) => user._id.toString() === this.state.user_id)[0],
                user_name : response.data.data.filter((user) => user._id.toString() === this.state.user_id)[0].name
            })
        })
        .catch((error) => {
          console.log(error);
        })
    }

   


    render(){
        return (
            <div>
                <UserHeader data={this.state.user_name} id={this.state.user_id}/>
                <br></br>
                <br></br>
                <br></br>
                <div className="container">
                <center> <h2 style={{"margin" : 20}}>{this.state.user_name}</h2></center>
                        <table className="table table-bordered table-striped">
                            
                            <tbody>
                                <tr>
                                    <td><b>User Name</b></td>
                                    <td>{this.state.user.name}</td>
                                </tr>

                                <tr>
                                    <td><b>NID</b></td>
                                    <td>{this.state.user.nid}</td>
                                </tr>
                              
                                {/* <tr>
                                    <td><b>View Status Of Current Connections</b></td>
                                    <td><Link type="button" style={{"width" : 250}} className="btn btn-info" to={{
                                        pathname: `/user/${this.state.user_id}`,
                                        state: {
                                            data : this.state.user_name,
                                            id : this.state.user_id
                                        }}}><AiIcons.AiOutlineEye size={20}/>  View Connection Details</Link></td>
                                </tr> */}

                                <tr>
                                    <td><b>View Given Feedbacks</b></td>
                                    <td><Link type="button" style={{"width" : 250}} className="btn btn-info" to={{
                                        pathname: `/user/${this.state.user_id}/viewFeedbacks`,
                                        state: {
                                            data : this.state.user_name,
                                            id : this.state.user_id
                                        }}}><BsIcons.BsCardChecklist size={20}/>   View Feedbacks</Link></td>
                                </tr>

                                <tr>
                                    <td><b>View Given Reports</b></td>
                                    <td><Link type="button" style={{"width" : 250}} className="btn btn-info" to={{
                                        pathname: `/user/${this.state.user_id}/viewReports`,
                                        state: {
                                            data : this.state.user_name,
                                            id : this.state.user_id
                                        }}}><FaIcons.FaClipboardList size={20}/>  View Reports</Link></td>
                                </tr>

                              


                            </tbody>
                        </table>
                </div>
            </div>
            
        
           
            );
    }
   
}

export default UserHome
