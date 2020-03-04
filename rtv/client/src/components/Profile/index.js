import React, { useContext, useEffect } from "react";
import { UserContext } from "../../context/UserProvider.js";
import { IssueContext } from "../../context/IssueProvider.js";
import Issue from "../Issue/Issue.js";

export default function Profile(props) {
  const {
    user: { username },
    removeFromWatchList,
    userWatchList,
    getWatchList
  } = useContext(UserContext);

  const { vote } = useContext(IssueContext);

  useEffect(() => {
    getWatchList();
  }, [getWatchList]);

  return (
    <div>
      <h1>Welcome @{username}!</h1>
      <h5>Watchlist</h5>
      <div>
        {userWatchList.map(issue => (
          <Issue
            {...issue}
            key={issue._id}
            watchListAction={removeFromWatchList}
            watchListActionText="Remove from"
            vote={vote}
          />
        ))}
      </div>
    </div>
  );
}
