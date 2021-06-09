import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Active = (props) => {

    return(
        
        <tr> 
            <td>{props.count}</td>
            <td>{props.isp_name}</td>
            <td>{props.license_id}</td>
            <td>{props.connection_started}</td>
            <td><button type="button" className="btn btn-info">View</button></td>
        </tr>
              
    );
    
}

class Actives extends React.Component {

    state = {
        isps : [],
        district : undefined,
        division : undefined,
        subdistrict : undefined,
        union : undefined,
        time : undefined,
        rating : undefined
    }
  

    componentDidMount() {
        
        let apiUrl = "http://localhost:7000/api/isp";
        axios.get(apiUrl)
        .then(response => {
            let arr = response.data.data;
            let filteredResponses = arr.filter((isp) => isp.connection_status === true)
            this.setState({ isps: filteredResponses })
        })
        .catch((error) => {
          console.log(error);
        })

       
        
    }


    // getRating= (isp_id) => {
       
    //     let apiUrl = "http://localhost:7000/api/isp/rating";
    //     axios.post(apiUrl, {isp_id})
    //     .then(response => {
    //         this.setState({ ispRating: response.data.data.rating })
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     })

    //     return this.state.ispRating;
        
    // }

   
    
    render() {
        return(
            <div className="container">
                <center><h3>Active ISP List</h3><br></br></center>
                
                <table className="table table-bordered table-striped">
                    <thead className="thead-light">
                        <tr>
                        <th>#</th>
                        <th>ISP Name</th>
                        <th>License ID</th>
                        <th>Connection Started</th>
                        <th>View Details</th>
                        </tr>
                    </thead>
                    <tbody>
                    { 
                        this.state.isps.map((isp, index) => {
                           
                            return <Active 
                                key={isp._id} 
                                isp_name={isp.name} 
                                license_id = {isp.license_id} 
                                connection_started = {isp.connection_establishment_time}
                                count={index + 1}
                            />})
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Actives
