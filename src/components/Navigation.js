import React, { Fragment } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setAuth, setUser } from "../auth/authSlice";

const Navigation = () => {
  let history = useHistory();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const onClickLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    dispatch(setUser({ username: "", token: null }));
    dispatch(setAuth(false));
    toast.success("You Loggedout successfully");

    history.push("/login");
  };
  return (
    <Fragment>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link className="navbar-brand" to="/dashboard">
          Dashboard
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item active">
              <a className="nav-link" href="/login">
                Login <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item active">
              <a className="nav-link" href="/register">
                Register
              </a>
            </li>
          </ul>
        </div> */}
        <div
          className=" navbar-collapse w-50 order-1 dual-collapse2"
          // className="collapse navbar-collapse w-100 order-3 dual-collapse2"
          id="navbarSupportedContent"
        >
          <ul className="nav navbar-nav ml-auto">
            <li className="nav-item active">
              {!isAuthenticated === true && (
                <Link className="nav-link" to="/login">
                  Login <span className="sr-only">(current)</span>
                </Link>
              )}
            </li>
            <li className="nav-item active">
              {!isAuthenticated === true && (
                <Link className="nav-link" to="/register">
                  Register
                </Link>
              )}
            </li>

            <li className="nav-item active">
              {isAuthenticated === true && (
                <a className="nav-link" href="/login" onClick={onClickLogout}>
                  Logout
                </a>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </Fragment>
  );
};

export default Navigation;
