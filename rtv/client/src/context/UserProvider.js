import React, { useState } from "react";
import axios from "axios";

export const UserContext = React.createContext();

const initState = {
  user: JSON.parse(localStorage.getItem("user")) || {},
  token: localStorage.getItem("token") || "",
  errMsg: ""
};

export default function UserProvider(props) {
  const [userState, setUserState] = useState(initState);

  const signup = credentials => {
    axios
      .post("/auth/signup", credentials)
      .then(res => {
        const { user, token } = res.data;
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);
        setUserState(prev => ({ user, token, errMsg: "" }));
      })
      .catch(err => handleAuthErr(err.response.data.errMsg));
  };

  const login = credentials => {
    axios
      .post("/auth/login", credentials)
      .then(res => {
        const { user, token } = res.data;
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);
        setUserState(prev => ({ user, token, errMsg: "" }));
      })
      .catch(err => handleAuthErr(err.response.data.errMsg));
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUserState({ user: {}, token: "", errMsg: "" });
  };

  const handleAuthErr = err => setUserState(p => ({ ...p, errMsg: err }));
  const clearErrMsg = () => setUserState(p => ({ ...p, errMsg: "" }));

  return (
    <UserContext.Provider
      value={{ ...userState, login, signup, clearErrMsg, logout }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
