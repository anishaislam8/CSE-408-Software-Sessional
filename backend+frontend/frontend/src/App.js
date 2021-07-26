import { BrowserRouter as Router, Route } from "react-router-dom";


import Homepage from './components/Homepage';
import NTTNReports from './components/NTTNReports';
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





function App() {

  return (
    <Router>
      <Route path="/" exact component={Login} />
      <Route path="/ispRegistration" exact component={ISPForm} />
      <Route path="/userRegistration" exact component={UserForm} />
      <Route path="/nttn" exact component={Homepage} />
      <Route path="/nttn/reports" exact component={NTTNReports} />
      <Route path="/nttn/feedbacks" exact component={NTTNFeedbacks} />
      <Route path="/nttn/isplist" exact component={ISPList} />
      <Route path="/nttn/renewals" exact component={Renewals} />
      <Route path="/nttn/pendings" exact component={Pendings} />
      <Route path="/nttn/connections" exact component={NTTNConnections} />
      <Route path="/nttn/connections/details" exact component={ConnectionDetails} />
      <Route path="/nttn/pendings/isp/details" exact component={PendingDetails} />
      
      
      <Route path="/nttn/settings" exact component={Pendings} />
      <Route path="/isp/:id" exact component={ISPHome} />
      <Route path="/isp/:id/createReport" exact component={ISPCreateReport} />
      <Route path="/isp/:id/viewReport" exact component={ISPViewReport} />
      <Route path="/isp/:id/pendings" exact component={IspPendings} />
      <Route path="/isp/:id/connections" exact component={IspConnections} />
      <Route path="/isp/:id/feedbacks" exact component={ViewUserFeedback} />
      <Route path="/isp/:id/userReports" exact component={ViewUserReport} />
      <Route path="/user/:id" exact component={UserHome} />
      <Route path="/user/:id/createReport" exact component={UserCreateReport} />
      <Route path="/user/:id/createFeedback" exact component={UserCreateFeedback} />
      <Route path="/user/:id/viewFeedbacks" exact component={ViewFeedbacks} />
      <Route path="/user/:id/viewReports" exact component={ViewReports} />

    </Router>
  );
}

export default App;
