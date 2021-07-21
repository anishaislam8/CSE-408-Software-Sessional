import React, { Component } from 'react'
import * as ImIcons from 'react-icons/im';
import './../../styles/registration.css'
import logo from './../../img/registration1.gif'
import { Link } from 'react-router-dom'

export class FormISPDetails extends Component {

  
    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    }

    

   
    render() {
        const {values, handleChange} = this.props;
      
        return (
           <div>
              
                <nav className="navbar fixed-top">
                    <span className="ms-auto"><h3 className="display-5" style={{"marginTop" : 20}}>Step 1 : Provide Details of ISP</h3></span>
                </nav>

                <div className="registration1Form">
              
                
                <div className="row">
                   

                    <div className="col">
                        <form className="registration1inner" style={{"marginTop":100, "marginLeft":200}} onSubmit={this.continue}>
                            
                            <div className="form-group">
                                <label>ISP Name</label>
                                <input type="text" value={values.isp_name} onChange={handleChange('isp_name')} className="form-control" placeholder="Enter ISP Name" required minLength="1" maxLength="100"/>
                            </div>

                            <div className="form-group">
                                <label>License Number</label>
                                <input type="text" value={values.license_number} onChange={handleChange('license_number')} className="form-control" placeholder="Enter License Number" minLength="6"  required/>
                            </div>

                            <div className="form-group">
                                <label>Head Office Address</label>
                                <input type="text" value={values.head_office_address} onChange={handleChange('head_office_address')} className="form-control" placeholder="Enter Head Office Address" required minLength="1" maxLength="256"/>
                            </div>

                            <div className="form-group">
                                <label>Head Office Telephone (+8802NNNNNNNNN )</label>
                                <input type="text" value={values.head_office_telephone} onChange={handleChange('head_office_telephone')} className="form-control" placeholder="Enter Head Office Telephone Number" required minLength="14" maxLength="14"/>
                            </div>

                            <div className="form-group">
                                <label>Head Office Mobile (+880NNNNNNNNNN)</label>
                                <input type="text" value={values.head_office_mobile} onChange={handleChange('head_office_mobile')} className="form-control" placeholder="Enter Head Office Mobile Number" required minLength="14" maxLength="14"/>
                            </div>

                            <div className="form-group">
                                <label>Head Office Email</label>
                                <input type="email" value={values.head_office_email} onChange={handleChange('head_office_email')} className="form-control" placeholder="Enter Head Office Email" required />
                            </div>

                            <div className="row">
                                <div className="col">
                                    <Link type="button" className="btn btn-dark btn-lg" style={{"marginTop" : 20, "width":150}} to="/"><ImIcons.ImCancelCircle size={30}/> Cancel</Link>
                                </div>
                                <div className="col">
                                    <button type="submit"  className="btn btn-info btn-lg" style={{"marginTop" : 20, "marginLeft":100, "width":150}}>Continue <ImIcons.ImNext2 size={30} /></button>
                                </div>
                            </div>

                            
                           
                            
                        </form>
                    </div>

                    <div className="col">
                        <img src={logo} alt="loading..." style={{"height":500, "marginRight":150, "marginTop":200}}/>
                    </div>
                </div>
            </div>
           </div>
           
        )
    }
}

export default FormISPDetails;



