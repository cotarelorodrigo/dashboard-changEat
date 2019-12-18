import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';
import { connect } from 'react-redux';
import { Statics } from "./views/Statics";

function App() {
  return (

    <Router>
      <Switch>
        <Route exact path="/statics" component={Statics} />
      </Switch>
    </Router>
  );
}

export default App;
