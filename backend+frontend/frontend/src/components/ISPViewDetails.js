import React, { Component } from 'react'
import axios from 'axios'
import { Link, Redirect } from 'react-router-dom';
import './../styles/connection.css'
import * as AiIcons from 'react-icons/ai';
import * as FaIcons from 'react-icons/fa';
import * as VscIcons from 'react-icons/vsc';
import Header from './Header';


const Contract = (props) => {
    return (
        <tr>
            <td>{new Date(props.start_date).toString().split(" ").slice(0,5).join(" ")}</td>
            <td>{props.duration} Days</td>
            <td>{props.current}</td>
            <td><Link type="button" className="btn btn-info" to={{
                pathname : "/nttn/ispList/details/package",
                state : {
                    package_id : props.package_id, 
                    isp_id : props.isp_id
                }}}><VscIcons.VscPackage size={30}/>  Package Details</Link></td>

            <td><Link type="button" className="btn btn-warning" to={{
                pathname : "/nttn/ispList/details/payment",
                state : {
                    payment_id : props.payment_id, isp_id : props.isp_id
                }}}><FaIcons.FaMoneyCheckAlt size={30}/>  Payment Details</Link></td>
        </tr>
    )
}


export class ISPDetails extends Component {
    state = {
        isp_id : this.props.location.state.isp_id,
        connection_id:"",
        connections :[],
        showDetails:true,
        showPersonnel : false,
        showOffice : false,
        showHeadOffice:false,
        showLocation: false,
        showEmployee : false,
        showConnection:false,
        divisions:[],
        districts:[],
        unions:[],
        upazillas:[],
        redirectNTTNConnection:false,
        employees :[],
        isps:[],
        contracts:[],
        packages :[]
        
    }

