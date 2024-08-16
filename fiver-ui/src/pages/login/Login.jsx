import React, { useState } from "react";
import "./Login.scss";
import { Link, useNavigate } from "react-router-dom";
import apiRequest from "../../utils/apiRequest.js";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await apiRequest.post("/auth/login", { username, password });
      localStorage.setItem("currentUser", JSON.stringify(res.data));
      navigate("/");
    } catch (err) {
      setError(err.response.data);
    }
    e.target.reset();
  };

  return (
    <div className="login">
      <div className="container">
        <form onSubmit={handleSubmit}>
          <h1>Sign in</h1>
          <label htmlFor="">Username</label>
          <input
            type="text"
            name="username"
            placeholder="Johndoe"
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="">Password</label>
          <input
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
          {error && error}
          <Link className="link" to="/register">
            <span>Already have an account? Sign up</span>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
