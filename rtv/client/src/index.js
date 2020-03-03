import React from "react";
import ReactDOM from "react-dom";
import App from "./App.js";
import { BrowserRouter } from "react-router-dom";
import UserProvider from "./context/UserProvider.js";
import IssueProvider from "./context/IssueProvider.js";
import "./styles.css"

ReactDOM.render(
  <BrowserRouter>
    <UserProvider>
      <IssueProvider>
        <App />
      </IssueProvider>
    </UserProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
