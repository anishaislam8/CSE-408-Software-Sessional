import React, { Component } from "react";
import FormUserDetails from "./FormUserDetails";
import FormConnectionDetails from "./FormConnectionDetails";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import FormTechnicalDetails from "./FormTechnicalDetails";
import Feedbacks from "./Feedback";
import Success from "./Success";

export class UserEditProfile extends Component {
  state = {
    // fixed
    step: 1,
    user_name: "",
    nid: "",

    contact_person_address: "",

    contact_person_mobile: "+880",
    contact_person_email: "",
    wire_type: "", //0-DSL, 1-ADSL, 2-OpticalFiber,4-UTP,5-STP
    selectedDivision: "",
    selectedDistrict: "",
    selectedUpazilla: "",
    selectedUnion: "",
    selectedArea: "",
    selectedIsp: "",
    feedbacks: [],

    //constants
    districts: [],
    searchdistricts: [],
    divisions: [],
    upazillas: [],
    searchupazillas: [],
    unions: [],
    searchunions: [],
    areas: [],
    searchAreas: [],
    isps: [],
    searchIsps: [],
    users: [],
  };

  componentDidMount() {
    let apiUrl = "http://localhost:7000/api/union";
    axios
      .get(apiUrl)
      .then((response) => {
        this.setState({
          unions: response.data.data,
          searchunions: response.data.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });

    apiUrl = "http://localhost:7000/api/division";
    axios
      .get(apiUrl)
      .then((response) => {
        this.setState({ divisions: response.data.data });
      })
      .catch((error) => {
        console.log(error);
      });

    apiUrl = "http://localhost:7000/api/district";
    axios
      .get(apiUrl)
      .then((response) => {
        this.setState({
          districts: response.data.data,
          searchdistricts: response.data.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });

    apiUrl = "http://localhost:7000/api/subdistrict";
    axios
      .get(apiUrl)
      .then((response) => {
        this.setState({
          upazillas: response.data.data,
          searchupazillas: response.data.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });

    apiUrl = "http://localhost:7000/api/area";
    axios
      .get(apiUrl)
      .then((response) => {
        this.setState({
          areas: response.data.data,
          searchAreas: response.data.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });

    apiUrl = "http://localhost:7000/api/isp";
    axios
      .get(apiUrl)
      .then((response) => {
        this.setState({
          isps: response.data.data,
          searchIsps: response.data.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });

    apiUrl = "http://localhost:7000/api/user";
    axios
      .get(apiUrl)
      .then((response) => {
        this.setState({ users: response.data.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getIspName = (isp_id) => {
    for (let i = 0; i < this.state.isps.length; i++) {
      if (this.state.isps[i]._id.toString() === isp_id.toString()) {
        return this.state.isps[i].name;
      }
    }
  };

  getUserName = (user_id) => {
    for (let i = 0; i < this.state.users.length; i++) {
      if (this.state.users[i]._id === user_id) {
        return this.state.users[i].name;
      }
    }
  };

  getAreaName = (area_id) => {
    for (let i = 0; i < this.state.areas.length; i++) {
      if (this.state.areas[i]._id === area_id) {
        return this.state.areas[i].name;
      }
    }
  };

  // handle fields change
  handleChange = (input) => (e) => {
    this.setState({
      [input]: e.target.value,
    });
  };
  handleChangeIsp = (e) => {
    this.setState({
      selectedIsp: e.target.value,
    });
  };

  // Proceed to the next step
  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1,
    });
  };

  // Go back to the previous step
  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1,
    });
  };

  // handle fields change
  handleChange = (input) => (e) => {
    this.setState({
      [input]: e.target.value,
    });
  };

  handleViewFeedback = (e) => {
    let apiUrl = "http://localhost:7000/isp/feedbacks";
    const object = {
      isp_id: this.state.selectedIsp,
    };
    axios
      .post(apiUrl, object)
      .then((response) => {
        this.setState({
          feedbacks: response.data.data,
          step: 10,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleReturn = (e) => {
    this.setState({
      step: 2,
    });
  };

  saveUser = () => {
    let apiUrl = "http://localhost:7000/api/registerUser";
    const object = {
      user_name: this.state.user_name,
      nid_number: this.state.nid,
      contact_person_address: this.state.contact_person_address,
      contact_person_telephone: this.state.contact_person_telephone,
      contact_person_mobile: this.state.contact_person_mobile,
      contact_person_email: this.state.contact_person_email,
      wire_type: this.state.wire_type,
      division_id: this.state.selectedDivision,
      district_id: this.state.selectedDistrict,
      union_id: this.state.selectedUnion,
      upazilla_id: this.state.selectedUpazilla,
      area_id: this.state.selectedArea,
      isp_id: this.state.selectedIsp,
    };
    axios
      .post(apiUrl, object)
      .then((response) => {
        console.log("Saved : ", response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const { step } = this.state;
    const {
      user_name,
      nid,
      contact_person_address,
      contact_person_mobile,
      contact_person_email,
      wire_type, //0-DSL, 1-ADSL, 2-OpticalFiber,3-UTP,4-STP
      selectedDivision,
      selectedDistrict,
      selectedUpazilla,
      selectedUnion,
      selectedArea,
      selectedIsp,
      districts,
      searchdistricts,
      divisions,
      upazillas,
      searchupazillas,
      unions,
      searchunions,
      areas,
      searchAreas,
      isps,
      searchIsps,
      feedbacks,
      users,
    } = this.state;

    const values = {
      user_name,
      nid,
      contact_person_address,
      contact_person_mobile,
      contact_person_email,
      wire_type, //0-DSL, 1-ADSL, 2-OpticalFiber,3-UTP,4-STP
      selectedDivision,
      selectedDistrict,
      selectedUpazilla,
      selectedUnion,
      selectedArea,
      selectedIsp,
      districts,
      searchdistricts,
      divisions,
      upazillas,
      searchupazillas,
      unions,
      searchunions,
      areas,
      searchAreas,
      isps,
      searchIsps,
      feedbacks,
      users,
    };

    switch (step) {
      case 1:
        return (
          <FormUserDetails
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 2:
        return (
          <FormConnectionDetails
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            // handleChangeDivision={this.handleChangeDivision}
            // handleChangeDistrict= {this.handleChangeDistrict}
            // handleChangeUpazilla={this.handleChangeUpazilla}
            // handleChangeUnion={this.handleChangeUnion}
            // handleChangeArea={this.handleChangeArea}
            handleChangeIsp={this.handleChangeIsp}
            handleViewFeedback={this.handleViewFeedback}
            values={values}
          />
        );

      case 3:
        return (
          <FormTechnicalDetails
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            saveUser={this.saveUser}
            values={values}
          />
        );
      case 4:
        return <Success />;
      //   case 5:
      //     return (
      //       <Redirect
      //         to={{
      //           pathname: `/user/${this.state.user_id}`,
      //           state: {
      //             data: this.state.user_name,
      //             id: this.state.user_id,
      //           },
      //         }}
      //       />
      //     );
      case 10:
        return (
          <Feedbacks
            feedbacks={this.state.feedbacks}
            prevStep={this.prevStep}
            values={values}
            handleReturn={this.handleReturn}
            isp_id={this.state.selectedIsp}
            getIspName={this.getIspName}
            getAreaName={this.getAreaName}
            getUserName={this.getUserName}
          />
        );
    }
  }
}

export default UserEditProfile;
