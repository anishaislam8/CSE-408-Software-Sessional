import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { useLocation } from 'react-router';

const getIspName = (isp_id, isps) => {
       

    for(let i = 0; i < isps.length; i++){
        if(isps[i]._id === isp_id){
            return isps[i].name
        }
    }
}


const getUnionName = (union_id, unions) => {
   

    for(let i = 0; i < unions.length; i++){
        if(unions[i].union_id === union_id){
            return unions[i].name
        }
    }
}

function ViewReport(){
    
    const location = useLocation();
    const { report_id } = location.state;
    const [isps, setIsps] = useState([]);
    const [unions, setUnions] = useState([]);
    const [report, setReport] = useState({});

    

    useEffect(() => {
        let apiUrl = "http://localhost:7000/nttn/reports/view";
        const object = {
            report_id : report_id
        }


        axios.post(apiUrl,object)
        .then(response => {
            setReport(response.data.data);

        })
        .catch((error) => {
          console.log(error);
        })
        

        apiUrl = "http://localhost:7000/api/isp";
        axios.get(apiUrl)
        .then(response => {
            setIsps(response.data.data)
        })
        .catch((error) => {
          console.log(error);
        })

        apiUrl = "http://localhost:7000/api/union";
        axios.get(apiUrl)
        .then(response => {
            setUnions(response.data.data)
        })
        .catch((error) => {
          console.log(error);
        })
    },[])

    return (
        <div className="container">
        <center><h3>Report from {getIspName(report.isp_id, isps)}</h3><br></br></center>

        
        <table className="table table-bordered table-striped">
           
            <tbody>
                <tr>
                    <td> <b>ISP Name : </b></td>
                    <td>{getIspName(report.isp_id, isps)}</td>
                </tr>
                <tr>
                    <td><b>Union Name : </b></td>
                    <td>{getUnionName(report.union_id, unions)}</td>
                </tr>
                <tr>
                    <td><b>Problem Category : </b></td>
                    <td>{(report.category === "0") ? "Low Bandwidth" : (report.category === "1" ? "Physical Connection Problem" : (report.category === "2" ? "Platform Related Problem" : "Others")) } </td>
                </tr>
                <tr>
                    <td><b>Details : </b></td>
                    <td>{report.details}</td>
                </tr>
                <tr>
                    <td><b>Report Arrival Time : </b></td>
                    <td>{report.report_arrival_time}</td>
                </tr>
                <tr>
                    <td><b>Resolve Status : </b></td>
                    <td>{report.resolve_status === false ? "False" : "True"}</td>
                </tr>
                <tr>
                    <td><b>Solve Problem : </b></td>
                    <td><button type="button" className="btn btn-warning">Solve</button></td>
                </tr>
            </tbody>
        </table>
    </div>
    )

    
}

export default ViewReport
