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

const ListProjects = () => {
  const [projects, setProjects] = useState([]);
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

  const deleteProject = async (id) => {
    console.log(id);
    try {
      const body = { id };
      const response = await fetch("http://localhost:5000/project", {
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
        getProjects();
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
      <Link to="/projects/add">
        <button type="button" class="dashbutton">
          Add Projects
        </button>
      </Link>
      <table className="table mt-5 text-center">
        <thead>
          <tr>
            <th>id</th>
            <th>Project Name</th>
            <th>Start Date</th>
            <th>Description</th>
            {/* <th>Edit</th> */}
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id}>
              <td>{project.id}</td>
              <td>{project.pname}</td>
              <td>{project.startdate}</td>
              <td>{project.description}</td>
              {/* <td>
                <button className="btn btn-warning">Edit</button>
              </td> */}
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    deleteProject(project.id);
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

export default ListProjects;
