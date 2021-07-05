
import React from 'react'
import { Link , NavLink } from 'react-router-dom';
import './../styles/header.css';
import * as FaIcons from 'react-icons/fa';
import * as ImIcons from 'react-icons/im';
import * as BsIcons from 'react-icons/bs';
import * as IoIcons from 'react-icons/io';
import * as VscIcons from 'react-icons/vsc';
import * as GoIcons from 'react-icons/go';
import {NavDropdown} from 'react-bootstrap';

function Header() {
    return (
        <div>
        <nav className="navbar navbar-expand-lg fixed-top" style={{"backgroundColor":"#343a40", "color": "white"}}>
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/" style={{"paddingLeft":20, "color" : "white"}}>Fiber@Home</NavLink>
         
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav nav-pills ms-auto">
            
            <li className="nav-item dropdown"  style={{"paddingRight":20, "color" : 'white'}}>
            
            <NavDropdown title= "Connection" id="basic-nav-dropdown" style={{"color":"white"}}>
              <NavDropdown.Item href="/nttn/connection">Connection Requests</NavDropdown.Item>
              <NavDropdown.Item href="/nttn/pendings">Pending Requests</NavDropdown.Item>
              <NavDropdown.Item href="/nttn/confirmConnection">Confirm Connection</NavDropdown.Item>
              
              <NavDropdown.Item href="/nttn/renewals">Renewal Requests</NavDropdown.Item>
            </NavDropdown>
             
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
              <li className="nav-item" style={{"paddingRight":20}}>
             <NavLink className="nav-link" activeClassName="active" style={{"color": "white"}}  to="/nttn/settings"><IoIcons.IoMdSettings size={20}/> Settings</NavLink>
              </li>
              
            </ul>
          </div>
        </div>
      </nav>
        </div>
    )
}

export default Header


