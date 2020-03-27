import React, { useState, useEffect, useContext } from "react";
import { IssueContext } from "../../context/IssueProvider.js";
import { useParams } from "react-router-dom";
import Comments from "./Comments.js";
import CommentForm from "./CommentForm.js";

export default function IssueDetail(props) {
  const { _id } = useParams();
  const {
    getIssue,
    addComment,
    getComments,
    issue: { title, description, comments }
  } = useContext(IssueContext);

  const [commentToggle, setCommentToggle] = useState(false);
  const [commentInput, setCommentInput] = useState("");

  useEffect(() => {
     getIssue(_id);
  }, [getIssue, _id]);

  const toggler = () => {
    setCommentToggle(p => !p)
  };
  const handleChange = e => setCommentInput(e.target.value);
  const handleSubmit = e => {
    e.preventDefault();
    addComment(_id, { text: commentInput });
  };

  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
      <button onClick={toggler}>Comments</button>
      {commentToggle && (
        <div>
          <Comments
            id={_id}
            getComments={getComments}
            addComment={addComment}
            comments={comments}
            toggler={toggler}
          />
          <CommentForm
            comment={commentInput}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        </div>
      )}
    </div>
  );
}
