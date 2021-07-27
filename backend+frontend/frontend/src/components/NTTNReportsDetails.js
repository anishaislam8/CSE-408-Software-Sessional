import React, { Component } from 'react'
import { Form, Button, Modal } from 'react-bootstrap';
import axios from 'axios'
import { Link, Redirect } from 'react-router-dom';
import './../styles/report.css'
import * as AiIcons from 'react-icons/ai';
import * as FaIcons from 'react-icons/fa';
import * as ImIcons from 'react-icons/im';
import * as FcIcons from 'react-icons/fc';
import Header from './Header';

export class NTTNReportsDetails extends Component {
    state = {
        report_id : this.props.location.state.report_id,
        reports :[],
        showISPDetails:true,
        showPersonnel : false,
        showOffice : false,
        showReportDetails:false,
        showLocation: false,
        showEmployee : false,
        divisions:[],
        districts:[],
        unions:[],
        upazillas:[],
        redirectNTTNReport:false,
        employees :[],
        connections:[],
        done: false,
        modalTitle:"",
        modalBody:"",
        isps :[]
        
    }

    componentDidMount(){

        let apiUrl = "http://localhost:7000/nttn/connectionsISP";

        axios.get(apiUrl)
        .then(response => {
          this.setState({ connections: response.data.data });
         
        })
        .catch((error) => {
          console.log(error);
        })

        apiUrl = "http://localhost:7000/api/isp";
        axios.get(apiUrl)
        .then(response => {
            this.setState({ isps: response.data.data })
        })
        .catch((error) => {
          console.log(error);
        })

        apiUrl = "http://localhost:7000/nttn/reports";

        axios.get(apiUrl)
        .then(response => {
            
          this.setState({ reports : response.data.data,report_id : this.props.location.state.report_id })
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

        apiUrl = "http://localhost:7000/api/employees";
        axios.get(apiUrl)
        .then(response => {
            this.setState({ employees: response.data.data })
        })
        .catch((error) => {
          console.log(error);
        })
    }

    getReport = (report_id) => {
        for(let i= 0; i < this.state.reports.length; i++){
            if(this.state.reports[i]._id.toString() === report_id.toString()){
                return this.state.reports[i]
            }
        }
    }

    getISP= (isp_id) => {
        for(let i= 0; i < this.state.isps.length; i++){
            if(this.state.isps[i]._id.toString() ===isp_id.toString()){
                return this.state.isps[i]
            }
        }
    }

    getConnection= (connection_id) => {
        for(let i= 0; i < this.state.connections.length; i++){
            if(this.state.connections[i]._id.toString() ===connection_id.toString()){
                return this.state.connections[i]
            }
        }
    }

    handleISPDetails = () => {
        this.setState({
            showISPDetails : true,
            showPersonnel : false,
            showOffice : false,
            showReportDetails:false,
            showLocation: false,
            showEmployee : false
        })
    }

    handlePersonnel = () => {
        this.setState({
            showISPDetails : false,
            showPersonnel : true,
            showOffice : false,
            showReportDetails:false,
            showLocation: false,
            showEmployee : false
        })
    }

    handleOffice = () => {
        this.setState({
            showISPDetails : false,
            showPersonnel : false,
            showOffice : true,
            showReportDetails:false,
            showLocation: false,
            showEmployee : false
        })
    }

    handleShowEmployee = () => {
        this.setState({
            showISPDetails : false,
            showPersonnel : false,
            showOffice : false,
            showReportDetails:false,
            showLocation: false,
            showEmployee : true
        })
    }
    
    handleReportDetails = () => {
        this.setState({
            showISPDetails : false,
            showPersonnel : false,
            showOffice : false,
            showReportDetails:true,
            showLocation: false,
            showEmployee : false
        })
    }

    handleLocation = () => {
        this.setState({
            showISPDetails : false,
            showPersonnel : false,
            showOffice : false,
            showReportDetails:false,
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

    back = () =>{
        this.setState({
            redirectNTTNReport:true
        })
    }

    // accept = () => {
    //     // ei entry tar request_resolve_time, resolve_status, random employee id
    //     const employeeLength = this.state.employees.length;
    //     const index = Math.floor(Math.random() * employeeLength);

    //     let apiUrl = "http://localhost:7000/nttn/reports/accept";
    //     let object = {
    //         report_id : this.state.report_id,
    //         employee_id : this.state.employees[index]._id,
    //         isp_name : this.getReport(this.state.report_id).isp_name,
    //         license_id : this.getReport(this.state.report_id).license_number,
    //         details : "Your report request completed processing. Find your temporary account password in your email."
    //     }

    //     axios.post(apiUrl, object)
    //     .then(response => {
    //         console.log(response.data.message);
    //         this.setState({
    //             redirectNTTNReport : true
    //         })
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     })
       
        
    // }

    // reject = () => {
        

    //     let apiUrl = "http://localhost:7000/nttn/reports/reject";
    //     const object = {
    //         report_id : this.state.report_id

    //     }

    //     axios.post(apiUrl, object)
    //     .then(response => {
    //         console.log(response.data.message);
    //         this.setState({
    //             redirectNTTNReport : true
    //         })
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     })
      
    //     // notification pathano through email, not shown
        
    // }

    getCategoryName = (cat) => {
        //0 - Low Bandwidth, 1 - Physical Connection problem, 2 - Platform related Problem, 3 - Others
        if(cat === "0"){
            return "Low Bandwidth"
        } else if(cat === "1"){
            return "Physical Connection problem"
        } else if(cat === "2"){
            return "Platform related Problem"
        }  else if(cat === "3"){
            return "Others"
        }  
    }

    handleSolveReport = () => {
        let apiUrl = "http://localhost:7000/nttn/reports/solve";
        const employeeLength = this.state.employees.length;
        const index = Math.floor(Math.random() * employeeLength);
        let object = {
          report_id : this.state.report_id,
          employee_id : this.state.employees[index]._id,
        }
        axios.post(apiUrl, object)
        .then(response => {
            if(response.data.data.length === 0){
              //failed
              this.setState({
                modalBody:"Report handling failed, try again!",
                modalTitle:"Error",
                
              }, () => {
                this.setState({
                  done : true
                })
              })
            } else {
              this.setState({
                modalBody:"Solved!!",
                modalTitle:"Success",
                
              }, () => {
                this.setState({
                  done : true
                })
              })
            }
        })
        .catch((error) => {
          console.log(error);
        })
      }
  
      handleClose = () => {
        this.setState({
          done:false,
          modalTitle:"",
          modalBody:""
        }, () => {
            this.setState({
                redirectNTTNReport:true
            })
        })
      }
    render() {
        
        return (
            
            <div className="container">
            {this.state.redirectNTTNReport ? <Redirect to='/nttn/reports' /> : ""}
            <Header />
              <br></br>
              <br></br>
              <br></br>
                <center><h3 className="display-6" style={{"marginTop" : 20}}>Details of the complaint</h3></center>
                <br/>
                {this.state.reports.length > 0 && 
                <div  className="reportinner">


                     <nav className="navbar navbar-expand-lg" style={{ "color": "white"}}>
                        <ul className="navbar-nav nav-pills">
                        <li className="nav-item" style={{"paddingRight":20}}>
                            <button style={{"marginLeft":40, "marginRight":50, "width":150, "height" : 70,  "fontWeight":"bolder"}} className="btn btn-outline-dark" onClick={this.handleISPDetails}>Complaint From</button>
                        </li>
                        {/* <li className="nav-item" style={{"paddingRight":20}}>
                            <button style={{"marginRight":30,  "width":150, "fontWeight":"bolder"}} className="btn btn-outline-dark" onClick={this.handleLocation}>Location</button>
                        </li> */}
                        <li className="nav-item" style={{"paddingRight":20}}>
                            <button style={{"marginRight":70, "height" : 70, "width":150,  "fontWeight":"bolder"}} className="btn btn-outline-dark" onClick={this.handleReportDetails}>Complaint Details</button>
                        </li>
                        <li className="nav-item" style={{"paddingRight":20}}>
                            <button style={{"marginRight":70, "height" : 70, "width":150,  "fontWeight":"bolder"}} className="btn btn-outline-dark" onClick={this.handleOffice}>Office Information</button>
                        </li>
                        <li className="nav-item" style={{"paddingRight":20}}>
                            <button style={{"marginRight":70, "height" : 70,"width":150,  "fontWeight":"bolder"}} className="btn btn-outline-dark" onClick={this.handlePersonnel}>Contact Person Information</button>
                        </li>
                        <li className="nav-item" style={{"paddingRight":20}}>
                            <button style={{"width":150, "height" : 70, "fontWeight":"bolder"}} className="btn btn-outline-dark" onClick={this.handleShowEmployee}>Employee Details</button>
                        </li>
                        </ul>
                     </nav>
                   
                    
                    <div hidden={!this.state.showISPDetails} >
                     
                        <br/>
                
                        <table className="table table-bordered table-striped" >
                            <thead className="thead-dark">
                                <tr>

                                <th className="col-md-2">ISP</th>
                                <th className="col-md-2">Information</th>
                                
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="col-md-2"><b>ISP Name</b></td>
                                    <td className="col-md-2">{this.getISP(this.getReport(this.state.report_id).isp_id).name}</td>
                                </tr>
                                <tr>
                                    <td className="col-md-2"><b>License ID</b></td>
                                    <td className="col-md-2">{this.getISP(this.getReport(this.state.report_id).isp_id).license_id}</td>
                                </tr>
                                <tr>
                                    <td className="col-md-2"><b>ISP Rating</b></td>
                                    <td className="col-md-2">{this.getISP(this.getReport(this.state.report_id).isp_id).average_rating}</td>
                                </tr>
                                <tr>
                                    <td className="col-md-2"><b>Union Name</b></td>
                                    <td className="col-md-2">{this.getUnionName(this.getReport(this.state.report_id).union_id)}</td>
                                </tr>
                               
                            </tbody>
                        </table>
                    </div>

                    {/* <div hidden={!this.state.showLocation} >
                     
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
                                 <td className="col-md-2">{this.getDivisionName(this.getReport(this.state.report_id).division_id)}</td>
                             </tr>
                             <tr>
                                 <td className="col-md-2"><b>District</b></td>
                                 <td className="col-md-2">{this.getDistrictName(this.getReport(this.state.report_id).district_id)}</td>
                             </tr>
                             <tr>
                                 <td className="col-md-2"><b>Upazilla</b></td>
                                 <td className="col-md-2">{this.getUpazillaName(this.getReport(this.state.report_id).upazilla_id)}</td>
                             </tr>
                             <tr>
                                 <td className="col-md-2"><b>Union</b></td>
                                 <td className="col-md-2">{this.getUnionName(this.getReport(this.state.report_id).union_id)}</td>
                             </tr>
                         </tbody>
                     </table>
                 </div> */}


                 <div hidden={!this.state.showReportDetails} >
                     
                     <br/>
             
                     <table className="table table-bordered table-striped" >
                         <thead className="thead-dark">
                             <tr>

                             <th className="col-md-2">Complaint Details</th>
                             <th className="col-md-2">Information</th>
                             
                             </tr>
                         </thead>
                         <tbody>
                         <tr>
                            <td className="col-md-2"><b>Complaint Arrival Time</b></td>
                            <td className="col-md-2">{new Date(this.getReport(this.state.report_id).report_arrival_time).toString().split(" ").slice(0,5).join(" ")}</td>
                        </tr>
                        {this.getReport(this.state.report_id).resolve_status  &&
                        <tr>
                            <td className="col-md-2"><b>Complaint Resolve Time</b></td>
                            <td className="col-md-2">{new Date(this.getReport(this.state.report_id).report_resolve_time).toString().split(" ").slice(0,5).join(" ")}</td>
                        </tr>}
                        <tr>
                            <td className="col-md-2"><b>Complaint Category</b></td>
                            <td className="col-md-2">{this.getCategoryName(this.getReport(this.state.report_id).category)}</td>
                        </tr>
                        <tr>
                            <td className="col-md-2"><b>Complaint Details</b></td>
                            <td className="col-md-2">{this.getReport(this.state.report_id).details}</td>
                        </tr>
                        <tr>
                            <td className="col-md-2"><b>Resolve Status</b></td>
                            <td className="col-md-2">{this.getReport(this.state.report_id).resolve_status === true ? "Solved" : "Unsolved"}</td>
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
                             <th className="col-md-2">Information</th>
                             
                             </tr>
                         </thead>
                         <tbody>
                            <tr>
                                <td className="col-md-2"><b>Address</b></td>
                                <td className="col-md-2">{this.getConnection(this.getISP(this.getReport(this.state.report_id).isp_id).physical_connection_details[0].connection_id).office_address}</td>
                            </tr>
                            <tr>
                                <td className="col-md-2"><b>Telephone</b></td>
                                <td className="col-md-2">{this.getConnection(this.getISP(this.getReport(this.state.report_id).isp_id).physical_connection_details[0].connection_id).office_telephone}</td>
                            </tr>
                            <tr>
                                <td className="col-md-2"><b>Mobile</b></td>
                                <td className="col-md-2">{this.getConnection(this.getISP(this.getReport(this.state.report_id).isp_id).physical_connection_details[0].connection_id).office_mobile}</td>
                            </tr>
                            <tr>
                                <td className="col-md-2"><b>Email</b></td>
                                <td className="col-md-2">{this.getConnection(this.getISP(this.getReport(this.state.report_id).isp_id).physical_connection_details[0].connection_id).office_email}</td>
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
                                <td className="col-md-2">{this.getConnection(this.getISP(this.getReport(this.state.report_id).isp_id).physical_connection_details[0].connection_id).contact_person_name}</td>
                            </tr>
                            <tr>
                                <td className="col-md-2"><b>Address</b></td>
                                <td className="col-md-2">{this.getConnection(this.getISP(this.getReport(this.state.report_id).isp_id).physical_connection_details[0].connection_id).contact_person_address}</td>
                            </tr>
                            <tr>
                                <td className="col-md-2"><b>Telephone</b></td>
                                <td className="col-md-2">{this.getConnection(this.getISP(this.getReport(this.state.report_id).isp_id).physical_connection_details[0].connection_id).contact_person_telephone}</td>
                            </tr>
                            <tr>
                                <td className="col-md-2"><b>Mobile</b></td>
                                <td className="col-md-2">{this.getConnection(this.getISP(this.getReport(this.state.report_id).isp_id).physical_connection_details[0].connection_id).contact_person_mobile}</td>
                            </tr>
                            <tr>
                                <td className="col-md-2"><b>Email</b></td>
                                <td className="col-md-2">{this.getConnection(this.getISP(this.getReport(this.state.report_id).isp_id).physical_connection_details[0].connection_id).contact_person_email}</td>
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
                        {this.getEmployee(this.getReport(this.state.report_id).employee_id) &&  <tbody>
                            <tr>
                                <td className="col-md-2"><b>Name</b></td>
                                <td className="col-md-2">{this.getEmployee(this.getReport(this.state.report_id).employee_id).name}</td>
                            </tr>
                            <tr>
                                <td className="col-md-2"><b>Address</b></td>
                                <td className="col-md-2">{this.getEmployee(this.getReport(this.state.report_id).employee_id).address}</td>
                            </tr>
                            <tr>
                                <td className="col-md-2"><b>NID</b></td>
                                <td className="col-md-2">{this.getEmployee(this.getReport(this.state.report_id).employee_id).nid}</td>
                            </tr>
                            <tr>
                                <td className="col-md-2"><b>Mobile</b></td>
                                <td className="col-md-2">{this.getEmployee(this.getReport(this.state.report_id).employee_id).phone_number}</td>
                            </tr>
                            <tr>
                                <td className="col-md-2"><b>Joining Date</b></td>
                                <td className="col-md-2">{new Date(this.getEmployee(this.getReport(this.state.report_id).employee_id).joining_date).toString().split(" ").slice(0,5).join(" ")}</td>
                            </tr>
                           
                         </tbody>}
                         {
                             !this.getEmployee(this.getReport(this.state.report_id).employee_id) &&
                             <tbody>
                                 <tr>
                                     <td>Complaint not resolved yet</td>
                                     <td>Not applicable</td>
                                 </tr>
                             </tbody>
                         }
                     </table>
                 </div>

                <button className="btn btn-success" style={{"width" : 100}} disabled={this.getReport(this.state.report_id).resolve_status} onClick={this.handleSolveReport} style={{"marginLeft":850, "marginRight":20}}><FaIcons.FaClipboardCheck size={20}/>  Solve</button>
                <button className="btn btn-dark" style={{"width" : 100}} onClick={this.back} style={{"marginRight" : 20}}><AiIcons.AiOutlineStepBackward size={20}/> Back</button>
                
                   
                </div>}

                <Modal show={this.state.done} onHide={this.handleClose} animation={false}>
                        <Modal.Header closeButton>
                        <Modal.Title>{this.state.modalTitle}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        {this.state.modalTitle === "Success" ? <FcIcons.FcCheckmark size={30} /> : <FcIcons.FcCancel size={30}/>} {this.state.modalBody}
                        </Modal.Body>
                       
                </Modal>
            
        </div>
        )
    }
}

export default NTTNReportsDetails
