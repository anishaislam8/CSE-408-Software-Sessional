import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navbar from "./navbar.component"

export default class Home extends Component {
render() {
    return (
      <div className="bgimg">
        <Navbar />
        <div class="container text-center text-white headerset">
          <h2>Welcome to Fiber@Home!</h2>
          <h1>We provide high speed internet service all over Bangladesh</h1>
        </div>
        <section class="container ourservices text-center">
            <div class = "container">
                <h1>Services</h1>
                <div class="row rowsetting">
                    
                    <div class="col-lg-3 col-md-3 col-10 d-block m-auto">
                        <div class="card">
                            <div class="miniImage">
                                <img src="CSE-408-Software-Sessional-main\Project\frontend\src\Assets\union.png" height="70px" width="70px"></img>
                            </div>
                            <div class="card-body">
                                <h2 class="card-title">4500 Unions </h2>
                                <p class="card-text">We are providing high speed internet to 4500 unions.</p>
                                
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-3 col-md-3 col-10 d-block m-auto">
                        <div class="card">
                            <div class="miniImage">
                                <img src="CSE-408-Software-Sessional-main\Project\frontend\src\Assets\isp.png" height="70px" width="70px" style={{'margin-top': '10px;'}}></img>
                            </div>
                            <div class="card-body">
                                <h2 class="card-title">5100 ISPs </h2>
                                <p class="card-text">5100 ISPs in various unions are taking our service.</p>
                                
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-3 col-md-3 col-10 d-block m-auto">
                        <div class="card">
                            <div class="miniImage">
                                <img src="CSE-408-Software-Sessional-main\Project\frontend\src\Assets\users.png" height="70px" width="70px"></img>
                            </div>
                            <div class="card-body">
                                <h2 class="card-title">10,13,000 Users </h2>
                                <p class="card-text">More than 1 million end users in various areas are connected by our service.</p>
                                
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
      </div>
        );
    }
}