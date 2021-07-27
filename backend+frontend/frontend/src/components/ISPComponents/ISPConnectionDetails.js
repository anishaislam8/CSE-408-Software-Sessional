import React, { Component } from 'react'
import axios from 'axios'
import { Link, Redirect } from 'react-router-dom';
import './../../styles/connection.css'
import * as AiIcons from 'react-icons/ai';
import * as FaIcons from 'react-icons/fa';
import * as ImIcons from 'react-icons/im';
import ISPHeader from './Header';


class IspConnectionDetails extends React.Component {

   state = {
        connection_id : this.props.location.state.connection_id,
        connections :[],
        showDetails:true,
        showPersonnel : false,
        showOffice : false,
        showHeadOffice:false,
        showLocation: false,
        showEmployee : false,
        divisions:[],
        districts:[],
        unions:[],
        upazillas:[],
        areas : [],
        redirectISPConnection:false,
        employees :[],
        name:this.props.location.state.data,
        isp_id:this.props.location.state.id,
        isp:"" // current isp
           
        
      

    }

    

    componentDidMount() {

        let apiUrl = "http://localhost:7000/api/isp";
        axios.get(apiUrl)
        .then(response => {
            this.setState({ 
              isps: response.data.data, 
              isp_id : this.props.location.state.id,
              name : this.props.location.state.data 
            }, () => {
                this.setState({
                    isp : this.state.isps.filter((isp) => isp._id.toString() === this.state.isp_id)[0]
                })
            })
        })
        .catch((error) => {
          console.log(error);
        })

        apiUrl = "http://localhost:7000/isp/connections";
        let object = {
            isp_id : this.state.isp_id ||  this.props.location.state.id
        }
        axios.post(apiUrl, object)
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

        apiUrl = "http://localhost:7000/api/area";
        axios.get(apiUrl)
        .then(response => {
            this.setState({ areas: response.data.data })
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

        apiUrl = "http://localhost:7000/api/employeesISP";
        object = {
            isp_id : this.state.isp_id ||  this.props.location.state.id
        }
        axios.post(apiUrl, object)
        .then(response => {
            this.setState({ employees: response.data.data })
        })
        .catch((error) => {
          console.log(error);
        })
        

       

        apiUrl = "http://localhost:7000/api/union";
        axios.get(apiUrl)
        .then(response => {
            this.setState({ unions: response.data.data, searchUnions : response.data.data })
        })
        .catch((error) => {
          console.log(error);
        })

        apiUrl = "http://localhost:7000/api/area";
        axios.get(apiUrl)
        .then(response => {
            this.setState({ areas: response.data.data, searchAreas : response.data.data })
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
            this.setState({ districts: response.data.data, searchdistricts:response.data.data })
        })
        .catch((error) => {
          console.log(error);
        })

        apiUrl = "http://localhost:7000/api/subdistrict";
        axios.get(apiUrl)
        .then(response => {
            this.setState({ upazillas: response.data.data, searchupazillas:response.data.data })
        })
        .catch((error) => {
          console.log(error);
        })

        apiUrl = "http://localhost:7000/api/user";
        axios.get(apiUrl)
        .then(response => {
            this.setState({ users: response.data.data })
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
            showLocation: false,
            showEmployee : false
        })
    }

    handlePersonnel = () => {
        this.setState({
            showDetails : false,
            showPersonnel : true,
            showOffice : false,
            showHeadOffice:false,
            showLocation: false,
            showEmployee : false
        })
    }

    handleOffice = () => {
        this.setState({
            showDetails : false,
            showPersonnel : false,
            showOffice : true,
            showHeadOffice:false,
            showLocation: false,
            showEmployee : false
        })
    }

    handleShowEmployee = () => {
        this.setState({
            showDetails : false,
            showPersonnel : false,
            showOffice : false,
            showHeadOffice:false,
            showLocation: false,
            showEmployee : true
        })
    }
    
    handleHeadOffice = () => {
        this.setState({
            showDetails : false,
            showPersonnel : false,
            showOffice : false,
            showHeadOffice:true,
            showLocation: false,
            showEmployee : false
        })
    }

    handleLocation = () => {
        this.setState({
            showDetails : false,
            showPersonnel : false,
            showOffice : false,
            showHeadOffice:false,
            showLocation: true,
            showEmployee : false
        })
    }

    getEmployee = (employee_id) => {
       

        for(let i = 0; i < this.state.employees.length; i++){
            if(this.state.employees[i]._id === employee_id){
                return this.state.employees[i]
            }
        }
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

    getAreaName = (area_id) => {
        for(let i= 0; i < this.state.areas.length; i++){
            if(this.state.areas[i]._id.toString() === area_id.toString()){
                return this.state.areas[i].name
            }
        }
    }

    back = () =>{
        this.setState({
            redirectISPConnection:true
        })
    }

    accept = () => {
        // ei entry tar request_resolve_time, resolve_status, random employee id
        const employeeLength = this.state.employees.length;
        const index = Math.floor(Math.random() * employeeLength);

        let apiUrl = "http://localhost:7000/isp/connections/accept";
        let object = {
            connection_id : this.state.connection_id,
            employee_id : this.state.employees[index]._id,
            user_name : this.getConnection(this.state.connection_id).user_name,
            nid : this.getConnection(this.state.connection_id).nid,
            isp_id : this.state.isp_id,
            details : "Your connection request completed processing. Find your temporary account password in your email."
        }

        axios.post(apiUrl, object)
        .then(response => {
            console.log(response.data.message);
            this.setState({
                redirectISPConnection : true
            })
        })
        .catch((error) => {
          console.log(error);
        })
       
        
    }

    reject = () => {
        

        let apiUrl = "http://localhost:7000/isp/connections/reject";
        const object = {
            connection_id : this.state.connection_id

        }

        axios.post(apiUrl, object)
        .then(response => {
            console.log(response.data.message);
            this.setState({
                redirectISPConnection : true
            })
        })
        .catch((error) => {
          console.log(error);
        })
      
        // notification pathano through email, not shown
        
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
        return(
            <div className="container">
               <ISPHeader data={this.state.name} id={this.state.isp_id} />
               {this.state.redirectISPConnection ? <Redirect  to={{
                   pathname: `/isp/${this.state.isp_id}/connections`,
                   state: {
                       data : this.state.name,
                       id : this.state.isp_id
                   }
                }} /> : ""}
                <br></br>
                <br></br>
                <br></br>

                <center><h3 className="display-6" style={{"marginTop" : 20}}>Details of the request</h3></center>
                <br/>
                {this.state.connections.length > 0 && 
                <div  className="connectioninner">


                     <nav className="navbar navbar-expand-lg" style={{ "color": "white"}}>
                        <ul className="navbar-nav nav-pills">
                        <li className="nav-item" style={{"paddingRight":20}}>
                            <button style={{"marginRight":150, "width":150,  "fontWeight":"bolder", "marginLeft" : 20}} className="btn btn-outline-dark" onClick={this.handleDetails}>Details of Request</button>
                        </li>
                        <li className="nav-item" style={{"paddingRight":20}}>
                            <button style={{"marginRight":150,  "width":150, "fontWeight":"bolder"}} className="btn btn-outline-dark" onClick={this.handleLocation}>Location Details of User</button>
                        </li>
                        
                        <li className="nav-item" style={{"paddingRight":20}}>
                            <button style={{"marginRight":150,"width":150,  "fontWeight":"bolder"}} className="btn btn-outline-dark" onClick={this.handlePersonnel}>Contact Information</button>
                        </li>
                        <li className="nav-item" style={{"paddingRight":20}}>
                            <button style={{"width":150,  "fontWeight":"bolder"}} className="btn btn-outline-dark" onClick={this.handleShowEmployee}>Employee Details</button>
                        </li>
                        </ul>
                     </nav>
                   
                    
                    <div hidden={!this.state.showDetails} >
                     
                        <br/>
                
                        <table className="table table-bordered table-striped" >
                            <thead className="thead-dark">
                                <tr>

                                <th className="col-md-2">User Details</th>
                                <th className="col-md-2">Information</th>
                                
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="col-md-2"><b>User Name</b></td>
                                    <td className="col-md-2">{this.getConnection(this.state.connection_id).user_name}</td>
                                </tr>
                                <tr>
                                    <td className="col-md-2"><b>NID</b></td>
                                    <td className="col-md-2">{this.getConnection(this.state.connection_id).nid_number}</td>
                                </tr>
                                <tr>
                                    <td className="col-md-2"><b>Request Arrival Time</b></td>
                                    <td className="col-md-2">{new Date(this.getConnection(this.state.connection_id).request_arrival_time).toString().split(" ").slice(0,5).join(" ")}</td>
                                </tr>
                                {this.getConnection(this.state.connection_id).resolve_status && !this.getConnection(this.state.connection_id).rejected &&
                                <tr>
                                    <td className="col-md-2"><b>Request Acceptance Time</b></td>
                                    <td className="col-md-2">{new Date(this.getConnection(this.state.connection_id).request_resolve_time).toString().split(" ").slice(0,5).join(" ")}</td>
                                </tr>}
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
                             <th className="col-md-2">Information</th>
                             
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
                             <tr>
                                 <td className="col-md-2"><b>Area</b></td>
                                 <td className="col-md-2">{this.getAreaName(this.getConnection(this.state.connection_id).area_id)}</td>
                             </tr>
                         </tbody>
                     </table>
                 </div>


                 
                 <div hidden={!this.state.showPersonnel} >
                     
                     <br/>
             
                     <table className="table table-bordered table-striped" >
                         <thead className="thead-dark">
                             <tr>

                             <th className="col-md-2">Contact Details</th>
                             <th className="col-md-2">Information</th>
                             
                             </tr>
                         </thead>
                         <tbody>
                           
                            <tr>
                                <td className="col-md-2"><b>Address</b></td>
                                <td className="col-md-2">{this.getConnection(this.state.connection_id).contact_person_address}</td>
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

                 <div hidden={!this.state.showEmployee} >
                     
                     <br/>
             
                     <table className="table table-bordered table-striped" >
                         <thead className="thead-dark">
                             <tr>

                             <th className="col-md-2">Employee Details</th>
                             <th className="col-md-2">Information</th>
                             
                             </tr>
                         </thead>
                        {this.getEmployee(this.getConnection(this.state.connection_id).employee_id) &&  <tbody>
                            <tr>
                                <td className="col-md-2"><b>Name</b></td>
                                <td className="col-md-2">{this.getEmployee(this.getConnection(this.state.connection_id).employee_id).name}</td>
                            </tr>
                            <tr>
                                <td className="col-md-2"><b>Address</b></td>
                                <td className="col-md-2">{this.getEmployee(this.getConnection(this.state.connection_id).employee_id).address}</td>
                            </tr>
                            <tr>
                                <td className="col-md-2"><b>NID</b></td>
                                <td className="col-md-2">{this.getEmployee(this.getConnection(this.state.connection_id).employee_id).nid}</td>
                            </tr>
                            <tr>
                                <td className="col-md-2"><b>Mobile</b></td>
                                <td className="col-md-2">{this.getEmployee(this.getConnection(this.state.connection_id).employee_id).phone_number}</td>
                            </tr>
                            <tr>
                                <td className="col-md-2"><b>Joining Date</b></td>
                                <td className="col-md-2">{new Date(this.getEmployee(this.getConnection(this.state.connection_id).employee_id).joining_date).toString().split(" ").slice(0,5).join(" ")}</td>
                            </tr>
                           
                         </tbody>}
                         {
                             !this.getEmployee(this.getConnection(this.state.connection_id).employee_id) &&
                             <tbody>
                                 <tr>
                                     <td>Request not accepted yet</td>
                                     <td>Not applicable</td>
                                 </tr>
                             </tbody>
                         }
                     </table>
                 </div>

                <button className="btn btn-success" disabled={this.getConnection(this.state.connection_id).resolve_status} onClick={this.accept} style={{"marginLeft":850, "marginRight":20}}><FaIcons.FaClipboardCheck size={20}/>  Accept</button>
                <button className="btn btn-dark" onClick={this.back} style={{"marginRight" : 20}}><ImIcons.ImCancelCircle size={20}/> Cancel</button>
                <button className="btn btn-danger" disabled={this.getConnection(this.state.connection_id).resolve_status} onClick={this.reject}><AiIcons.AiFillNotification size={20}/>  Reject</button>
                   
                </div>}
               
            </div>
        );
    }
}

export default IspConnectionDetails;
