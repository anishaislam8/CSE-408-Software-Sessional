import React, { Component } from 'react'
import './../../styles/registration.css'
import * as ImIcons from 'react-icons/im';
import * as FaIcons from 'react-icons/fa';
import logo from './../../img/registration2.gif'
import { Link } from 'react-router-dom'



export class FormConnectionDetails extends Component {

  
    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    }

    previous = e => {
        e.preventDefault();
        this.props.prevStep();
    }

   
    render() {
        const {values, handleChange, handleChangeDivision, handleChangeDistrict, handleChangeUnion, handleChangeUpazilla} = this.props;
      
        return (
           <div>
              
                <nav className="navbar fixed-top">
                    <span><h3 className="display-5" style={{"marginTop" : 20}}>Step 2 : Provide Location Details</h3></span>
                </nav>

                <div className="registration2Form">
              
                
                <div className="row">
                    <div className="col">
                        <img src={logo} alt="loading..." style={{"height":500, "marginLeft":120, "marginTop":200}}/>
                    </div>

                    <div className="col">
                        <form className="registration2inner" style={{"marginTop":100, "marginLeft":100}} onSubmit={this.continue}>
                            
                            <label>Choose Union</label>
                            <div className="row">
                                <div className="col">
                                <div className="form-group">
                                    <label>Division</label>
                                    <select className="form-control" value={values.selectedDivision} onChange={handleChangeDivision} style={{"width":120}} required>
                                    <option disabled hidden value={""}>Select</option>
                                    {
                                        values.divisions.map((division) =><option key={division.division_id} value={division.division_id}>{division.name}</option>)
                                    }
                                    </select>
                                </div>
                                </div>
                                <div className="col">
                                <div className="form-group" >
                                    <label>District</label>
                                    <select className="form-control" value={values.selectedDistrict} onChange={handleChangeDistrict} style={{"width":120}} required>
                                    <option value={""} disabled hidden>Select</option>
                                    {
                                        values.searchdistricts.map((district) => <option key={district.district_id} value={district.district_id}>{district.name}</option>)
                                    }
                                    </select>
                                </div>
                                </div>

                                
                                <div className="col">
                                <div className="form-group">
                                    <label>Upazilla</label>
                                    <select className="form-control" value={values.selectedUpazilla} onChange={handleChangeUpazilla} style={{"width":120}} required>
                                    <option value={""} disabled hidden>Select</option>
                                    {
                                        values.searchupazillas.map((upazilla) => <option key={upazilla.upazilla_id} value={upazilla.upazilla_id}>{upazilla.name}</option>)
                                    }
                                    </select>
                                </div>
                                </div>

                                
                                <div className="col">
                                <div className="form-group">
                                    <label>Union</label>
                                    <select className="form-control" value={values.selectedUnion} onChange={handleChangeUnion} style={{"width":120}} required>
                                    <option value={""} disabled hidden>Select</option>
                                    {
                                        values.searchunions.map((union) => <option key={union.union_id} value={union.union_id}>{union.name}</option>)
                                    }
                                    </select>
                                </div>
                                </div>

                                                
                            </div>

                            <div className="form-group">
                                <label>Office Address</label>
                                <input type="text" value={values.office_address} onChange={handleChange('office_address')} className="form-control" placeholder="Enter Office Address" required minLength="1" maxLength="256"/>
                            </div>

                            <div className="form-group">
                                <label>Office Telephone (+8802NNNNNNNNN )</label>
                                <input type="text" value={values.office_telephone} onChange={handleChange('office_telephone')} className="form-control" placeholder="Enter Office Telephone Number" required minLength="14" maxLength="14"/>
                            </div>

                            <div className="form-group">
                                <label>Office Mobile (+880NNNNNNNNNN)</label>
                                <input type="text" value={values.office_mobile} onChange={handleChange('office_mobile')} className="form-control" placeholder="Enter Office Mobile Number" required minLength="14" maxLength="14"/>
                            </div>

                            <div className="form-group">
                                <label>Office Email</label>
                                <input type="email" value={values.office_email} onChange={handleChange('office_email')} className="form-control" placeholder="Enter Office Email" required />
                            </div>

                            <div className="row">
                                <div className="col">
                                    <Link type="button" className="btn btn-danger btn-lg" style={{"marginTop" : 20, "width":170}} to="/"><ImIcons.ImCancelCircle size={30}/> Cancel</Link>
                                </div>
                                <div className="col">
                                    <button type="button" onClick={this.previous}  className="btn btn-primary btn-lg" style={{"marginTop" : 20, "width":170}}><FaIcons.FaStepBackward size={20} /> Previous</button>
                                </div>
                                <div className="col">
                                    <button type="submit"  className="btn btn-success btn-lg" style={{"marginTop" : 20, "width":170}}>Continue <ImIcons.ImNext2 size={30} /></button>
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

export default FormConnectionDetails;



