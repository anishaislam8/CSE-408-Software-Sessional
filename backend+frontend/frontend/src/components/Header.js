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
              <li className="nav-item">
                <Link className="nav-link" to="#">Pending Requests</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="#">Renewal Requests</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="#">Confirm Connection</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="#">Active ISP List</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/nttn/reports">Reports</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="#">Feedbacks</Link>
              </li>
              
            </ul>
          </div>
        </div>
      </nav>
        </div>
    )
}

export default Header
