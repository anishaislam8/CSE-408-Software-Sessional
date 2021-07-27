import React, { Component } from 'react'
import './../../styles/registration.css'
import * as ImIcons from 'react-icons/im';
import logo from './../../img/registration4.gif'
import { Link , Redirect} from 'react-router-dom'
import * as FaIcons from 'react-icons/fa';



export class FormTechnicalDetails extends Component {

   
    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    }

    previous = e => {
        e.preventDefault();
        this.props.prevStep();
    }

    handleFinalSubmission = () => {
        this.props.saveISP();
        
    }

   

   
    render() {
        const {values, handleChange} = this.props;
       
        return (
           <div>
              
                <nav className="navbar fixed-top">
                    <span><h3 className="display-5" style={{"marginTop" : 20}}>Edit password</h3></span>
                </nav>

                <div className="registration4Form">
              
                
                <div className="row">

                    <div className="col">
                        <img src={logo} alt="loading..." style={{"height":500, "marginLeft":160, "marginTop":150}}/>
                    </div>
                   

                    <div className="col">
                        <form className="registration4inner" style={{"marginTop":250, "marginRight":150}} onSubmit={this.continue}>
                            
                            

                            <div className="form-group">
                                <label>Change password (optional)</label>
                                <input type="password" value={values.password} onChange={handleChange('password')} className="form-control" placeholder="Enter new password" minLength="6"/>
                            </div>

                            <div className="row">
                                <div className="col">
                                    <Link type="button" className="btn btn-danger btn-lg" style={{"marginTop" : 20, "width":150}} to="/"><ImIcons.ImCancelCircle size={30}/> Cancel</Link>
                                </div>
                                <div className="col">
                                    <button type="button" onClick={this.previous}  className="btn btn-primary btn-lg" style={{"marginTop" : 20, "width":150}}><FaIcons.FaStepBackward size={20} /> Previous</button>
                                </div>
                                <div className="col">
                                    <button type="submit" onClick={this.handleFinalSubmission} className="btn btn-success btn-lg" style={{"marginTop" : 20, "width":150}}>Confirm <ImIcons.ImNext2 size={30} /></button>
                                </div>
                            </div>
                      
                      
                           
                            
                        </form>
                    </div>

                    

                   
                </div>
            </div>
           </div>
           
        )
    }
}

export default FormTechnicalDetails;



