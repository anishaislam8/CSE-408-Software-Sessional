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
import * as VscIcons from 'react-icons/vsc';
import Header from './Header';




export default class PendingDetails extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            pending_id : this.props.location.state.pending_id,
            pendings:[],
            isps:[],
            unions:[],
            packages:[]
        }

        this.getISP = this.getISP.bind(this);
        this.getRequest = this.getRequest.bind(this);
        this.getUnion = this.getUnion.bind(this);
        this.getPackage = this.getPackage.bind(this);
    }

     componentDidMount(){
    
        let apiUrl = "http://localhost:7000/nttn/pending";

        axios.get(apiUrl)
        .then(response => {
            
          this.setState({ pendings: response.data.data, pending_id : this.props.location.state.pending_id })
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

        apiUrl = "http://localhost:7000/api/union";
        axios.get(apiUrl)
        .then(response => {
            this.setState({ unions: response.data.data })
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

    getRequest(pending_id) {
       

        for(let i = 0; i < this.state.pendings.length; i++){
            if(this.state.pendings[i]._id.toString() === pending_id.toString()){
               
                return this.state.pendings[i]
            }
        }
      }

    getISP = (isp_id) => {
       

        for(let i = 0; i < this.state.isps.length; i++){
            if(this.state.isps[i]._id.toString() === isp_id.toString()){
                return this.state.isps[i].name
            }
        }
    }
    getUnion(union_id) {
   

        for(let i = 0; i < this.state.unions.length; i++){
            if(this.state.unions[i].union_id.toString() === union_id.toString()){
                return this.state.unions[i].name
            }
        }
      }

      getPackage(package_id) {
   

        for(let i = 0; i < this.state.packages.length; i++){
            if(this.state.packages[i]._id.toString() === package_id.toString()){
                return this.state.packages[i]
            }
        }
      }
    render(){
        return(
            
            <div>
                <Header />
                <br></br>
                <br></br>
                <br></br>
                
                <div className="container">
                
                <div className="row">
                <center><h3 style={{"margin":20}}>Request Details</h3><br></br></center>
                    <div className="col">
                    <table className="table table-bordered table-striped">
                    {this.state.pendings.length > 0 && 
                   <tbody>
                       
                       <tr>
                           <td><b>ISP Name</b></td>
                           <td>{this.getISP(this.getRequest(this.state.pending_id || this.props.location.state.pending_id).isp_id)}</td>
                       </tr> 

                       <tr>
                           <td><b>Union Name</b></td>
                           <td>{this.getUnion(this.getRequest(this.state.pending_id || this.props.location.state.pending_id).union_id)}</td>
                       </tr> 

                       <tr>
                           <td><b>Request Arrival Time</b></td>
                           <td>{new Date(this.getRequest(this.state.pending_id || this.props.location.state.pending_id).request_arrival_time).toString()}</td>
                       </tr>

                       <tr>
                           <td><b>Package Name</b></td>
                           <td>{this.getPackage(this.getRequest(this.state.pending_id || this.props.location.state.pending_id).package_id).name}</td>
                       </tr> 

                       <tr>
                           <td><b>Bandwidth</b></td>
                           <td>{this.getPackage(this.getRequest(this.state.pending_id || this.props.location.state.pending_id).package_id).bandwidth} GBPS</td>
                       </tr>

                       <tr>
                           <td><b>Up Speed</b></td>
                           <td>{this.getPackage(this.getRequest(this.state.pending_id || this.props.location.state.pending_id).package_id).up_speed} MBPS</td>
                       </tr>

                       <tr>
                           <td><b>Down Speed</b></td>
                           <td>{this.getPackage(this.getRequest(this.state.pending_id || this.props.location.state.pending_id).package_id).down_speed} MBPS</td>
                       </tr>

                       <tr>
                           <td><b>Duration</b></td>
                           <td>{this.getPackage(this.getRequest(this.state.pending_id || this.props.location.state.pending_id).package_id).duration} months</td>
                       </tr>

                       <tr>
                           <td><b>Price</b></td>
                           <td>{this.getPackage(this.getRequest(this.state.pending_id || this.props.location.state.pending_id).package_id).price} BDT</td>
                       </tr>
                     
                   </tbody> }
               </table>
                    </div>
                </div>

                
                </div>
            </div>
        );
    }
}

