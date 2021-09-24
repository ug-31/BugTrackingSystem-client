import React, { Fragment, useState } from "react";
import "./form.css";

const Register = () => {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const { name, email, password } = inputs;

  return (
    <Fragment>
      <form className="login-form">
        <h3 className="text-center">Register</h3>
        <div className="form-group ">
          <label htmlFor="name">Name</label>
          <input
            name="name"
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter name"
            value={name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group ">
          <label htmlFor="email">Email address</label>
          <input
            name="email"
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter email"
            value={email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            value={password}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-success btn-block">
          Register
        </button>
      </form>
    </Fragment>
  );
};

export default Register;
