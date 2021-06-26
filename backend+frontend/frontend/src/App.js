import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from './components/Header';
import Homepage from './components/Homepage';
import NTTNReports from './components/NTTNReports';
import Feedbacks from './components/Feedbacks';
import Actives from './components/Actives';
import Pendings from './components/Pendings';
import Renewals from './components/Renewals';




function App() {
  return (
    <Router>
    <Header />
    <br/>
    <br/>
    <br/>
      <Route path="/" exact component={Homepage} />
      <Route path="/nttn/reports" exact component={NTTNReports} />
      <Route path="/nttn/feedbacks" exact component={Feedbacks} />
      <Route path="/nttn/actives" exact component={Actives} />
      <Route path="/nttn/renewals" exact component={Renewals} />
      <Route path="/nttn/pendings" exact component={Pendings} />

    </Router>
  );
}

export default App;
