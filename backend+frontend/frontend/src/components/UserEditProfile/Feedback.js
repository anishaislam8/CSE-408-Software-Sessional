import React, { Component } from 'react'
import './../../styles/registration.css'
import * as FaIcons from 'react-icons/fa';


const Feedback = (props) => {

    return(
        
        <tr> 
            
        
            <td>{props.user_name}</td>
            <td>{props.area_name}</td>
            <td>{props.rating}</td>
            <td>{props.details}</td>
            <td>{new Date(props.feedback_arrival_time).toString().split(" ").slice(0,5).join(" ")}</td>
            
        </tr>
              
    );
    
}



export class Feedbacks extends Component {

   

    render() {
        const {values, getAreaName, getUserName, getIspName, isp_id, handleReturn} = this.props
        return (
            <div className="container">
                
                <div  className="registration3inner" style={{"marginTop":120}}>
                <center><h3 className="display-6" style={{"marginTop" : 20}}>Feedbacks of {getIspName(isp_id)}</h3></center>
                <br/>
                
                <table className="table table-bordered table-striped">
                    <thead className="thead-dark">
                        <tr>
                        
                      
                        <th>User Name</th>
                        <th>Area Name</th>
                        <th>Rating By User</th>
                        <th>Feedback</th>
                        <th>Feedback Arrival Time</th>
                        
                        </tr>
                    </thead>
                    <tbody>
                    { 
                        this.props.feedbacks.length > 0 && this.props.feedbacks.map((feedback, index) => {
                           
                            return <Feedback 
                                key={feedback._id} 
                               
                                user_name = {getUserName(feedback.user_id)} 
                                rating = {feedback.rating} 
                                area_name = {getAreaName(feedback.area_id)}
                                details = {feedback.details}
                                feedback_arrival_time = {feedback.feedback_arrival_time} 
                                count={index + 1}
                                feedback_id={feedback._id}
                            />})
                        }
                    </tbody>
                </table>

                <div className="col">
                    <button type="button"  onClick={handleReturn}  className="btn btn-dark btn-lg" style={{"marginTop" : 20, "width":170}}><FaIcons.FaStepBackward size={20} /> Previous</button>
                </div>
                </div>
                
            </div>
        )
    }
}

export default Feedbacks
