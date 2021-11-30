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

const ListBugs = () => {
  const [bugs, setBugs] = useState([]);
  const [vid, setVid] = useState("");
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const history = useHistory();
  useEffect(() => {
    if (!isAuthenticated) {
      history.push({ pathname: "/login", state: { prev: "/dashboard" } });
    }
  }, [isAuthenticated]);

  const getBugs = async () => {
    try {
      const response = await fetch("http://localhost:5000/bug", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.token,
          vid: vid,
        },
      });

      const parseRes = await response.json();

      console.log(parseRes);

      if (response.status !== 200) {
        toast.error(parseRes);
      } else {
        setBugs(parseRes.bugs);
        toast.success("Fetched");
      }
    } catch (error) {
      toast.error("Server Error");
      console.log(error);
    }
  };

  const deleteBug = async (id) => {
    console.log(id);
    try {
      const body = { id };
      const response = await fetch("http://localhost:5000/bug", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.token,
        },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();

      if (response.status === 200) {
        toast.success("Deleted");
        getBugs();
      } else {
        toast.error(parseRes);
      }

      console.log(parseRes);
    } catch (error) {}
  };

  return (
    <Fragment>
      <br />
      <Link to="/bugs/add">
        <button type="button" class="dashbutton">
          Add Bugs
        </button>
      </Link>
      <br />
      <br />
      <br />
      <label htmlFor="pid">Version Id</label>
      <input
        value={vid}
        onChange={(e) => {
          setVid(e.target.value);
        }}
        name="pid"
        type="number"
      />
      <br />
      <br />

      <button
        onClick={() => {
          getBugs();
        }}
        class="btn btn-success"
      >
        Get Bugs List
      </button>
      <table className="table mt-5 text-center">
        <thead>
          <tr>
            <th>Bug id</th>
            <th>Version Id</th>
            <th>Bug Name</th>
            <th>Reported Date</th>
            <th>Reported By</th>
            <th>Bug Priority</th>
            <th>Comment</th>
            <th>Bug Type</th>
            <th>Big Status</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {isAuthenticated &&
            bugs?.map((bug) => (
              <tr key={bug.id}>
                <td>{bug.id}</td>

                <td>{bug.vid}</td>

                <td>{bug.bname}</td>

                <td>{bug.reportdate}</td>

                <td>{bug.reportedby}</td>

                <td>{bug.bugpriority}</td>

                <td>{bug.comment}</td>

                <td>{bug.bugtype}</td>

                <td>{bug.bugstatus}</td>

                <td>
                  <Link to={`/bugs/edit/${bug.id}`}>
                    <button className="btn btn-warning">Edit</button>
                  </Link>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      deleteBug(bug.id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          {/* <tr key="12">
            <td>Trading</td>
            <td>12/02/2021</td>
            <td>Genral</td>
            <td>
              <button className="btn btn-danger">Delete</button>
            </td> */}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListBugs;
