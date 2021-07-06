import React from 'react'
import axios from 'axios'
import _ from 'lodash';
import { Form, Button } from 'react-bootstrap';
import { Col } from 'react-grid-system';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import * as FaIcons from 'react-icons/fa';
import * as FcIcons from 'react-icons/fc';
import * as BsIcons from 'react-icons/bs';
import * as AiIcons from 'react-icons/ai';

import bgimage from './../../img/ispHome.png';
import ISPHeader from './Header';

class ISPHome extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isps : [],
            isp_id : this.props.match.params.id,
            isp_name : "",
        }
    }
    componentDidMount(){
        let apiUrl = "http://localhost:7000/api/isp";
        axios.get(apiUrl)
        .then(response => {
            this.setState({
                isps:response.data.data,
                isp_name : response.data.data.filter((isp) => isp._id.toString() === this.state.isp_id)[0].name
            })
        })
        .catch((error) => {
          console.log(error);
        })
    }

   


    render(){
        return (
            <div>
                <ISPHeader data={this.state.isp_name} id={this.state.isp_id}/>
                <br></br>
                <br></br>
                <br></br>
                <div className="shadow-lg p-3 mb-5 bg-white rounded" style={{margin : 50}}>
                    
                    <div className="row">
                        <div className="col s12 m6" style={{paddingTop : "10%", paddingLeft : "10%"}}>
                            <h1>Welcome to {this.state.isp_name}</h1>
                            
                        </div>
                        <div className="col s12 m6" style = {{paddingRight : "5%"}} >
                            <img src={bgimage} alt="Logo" height="100%" width="90%" />
                        </div>
                    </div>
                
                </div>
            </div>
            
        
           
            );
    }
   
}

export default ISPHome
