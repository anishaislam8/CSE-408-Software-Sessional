import React, { Component } from 'react'
import './../../styles/registration.css'
import * as ImIcons from 'react-icons/im';
import logo from './../../img/registration3.gif'
import { Link } from 'react-router-dom'
import * as FaIcons from 'react-icons/fa';



export class FormPersonnelDetails extends Component {

  
    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    }

    previous = e => {
        e.preventDefault();
        this.props.prevStep();
    }

   
    render() {
        const {values, handleChange} = this.props;
      
        return (
           <div>
              
                <nav className="navbar fixed-top">
                    <span className="ms-auto"><h3 className="display-5" style={{"marginTop" : 20}}>Step 3 : Provide Contact Person Details</h3></span>
                </nav>

                <div className="registration3Form">
              
                
                <div className="row">
                   

                    <div className="col">
                        <form className="registration3inner" style={{"marginTop":120, "marginLeft":200}} onSubmit={this.continue}>
                            
                            

                            <div className="form-group">
                                <label>Contact Person Name</label>
                                <input type="text" value={values.contact_person_name} onChange={handleChange('contact_person_name')} className="form-control" placeholder="Enter Contact Person Name" required minLength="1" maxLength="100"/>
                            </div>

                            <div className="form-group">
                                <label>Contact Person Address</label>
                                <input type="text" value={values.contact_person_address} onChange={handleChange('contact_person_address')} className="form-control" placeholder="Enter Contact Person Address" required minLength="1" maxLength="256"/>
                            </div>

                            <div className="form-group">
                                <label>Contact Person Telephone (+8802NNNNNNNNN )</label>
                                <input type="text" value={values.contact_person_telephone} onChange={handleChange('contact_person_telephone')} className="form-control" placeholder="Enter Contact Person Telephone Number" required minLength="14" maxLength="14"/>
                            </div>

                            <div className="form-group">
                                <label>Contact Person Mobile (+880NNNNNNNNNN)</label>
                                <input type="text" value={values.contact_person_mobile} onChange={handleChange('contact_person_mobile')} className="form-control" placeholder="Enter Contact Person Mobile Number" required minLength="14" maxLength="14"/>
                            </div>

                            <div className="form-group">
                                <label>Contact Person Email</label>
                                <input type="email" value={values.contact_person_email} onChange={handleChange('contact_person_email')} className="form-control" placeholder="Enter Contact Person Email" required />
                            </div>

                            <div className="row">
                                <div className="col">
                                    <Link type="button" className="btn btn-danger btn-lg" style={{"marginTop" : 20, "width":150}} to="/"><ImIcons.ImCancelCircle size={30}/> Cancel</Link>
                                </div>
                                <div className="col">
                                    <button type="button" onClick={this.previous}  className="btn btn-primary btn-lg" style={{"marginTop" : 20, "width":150}}><FaIcons.FaStepBackward size={20} /> Previous</button>
                                </div>
                                <div className="col">
                                    <button type="submit"  className="btn btn-success btn-lg" style={{"marginTop" : 20, "width":150}}>Continue <ImIcons.ImNext2 size={30} /></button>
                                </div>
                            </div>
                      
                      
                           
                            
                        </form>
                    </div>

                    <div className="col">
                        <img src={logo} alt="loading..." style={{"height":500, "marginright":170, "marginTop":200}}/>
                    </div>

                   
                </div>
            </div>
           </div>
           
        )
    }
}

export default FormPersonnelDetails;



