import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function ProtectedRoute({ children }) {
  const isLoggedIn = useContext(CurrentUserContext);

  return (
    <Route
      render={() => {
        return isLoggedIn
          ? children
          : <Redirect to='/' />
      }}
    />
  );
};

export default ProtectedRoute;
