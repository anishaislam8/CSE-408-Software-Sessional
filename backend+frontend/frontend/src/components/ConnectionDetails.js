import React, { Component } from 'react'
import axios from 'axios'
import { Link, Redirect } from 'react-router-dom';
import './../styles/connection.css'
import * as AiIcons from 'react-icons/ai';
import * as FaIcons from 'react-icons/fa';
import * as ImIcons from 'react-icons/im';
import Header from './Header';

export class ConnectionDetails extends Component {
    state = {
        connection_id : this.props.location.state.connection_id,
        connections :[],
        showDetails:true,
        showPersonnel : false,
        showOffice : false,
        showHeadOffice:false,
        showLocation: false,
        divisions:[],
        districts:[],
        unions:[],
        upazillas:[],
        redirectNTTNConnection:false
    }

    componentDidMount(){
        let apiUrl = "http://localhost:7000/nttn/connectionsISP";

        axios.get(apiUrl)
        .then(response => {
            
          this.setState({ connections : response.data.data,connection_id : this.props.location.state.connection_id })
        })
        .catch((error) => {
          console.log(error);
        })

        apiUrl = "http://localhost:7000/api/union";
        axios.get(apiUrl)
        .then(response => {
            this.setState({ unions: response.data.data })
        })
        .catch((error) => {
          console.log(error);
        })

      
        apiUrl = "http://localhost:7000/api/division";
        axios.get(apiUrl)
        .then(response => {
            this.setState({ divisions: response.data.data })
        })
        .catch((error) => {
          console.log(error);
        })

        apiUrl = "http://localhost:7000/api/district";
        axios.get(apiUrl)
        .then(response => {
            this.setState({ districts: response.data.data })
        })
        .catch((error) => {
          console.log(error);
        })

        apiUrl = "http://localhost:7000/api/subdistrict";
        axios.get(apiUrl)
        .then(response => {
            this.setState({ upazillas: response.data.data })
        })
        .catch((error) => {
          console.log(error);
        })
    }

    getConnection = (connection_id) => {
        for(let i= 0; i < this.state.connections.length; i++){
            if(this.state.connections[i]._id.toString() === connection_id.toString()){
                return this.state.connections[i]
            }
        }
    }

    handleDetails = () => {
        this.setState({
            showDetails : true,
            showPersonnel : false,
            showOffice : false,
            showHeadOffice:false,
            showLocation: false
        })
    }

    handlePersonnel = () => {
        this.setState({
            showDetails : false,
            showPersonnel : true,
            showOffice : false,
            showHeadOffice:false,
            showLocation: false
        })
    }

    handleOffice = () => {
        this.setState({
            showDetails : false,
            showPersonnel : false,
            showOffice : true,
            showHeadOffice:false,
            showLocation: false
        })
    }
    
    handleHeadOffice = () => {
        this.setState({
            showDetails : false,
            showPersonnel : false,
            showOffice : false,
            showHeadOffice:true,
            showLocation: false
        })
    }

    handleLocation = () => {
        this.setState({
            showDetails : false,
            showPersonnel : false,
            showOffice : false,
            showHeadOffice:false,
            showLocation: true
        })
    }

    getDivisionName = (division_id) => {
        for(let i= 0; i < this.state.divisions.length; i++){
            if(this.state.divisions[i].division_id.toString() === division_id.toString()){
                return this.state.divisions[i].name
            }
        }
    }

    getDistrictName = (district_id) => {
        for(let i= 0; i < this.state.districts.length; i++){
            if(this.state.districts[i].district_id.toString() === district_id.toString()){
                return this.state.districts[i].name
            }
        }
    }

    getUpazillaName = (upazilla_id) => {
        for(let i= 0; i < this.state.upazillas.length; i++){
            if(this.state.upazillas[i].upazilla_id.toString() === upazilla_id.toString()){
                return this.state.upazillas[i].name
            }
        }
    }

    getUnionName = (union_id) => {
        for(let i= 0; i < this.state.unions.length; i++){
            if(this.state.unions[i].union_id.toString() === union_id.toString()){
                return this.state.unions[i].name
            }
        }
    }

    back = () =>{
        this.setState({
            redirectNTTNConnection:true
        })
    }

