import React, { useState, useCallback } from "react";
import axios from "axios";

export const IssueContext = React.createContext();

const issueAxios = axios.create();
issueAxios.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

const initState = { issues: [], voteErr: "" };

export default function IssueProvider(props) {
  const [issueState, setIssueState] = useState(initState);

  const getIssues = useCallback(() => {
    issueAxios
      .get("/api/issue")
      .then(res => setIssueState(prev => ({ ...prev, issues: res.data })))
      .catch(err => console.log(err));
  }, []);

  const addIssue = newIssue => {
    issueAxios
      .post("/api/issue", newIssue)
      .then(res =>
        setIssueState(prev => ({ ...prev, issues: [...prev.issues, res.data] }))
      );
  };

  const vote = (_id, direction) => {
    issueAxios
      .put(`/api/issue/${direction}vote/${_id}`)
      .then(res => {
        setIssueState(prev => ({
          ...prev,
          issues: prev.issues.map(issue =>
            issue._id === _id ? res.data : issue
          )
        }));
      })
      .catch(err => handleVoteErr(err.response.data.errMsg));
  };

  const handleVoteErr = err => {
    setIssueState(prev => ({ ...prev, voteErr: err }));
  };

  return (
    <IssueContext.Provider value={{ ...issueState, getIssues, addIssue, vote }}>
      {props.children}
    </IssueContext.Provider>
  );
}