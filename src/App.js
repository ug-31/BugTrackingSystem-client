import "./App.css";
import React, { Fragment } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Navbar from "./components/Navigation.js";
import Login from "./components/Login.js";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Fragment>
          <Route path="/login" exact render={(props) => <Login {...props} />} />
          <Route
            path="/register"
            exact
            render={(props) => <Register {...props} />}
          />
          <Route
            path="/dashboard"
            exact
            render={(props) => <Dashboard {...props} />}
          />
        </Fragment>
      </Switch>
    </Router>
  );
}

export default App;
