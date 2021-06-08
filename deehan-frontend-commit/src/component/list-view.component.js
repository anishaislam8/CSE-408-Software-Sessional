import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export default class ListView extends Component {
render() {
    return (
        <section className="container pending text-center">
            <div className="container">
                <h1>Pending Requests</h1>
                <div className = "settings">
                    
                    <div className="row pendingrowsetting">
                    
                        <div className="col-lg-2 col-md-2 col-10 d-block m-auto">
                            <select className="form-control form-control-lg">
                                <option selected disabled>Division</option>
                                <option>Dhaka</option>
                                <option>Chittagong</option>
                                <option>Khulna</option>
                                <option>Sylhet</option>
                                <option>Mymensingh</option>
                                <option>Rajshahi</option>
                                <option>Rangpur</option>
                                <option>Barishal</option>
                                
                            </select>
                        </div>
                        <div className="col-lg-2 col-md-2 col-10 d-block m-auto">
                            <select className="form-control form-control-lg">
                                <option selected disabled>District</option>
                                <option>Narshingdi</option>
                                <option>Gajipur</option>
                                <option>Narayanganj</option>
                                <option>Tangail</option>
                                <option>Shariyatpur</option>
                                <option>Kishoreganj</option>
                                <option>Manikganj</option>
                                <option>Munshiganj</option>
                                <option>Madaripur</option>
                                <option>Gopalganj</option>
                                <option>Faridpur</option>
                            </select>
                        </div>
                        <div className="col-lg-2 col-md-2 col-10 d-block m-auto">
                            <select className="form-control form-control-lg">
                                <option selected disabled>Upazilla</option>
                                <option>Basail</option>
                                <option>Madhupur</option>
                                <option>Mirzapur</option>
                                <option>Ghatail</option>
                                <option>Nagorpur</option>
                                <option>Kalihati</option>
                            </select>
                        </div>
                        <div className="col-lg-2 col-md-2 col-10 d-block m-auto">
                            <select className="form-control form-control-lg">
                                <option selected disabled>Union</option>
                                <option>Alokdia</option>
                                <option>Aushnara</option>
                                <option>Aronkhola</option>
                                <option>Sholakuri</option>
                                <option>Golabari</option>
                                <option>Mirzabari</option>
                            </select>
                        </div>

                        <div className="col-lg-2 col-md-2 col-10 d-block m-auto">
                            <select className="form-control form-control-lg">
                                <option selected disabled>Sort By</option>
                                <option>Package Priority</option>
                                <option>Arrival Time</option>
                                
                            </select>
                        </div>

                        <div  className="col-lg-2 col-md-2 col-10 d-block m-auto">
                            <a className="btn btn-warning btn-lg text-white" href="search.html">Search</a>
                        </div>
                        
                        
                    </div>
                    
                </div>
                <div style={{'overflow-y':'auto', 'overflow-x': 'auto;'}}>
                    <table className="table table-striped">
                        <thead className="thead">
                            <tr>
                                <th>Row</th>
                                <th>ISP Name</th>
                                <th>License ID</th>
                                <th>Union</th>
                                <th>Package Name</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>KS</td>
                                <td>123er6yu</td>
                                <td>Alokdia</td>
                                <td>6 Month Ultra</td>
                                <td><button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                                    Verify
                                </button></td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>JS</td>
                                <td>243er7yu</td>
                                <td>Aushnara</td>
                                <td>1 Year Ultra</td>
                                <td><button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                                    Verify
                                </button></td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>Gold ISP</td>
                                <td>103er6yu</td>
                                <td>Aronkhola</td>
                                <td>3 Month Pro</td>
                                <td><button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                                    Verify
                                </button></td>
                            </tr>   
                            <tr>
                                <td>4</td>
                                <td>KSP</td>
                                <td>193er6yu</td>
                                <td>Golabari</td>
                                <td>6 Month Gold</td>
                                <td><button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                                    Verify
                                </button></td>
                            </tr>
                            <tr>
                                <td>5</td>
                                <td>JSP</td>
                                <td>423er6yu</td>
                                <td>Sholakuri</td>
                                <td>1 Month Ultra</td>
                                <td><button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                                    Verify
                                </button></td>
                            </tr>   
                            <tr>
                                <td>6</td>
                                <td>Best ISP</td>
                                <td>523er6yu</td>
                                <td>Mirjabari</td>
                                <td>6 Month Ultra</td>
                                <td><button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                                    Verify
                                </button></td>
                            </tr>
                            <tr>
                                <td>7</td>
                                <td>Globe</td>
                                <td>723er6yu</td>
                                <td>Alokdia</td>
                                <td>6 Month Ultra</td>
                                <td><button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                                    Verify
                                </button></td>
                            </tr>   
                            <tr>
                                <td>8</td>
                                <td>High Speed</td>
                                <td>823er6yu</td>
                                <td>Mirjabari</td>
                                <td>1 Year Ultra</td>
                                <td><button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                                    Verify
                                </button></td>
                            </tr>   
                            <tr>
                                <td>9</td>
                                <td>SRK</td>
                                <td>923er6yu</td>
                                <td>Sholakuri</td>
                                <td>3 Month Ultra</td>
                                <td><button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                                    Verify
                                </button></td>
                            </tr>
                            <tr>
                                <td>10</td>
                                <td>AK</td>
                                <td>A23er6yu</td>
                                <td>Alokdia</td>
                                <td>3 Month Ultra</td>
                                <td><button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                                    Verify
                                </button></td>
                            </tr>    
                            <tr>
                                <td>11</td>
                                <td>SSR</td>
                                <td>B23er6yu</td>
                                <td>Mirjabari</td>
                                <td>6 Month Pro</td>
                                <td><button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                                    Verify
                                </button></td>
                            </tr>   
                                   
                        </tbody>
                    </table>

                </div>
            </div> 
             {/* <!-- Modal --> */}
        <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title text-green" id="exampleModalLabel">Licese Verified</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  The license of this ISP is valid. Accept the request and ask for payment.
                </div>
                <div className="modal-footer">
                  <a href="accepted.html" className="btn btn-success">Accept</a>
                  <button type="button" className="btn btn-dark" data-dismiss="modal">Close</button>
                  
                </div>
              </div>
            </div>
          </div>         
        </section>
        );
    }
}