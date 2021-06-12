import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from './components/Header';
import Homepage from './components/Homepage';
import Reports from './components/Reports';
import ViewReport from './components/ViewReport';
import Feedbacks from './components/Feedbacks';
import ViewFeedback from './components/ViewFeedback';
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
      <Route path="/nttn/reports" exact component={Reports} />
      <Route path="/nttn/feedbacks" exact component={Feedbacks} />
      <Route path="/nttn/actives" exact component={Actives} />
      <Route path="/nttn/renewals" exact component={Renewals} />
      <Route path="/nttn/pendings" exact component={Pendings} />
      <Route path="/nttn/reports/view" exact component={ViewReport} />
      <Route path="/nttn/feedbacks/view" exact component={ViewFeedback} />

    </Router>
  );
}

export default App;
