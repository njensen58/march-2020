import React, { useState } from "react";
import IssueForm  from './IssueForm.js'

export default function Issue(props) {
  const { title, description, upVotes, downVotes, vote, _id } = props;
  const initInputs = { title, description }
  const [inputs, setInputs] = useState(initInputs)

  const handleChange = e => {
    const {name, value} = e.target
    setInputs(p => ({...p, [name]: value}))
  }
  const handleSubmit = e => {
    e.preventDefault()

  }
  
  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
      <p>Upvotes: {upVotes}</p>
      <button onClick={() => vote(_id, "up")}>^</button>
      <p>Downvotes: {downVotes}</p>
      <button onClick={() => vote(_id, "down")}>v</button>
    </div>
  );
}
