import "./App.css";
import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navigation.js";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Dashboard from "./components/dashboard/dashboard.conponent.jsx";
import ListProjects from "./components/projects/ListProjects";
import AddProject from "./components/projects/AddProject.jsx";
import ListVersions from "./components/versions/ListVersions";
import AddVersion from "./components/versions/AddVersion";
import ListBugs from "./components/bugs/ListBugs";
import AddBug from "./components/bugs/Addbug";
import EditBug from "./components/bugs/EditBug";

import { useDispatch, useSelector } from "react-redux";
import { setAuth, setUser } from "./auth/authSlice";
toast.configure();
function App() {
  const dispatch = useDispatch();

  const isAuth = async () => {
    try {
      const response = await fetch("http://localhost:5000/auth/verify", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseRes = await response.json();

      console.log(parseRes);
      if (parseRes === true) {
        dispatch(setAuth({ isAuthenticated: true }));
      } else {
        dispatch(setAuth({ isAuthenticated: false }));
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    isAuth();
  }, []);
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
          <Route
            path="/projects"
            exact
            render={(props) => <ListProjects {...props} />}
          />
          <Route
            path="/projects/add"
            exact
            render={(props) => <AddProject {...props} />}
          />
          <Route
            path="/versions"
            exact
            render={(props) => <ListVersions {...props} />}
          />
          <Route
            path="/versions/add"
            exact
            render={(props) => <AddVersion {...props} />}
          />
          <Route
            path="/bugs"
            exact
            render={(props) => <ListBugs {...props} />}
          />
          <Route
            path="/bugs/add"
            exact
            render={(props) => <AddBug {...props} />}
          />
          <Route
            path="/bugs/edit/:id"
            render={(props) => <EditBug {...props} />}
          />
        </Fragment>
      </Switch>
    </Router>
  );
}

export default App;
