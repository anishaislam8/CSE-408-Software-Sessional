import React from "react";
import axios from "axios";
import _ from "lodash";
import { Form, Button } from "react-bootstrap";
import { Col } from "react-grid-system";
import { Link, Redirect } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as FaIcons from "react-icons/fa";
import * as FcIcons from "react-icons/fc";
import * as BsIcons from "react-icons/bs";
import * as AiIcons from "react-icons/ai";
import * as VscIcons from "react-icons/vsc";
import Header from "./Header";
import "./../styles/connection.css"

class RenewalDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      renewal_id: this.props.location.state.renewal_id,
      pendings: [],
      isps: [],
      unions: [],
      packages: [],
      payment_status: "",
      gateway: "",
      transaction_id: "",
      payment_time: "",
      payments: [],
      redirectPending: false,
      accepted: "",
    };

    this.getISP = this.getISP.bind(this);
    this.getRequest = this.getRequest.bind(this);
    this.getUnion = this.getUnion.bind(this);
    this.getPackage = this.getPackage.bind(this);
    this.getPayment = this.getPayment.bind(this);
    this.updateAfterAccepted = this.updateAfterAccepted.bind(this);
    // this.updateAfterRejected = this.updateAfterRejected.bind(this);
    this.goPrevPage = this.goPrevPage.bind(this);
  }

  componentDidMount() {
    //console.log("component ");
    let apiUrl = "http://localhost:7000/nttn/renewal";

    axios
      .get(apiUrl)
      .then((response) => {
        //console.log("Response", response.data.data);,
        this.setState(
          {
            pendings: response.data.data,
            renewal_id:
              this.props.location.state.renewal_id || this.state.renewal_id,
          },
          () => {
            console.log("Balamar", this.state.pendings);
          }
        );
      })
      .catch((error) => {
        console.log(error);
      });

    apiUrl = "http://localhost:7000/nttn/payments";
    axios
      .get(apiUrl)
      .then((response) => {
        this.setState({
          payments: response.data.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });

    apiUrl = "http://localhost:7000/api/isp";
    axios
      .get(apiUrl)
      .then((response) => {
        this.setState({ isps: response.data.data });
      })
      .catch((error) => {
        console.log(error);
      });

    apiUrl = "http://localhost:7000/api/union";
    axios
      .get(apiUrl)
      .then((response) => {
        this.setState({ unions: response.data.data });
      })
      .catch((error) => {
        console.log(error);
      });
    apiUrl = "http://localhost:7000/api/ispPackage";
    axios
      .get(apiUrl)
      .then((response) => {
        this.setState({ packages: response.data.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  updateAfterAccepted = () => {
    let apiUrl = "http://localhost:7000/nttn/renewal/view/accept";

    const object = {
      pending_id: this.props.location.state.renewal_id || this.state.renewal_id,
    };
    axios
      .post(apiUrl, object)
      .then((response) => {
        this.setState({
          accepted: response.data.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // updateAfterRejected = () => {
  //   let apiUrl = "http://localhost:7000/nttn/pendings/view/accept";

  //   const object = {
  //     pending_id: this.props.location.state.renewal_id || this.state.renewal_id,
  //   };
  //   axios
  //     .post(apiUrl, object)
  //     .then((response) => {
  //       this.setState({
  //         accepted: response.data.data,
  //       });
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  goPrevPage = () => {
    this.setState({
      redirectPending: true,
    });
  };

  getRequest = () => {
    console.log(this.state.renewal_id);
    //console.log("called");
    console.log(this.state.pendings.length);

    for (let i = 0; i < this.state.pendings.length; i++) {
      if (
        this.state.pendings[i]._id.toString() ===
        this.state.renewal_id.toString()
      ) {
        console.log("hit");

        return this.state.pendings[i];
      }
    }
  };

  getISP = (isp_id) => {
    for (let i = 0; i < this.state.isps.length; i++) {
      if (this.state.isps[i]._id.toString() === isp_id.toString()) {
        return this.state.isps[i].name;
      }
    }
  };

  getUnion = (union_id) => {
    for (let i = 0; i < this.state.unions.length; i++) {
      if (this.state.unions[i].union_id.toString() === union_id.toString()) {
        return this.state.unions[i].name;
      }
    }
  };

  getPackage = (package_id) => {
    //console.log(this.state.packages.length);
    for (let i = 0; i < this.state.packages.length; i++) {
      if (this.state.packages[i]._id.toString() === package_id.toString()) {
        return this.state.packages[i];
      }
    }
  };

  getPayment = (payment_id) => {
    console.log(this.state.payments.length);
    for (let i = 0; i < this.state.payments.length; i++) {
      if (this.state.payments[i]._id.toString() === payment_id.toString()) {
        return this.state.payments[i];
      }
    }
  };

  render() {
    return (
      <div>
        {this.state.redirectPending ? <Redirect to="/nttn/renewals" /> : ""}
        <Header />
        <br></br>
        <br></br>
        <br></br>
        <div className="container">
          <div className="row">
            <center>
            <center><h3 className="display-6" style={{"marginBottom" : 50, "marginTop" : 50}}>Request Details</h3></center>
              <br></br>
            </center>
            <div className="connectioninner">
            <div className="col">
              <table className="table table-bordered table-striped">
                {this.state.pendings.length > 0 && (
                  <tbody>
                    <tr>
                      <td>
                        <b>ISP Name</b>
                      </td>
                      <td>{this.getISP(this.getRequest().isp_id)}</td>
                    </tr>

                    <tr>
                      <td>
                        <b>Union Name</b>
                      </td>
                      <td>
                        {this.getUnion(
                          this.getRequest(
                            this.state.renewal_id ||
                              this.props.location.state.renewal_id
                          ).union_id
                        )}
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <b>Request Arrival Time</b>
                      </td>
                      <td>
                        {new Date(
                          this.getRequest(
                            this.state.renewal_id ||
                              this.props.location.state.renewal_id
                          ).request_arrival_time
                        ).toString().split(" ").slice(0,5).join(" ")}
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <b>Package Name</b>
                      </td>
                      <td>
                        {
                          this.getPackage(
                            this.getRequest(
                              this.state.renewal_id ||
                                this.props.location.state.renewal_id
                            ).package_id
                          ).name
                        }
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <b>Bandwidth</b>
                      </td>
                      <td>
                        {
                          this.getPackage(
                            this.getRequest(
                              this.state.renewal_id ||
                                this.props.location.state.renewal_id
                            ).package_id
                          ).bandwidth
                        }{" "}
                        GBPS
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <b>Up Speed</b>
                      </td>
                      <td>
                        {
                          this.getPackage(
                            this.getRequest(
                              this.state.renewal_id ||
                                this.props.location.state.renewal_id
                            ).package_id
                          ).up_speed
                        }{" "}
                        GBPS
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <b>Down Speed</b>
                      </td>
                      <td>
                        {
                          this.getPackage(
                            this.getRequest(
                              this.state.renewal_id ||
                                this.props.location.state.renewal_id
                            ).package_id
                          ).down_speed
                        }{" "}
                        GBPS
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <b>Duration</b>
                      </td>
                      <td>
                        {
                          this.getPackage(
                            this.getRequest(
                              this.state.renewal_id ||
                                this.props.location.state.renewal_id
                            ).package_id
                          ).duration
                        }{" "}
                        Days
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <b>Price</b>
                      </td>
                      <td>
                        {
                          this.getPackage(
                            this.getRequest(
                              this.state.renewal_id ||
                                this.props.location.state.renewal_id
                            ).package_id
                          ).price
                        }{" "}
                        BDT
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <b>Payment Time</b>
                      </td>
                      <td>
                        {new Date(
                          this.getPayment(
                            this.getRequest(
                              this.state.renewal_id ||
                                this.props.location.state.renewal_id
                            ).payment_id
                          ).payment_time
                        ).toString().split(" ").slice(0,5).join(" ")}
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <b>Gateway</b>
                      </td>
                      <td>
                        {
                          this.getPayment(
                            this.getRequest(
                              this.state.renewal_id ||
                                this.props.location.state.renewal_id
                            ).payment_id
                          ).gateway
                        }
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <b>Transaction ID</b>
                      </td>
                      <td>
                        {
                          this.getPayment(
                            this.getRequest(
                              this.state.renewal_id ||
                                this.props.location.state.renewal_id
                            ).payment_id
                          ).transaction_id
                        }
                      </td>
                    </tr>
                    {/* <tr>
                      <td>
                        <b>Payment Status</b>
                      </td>
                      <td>
                        {this.getPayment(
                          this.getRequest(
                            this.state.renewal_id ||
                              this.props.location.state.renewal_id
                          ).payment_id
                        ).payment_status.toString()}
                      </td>
                    </tr> */}
                  </tbody>
                )}
              </table>
            </div>
            <center>
              <form onSubmit={this.goPrevPage}>
               
                    <button
                      onClick={this.updateAfterAccepted}
                      style={{ width: 200 }}
                      //type="button"
                      className="btn btn-success"
                      // to={{
                      //   pathname: "/nttn/pendings",
                      //   state: {},
                      // }}
                    >
                      <AiIcons.AiFillNotification /> Process
                    </button>

                    {/* <button
                      onClick={this.updateAfterRejected}
                      style={{ marginLeft: 50 }}
                      //type="button"
                      className="btn btn-danger"
                      // to={{
                      //   pathname: "/nttn/pendings",
                      //   state: {},
                      // }}
                    >
                      <AiIcons.AiFillNotification /> Reject
                    </button> */}
                  
              </form>
            </center>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RenewalDetails;
