import React from "react";
import { Link } from "react-router-dom";


export default function Issue(props) {
  const {
    title,
    upVotes,
    downVotes,
    vote,
    watchListAction,
    watchListActionText,
    _id
  } = props;

  return (
    <div>
      <Link to={`/details/issue/${_id}`}>{title}</Link>
      <p>Upvotes: {upVotes}</p>
      <button onClick={() => vote(_id, "up")}>^</button>
      <p>Downvotes: {downVotes}</p>
      <button onClick={() => vote(_id, "down")}>v</button>
      <p>{watchListActionText} WatchList</p>
      <button onClick={() => watchListAction(_id)}>
        {watchListActionText.split(" ")[0]}
      </button>
    </div>
  );
}
