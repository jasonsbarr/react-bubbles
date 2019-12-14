import React, { useState } from "react";

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [formState, setFormState] = useState({
    username: "",
    password: ""
  });
  const handleLogin = event => {
    event.preventDefault();
  };
  const handleInputChange = event => {
    setFormState({
      ...formState,
      [event.target.key]: event.target.value
    });
  };

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <h2>Login to see the bubbles!</h2>
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
