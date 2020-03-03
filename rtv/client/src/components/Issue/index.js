import React, { useEffect, useContext, useState } from "react";
import { IssueContext } from "../../context/IssueProvider.js";
import AddIssueModal from "./AddIssueModal.js";
import Issue from "./Issue.js";

export default function IssueList() {
  const { getIssues, issues, vote} = useContext(IssueContext);
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
        <Issue {...issue} vote={vote} key={issue._id} />
      ))}
    </div>
  );
}
