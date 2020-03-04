import React, { useState, useCallback } from "react";
import axios from "axios";

export const UserContext = React.createContext();

const initState = {
  user: JSON.parse(localStorage.getItem("user")) || {},
  token: localStorage.getItem("token") || "",
  errMsg: "",
  userWatchList: []
};

const userAxios = axios.create();
userAxios.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

export default function UserProvider(props) {
  const [userState, setUserState] = useState(initState);

  const signup = credentials => {
    axios
      .post("/auth/signup", credentials)
      .then(res => {
        const { user, token } = res.data;
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);
        setUserState(prev => ({ ...prev, user, token, errMsg: "" }));
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
        setUserState(prev => ({ ...prev, user, token, errMsg: "" }));
      })
      .catch(err => handleAuthErr(err.response.data.errMsg));
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUserState({ user: {}, token: "", errMsg: "", userWatchList: [] });
  };

  const getWatchList = useCallback(() => {
    userAxios
      .get("/api/user/watchlist")
      .then(res => {
        setUserState(prev => ({ ...prev, userWatchList: res.data }));
      })
      .catch(err => console.log(err));
  }, []);

  const addToWatchList = _id => {
    userAxios
      .put(`/api/user/watchlist/add/${_id}`)
      .then(res => {
        setUserState(p => ({ ...p, user: res.data }));
        localStorage.setItem("user", JSON.stringify(res.data));
      })
      .catch(err => console.log(err));
  };

  const removeFromWatchList = _id => {
    userAxios
      .put(`/api/user/watchlist/remove/${_id}`)
      .then(res => {
        setUserState(p => ({ ...p, user: res.data }));
        localStorage.setItem("user", JSON.stringify(res.data));
      })
      .catch(err => console.log(err));
  };

  const handleAuthErr = err => setUserState(p => ({ ...p, errMsg: err }));
  const clearErrMsg = () => setUserState(p => ({ ...p, errMsg: "" }));

  return (
    <UserContext.Provider
      value={{
        ...userState,
        login,
        signup,
        clearErrMsg,
        logout,
        addToWatchList,
        removeFromWatchList,
        getWatchList
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
