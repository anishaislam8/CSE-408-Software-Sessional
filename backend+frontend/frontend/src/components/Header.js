import React from 'react'
import { Link , NavLink } from 'react-router-dom';
import './../styles/header.css';

function Header() {
    return (
        <div>
        <nav className="navbar navbar-expand-lg fixed-top" style={{"backgroundColor":"#343a40", "color": "white"}}>
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/" style={{"paddingLeft":20, "color" : "white"}}>Fiber@Home</NavLink>
         
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav nav-pills ms-auto">
              <li className="nav-item" style={{"paddingRight":20}}>
                <NavLink className="nav-link" activeClassName="active" style={{"color": "white"}}  to="/nttn/pendings">Pending Requests</NavLink>
              </li>
              <li className="nav-item" style={{"paddingRight":20}}>
                <NavLink className="nav-link" activeClassName="active" style={{"color": "white"}} to="/nttn/renewals">Renewal Requests</NavLink>
              </li>
              
              <li className="nav-item" style={{"paddingRight":20}}>
                <NavLink className="nav-link" activeClassName="active" style={{"color": "white"}} to="/nttn/actives">Active ISP List</NavLink>
              </li>
              <li className="nav-item" style={{"paddingRight":20}}>
                <NavLink className="nav-link" activeClassName="active" style={{"color": "white"}} to="/nttn/reports">Reports</NavLink>
              </li>
              <li className="nav-item" style={{"paddingRight":20}}>
                <NavLink className="nav-link" activeClassName="active" style={{"color": "white"}} to="/nttn/feedbacks">Feedbacks</NavLink>
              </li>
              
            </ul>
          </div>
        </div>
      </nav>
        </div>
    )
}

export default Header
