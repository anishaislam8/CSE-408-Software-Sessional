import React from 'react'
import { Link , NavLink } from 'react-router-dom';

function FooterAdmin() {
    return (
        
        <div className="row" style={{"marginTop":20}}>
           

            <div className="col">
                    <p className="forgot-password text-right">
                    <b>Forgot <a href="#">password?</a></b>
                </p>
            </div>
        </div>
        
    )
}

export default FooterAdmin
