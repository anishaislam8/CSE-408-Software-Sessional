import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from './components/Header';
import Homepage from './components/Homepage';
import NTTNReports from './components/NTTNReports';
import NTTNFeedbacks from './components/NTTNFeedbacks';
import Pendings from './components/Pendings';
import Renewals from './components/Renewals';
import ISPList from "./components/ISPList";




function App() {
  return (
    <Router>
    <Header />
    <br/>
    <br/>
    <br/>
      <Route path="/" exact component={Homepage} />
      <Route path="/nttn/reports" exact component={NTTNReports} />
      <Route path="/nttn/feedbacks" exact component={NTTNFeedbacks} />
      <Route path="/nttn/isplist" exact component={ISPList} />
      <Route path="/nttn/renewals" exact component={Renewals} />
      <Route path="/nttn/pendings" exact component={Pendings} />

    </Router>
  );
}

export default App;
