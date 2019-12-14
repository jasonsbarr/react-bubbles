import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import useLocalStorage from "../hooks/useLocalStorage";

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [formState, setFormState] = useState({
    username: "",
    password: ""
  });
  const [token, setToken] = useLocalStorage("token", "");
  const handleInputChange = event => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value
    });
  };
  const handleLogin = event => {
    event.preventDefault();
    const options = {
      method: "post",
      url: "http://localhost:5000/api/login",
      data: formState,
      headers: {
        "Content-Type": "application/json"
      }
    };
    Axios(options)
      .then(({ data }) => {
        setToken(data.payload);
      })
      .catch(console.error);
  };

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={handleLogin}>
        <div className="formField">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            value={formState.username}
            onChange={handleInputChange}
          />
        </div>
        <div className="formField">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={formState.password}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default Login;
