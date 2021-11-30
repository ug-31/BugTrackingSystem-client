import React, { Fragment, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
} from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./dashboard.style.css";

const Dashboard = () => {
  const [name, setName] = useState("");
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const history = useHistory();
  useEffect(() => {
    if (!isAuthenticated) {
      history.push({ pathname: "/login", state: { prev: "/dashboard" } });
    }
  }, [isAuthenticated]);

  const getName = async () => {
    const response = await fetch("http://localhost:5000/dashboard", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.token,
      },
    });

    const parseRes = await response.json();

    console.log(parseRes);
    setName(parseRes);
  };

  useEffect(() => {
    getName();
  }, []);
  return (
    <Fragment>
      <h3>Hello {name.name}</h3>
      <br />
      <h5>
        You Can manage your project, versions and bugs here. Click on the
        following links to proceed.
      </h5>
      <br />
      <br />
      <div>
        {" "}
        <Link to="/projects">
          <button type="button" class="dashbutton">
            Projects
          </button>
        </Link>
        <br />
        <br />
        <Link to="/versions">
          <button type="button" class="dashbutton">
            Versions
          </button>
        </Link>
        <br />
        <br />
        <Link to="/bugs">
          <button type="button" class="dashbutton">
            Bugs
          </button>
        </Link>
      </div>
    </Fragment>
  );
};

export default Dashboard;
