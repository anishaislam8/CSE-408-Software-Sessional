import React, { Component } from "react";
import * as ImIcons from "react-icons/im";
import "./../../styles/registration.css";
import logo from "./../../img/registration1.gif";
import { Link } from "react-router-dom";

export class FormUserDetails extends Component {
  continue = (e) => {
    e.preventDefault();
    this.props.nextStep();
  };

  render() {
    const { values, handleChange } = this.props;

    return (
      <div>
        <nav className="navbar fixed-top">
          <span className="ms-auto">
            <h3 className="display-5" style={{ marginTop: 20 }}>
              Step 1 : Edit Details of User
            </h3>
          </span>
        </nav>

        <div className="registration1Form">
          <div className="row">
            <div className="col">
              <form
                className="registration1inner"
                style={{ marginTop: 100, marginLeft: 200 }}
                onSubmit={this.continue}
              >
                <div className="form-group">
                  <label>User Name</label>
                  <input
                    type="text"
                    disabled
                    value={values.user_name}
                    onChange={handleChange("user_name")}
                    className="form-control"
                    placeholder="Enter Full Name"
                    required
                    minLength="1"
                    maxLength="100"
                  />
                </div>

                <div className="form-group">
                  <label>NID Number</label>
                  <input
                    type="text"
                    disabled
                    value={values.nid}
                    onChange={handleChange("nid")}
                    className="form-control"
                    placeholder="Enter NID Number"
                    minLength="10"
                    maxLength="10"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Address</label>
                  <input
                    type="text"
                    value={values.contact_person_address}
                    onChange={handleChange("contact_person_address")}
                    className="form-control"
                    placeholder="Enter Address"
                    required
                    minLength="1"
                    maxLength="256"
                  />
                </div>

                <div className="form-group">
                  <label>Mobile (+880NNNNNNNNNN)</label>
                  <input
                    type="text"
                    value={values.contact_person_mobile}
                    onChange={handleChange("contact_person_mobile")}
                    className="form-control"
                    placeholder="Enter Mobile Number"
                    required
                    minLength="14"
                    maxLength="14"
                  />
                </div>

                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    value={values.contact_person_email}
                    onChange={handleChange("contact_person_email")}
                    className="form-control"
                    placeholder="Enter Email"
                    required
                  />
                </div>

                <div className="row">
                  <div className="col">
                    <Link
                      type="button"
                      className="btn btn-dark btn-lg"
                      style={{ marginTop: 20, width: 150 }}
                      to="/"
                    >
                      <ImIcons.ImCancelCircle size={30} /> Cancel
                    </Link>
                  </div>
                  <div className="col">
                    <button
                      type="submit"
                      className="btn btn-info btn-lg"
                      style={{ marginTop: 20, marginLeft: 100, width: 150 }}
                    >
                      Continue <ImIcons.ImNext2 size={30} />
                    </button>
                  </div>
                </div>
              </form>
            </div>

            <div className="col">
              <img
                src={logo}
                alt="loading..."
                style={{ height: 500, marginRight: 150, marginTop: 200 }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FormUserDetails;
