import React from 'react';
import './App.css';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
// importing components
// import Navbar from "./components/navbar.component";
import indexComponent from "./components/index.component"
import WarriorsComponent from "./components/warriors.component"
import NewWarriorComponent from './components/newwarrior.component'
import EditWarriorComponent from './components/editwarrior.component'

function App() {
  return (
      <Router>
        <div className='container' >
          {/*<Navbar />*/}
          {/* Routing Setup*/}
          <Route path="/" exact component={indexComponent} />
          <Route path="/play" component={WarriorsComponent} />
            {/*<Route path="/play/new" component={NewWarriorComponent} />>*/}
            {/*<Route path="/play/edit" component={playEditComponent} />*/}
        </div>
      </Router>

  );
}

export default App;
