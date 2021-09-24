import React, { Fragment } from "react";

const Navigation = () => {
  return (
    <Fragment>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="/dashboard">
          Dashboard
        </a>
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

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
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
        </div>
      </nav>
    </Fragment>
  );
};

export default Navigation;
