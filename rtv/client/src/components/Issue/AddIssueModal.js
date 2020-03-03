import React, { useState, useContext } from "react";
import { IssueContext } from "../../context/IssueProvider.js";
import IssueForm from "./IssueForm.js";

const initInputs = { title: "", description: "" };

export default function AddIssueModal(props) {
  const { toggler, show } = props;
  const [inputs, setInputs] = useState(initInputs);
  const { addIssue } = useContext(IssueContext);

  const handleChange = e => {
    const { name, value } = e.target;
    setInputs(p => ({ ...p, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    addIssue(inputs);
    setInputs(initInputs);
    toggler();
  };
  return (
    <div
      className={show ? "modal-overlay modal-overlay-open" : "modal-overlay"}
    >
      <div className="modal">
        <IssueForm
          inputs={inputs}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          btnText="Add Issue"
        />
        <button className="modal-btn" onClick={toggler}>
          X
        </button>
      </div>
    </div>
  );
}
