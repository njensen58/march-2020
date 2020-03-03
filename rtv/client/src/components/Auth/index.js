import React, { useState, useContext } from "react";
import { UserContext } from "../../context/UserProvider.js";
import AuthForm from "./AuthForm.js";

const initInputs = { username: "", password: "" };

export default function AuthContainer() {
  const [inputs, setInputs] = useState(initInputs);
  const [toggle, setToggle] = useState(false);
  const { login, signup, errMsg, clearErrMsg } = useContext(UserContext);

  const handleChange = e => {
    const { name, value } = e.target;
    setInputs(p => ({ ...p, [name]: value }));
  };

  const handleLogin = e => {
    e.preventDefault();
    login(inputs);
    setInputs(initInputs);
  };

  const handleSignup = e => {
    e.preventDefault();
    signup(inputs);
    setInputs(initInputs);
  };

  const toggleForm = () => {
    clearErrMsg();
    setToggle(p => !p);
  };

  return (
    <div>
      {!toggle ? (
        <>
          <AuthForm
            handleChange={handleChange}
            handleSubmit={handleSignup}
            inputs={inputs}
            btnText="Signup"
          />
          <button onClick={toggleForm}>Already a Member?</button>
          <p>{errMsg}</p>
        </>
      ) : (
        <>
          <AuthForm
            handleChange={handleChange}
            handleSubmit={handleLogin}
            inputs={inputs}
            btnText="Login"
          />
          <button onClick={toggleForm}>Not a Member?</button>
          <p>{errMsg}</p>
        </>
      )}
    </div>
  );
}
