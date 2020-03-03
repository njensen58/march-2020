import React, { useState } from "react";
import Form from "./Form.js";
import Repo from "./Repo.js";
import axios from "axios";

const initState = { err: "", input: "", repos: [] };

export default function App() {
  const [appState, setAppState] = useState(initState);

  const handleChange = e => {
    const { value } = e.target;
    setAppState(p => ({ ...p, input: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .get(`/repolist?user=${input}`)
      .then(res => setAppState(() => ({ err: "", repos: res.data, input: "" })))
      .catch(err => setAppState(p => ({ ...p, err: err.response.data.msg })));
  };

  const { input, err, repos } = appState;
  return (
    <div>
      <h1>Enter a git user's name to retreive a list of their public repos</h1>
      <Form
        input={input}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      {err && <p>{err}</p>}
      <div>
        {repos.map(r => (
          <Repo {...r} key={r.title} />
        ))}
      </div>
    </div>
  );
}
