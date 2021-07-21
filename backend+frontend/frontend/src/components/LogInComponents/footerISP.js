import React from 'react'
import { Link , NavLink } from 'react-router-dom';

function FooterISP() {
    return (
        
        <div className="row" style={{"marginTop":20}}>
            <div className="col">
            <p className="forgot-password text-left">
                <b>Not Registered? <Link to="/ispRegistration">Register Now!!</Link></b>
            </p>
            </div>

            <div className="col">
                    <p className="forgot-password text-right">
                    <b>Forgot <a href="#">password?</a></b>
                </p>
            </div>
        </div>
        
    )
}

export default FooterISP
