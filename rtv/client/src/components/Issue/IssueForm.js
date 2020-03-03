import React from "react";

export default function IssueForm(props) {
  const {
    handleChange,
    handleSubmit,
    inputs: { title, description },
    btnText
  } = props;
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        value={title}
        onChange={handleChange}
        placeholder="Title"
      />
      <input
        type="text"
        name="description"
        value={description}
        onChange={handleChange}
        placeholder="Description"
      />
      <button>{btnText}</button>
    </form>
  );
}
