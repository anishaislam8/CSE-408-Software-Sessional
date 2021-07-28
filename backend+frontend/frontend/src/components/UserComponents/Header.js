
import React from 'react'
import { Link , NavLink } from 'react-router-dom';
import './../../styles/ispHeader.css';
import * as FaIcons from 'react-icons/fa';
import * as ImIcons from 'react-icons/im';
import * as BsIcons from 'react-icons/bs';
import * as IoIcons from 'react-icons/io';
import * as VscIcons from 'react-icons/vsc';
import * as GoIcons from 'react-icons/go';
import {NavDropdown} from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown'


function UserHeader(props) {

    
    return (
        <div>
        <nav className="navbar navbar-expand-lg  bg-dark fixed-top" style={{ "color": "white"}}>
        <div className="container-fluid">
          <NavLink className="navbar-brand" to={`/user/${props.id}`} style={{"paddingLeft":20, "color" : "white"}}>{props.data}</NavLink>
         
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav nav-pills ms-auto">
            
            {/* <li className="nav-item dropdown"  style={{"paddingRight":20, "color" : 'white'}}>
            
            <NavDropdown title= "Connection" id="basic-nav-dropdown" style={{"color":"white"}}>
              <NavDropdown.Item href="/nttn/connection">Connection Requests</NavDropdown.Item>
              <NavDropdown.Item href="/nttn/pendings">Pending Requests</NavDropdown.Item>
              <NavDropdown.Item href="/nttn/confirmConnection">Confirm Connection</NavDropdown.Item>
              
              <NavDropdown.Item href="/nttn/renewals">Renewal Requests</NavDropdown.Item>
            </NavDropdown>
             
            </li>
          
              <li className="nav-item" style={{"paddingRight":20}}>
                <NavLink className="nav-link" activeClassName="active" style={{"color": "white"}} to="/nttn/isplist"><FaIcons.FaList size={20}/>  ISP List</NavLink>
              </li>*/}
             
              {/* <li className="nav-item" style={{"paddingRight":20}}>
             <NavLink className="nav-link" activeClassName="active" style={{"color": "white"}}  to="/nttn/settings"><IoIcons.IoMdSettings size={20}/> Settings</NavLink>
              </li>*/}
              <li className="nav-item dropdown"  style={{ "color" : 'white'}}> 
            
                <div className="dropdown">
                    <button className="btn dark dropdown-toggle" type="button" id="dropdownMenuButton" style={{"color": "white"}} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <IoIcons.IoMdSettings size={20}/>
                    </button>
                    <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                    {/* <Link className="dropdown-item" to={{
                           pathname: `/user/${props.id}/edit`,
                           state: {
                               data : props.data,
                               id : props.id
                            }
                            }}>Edit Profile</Link> */}
                    <Link className="dropdown-item" to={{
                        pathname: `/user/${props.id}/createReport`,
                        state: {
                            data : props.data,
                            id : props.id
                        }
                        }}>Report a Problem</Link>
                    <Link className="dropdown-item" to={{
                            pathname: `/user/${props.id}/createFeedback`,
                            state: {
                                data : props.data,
                                id : props.id
                            }
                            }}>Give Us Feedback</Link>
                    <Link className="dropdown-item" to={{
                        pathname: "/",
                       
                        }}>Log Out</Link>
                        
                    </div>
                </div>
                
            </li>
              
            </ul>
          </div>
        </div>
      </nav>
        </div>
    )
}

export default UserHeader


