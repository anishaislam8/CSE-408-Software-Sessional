import React, { Component } from 'react'
import axios from 'axios'
import { Link, Redirect } from 'react-router-dom';
import * as AiIcons from 'react-icons/ai';
import './../styles/connection.css'
import Header from './Header';

export class ISPDetailsPayment extends Component {
    state={
        payments : [],
        payment_id : this.props.location.state.payment_id,
        isp_id : this.props.location.state.isp_id,
        redirectNTTNConnection:false,
    }
    componentDidMount(){
        let apiUrl = "http://localhost:7000/api/isp/payments";
        let object= {
            isp_id : this.props.location.state.isp_id || this.state.isp_id
        }
        axios.post(apiUrl, object)
        .then(response => {
            this.setState({ payments: response.data.data, payment_id : this.props.location.state.payment_id, isp_id : this.props.location.state.isp_id, })
        })
        .catch((error) => {
          console.log(error);
        })
    }

    getPayment = (payment_id) => {
        for(let i= 0; i < this.state.payments.length; i++){
            if(this.state.payments[i]._id.toString() ===payment_id.toString()){
                return this.state.payments[i]
            }
        }
    }

    back = () =>{
        this.setState({
            redirectNTTNConnection:true
        })
    }
    render() {
        return (
            <div className="container">
                 {this.state.redirectNTTNConnection ? <Redirect to={{
                pathname : "/nttn/ispList/details",
                state : {
                    isp_id : this.state.isp_id
                }}} /> : ""}

                <center><h3 className="display-6" style={{"marginTop" : 100 , "marginBottom" : 30}}>Payment Details</h3></center>
                 <div className="connectioninner">
                 <Header />
                <br></br>
                <br></br>
                <br></br>
              <table className="table table-bordered table-striped">
              <thead className="thead-dark">
                  <tr>
                  <th className="col-md-2">Payment Details</th>
                    <th className="col-md-2">Information</th>
                  </tr>
                    
                </thead>
               {this.state.payments.length > 0 &&  this.state.payment_id &&
                    
                    <tbody>
                        <tr>
                            <td className="col-md-2"><b>Payment Time</b></td>
                            <td className="col-md-2">{new Date(this.getPayment(this.state.payment_id).payment_time).toString().split(" ").slice(0,5).join(" ")}</td>
                        </tr>
                        <tr>
                            <td className="col-md-2"><b>Transaction ID</b></td>
                            <td className="col-md-2">{this.getPayment(this.state.payment_id).transaction_id}</td>
                        </tr>
                        <tr>
                            <td className="col-md-2"><b>Gateway</b></td>
                            <td className="col-md-2">{this.getPayment(this.state.payment_id).gateway}</td>
                        </tr>
                       
                    </tbody>
                }
                </table>
                {!this.state.payments.length > 0 && 
                <h4>No payments found</h4>
                }
                 <button className="btn btn-dark" onClick={this.back} style={{"marginLeft" : 1100}}><AiIcons.AiOutlineStepBackward size={20}/> Back</button>
               

               

            </div>
            </div>
           
        )
    }
}

export default ISPDetailsPayment
