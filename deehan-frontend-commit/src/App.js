import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";

import Navbar from "./component/navbar.component";
import Home from "./component/home.component";
import PendingIspList from "./component/pending-isp-list.component";

function App() {
  return (
    <Router>
      {/* <div className="container"> */}
      {/* <div class="bgimg">
        <Navbar />
      </div> */}
     
      {/* <br/> */}
      <Route path="/" exact component={Home} />
      <Route path="/pending" exact component={PendingIspList} />
      {/* <Route path="/edit/:id" component={EditExercise} />
      <Route path="/create" component={CreateExercise} />
      <Route path="/user" component={CreateUser} /> */}
      {/* </div> */}
    </Router>
  );
}

export default App;