    componentDidMount(){
        let apiUrl = "http://localhost:7000/nttn/connectionsISP";

        axios.get(apiUrl)
        .then(response => {
            
          this.setState({ connections : response.data.data })
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

        apiUrl = "http://localhost:7000/api/isp";
        axios.get(apiUrl)
        .then(response => {
            this.setState({ isps: response.data.data, isp_id : this.props.location.state.isp_id }, () => {
                console.log("location : ",this.props.location);
                console.log("ISP_ID:",this.state.isp_id)
                this.setState({
                    connection_id : this.getISP(this.state.isp_id).physical_connection_details[0].connection_id
                })
            })
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

        apiUrl = "http://localhost:7000/api/employees";
        axios.get(apiUrl)
        .then(response => {
            this.setState({ employees: response.data.data })
        })
        .catch((error) => {
          console.log(error);
        })

        apiUrl = "http://localhost:7000/isp/contracts";
        let object={
            isp_id : this.props.location.state.isp_id || this.state.isp_id
        }
        axios.post(apiUrl, object)
        .then(response => {
            this.setState({ contracts: response.data.data })
        })
        .catch((error) => {
          console.log(error);
        })

        apiUrl = "http://localhost:7000/api/ispPackage";
        axios.get(apiUrl)
        .then(response => {
            this.setState({ packages: response.data.data })
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

    getISP= (isp_id) => {
        console.log("Get ISP", isp_id)
        for(let i= 0; i < this.state.isps.length; i++){
            if(this.state.isps[i]._id.toString() ===isp_id.toString()){
                return this.state.isps[i]
            }
        }
    }
    getPackage = (package_id) => {
        for(let i= 0; i < this.state.packages.length; i++){
            if(this.state.packages[i]._id.toString() ===package_id.toString()){
                return this.state.packages[i]
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
            showEmployee : false,
            showConnection:false
        })
    }

    handlePersonnel = () => {
        this.setState({
            showDetails : false,
            showPersonnel : true,
            showOffice : false,
            showHeadOffice:false,
            showLocation: false,
            showEmployee : false,
            showConnection:false
        })
    }

    handleOffice = () => {
        this.setState({
            showDetails : false,
            showPersonnel : false,
            showOffice : true,
            showHeadOffice:false,
            showLocation: false,
            showEmployee : false,
            showConnection:false
        })
    }

    handleShowEmployee = () => {
        this.setState({
            showDetails : false,
            showPersonnel : false,
            showOffice : false,
            showHeadOffice:false,
            showLocation: false,
            showEmployee : true,
            showConnection:false
        })
    }
    
    handleHeadOffice = () => {
        this.setState({
            showDetails : false,
            showPersonnel : false,
            showOffice : false,
            showHeadOffice:true,
            showLocation: false,
            showEmployee : false,
            showConnection:false
        })
    }

    handleLocation = () => {
        this.setState({
            showDetails : false,
            showPersonnel : false,
            showOffice : false,
            showHeadOffice:false,
            showLocation: true,
            showEmployee : false,
            showConnection:false
        })
    }

    handleShowConnection = () => {
        this.setState({
            showDetails : false,
            showPersonnel : false,
            showOffice : false,
            showHeadOffice:false,
            showLocation: false,
            showEmployee : false,
            showConnection:true
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
            {this.state.redirectNTTNConnection ? <Redirect to='/nttn/ispList' /> : ""}
            <Header />
              <br></br>
              <br></br>
              <br></br>
                <center><h3 className="display-6" style={{"marginTop" : 20}}>Details of this ISP</h3></center>
                <br/>
                {this.state.connection_id && this.state.isp_id &&  
                <div  className="connectioninner">


                     <nav className="navbar navbar-expand-lg" style={{ "color": "white"}}>
                        <ul className="navbar-nav nav-pills ms-auto">
                        <li className="nav-item" style={{"paddingRight":10}}>
                            <button style={{"marginRight":10, "width":150,  "fontWeight":"bolder"}} className="btn btn-outline-dark" onClick={this.handleDetails}>Basic Information</button>
                        </li>
                        <li className="nav-item" style={{"paddingRight":10}}>
                            <button style={{"marginRight":10,  "width":150, "fontWeight":"bolder"}} className="btn btn-outline-dark" onClick={this.handleLocation}>Location Details of ISP</button>
                        </li>
                        <li className="nav-item" style={{"paddingRight":10}}>
                            <button style={{"marginRight":10, "width":150,  "fontWeight":"bolder"}} className="btn btn-outline-dark" onClick={this.handleHeadOffice}>Head Office Information</button>
                        </li>
                        <li className="nav-item" style={{"paddingRight":10}}>
                            <button style={{"marginRight":10, "width":150,  "fontWeight":"bolder"}} className="btn btn-outline-dark" onClick={this.handleOffice}>Office Information</button>
                        </li>
                        <li className="nav-item" style={{"paddingRight":10}}>
                            <button style={{"marginRight":10,"width":150,  "fontWeight":"bolder"}} className="btn btn-outline-dark" onClick={this.handlePersonnel}>Contact Person Information</button>
                        </li>
                        <li className="nav-item" style={{"paddingRight":10}}>
                            <button style={{"marginRight":10,"width":150,  "fontWeight":"bolder"}} className="btn btn-outline-dark" onClick={this.handleShowEmployee}>Employee Details</button>
                        </li>
                        <li className="nav-item" style={{"paddingRight":10}}>
                            <button style={{"width":150,  "fontWeight":"bolder"}} className="btn btn-outline-dark" onClick={this.handleShowConnection}>Connection Details</button>
                        </li>
                        </ul>
                     </nav>
                   
                    
                    <div hidden={!this.state.showDetails} >
                     
                        <br/>
                
                        <table className="table table-bordered table-striped" >
                            <thead className="thead-dark">
                                <tr>

                                <th className="col-md-2">ISP Details</th>
                                <th className="col-md-2">Information</th>
                                
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
                                    <td className="col-md-2"><b>Connection Request Arrival Time</b></td>
                                    <td className="col-md-2">{new Date(this.getConnection(this.state.connection_id).request_arrival_time).toString().split(" ").slice(0,5).join(" ")}</td>
                                </tr>
                                {this.getConnection(this.state.connection_id).resolve_status && !this.getConnection(this.state.connection_id).rejected &&
                                <tr>
                                    <td className="col-md-2"><b>Physical Connection Establishment Time</b></td>
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
                         </tbody>
                     </table>
                 </div>


                 <div hidden={!this.state.showHeadOffice} >
                     
                     <br/>
             
                     <table className="table table-bordered table-striped" >
                         <thead className="thead-dark">
                             <tr>

                             <th className="col-md-2">Head Office Details</th>
                             <th className="col-md-2">Information</th>
                             
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
                             <th className="col-md-2">Information</th>
                             
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


                 <div hidden={!this.state.showConnection} >
                     
                     <br/>
             
                     <table className="table table-bordered table-striped" >
                         <thead className="thead-dark">
                             <tr>

                             <th>Connection Started</th>
                             <th>Duration</th>
                             <th>Active</th>
                             <th>Package Detail</th>
                             <th>Payment Detail</th>
                            

                             
                             </tr>
                         </thead>
                        {this.state.contracts.length > 0 &&  <tbody>
                           { this.state.contracts.map((contract, index) => {
                           
                           return <Contract 
                              key={contract._id}
                              union_name = {this.getUnionName(contract.union_id)}
                              start_date = {contract.start_date} 
                              duration={contract.duration}
                              current={contract.current ? "Active" : "Inactive"}
                              count={index + 1}
                              contract_id={contract._id}
                              package_id={contract.package_id}
                              payment_id={contract.payment_id}
                              isp_id ={contract.isp_id}
                             
                          />})}
                           
                         </tbody>}
                         {
                             !this.state.contracts.length > 0 &&
                             <tbody>
                                 <tr>
                                     <td>No Previous Connections</td>
                                     <td> </td>
                                     <td> </td>
                                     <td> </td>
                                     <td> </td>
                                     
                                 </tr>
                             </tbody>
                         }
                     </table>
                 </div>

                
                <button className="btn btn-dark" onClick={this.back} style={{"marginLeft" : 1100}}><AiIcons.AiOutlineStepBackward size={20}/> Back</button>
               
                   
                </div>}
            
        </div>
        )
    }
}

export default ISPDetails
