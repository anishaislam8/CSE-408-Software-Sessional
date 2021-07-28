import { BrowserRouter as Router, Route } from "react-router-dom";


import Homepage from './components/Homepage';
import NTTNReports from './components/NTTNReports';
import NTTNReportsDetails from './components/NTTNReportsDetails';
import NTTNFeedbacks from './components/NTTNFeedbacks';
import NTTNConnections from "./components/NTTNConnection";
import Pendings from './components/Pendings';
import Renewals from './components/Renewals';
import ISPList from "./components/ISPList";
import ISPHome from "./components/ISPComponents/Homepage";
import UserHome from "./components/UserComponents/Homepage";
import ISPCreateReport from './components/ISPComponents/CreateReport';
import UserCreateReport from './components/UserComponents/CreateReport';
import ISPViewReport from './components/ISPComponents/ViewReportsOfISP';
import IspPendings from "./components/ISPComponents/Pendings";
import ViewUserFeedback from "./components/ISPComponents/ViewUserFeedback";
import ViewUserReport from "./components/ISPComponents/ViewUserReport";
import ViewFeedbacks from './components/UserComponents/ViewFeedbacks'; //user
import ViewReports from './components/UserComponents/ViewReports'; //user
import UserCreateFeedback from "./components/UserComponents/CreateFeedback";
import PendingDetails from './components/PendingDetails';
import Login from "./components/LogInComponents/login";
import ISPForm from "./components/Registration/ISPForm";
import UserForm from "./components/RegistrationUser/UserForm";
import IspConnections from "./components/ISPComponents/Connections";
import ConnectionDetails from "./components/ConnectionDetails";
import IspConnectionDetails from "./components/ISPComponents/ISPConnectionDetails";
import ISPEditProfile from "./components/ISPEditProfile/IspEditProfile";
import ISPDetails from "./components/ISPViewDetails";
import ISPDetailsPackage from "./components/ViewPackage";
import ISPDetailsPayment from "./components/ViewPayment";
import UserList from "./components/ISPComponents/UserList";
import UserListDetails from "./components/ISPComponents/ConnectionDetails";
import RenewalDetails from "./components/RenewalDetails";
import UserEditProfile from "./components/UserEditProfile/UserEditProfile";





function App() {

  return (
    <Router>
      <Route path="/" exact component={Login} />
      <Route path="/ispRegistration" exact component={ISPForm} />
      <Route path="/userRegistration" exact component={UserForm} />
      <Route path="/nttn" exact component={Homepage} />
      <Route path="/nttn/reports" exact component={NTTNReports} />
      <Route path="/nttn/reports/details" exact component={NTTNReportsDetails} />
      <Route path="/nttn/feedbacks" exact component={NTTNFeedbacks} />
      <Route path="/nttn/isplist" exact component={ISPList} />
      <Route path="/nttn/isplist/details" exact component={ISPDetails} />
      <Route path="/nttn/isplist/details/package" exact component={ISPDetailsPackage} />
      <Route path="/nttn/isplist/details/payment" exact component={ISPDetailsPayment} />
      <Route path="/nttn/renewals" exact component={Renewals} />
      <Route path="/nttn/pendings" exact component={Pendings} />
      <Route path="/nttn/connections" exact component={NTTNConnections} />
      <Route path="/nttn/connections/details" exact component={ConnectionDetails} />
      <Route path="/nttn/pendings/isp/details" exact component={PendingDetails} />
      <Route path="/nttn/pendings/view" exact component={PendingDetails} />
      <Route path="/nttn/renewals/view" exact component={RenewalDetails} />
      <Route path="/nttn/settings" exact component={Pendings} />

      
      <Route path="/isp/:id" exact component={ISPHome} />
      <Route path="/isp/:id/edit" exact component={ISPEditProfile} />
      <Route path="/isp/:id/createReport" exact component={ISPCreateReport} />
      <Route path="/isp/:id/viewReport" exact component={ISPViewReport} />
      <Route path="/isp/:id/pendings" exact component={IspPendings} />
      <Route path="/isp/:id/connections" exact component={IspConnections} />
      <Route path="/isp/:id/connections/details" exact component={IspConnectionDetails} />
      <Route path="/isp/:id/feedbacks" exact component={ViewUserFeedback} />
      <Route path="/isp/:id/userReports" exact component={ViewUserReport} />
      <Route path="/isp/:id/userList" exact component={UserList} />
      <Route path="/isp/:id/userList/details" exact component={UserListDetails} />
   


      <Route path="/user/:id" exact component={UserHome} />
      <Route path="/user/:id/createReport" exact component={UserCreateReport} />
      <Route path="/user/:id/createFeedback" exact component={UserCreateFeedback} />
      <Route path="/user/:id/viewFeedbacks" exact component={ViewFeedbacks} />
      <Route path="/user/:id/viewReports" exact component={ViewReports} />
      <Route path="/user/:id/edit" exact component={UserEditProfile} />

    </Router>
  );
}

export default App;
