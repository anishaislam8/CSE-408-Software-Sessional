import React from 'react'
import axios from 'axios'
import Header from './Header';

const Renewal = (props) => {

    return(
        
        <tr> 
            <td>{props.count}</td>
            <td>{props.isp_name}</td>
            <td>{props.union_name}</td>
            <td>{props.request_arrival_time}</td>
            <td><button type="button" className="btn btn-success">Accept</button></td>
            <td><button type="button" className="btn btn-danger">Reject</button></td>
        </tr>
              
    );
    
}

class Renewals extends React.Component {

    state = {
        renewals : [],
        isps : [],
        unions : [],
        district : undefined,
        division : undefined,
        subdistrict : undefined,
        union : undefined,
        time : undefined
    }
  

    componentDidMount() {

        let apiUrl = "http://localhost:7000/nttn/renewal";
        axios.get(apiUrl)
        .then(response => {
          this.setState({ renewals: response.data.data })
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
                <Header />
                <br></br>
                <br></br>
                <br></br>
                 <div className="container" >
                <center><h3>Renewal Requests From ISP</h3><br></br></center>
                
                <table className="table table-bordered table-striped">
                    <thead className="thead-dark">
                        <tr>
                        <th>#</th>
                        <th>ISP Name</th>
                        <th>Union Name</th>
                        <th>Request Arrival Time</th>
                        <th>Accept Request</th>
                        <th>Reject Request</th>
                        </tr>
                    </thead>
                    <tbody>
                    { 
                        this.state.renewals.map((renewal, index) => {
                           
                            return <Renewal  
                                key={renewal._id} 
                                isp_name={this.getIspName(renewal.isp_id)} 
                                union_name = {this.getUnionName(renewal.union_id)} 
                                request_arrival_time = {renewal.request_arrival_time} 
                                count={index + 1}
                            />})
                        }
                    </tbody>
                </table>
            </div>
            </div>
           
        );
    }
}

export default Renewals
