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

const EditBug = ({ match }) => {
  const [comment, setComment] = useState("");

  const [data, setData] = useState();

  const getData = async () => {
    console.log(match.params.id);
    try {
      const bid = match.params.id;
      const body = { bid };
      const response = await fetch("http://localhost:5000/bug/bug", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.token,
          bid: bid,
        },
      });

      const parseRes = await response.json();

      console.log(parseRes.bugs);

      const set = async () => {
        await setData(parseRes.bugs);
      };

      set();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const [bugpriority, setBPriority] = useState("Low");

  const [bugPriority, setBugPriority] = useState([
    "Low",
    "Medium",
    "High",
    "Very High",
  ]);

  const [bugstatus, setBugStatus] = useState("not resolved");

  const [solve, setSolve] = useState(["not resolved", "resolved"]);

  const handleBugStatusChange = (e) => {
    console.log(solve[e.target.value]);
    setBugStatus(solve[e.target.value]);
  };

  const Priority = bugPriority.map((Add) => Add);

  const handleBugPriorityChange = (e) => {
    console.log(bugPriority[e.target.value]);
    setBPriority(bugPriority[e.target.value]);
  };
  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const onSubmitForm = async (e) => {
    if (comment === "") {
      setComment(data.comment);
    }

    const bid = match.params.id;
    e.preventDefault();
    try {
      const body = {
        bid,
        comment,
        bugpriority,
        bugstatus,
      };

      console.log(body);

      const response = await fetch("http://localhost:5000/bug", {
        method: "PUT",
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

  const setD = () => {
    setComment(data.comment);
  };

  return (
    <Fragment>
      <h3 className="text-center">Edit Bug</h3>
      <button
        onClick={() => {
          setD();
        }}
        class="btn btn-success"
      >
        Get Data
      </button>
      {data && (
        <form className="login-form" onSubmit={onSubmitForm}>
          <div className="form-group ">
            <label htmlFor="vid">Bug Id</label>
            <input
              name="vid"
              type="text"
              className="form-control"
              id="vid"
              placeholder="Enter Id"
              value={data.id}
              readOnly
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
          <div class="form-group">
            <label for="bugstatus">Bug Status:</label>
            <select
              onChange={(e) => handleBugStatusChange(e)}
              className="browser-default custom-select form-control"
            >
              {solve.map((address, key) => (
                <option key={key} value={key}>
                  {address}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn btn-success btn-block">
            Edit
          </button>
        </form>
      )}
    </Fragment>
  );
};

export default EditBug;
