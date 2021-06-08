import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Pending = (props) => {

    return(
        
        <tr> 
            <td>{props.count}</td>
            <td>{props.isp_name}</td>
            <td>{props.union_name}</td>
            <td>{props.request_arrival_time}</td>
        </tr>
              
    );
    
}

class Pendings extends React.Component {

    state = {
        pendings : [],
        isps : [],
        unions : [],
        district : undefined,
        division : undefined,
        subdistrict : undefined,
        union : undefined,
        time : undefined
    }
  

    componentDidMount() {

        let apiUrl = "http://localhost:7000/nttn/pending";
        axios.get(apiUrl)
        .then(response => {
          this.setState({ pendings: response.data.data })
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
        
    }

      
    getIspName = (isp_id) => {
       

        for(let i = 0; i < this.state.isps.length; i++){
            if(this.state.isps[i]._id === isp_id){
                return this.state.isps[i].name
            }
        }
    }


    getUnionName = (union_id) => {
       

        for(let i = 0; i < this.state.unions.length; i++){
            if(this.state.unions[i].union_id === union_id){
                return this.state.unions[i].name
            }
        }
    }

   
    
    render() {
        return(
            <div>
                <center><h3>Pending Requests From ISP</h3><br></br></center>
                
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                        <th></th>
                        <th>ISP Name</th>
                        <th>Union Name</th>
                        <th>Request Arrival Time</th>
                        </tr>
                    </thead>
                    <tbody>
                    { 
                        this.state.pendings.map((pending, index) => {
                           
                            return <Pending 
                                key={pending._id} 
                                isp_name={this.getIspName(pending.isp_id)}
                                union_name = {this.getUnionName(pending.union_id)} 
                                request_arrival_time = {pending.request_arrival_time} 
                                count={index + 1}
                            />})
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Pendings
