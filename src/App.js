import "./App.css";
import React, { Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navigation.js";
import Login from "./components/Login.js";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";

toast.configure();
function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Fragment>
          <ToastContainer />
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
