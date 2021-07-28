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

import bgimage from './../../img/ispHome.png';
import ISPHeader from './Header';

class ISPHome extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isps : [],
            isp_id : "",
            isp_name : "",
            isp:""
        }
    }
    componentDidMount(){
        let apiUrl = "http://localhost:7000/api/isp";
        axios.get(apiUrl)
        .then(response => {
            this.setState({
                isps:response.data.data,
                isp_id : this.props.match.params.id
            }, () => {
                this.setState({
                    isp : response.data.data.filter((isp) => isp._id.toString() === this.state.isp_id)[0], 
                    isp_name : response.data.data.filter((isp) => isp._id.toString() === this.state.isp_id)[0].name
                })
            })
        })
        .catch((error) => {
          console.log(error);
        })
    }

   


    render(){
        return (
            <div>
                <ISPHeader data={this.state.isp_name} id={this.state.isp_id}/>
                <br></br>
                <br></br>
                <br></br>
                <div className="container">
                        <center> <h2 style={{"margin" : 20}}> {this.state.isp.name}</h2></center>
                        <table className="table table-bordered table-striped">
                            
                            <tbody>
                                <tr>
                                    <td><b>ISP Name</b></td>
                                    <td>{this.state.isp.name}</td>
                                </tr>

                                <tr>
                                    <td><b>License ID</b></td>
                                    <td>{this.state.isp.license_id}</td>
                                </tr>

                                <tr>
                                    <td><b>Physical Connection Established</b></td>
                                    <td>{new Date(this.state.isp.physical_connection_establishment_time).toString().split(" ").slice(0,5).join(" ")}</td>
                                </tr>

                                <tr>
                                    <td><b>Current Connection Establishment Time</b></td>
                                    <td>{new Date(this.state.isp.connection_establishment_time).toString().split(" ").slice(0,5).join(" ")}</td>
                                </tr>

                                

                                {/* <tr>
                                    <td>View Status Of Current Connections</td>
                                    <td><Link type="button" style={{"width" : 250}} className="btn btn-info" to={{
                                        pathname: `/isp/${this.state.isp_id}`,
                                        state: {
                                            data : this.state.isp_name,
                                            id : this.state.isp_id
                                        }}}><AiIcons.AiOutlineEye size={20}/>  View Connection Details</Link></td>
                                </tr> */}

                                <tr>
                                    <td>View User Feedbacks</td>
                                    <td><Link type="button" style={{"width" : 250}} className="btn btn-info" to={{
                                        pathname: `/isp/${this.state.isp_id}/feedbacks`,
                                        state: {
                                            data : this.state.isp_name,
                                            id : this.state.isp_id
                                        }}}><BsIcons.BsCardChecklist size={20}/>   View User Feedbacks</Link></td>
                                </tr>

                                <tr>
                                    <td>View User Reports</td>
                                    <td><Link type="button" style={{"width" : 250}} className="btn btn-info" to={{
                                        pathname: `/isp/${this.state.isp_id}/userReports`,
                                        state: {
                                            data : this.state.isp_name,
                                            id : this.state.isp_id
                                        }}}><FaIcons.FaClipboardList size={20}/>  View User Reports</Link></td>
                                </tr>

                                <tr>
                                    <td>View Reports to NTTN</td>
                                    <td><Link type="button" style={{"width" : 250}} className="btn btn-info" to={{
                                        pathname: `/isp/${this.state.isp_id}/viewReport`,
                                        state: {
                                            data : this.state.isp_name,
                                            id : this.state.isp_id
                                        }}}><BsIcons.BsCardList size={20}/>  View Own Reports</Link></td>
                                </tr>

                               

                            </tbody>
                        </table>
                    </div>
            </div>
            
        
           
            );
    }
   
}

export default ISPHome
