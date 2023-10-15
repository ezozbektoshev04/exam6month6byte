import React, { useState } from "react";
import { UseAuth } from "../../context/AuthContext";
import "./login.scss";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = UseAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const handleLogin = () => {
    login(user);
    if (user.username === "" && user.password === "") {
      alert("Please enter a username and password");
    } else if (user.username === "" || user.password === "") {
      alert("Please enter a username or password");
    } else {
      navigate("/profile", {
        replace: true,
      });
    }
  };
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="login">
      <h1>Login</h1>
      <div className="field">
        <label htmlFor="username" className="label2">
          Username
        </label>
        <input
          type="text"
          id="username"
          name="username"
          className="input2"
          value={user.username}
          onChange={handleChange}
          required
        />
      </div>
      <div className="field">
        <label htmlFor="password" className="label2">
          Password
        </label>
        <input
          className="input2"
          type="password"
          id="password"
          name="password"
          value={user.password}
          onChange={handleChange}
          required
        />
      </div>
      <button className="btn-login" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};

export default Login;
