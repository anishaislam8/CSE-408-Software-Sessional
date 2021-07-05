import React from 'react'
import { Link , NavLink } from 'react-router-dom';
import './../styles/header.css';
import * as FaIcons from 'react-icons/fa';
import * as FcIcons from 'react-icons/fc';
import * as BsIcons from 'react-icons/bs';
import * as AiIcons from 'react-icons/ai';
import * as VscIcons from 'react-icons/vsc';
import * as GoIcons from 'react-icons/go';

function Header() {
    return (
        <div>
        <nav className="navbar navbar-expand-lg fixed-top" style={{"backgroundColor":"#343a40", "color": "white"}}>
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/" style={{"paddingLeft":20, "color" : "white"}}>Fiber@Home</NavLink>
         
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav nav-pills ms-auto">
              <li className="nav-item" style={{"paddingRight":20}}>
                <NavLink className="nav-link" activeClassName="active" style={{"color": "white"}}  to="/nttn/pendings"><FaIcons.FaClipboardList size={20}/> Pending Requests</NavLink>
              </li>
              <li className="nav-item" style={{"paddingRight":20}}>
                <NavLink className="nav-link" activeClassName="active" style={{"color": "white"}} to="/nttn/renewals"><FaIcons.FaListOl size={20}/>  Renewal Requests</NavLink>
              </li>
              
              <li className="nav-item" style={{"paddingRight":20}}>
                <NavLink className="nav-link" activeClassName="active" style={{"color": "white"}} to="/nttn/isplist"><FaIcons.FaList size={20}/>  ISP List</NavLink>
              </li>
              <li className="nav-item" style={{"paddingRight":20}}>
                <NavLink className="nav-link" activeClassName="active" style={{"color": "white"}} to="/nttn/reports"><GoIcons.GoAlert size={20}/>  Reports</NavLink>
              </li>
              <li className="nav-item" style={{"paddingRight":20}}>
                <NavLink className="nav-link" activeClassName="active" style={{"color": "white"}} to="/nttn/feedbacks"><VscIcons.VscFeedback size={20}/> Feedbacks</NavLink>
              </li>
              
            </ul>
          </div>
        </div>
      </nav>
        </div>
    )
}

export default Header
