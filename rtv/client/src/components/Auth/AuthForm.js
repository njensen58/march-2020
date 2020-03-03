import React from "react";

export default function AuthForm(props) {
  const {
    handleChange,
    handleSubmit,
    btnText,
    inputs: { username, password }
  } = props;
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">
        <input
          type="text"
          name="username"
          value={username}
          onChange={handleChange}
          placeholder="Username"
          id="username"
        />
      </label>
      <label htmlFor="password">
        <input
          type="text"
          name="password"
          value={password}
          onChange={handleChange}
          placeholder="Password"
          id="password"
        />
      </label>
      <button>{btnText}</button>
    </form>
  );
}
