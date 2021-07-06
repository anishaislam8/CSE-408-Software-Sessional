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
import * as GoIcons from 'react-icons/go';
import * as VscIcons from 'react-icons/vsc';
import * as AiIcons from 'react-icons/ai';
import ISPHeader from './Header';


class ViewProfile extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isp_id : "",
            name : "",
            isps : [],
            unions:[],
            isEligible:false,
            isp :""
        }
    }

    componentDidMount(){
        let apiUrl = "http://localhost:7000/api/union";
        axios.get(apiUrl)
        .then(response => {
            this.setState({ unions: response.data.data })
        })
        .catch((error) => {
          console.log(error);
        })



        

         apiUrl = "http://localhost:7000/api/isp";
        axios.get(apiUrl)
        .then(response => {
           
            this.setState({ isps: response.data.data , name : this.props.location.state.data})
        })
        .catch((error) => {
          console.log(error);
        })

       


        apiUrl = "http://localhost:7000/api/ispContracts";
        axios.get(apiUrl)
        .then(response => {
            this.setState({ contracts: response.data.data, isp_id : this.props.location.state.id }, () => {
            
                let newcontracts = this.state.contracts.filter((contract) => contract.isp_id.toString() === this.state.isp_id);
      
                let isp = this.getISP(this.state.isp_id);
             
                this.setState({
                    isp,
                    isp_unions : [... new Set(newcontracts.map((contract) => contract.union_id))]
                });
                
    
                if(isp.connection_establishment_time){
                    this.setState({
                        isEligible : true
                    })
                }
            })
        })
        .catch((error) => {
          console.log(error);
        })

    }

    getIspName = (isp_id) => {
       

        for(let i = 0; i < this.state.isps.length; i++){
            if(this.state.isps[i]._id.toString() === isp_id){
                
                return this.state.isps[i].name
            }
        }
    }

    getISP(isp_id){
        for(let i = 0; i < this.state.isps.length; i++){
            if(this.state.isps[i]._id.toString() === isp_id){
                //console.log("hit");
                return this.state.isps[i]
            }
        }
    }


    render(){
        return(
            <div>
                    <ISPHeader data={this.state.name} id={this.state.isp_id} />
                    
                    <br></br>
                    <br></br>
                    <br></br>
                    <div className="container">
                        <center> <h2 style={{"margin" : 20}}>Details of {this.state.isp.name}</h2></center>
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
                                    <td>{new Date(this.state.isp.physical_connection_establishment_time).toString()}</td>
                                </tr>

                                <tr>
                                    <td><b>Current Connection Establishment Time</b></td>
                                    <td>{new Date(this.state.isp.connection_establishment_time).toString()}</td>
                                </tr>

                                <tr>
                                    <td><b>Connection Status</b></td>
                                    <td>{this.state.isp.connection_status === true ? "Connected" : (this.state.isp.connection_establishment_time ? "Disconnected" : "Not Connected")}</td>
                                </tr>

                                <tr>
                                    <td>View Status Of Current Connections</td>
                                    <td><Link type="button" style={{"width" : 250}} className="btn btn-info" to={{
                                        pathname: `/isp/${this.state.isp_id}`,
                                        state: {
                                            data : this.state.name,
                                            id : this.state.isp_id
                                        }}}><AiIcons.AiOutlineEye size={20}/>  View Connection Details</Link></td>
                                </tr>

                                <tr>
                                    <td>View User Feedbacks</td>
                                    <td><Link type="button" style={{"width" : 250}} className="btn btn-info" to={{
                                        pathname: `/isp/${this.state.isp_id}/feedbacks`,
                                        state: {
                                            data : this.state.name,
                                            id : this.state.isp_id
                                        }}}><BsIcons.BsCardChecklist size={20}/>   View User Feedbacks</Link></td>
                                </tr>

                                <tr>
                                    <td>View User Reports</td>
                                    <td><Link type="button" style={{"width" : 250}} className="btn btn-info" to={{
                                        pathname: `/isp/${this.state.isp_id}`,
                                        state: {
                                            data : this.state.name,
                                            id : this.state.isp_id
                                        }}}><FaIcons.FaClipboardList size={20}/>  View User Reports</Link></td>
                                </tr>

                                <tr>
                                    <td>View Reports to NTTN</td>
                                    <td><Link type="button" style={{"width" : 250}} className="btn btn-info" to={{
                                        pathname: `/isp/${this.state.isp_id}/viewReport`,
                                        state: {
                                            data : this.state.name,
                                            id : this.state.isp_id
                                        }}}><BsIcons.BsCardList size={20}/>  View Own Reports</Link></td>
                                </tr>

                                <tr>
                                    <td>Edit Profile</td>
                                    <td><Link type="button" style={{"width" : 250}} className="btn btn-warning" to={{
                                        pathname: `/isp/${this.state.isp_id}`,
                                        state: {
                                            data : this.state.name,
                                            id : this.state.isp_id
                                        }}}><AiIcons.AiFillEdit size={20}/>  Edit</Link></td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
            </div>
          
        );
    }
}

export default ViewProfile;