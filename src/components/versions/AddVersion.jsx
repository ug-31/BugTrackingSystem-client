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

const AddVersion = () => {
  const [projects, setProjects] = useState([]);
  const [inputs, setInputs] = useState({
    pid: "",
    vname: "",
    vno: "",
    releasedate: "",
    releasedby: "",
    comment: "",
  });

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const clearInputField = () => {
    setInputs({ ...inputs, text: "" });
  };

  const getProjects = async () => {
    const response = await fetch("http://localhost:5000/project", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.token,
      },
    });

    const parseRes = await response.json();

    console.log(parseRes.projects);
    setProjects(parseRes.projects);
  };

  useEffect(() => {
    getProjects();
  }, []);

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { pid, vname, vno, releasedate, releasedby, comment };

      const ids = [];
      projects.map((project) => {
        ids.push(project.id);
      });

      if (ids.includes(parseInt(pid))) {
        const response = await fetch("http://localhost:5000/version/add", {
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
          history.push("/versions");
        }
        clearInputField();
      } else {
        toast.error("Project Not Authorized");
      }
    } catch (err) {
      toast.error("server error");
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

  const { pid, vname, vno, releasedate, releasedby, comment } = inputs;

  return (
    <Fragment>
      <h3 className="text-center">Add Version</h3>
      <form className="login-form" onSubmit={onSubmitForm}>
        <div className="form-group ">
          <label htmlFor="pid">Project Id</label>
          <input
            name="pid"
            type="text"
            className="form-control"
            id="pid"
            placeholder="Enter Name"
            value={pid}
            onChange={handleChange}
          />
        </div>

        <div className="form-group ">
          <label htmlFor="vname">Version Name</label>
          <input
            name="vname"
            type="text"
            className="form-control"
            id="vname"
            placeholder="Enter Name"
            value={vname}
            onChange={handleChange}
          />
        </div>

        <div className="form-group ">
          <label htmlFor="vno">Version Number</label>
          <input
            name="vno"
            type="text"
            className="form-control"
            id="vno"
            placeholder="Enter Name"
            value={vno}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="releasedate">Released Date</label>
          <input
            name="releasedate"
            type="date"
            className="form-control"
            id="releasedate"
            placeholder="Start Date"
            value={releasedate}
            onChange={handleChange}
          />
        </div>

        <div className="form-group ">
          <label htmlFor="releasedby">Released By</label>
          <input
            name="releasedby"
            type="text"
            className="form-control"
            id="releasedby"
            placeholder="Enter Name"
            value={releasedby}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="comment">Comment</label>
          <textarea
            name="comment"
            type="text"
            className="form-control"
            id="text"
            placeholder="Input comment"
            rows="10"
            cols="30"
            value={comment}
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

export default AddVersion;