    getWireName = (cat) => {
        //0-DSL, 1-ADSL, 2-OpticalFiber,4-UTP,5-STP
        if(cat === 0){
            return "DSL"
        } else if(cat === 1){
            return "ADSL"
        } else if(cat === 2){
            return "Optical Fiber"
        }  else if(cat === 3){
            return "UTP"
        }  else if(cat === 4){
            return "STP"
        }
    }
    render() {
        
        return (
            
            <div className="container">
            {this.state.redirectNTTNConnection ? <Redirect to='/nttn/connections' /> : ""}
            <Header />
              <br></br>
              <br></br>
              <br></br>
                <center><h3 className="display-6" style={{"marginTop" : 20}}>Details of the request</h3></center>
                <br/>
                {this.state.connections.length > 0 && 
                <div  className="connectioninner">


                     <nav className="navbar navbar-expand-lg" style={{ "color": "white"}}>
                        <ul className="navbar-nav nav-pills ms-auto">
                        <li className="nav-item" style={{"paddingRight":20}}>
                            <button style={{"marginRight":60,  "fontWeight":"bolder"}} className="btn btn-outline-dark" onClick={this.handleDetails}>Details of Request</button>
                        </li>
                        <li className="nav-item" style={{"paddingRight":20}}>
                            <button style={{"marginRight":60,  "fontWeight":"bolder"}} className="btn btn-outline-dark" onClick={this.handleLocation}>Location Details of ISP</button>
                        </li>
                        <li className="nav-item" style={{"paddingRight":20}}>
                            <button style={{"marginRight":60,  "fontWeight":"bolder"}} className="btn btn-outline-dark" onClick={this.handleHeadOffice}>Head Office Information of ISP</button>
                        </li>
                        <li className="nav-item" style={{"paddingRight":20}}>
                            <button style={{"marginRight":60,  "fontWeight":"bolder"}} className="btn btn-outline-dark" onClick={this.handleOffice}>Office Information of ISP</button>
                        </li>
                        <li className="nav-item" style={{"paddingRight":20}}>
                            <button style={{ "fontWeight":"bolder"}} className="btn btn-outline-dark" onClick={this.handlePersonnel}>Contact Person</button>
                        </li>
                        </ul>
                     </nav>
                   
                    
                    <div hidden={!this.state.showDetails} >
                     
                        <br/>
                
                        <table className="table table-bordered table-striped" >
                            <thead className="thead-dark">
                                <tr>

                                <th className="col-md-2">ISP Details</th>
                                <th className="col-md-2">        </th>
                                
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="col-md-2"><b>ISP Name</b></td>
                                    <td className="col-md-2">{this.getConnection(this.state.connection_id).isp_name}</td>
                                </tr>
                                <tr>
                                    <td className="col-md-2"><b>License ID</b></td>
                                    <td className="col-md-2">{this.getConnection(this.state.connection_id).license_number}</td>
                                </tr>
                                <tr>
                                    <td className="col-md-2"><b>Request Arrival Time</b></td>
                                    <td className="col-md-2">{new Date(this.getConnection(this.state.connection_id).request_arrival_time).toString().split(" ").slice(0,5).join(" ")}</td>
                                </tr>
                                <tr>
                                    <td className="col-md-2"><b>Requested Wire Type</b></td>
                                    <td className="col-md-2">{this.getWireName(this.getConnection(this.state.connection_id).wire_type)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div hidden={!this.state.showLocation} >
                     
                     <br/>
             
                     <table className="table table-bordered table-striped" >
                         <thead className="thead-dark">
                             <tr>

                             <th className="col-md-2">Location Details</th>
                             <th className="col-md-2">        </th>
                             
                             </tr>
                         </thead>
                         <tbody>
                             <tr>
                                 <td className="col-md-2"><b>Division</b></td>
                                 <td className="col-md-2">{this.getDivisionName(this.getConnection(this.state.connection_id).division_id)}</td>
                             </tr>
                             <tr>
                                 <td className="col-md-2"><b>District</b></td>
                                 <td className="col-md-2">{this.getDistrictName(this.getConnection(this.state.connection_id).district_id)}</td>
                             </tr>
                             <tr>
                                 <td className="col-md-2"><b>Upazilla</b></td>
                                 <td className="col-md-2">{this.getUpazillaName(this.getConnection(this.state.connection_id).upazilla_id)}</td>
                             </tr>
                             <tr>
                                 <td className="col-md-2"><b>Union</b></td>
                                 <td className="col-md-2">{this.getUnionName(this.getConnection(this.state.connection_id).union_id)}</td>
                             </tr>
                         </tbody>
                     </table>
                 </div>


                 <div hidden={!this.state.showHeadOffice} >
                     
                     <br/>
             
                     <table className="table table-bordered table-striped" >
                         <thead className="thead-dark">
                             <tr>

                             <th className="col-md-2">Head Office Details</th>
                             <th className="col-md-2">        </th>
                             
                             </tr>
                         </thead>
                         <tbody>
                            <tr>
                                <td className="col-md-2"><b>Address</b></td>
                                <td className="col-md-2">{this.getConnection(this.state.connection_id).head_office_address}</td>
                            </tr>
                            <tr>
                                <td className="col-md-2"><b>Telephone</b></td>
                                <td className="col-md-2">{this.getConnection(this.state.connection_id).head_office_telephone}</td>
                            </tr>
                            <tr>
                                <td className="col-md-2"><b>Mobile</b></td>
                                <td className="col-md-2">{this.getConnection(this.state.connection_id).head_office_mobile}</td>
                            </tr>
                            <tr>
                                <td className="col-md-2"><b>Email</b></td>
                                <td className="col-md-2">{this.getConnection(this.state.connection_id).head_office_email}</td>
                            </tr>
                           
                         </tbody>
                     </table>
                 </div>


                 <div hidden={!this.state.showOffice} >
                     
                     <br/>
             
                     <table className="table table-bordered table-striped" >
                         <thead className="thead-dark">
                             <tr>

                             <th className="col-md-2">Office Details</th>
                             <th className="col-md-2">        </th>
                             
                             </tr>
                         </thead>
                         <tbody>
                            <tr>
                                <td className="col-md-2"><b>Address</b></td>
                                <td className="col-md-2">{this.getConnection(this.state.connection_id).office_address}</td>
                            </tr>
                            <tr>
                                <td className="col-md-2"><b>Telephone</b></td>
                                <td className="col-md-2">{this.getConnection(this.state.connection_id).office_telephone}</td>
                            </tr>
                            <tr>
                                <td className="col-md-2"><b>Mobile</b></td>
                                <td className="col-md-2">{this.getConnection(this.state.connection_id).office_mobile}</td>
                            </tr>
                            <tr>
                                <td className="col-md-2"><b>Email</b></td>
                                <td className="col-md-2">{this.getConnection(this.state.connection_id).office_email}</td>
                            </tr>
                           
                         </tbody>
                     </table>
                 </div>

                 <div hidden={!this.state.showPersonnel} >
                     
                     <br/>
             
                     <table className="table table-bordered table-striped" >
                         <thead className="thead-dark">
                             <tr>

                             <th className="col-md-2">Contact Person Details</th>
                             <th className="col-md-2">        </th>
                             
                             </tr>
                         </thead>
                         <tbody>
                            <tr>
                                <td className="col-md-2"><b>Name</b></td>
                                <td className="col-md-2">{this.getConnection(this.state.connection_id).contact_person_name}</td>
                            </tr>
                            <tr>
                                <td className="col-md-2"><b>Address</b></td>
                                <td className="col-md-2">{this.getConnection(this.state.connection_id).contact_person_address}</td>
                            </tr>
                            <tr>
                                <td className="col-md-2"><b>Telephone</b></td>
                                <td className="col-md-2">{this.getConnection(this.state.connection_id).contact_person_telephone}</td>
                            </tr>
                            <tr>
                                <td className="col-md-2"><b>Mobile</b></td>
                                <td className="col-md-2">{this.getConnection(this.state.connection_id).contact_person_mobile}</td>
                            </tr>
                            <tr>
                                <td className="col-md-2"><b>Email</b></td>
                                <td className="col-md-2">{this.getConnection(this.state.connection_id).contact_person_email}</td>
                            </tr>
                           
                         </tbody>
                     </table>
                 </div>

                <button className="btn btn-success" style={{"marginLeft":850, "marginRight":20}}><FaIcons.FaClipboardCheck size={20}/>  Accept</button>
                <button className="btn btn-dark" onClick={this.back} style={{"marginRight" : 20}}><ImIcons.ImCancelCircle size={20}/> Cancel</button>
                <button className="btn btn-danger"><AiIcons.AiFillNotification size={20}/>  Reject</button>
                   
                </div>}
            
        </div>
        )
    }
}

export default ConnectionDetails
