import React, { useContext } from "react";
import { UserContext } from "./context/UserProvider.js";
import ProtectedRoute from "./components/shared/ProtectedRoute.js";
import { Switch, Route, Redirect } from "react-router-dom";
import Nav from "./components/Nav"

import Auth from "./components/Auth";
import IssueList from "./components/Issue";

export default function App() {
  const { token, logout } = useContext(UserContext);
  return (
    <div>
      { token && <Nav logout={logout}/> }
      <Switch>
        <Route
          exact
          path="/"
          render={() => (token ? <Redirect to="/issues" /> : <Auth />)}
        />
        <ProtectedRoute
          path="/issues"
          redirectTo="/"
          token={token}
          component={IssueList}
        />
      </Switch>
    </div>
  );
}
