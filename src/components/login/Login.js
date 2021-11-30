import React, { Fragment, useState, useEffect } from "react";
import "./form.css";

import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setAuth, setUser } from "../../auth/authSlice";

import { toast } from "react-toastify";
const Login = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const history = useHistory();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  useEffect(
    (props) => {
      if (isAuthenticated) {
        history.push("/dashboard");
      }
    },
    [isAuthenticated]
  );

  const resetInputValue = () => {
    setInputs({ ...inputs, password: "" });
  };

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { email, password };
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();

      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);
        dispatch(setUser({ username: inputs.email, token: parseRes.token }));
        dispatch(setAuth({ isAuthenticated: true }));
        history.push("/dashboard");
        toast.success("Login Successful");
      } else {
        toast.error(parseRes);

        resetInputValue();
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const { email, password } = inputs;

  return (
    <Fragment>
      <h3 className="text-center">Login</h3>
      <form className="login-form" onSubmit={onSubmitForm}>
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
          Login
        </button>
      </form>
    </Fragment>
  );
};

export default Login;
