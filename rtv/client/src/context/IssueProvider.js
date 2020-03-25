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

  // get the comments for a specific post by ID
  const getComments = _id => {
    issueAxios
      .get(`/api/comment/${_id}`)
      .then(res => {
        setIssueState(prev => ({
          ...prev,
          issues: prev.issues.map(issue => {
            if (issue._id === _id) {
              const issueToUpdate = Object.assign({}, issue);
              issueToUpdate.comments = res.data;
              return issueToUpdate;
            } else {
              return issue;
            }
          })
        }));
      })
      .catch(err => console.log(err));
  };

  const addComment = (_id, comment) => {
    issueAxios
      .post(`/api/comment/${_id}`, comment)
      .then(res => {
        setIssueState(prev => ({
          ...prev,
          issues: prev.issues.map(issue => {
            if (issue._id === _id) {
              const issueToUpdate = Object.assign({}, issue);
              issueToUpdate.comments.push(res.data);
              return issueToUpdate;
            } else {
              return issue;
            }
          })
        }));
      })
      .catch(err => console.log(err));
  };

  const handleVoteErr = err => {
    setIssueState(prev => ({ ...prev, voteErr: err }));
  };

  return (
    <IssueContext.Provider
      value={{
        ...issueState,
        getIssues,
        addIssue,
        vote,
        getComments,
        addComment
      }}
    >
      {props.children}
    </IssueContext.Provider>
  );
}
