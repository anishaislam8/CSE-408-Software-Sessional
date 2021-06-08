import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export default class Navbar extends Component {
render() {
    return (
        
            <nav class="navbar navbar-expand-md navbar-dark fixed-top">
                <div class="container">
                    <h1 class="navbar-brand text-warning font-weight-bold">Fiber@Home</h1>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsenavbar">
                        <span class="navbar-toggler-icon"> </span>
                    </button>
                    <div class="collapse navbar-collapse text-center" id="collapsenavbar">
                        <ul class="navbar-nav nav-pills ml-auto">
                            <li class="nav-item" style={{ 'padding-right': '20px'}}>
                                <Link to="/" className="nav-link active text-whited">Home</Link>
                            </li>

                            <li class="nav-item"  style={{ 'padding-right': '20px'}}>
                                <Link to="/pending" class="nav-link text-white">Pending Requests</Link>
                            </li>

                            <li class="nav-item"  style={{ 'padding-right': '20px'}}>
                                <Link to="/renewal" class="nav-link text-white">Renewal Requests</Link>
                            </li>

                            <li class="nav-item" style={{ 'padding-right': '20px'}}>
                                <Link to="/cancel" class="nav-link text-white">Cancellation Requests</Link>
                            </li>

                            <li class="nav-item" style={{ 'padding-right': '20px'}}>
                                <Link to="/isps" class="nav-link text-white">Active ISPs</Link>
                            </li>

                            <li class="nav-item" style={{ 'padding-right': '20px'}}>
                                <Link to="/reports" class="nav-link text-white">Reports</Link>
                            </li>

                            <li class="nav-item" style={{ 'padding-right': '20px'}}>
                                <Link to="/feedback" class="nav-link text-white">Feedbacks</Link>
                            </li>
                        </ul>

                    </div>
                </div>
            </nav>
     );
    }
}