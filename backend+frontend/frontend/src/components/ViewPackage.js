import React, { Component } from 'react'
import axios from 'axios'
import { Link, Redirect } from 'react-router-dom';
import * as AiIcons from 'react-icons/ai';
import './../styles/connection.css'
import Header from './Header';

export class ISPDetailsPackage extends Component {
    state={
        packages : [],
        package_id : this.props.location.state.package_id,
        isp_id : this.props.location.state.isp_id,
        redirectNTTNConnection:false,
    }
    componentDidMount(){
        let apiUrl = "http://localhost:7000/api/ispPackage";
        axios.get(apiUrl)
        .then(response => {
            this.setState({ packages: response.data.data, package_id : this.props.location.state.package_id, isp_id : this.props.location.state.isp_id, })
        })
        .catch((error) => {
          console.log(error);
        })
    }

    getPackage = (package_id) => {
        for(let i= 0; i < this.state.packages.length; i++){
            if(this.state.packages[i]._id.toString() ===package_id.toString()){
                return this.state.packages[i]
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

                <center><h3 className="display-6" style={{"marginTop" : 100 , "marginBottom" : 30}}>Package Details</h3></center>
                 <div className="connectioninner3">
                 <Header />
                <br></br>
                <br></br>
                <br></br>
              <table className="table table-bordered table-striped">
              <thead className="thead-dark">
                  <tr>
                  <th className="col-md-2">Package Details</th>
                    <th className="col-md-2">Information</th>
                  </tr>
                    
                </thead>
               {this.state.packages.length > 0 &&  
                    
                    <tbody>
                        <tr>
                            <td className="col-md-2"><b>Package Name</b></td>
                            <td className="col-md-2">{this.getPackage(this.state.package_id).name}</td>
                        </tr>
                        <tr>
                            <td className="col-md-2"><b>Bandwidth</b></td>
                            <td className="col-md-2">{this.getPackage(this.state.package_id).bandwidth} GBPS</td>
                        </tr>
                        <tr>
                            <td className="col-md-2"><b>Up Speed</b></td>
                            <td className="col-md-2">{this.getPackage(this.state.package_id).up_speed} GBPS</td>
                        </tr>
                        <tr>
                            <td className="col-md-2"><b>Down Speed</b></td>
                            <td className="col-md-2">{this.getPackage(this.state.package_id).down_speed} GBPS</td>
                        </tr>
                        <tr>
                            <td className="col-md-2"><b>Price</b></td>
                            <td className="col-md-2">{this.getPackage(this.state.package_id).price} BDT</td>
                        </tr>
                    </tbody>
                }
                </table>
                {!this.state.packages.length > 0 && 
                <h4>No details found</h4>
                }
                 <button className="btn btn-dark" onClick={this.back} style={{"marginLeft" : 1100}}><AiIcons.AiOutlineStepBackward size={20}/> Back</button>
               

               

            </div>
            </div>
           
        )
    }
}

export default ISPDetailsPackage
