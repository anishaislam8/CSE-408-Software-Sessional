import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './navbar.component';
import ListView from './list-view.component';

export default class PendingIspList extends Component {
    render() {
        return (
            <div>
               <Navbar/>
                <ListView />
                <div id="footer">
                <footer class="footer">
                    <h6 class="text-center text-white">Copyright &copy; 2021, Fiber@Home</h6>
                </footer>
                </div>
            </div>
            );
        }
    }