import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from './components/Header';
import Homepage from './components/Homepage';
import Reports from './components/Reports';

function App() {
  return (
    <Router>
    <Header />
    <br/>
      <Route path="/" exact component={Homepage} />
      <Route path="/nttn/reports" exact component={Reports} />
    </Router>
  );
}

export default App;
