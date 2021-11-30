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

const ListVersions = () => {
  const [projects, setProjects] = useState([]);
  const [versions, setVersions] = useState([]);
  const [pid, setPid] = useState("");
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const history = useHistory();
  useEffect(() => {
    if (!isAuthenticated) {
      history.push({ pathname: "/login", state: { prev: "/dashboard" } });
    }
  }, [isAuthenticated]);

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

  const getVersions = async () => {
    const ids = [];
    projects.map((project) => {
      ids.push(project.id);
    });

    if (ids.includes(parseInt(pid))) {
      const response = await fetch("http://localhost:5000/version", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.token,
          pid: pid,
        },
      });

      const parseRes = await response.json();

      console.log(parseRes.versions);

      setVersions(parseRes.versions);
    } else {
      toast.error("Not Authorized");
    }
  };

  const deleteVersion = async (id) => {
    console.log(id);
    try {
      const body = { id };
      const response = await fetch("http://localhost:5000/version", {
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
        getVersions();
      } else {
        toast.error(parseRes);
      }

      console.log(parseRes);
    } catch (error) {
      console.log(error);
      toast.error("server error");
    }
  };

  return (
    <Fragment>
      <br />
      <Link to="/versions/add">
        <button type="button" class="dashbutton">
          Add Versions
        </button>
      </Link>
      <br />
      <br />
      <br />
      <label htmlFor="pid">Project Id</label>
      <input
        value={pid}
        onChange={(e) => {
          setPid(e.target.value);
        }}
        name="pid"
        type="number"
      />
      <br />
      <br />

      <button
        onClick={() => {
          getVersions();
        }}
        class="btn btn-success"
      >
        Get Versions
      </button>
      <table className="table mt-5 text-center">
        <thead>
          <tr>
            <th>version id</th>
            <th>Version Name</th>
            <th>Version Number</th>
            <th>Released Date</th>
            <th>Released By</th>
            <th>Comment</th>
            <th>Active Bug</th>
            {/* <th>Edit</th> */}
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {isAuthenticated &&
            versions?.map((version) => (
              <tr key={version.id}>
                <td>{version.id}</td>

                <td>{version.vname}</td>

                <td>{version.vno}</td>

                <td>{version.releasedate}</td>

                <td>{version.releasedby}</td>

                <td>{version.comment}</td>

                <td>{version.activebugs}</td>

                {/* <td>
                  <button className="btn btn-warning">Edit</button>
                </td> */}
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      deleteVersion(version.id);
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

export default ListVersions;
