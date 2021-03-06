import React from 'react';
import './App.css';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
// importing components
import Navbar from "./components/navbar.component";
import Footer from './components/footer.component'
import indexComponent from "./components/index.component"
import WarriorsComponent from "./components/warriors.component"
import NewWarriorComponent from './components/newwarrior.component'
import FeedbackComponent from "./components/feedback.component";
// import EditWarriorComponent from './components/editwarrior.component'

function App() {
  return (
        <Router>
            <div className='container' >
                <Navbar />
                {/* Routing Setup*/}
                <Route exact path="/" component={indexComponent} />
                <Route exact path="/play" component={WarriorsComponent} />
                <Route path="/play/new" component={NewWarriorComponent} />
                <Route path='/feedback' component={FeedbackComponent}/>
                {/*<Route path="/play/edit" component={playEditComponent} />*/}
                <Footer />
            </div>
        </Router>
  );
}

export default App;
