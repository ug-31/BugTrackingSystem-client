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

const AddProject = () => {
  const [inputs, setInputs] = useState({
    pname: "",
    startdate: "",
    description: "",
  });

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };
  const clearInputField = () => {
    setInputs({ ...inputs, text: "" });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { pname, startdate, description };

      console.log(body);
      const response = await fetch("http://localhost:5000/project/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.token,
        },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();

      if (response.status !== 200) {
        toast.error(parseRes);
      } else {
        toast.success(parseRes);
        history.push("/projects");
      }
      clearInputField();
    } catch (err) {
      toast.error("Project Already exit or server error");
      console.error(err.message);
    }
  };
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const history = useHistory();
  useEffect(() => {
    if (!isAuthenticated) {
      history.push({ pathname: "/login", state: { prev: "/dashboard" } });
    }
  }, [isAuthenticated]);

  const { pname, startdate, description } = inputs;

  return (
    <Fragment>
      <h3 className="text-center">Add Project</h3>
      <form className="login-form" onSubmit={onSubmitForm}>
        <div className="form-group ">
          <label htmlFor="pname">Project Name</label>
          <input
            name="pname"
            type="text"
            className="form-control"
            id="pname"
            placeholder="Enter Name"
            value={pname}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="startdate">Start Date</label>
          <input
            name="startdate"
            type="date"
            className="form-control"
            id="startdate"
            placeholder="Start Date"
            value={startdate}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Input Desription</label>
          <textarea
            name="description"
            type="text"
            className="form-control"
            id="text"
            placeholder="Input Description"
            rows="10"
            cols="30"
            value={description}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-success btn-block">
          Add
        </button>
      </form>
    </Fragment>
  );
};

export default AddProject;
