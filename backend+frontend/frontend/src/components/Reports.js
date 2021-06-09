import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Report = (props) => {

    return(
        
        <tr> 
            <td>{props.count}</td>
            <td>{props.isp_name}</td>
            <td>{props.union_name}</td>
            <td>{props.problem_category}</td>
            <td>{props.report_arrival_time}</td>
            <td><button type="button" className="btn btn-info">View</button></td>
        </tr>
              
    );
    
}

class Reports extends React.Component {

    state = {
        reports : [],
        isps : [],
        unions : [],
        district : undefined,
        division : undefined,
        subdistrict : undefined,
        union : undefined,
        time : undefined
    }
  

    componentDidMount() {
        let apiUrl = "http://localhost:7000/nttn/reports/sortBy";
        axios.post(apiUrl,{})
        .then(response => {
          this.setState({ reports: response.data.data })
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
            <div class="container">
                <center><h3>Reports from ISP</h3><br></br></center>
                
                <table className="table table-bordered table-striped">
                    <thead className="thead-light">
                        <tr>
                        <th>#</th>
                        <th>ISP Name</th>
                        <th>Union Name</th>
                        <th>Problem Category</th>
                        <th>Report Arrival Time</th>
                        <th>View Report</th>
                        </tr>
                    </thead>
                    <tbody>
                    { 
                        this.state.reports.map((report, index) => {
                           
                            return <Report 
                                key={report._id} 
                                isp_name={this.getIspName(report.isp_id)} 
                                union_name = {this.getUnionName(report.union_id)} 
                                problem_category = {(report.category === "0") ? "Low Bandwidth" : (report.category === "1" ? "Physical Connection Problem" : (report.category === "2" ? "Platform Related Problem" : "Others")) } 
                                report_arrival_time = {report.report_arrival_time} 
                                count={index + 1}
                            />})
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Reports
