import { BrowserRouter as Router, Route } from "react-router-dom";

import Homepage from './components/Homepage';
import NTTNReports from './components/NTTNReports';
import NTTNFeedbacks from './components/NTTNFeedbacks';
import Pendings from './components/Pendings';
import Renewals from './components/Renewals';
import ISPList from "./components/ISPList";
import ISPHome from "./components/ISPComponents/Homepage";
import ISPCreateReport from './components/ISPComponents/CreateReport';
import ISPViewReport from './components/ISPComponents/ViewReportsOfISP';
import ViewProfile from "./components/ISPComponents/ViewProfile";
import ViewUserFeedback from "./components/ISPComponents/ViewUserFeedback";





function App() {

  return (
    <Router>
   
      <Route path="/" exact component={Homepage} />
      <Route path="/nttn/reports" exact component={NTTNReports} />
      <Route path="/nttn/feedbacks" exact component={NTTNFeedbacks} />
      <Route path="/nttn/isplist" exact component={ISPList} />
      <Route path="/nttn/renewals" exact component={Renewals} />
      <Route path="/nttn/pendings" exact component={Pendings} />
      <Route path="/nttn/connection" exact component={Pendings} />
      <Route path="/nttn/confirmConnection" exact component={Pendings} />
      <Route path="/nttn/settings" exact component={Pendings} />
      <Route path="/isp/:id" exact component={ISPHome} />
      <Route path="/isp/:id/createReport" exact component={ISPCreateReport} />
      <Route path="/isp/:id/viewReport" exact component={ISPViewReport} />
      <Route path="/isp/:id/profile" exact component={ViewProfile} />
      <Route path="/isp/:id/feedbacks" exact component={ViewUserFeedback} />

    </Router>
  );
}

export default App;
