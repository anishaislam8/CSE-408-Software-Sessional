import React from 'react'
import { Link } from 'react-router-dom';

function Header() {
    return (
        <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Fiber@Home</Link>
         
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav nav-pills ms-auto">
              <li className="nav-item" style={{"paddingRight":20, "color" : "white"}}>
                <Link className="nav-link" to="/nttn/pendings">Pending Requests</Link>
              </li>
              <li className="nav-item" style={{"paddingRight":20, "color" : "white"}}>
                <Link className="nav-link" to="/nttn/renewals">Renewal Requests</Link>
              </li>
              <li className="nav-item" style={{"paddingRight":20,"color" : "white"}}>
                <Link className="nav-link" to="#">Confirm Connection</Link>
              </li>
              <li className="nav-item" style={{"paddingRight":20, "color" : "white"}}>
                <Link className="nav-link" to="/nttn/actives">Active ISP List</Link>
              </li>
              <li className="nav-item" style={{"paddingRight":20,"color" : "white"}}>
                <Link className="nav-link" to="/nttn/reports">Reports</Link>
              </li>
              <li className="nav-item" style={{"paddingRight":20,"color" : "white"}}>
                <Link className="nav-link" to="/nttn/feedbacks">Feedbacks</Link>
              </li>
              
            </ul>
          </div>
        </div>
      </nav>
        </div>
    )
}

export default Header
