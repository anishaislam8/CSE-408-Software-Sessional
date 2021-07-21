import React, { Component } from 'react'
import './../../styles/registration.css'
import * as ImIcons from 'react-icons/im';
import logo from './../../img/registration5.gif'
import { Link } from 'react-router-dom'
import * as FaIcons from 'react-icons/fa';



export class FormDeclaration extends Component {

  
    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    }

    previous = e => {
        e.preventDefault();
        this.props.prevStep();
    }

    handleFinalSubmission = () => {
        
    }

   
    render() {
        const {values, handleChange} = this.props;
      
        return (
           <div>
              
                <nav className="navbar fixed-top">
                    <span className="ms-auto"><h3 className="display-5" style={{"marginTop" : 20}}>Step 5 : Terms and Conditions</h3></span>
                </nav>

                <div className="registration5Form">
              
                
                <div className="row">

                   
                   

                    <div className="col">
                        <form className="registration5inner" style={{"marginTop":150, "marginLeft":150}} onSubmit={this.continue}>
                            
                            

                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" required/>
        
                            <label class="form-check-label" for="flexCheckDefault">
                            I/We hereby certify that I/We have carefully read the guidelines/terms and conditions, for the connection and I/We
undertake to comply with the terms and conditions therein.
                            </label>
                            </div>
                            <div class="form-check">
                            <input class="form-check-input" type="checkbox" required/>
                            <label class="form-check-label" for="flexCheckChecked">
                            I/We hereby certify that I/We have carefully read the section 36 of Bangladesh Telecommunication Regulation
Act, 2001 and I/We are not disqualified from obtaining the license
                            </label>
                            </div>

                            <div class="form-check">
                            <input class="form-check-input" type="checkbox" required/>
                            <label class="form-check-label" for="flexCheckChecked">
                            I/We understand that if at any time any information furnished for obtaining the connection is found incorrect then
the connection if granted on the basis of such application shall deemed to be cancelled and shall be liable for action
as per Bangladesh Telecommunication Regulation Act, 2001.
                            </label>
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

                    <div className="col">
                        <img src={logo} alt="loading..." style={{"height":500, "marginRight":160, "marginTop":100}}/>
                    </div>

                    

                   
                </div>
            </div>
           </div>
           
        )
    }
}

export default FormDeclaration;



