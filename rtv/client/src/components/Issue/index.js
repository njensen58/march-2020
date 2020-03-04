import React, { useEffect, useContext, useState } from "react";
import { IssueContext } from "../../context/IssueProvider.js";
import { UserContext } from "../../context/UserProvider.js";
import AddIssueModal from "./AddIssueModal.js";
import Issue from "./Issue.js";

export default function IssueList() {
  const { getIssues, issues, vote } = useContext(IssueContext);
  const { addToWatchList } = useContext(UserContext);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    getIssues();
  }, [getIssues]);

  const toggler = () => setToggle(p => !p);

  return (
    <div>
      <button onClick={toggler}>Add Issue</button>
      <AddIssueModal toggler={toggler} show={toggle} />
      {issues.map(issue => (
        <Issue
          {...issue}
          watchListAction={addToWatchList}
          watchListActionText="Add to" 
          vote={vote}
          key={issue._id}
        />
      ))}
    </div>
  );
}
