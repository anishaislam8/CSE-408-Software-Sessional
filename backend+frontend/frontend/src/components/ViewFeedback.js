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

const getUserName = (user_id, users) => {
       

    for(let i = 0; i < users.length; i++){
        if(users[i]._id === user_id){
            return users[i].name
        }
    }
}

const getAreaName = (area_id, areas) => {
       

    for(let i = 0; i < areas.length; i++){
        if(areas[i]._id === area_id){
            return areas[i].name
        }
    }
}

function ViewFeedback(){
    
    const location = useLocation();
    const { feedback_id } = location.state;
    const [isps, setIsps] = useState([]);
    const [unions, setUnions] = useState([]);
    const [users, setUsers] = useState([]);
    const [areas, setAreas] = useState([]);
    const [feedback, setFeedback] = useState({});

    

    useEffect(() => {
        let apiUrl = "http://localhost:7000/nttn/feedbacks/view";
        const object = {
            feedback_id : feedback_id
        }


        axios.post(apiUrl,object)
        .then(response => {
            setFeedback(response.data.data);

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

        apiUrl = "http://localhost:7000/api/area";
        axios.get(apiUrl)
        .then(response => {
            setAreas(response.data.data)
        })
        .catch((error) => {
          console.log(error);
        })

        apiUrl = "http://localhost:7000/api/user";
        axios.get(apiUrl)
        .then(response => {
            setUsers(response.data.data)
        })
        .catch((error) => {
          console.log(error);
        })
    },[])

    return (
        <div className="container">
        <center><h3>Feedback from {getUserName(feedback.user_id, users)}</h3><br></br></center>

        
        <table className="table table-bordered table-striped">
           
            <tbody>
                <tr>
                    <td> <b>ISP Name : </b></td>
                    <td>{getIspName(feedback.isp_id, isps)}</td>
                </tr>
               
                <tr>
                    <td> <b>User Name : </b></td>
                    <td>{getUserName(feedback.user_id, users)}</td>
                </tr>
                <tr>
                    <td><b>Area Name : </b></td>
                    <td>{getAreaName(feedback.area_id, areas)}</td>
                </tr>
                
                <tr>
                    <td><b>Details : </b></td>
                    <td>{feedback.details}</td>
                </tr>
                <tr>
                    <td><b>Feedback Arrival Time : </b></td>
                    <td>{feedback.feedback_arrival_time}</td>
                </tr>
                <tr>
                    <td><b>Rating : </b></td>
                    <td>{feedback.rating}</td>
                </tr>
                <tr>
                    <td><b>Warn ISP : </b></td>
                    <td><button type="button" className="btn btn-danger">Warn</button></td>
                </tr>
            </tbody>
        </table>
    </div>
    )

    
}

export default ViewFeedback
