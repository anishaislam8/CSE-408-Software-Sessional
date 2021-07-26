import React, { Component } from 'react'
import './../../styles/registration.css'
import * as AiIcons from 'react-icons/ai';
import logo from './../../img/registration6.gif'
import { Link } from 'react-router-dom'
import * as FaIcons from 'react-icons/fa';



export class Success extends Component {

   
    render() {
      
        return (
           <div>
                <center>
                <h3 className="display-5" style={{"marginTop" : 20}}>Your request was successfully sent to the ISP</h3>
                <h3 className="display-6" style={{"marginTop" : 20}}>Further instructions and updates will be sent to you via email</h3>
                <img src={logo} alt="loading..." style={{"height":500}}/>
                <br/>
                <Link type="button" className="btn btn-success btn-lg" style={{ "width":250}} to="/"><AiIcons.AiOutlineHome size={30}/> Back to Home</Link>
                </center>
          
            </div>
          
           
        )
    }
}

export default Success;



