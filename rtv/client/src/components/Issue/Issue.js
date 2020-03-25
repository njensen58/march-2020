import React, { useState } from "react";
import Comments from "./Comments.js";

export default function Issue(props) {
  const {
    title,
    description,
    upVotes,
    downVotes,
    vote,
    watchListAction,
    watchListActionText,
    addComment,
    getComments,
    _id
  } = props;

  const [commentToggle, setCommentToggle] = useState(false);
  const toggler = () => setCommentToggle(p => !p);

  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
      <p>Upvotes: {upVotes}</p>
      <button onClick={() => vote(_id, "up")}>^</button>
      <p>Downvotes: {downVotes}</p>
      <button onClick={() => vote(_id, "down")}>v</button>
      <p>{watchListActionText} WatchList</p>
      <button onClick={() => watchListAction(_id)}>
        {watchListActionText.split(" ")[0]}
      </button>
      <button onClick={toggler}>Comments</button>
      {commentToggle && (
        <Comments
          id={_id}
          getComments={getComments}
          addComment={addComment}
          toggler={toggler}
        />
      )}
    </div>
  );
}
