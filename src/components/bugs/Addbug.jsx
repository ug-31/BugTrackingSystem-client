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

const AddBug = () => {
  const [inputs, setInputs] = useState({
    vid: "",
    bname: "",
    reportedby: "",
    reportdate: "",
    comment: "",
    bugtype: "",
  });

  const [bugpriority, setBPriority] = useState("Low");

  const [bugPriority, setBugPriority] = useState([
    "Low",
    "Medium",
    "High",
    "Very High",
  ]);

  const Priority = bugPriority.map((Add) => Add);

  const handleBugPriorityChange = (e) => {
    console.log(bugPriority[e.target.value]);
    setBPriority(bugPriority[e.target.value]);
  };
  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const clearInputField = () => {
    setInputs({ ...inputs, text: "" });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = {
        vid,
        bname,
        reportedby,
        reportdate,
        comment,
        bugtype,
        bugpriority,
      };

      console.log(body);

      const response = await fetch("http://localhost:5000/bug/add", {
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
        history.push("/bugs");
      }
      clearInputField();
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

  const { vid, bname, reportedby, reportdate, comment, bugtype } = inputs;

  return (
    <Fragment>
      <h3 className="text-center">Add Version</h3>
      <form className="login-form" onSubmit={onSubmitForm}>
        <div className="form-group ">
          <label htmlFor="vid">Version Id</label>
          <input
            name="vid"
            type="text"
            className="form-control"
            id="vid"
            placeholder="Enter Id"
            value={vid}
            onChange={handleChange}
          />
        </div>

        <div class="form-group">
          <label for="bugpriority">Bug Priority:</label>
          <select
            onChange={(e) => handleBugPriorityChange(e)}
            className="browser-default custom-select form-control"
          >
            {Priority.map((address, key) => (
              <option key={key} value={key}>
                {address}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group ">
          <label htmlFor="bname">Bug Name</label>
          <input
            name="bname"
            type="text"
            className="form-control"
            id="bname"
            placeholder="Enter Bug Name"
            value={bname}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="reportedby">Reported By</label>
          <input
            name="reportedby"
            type="text"
            className="form-control"
            id="reportedby"
            placeholder="Enter Name"
            value={reportedby}
            onChange={handleChange}
          />
        </div>

        <div className="form-group ">
          <label htmlFor="reportdate">Report Date</label>
          <input
            name="reportdate"
            type="date"
            className="form-control"
            id="reportdate"
            value={reportdate}
            onChange={handleChange}
          />
        </div>

        <div className="form-group ">
          <label htmlFor="bugtype">Bug Type</label>
          <input
            name="bugtype"
            type="text"
            className="form-control"
            id="bugtype"
            placeholder="Enter Bug type"
            value={bugtype}
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

export default AddBug;
