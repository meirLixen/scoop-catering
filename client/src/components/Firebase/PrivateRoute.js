import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function PrivateRoute({
  component: Component,
  allowAdminOnly,
  ...rest
}) {
  const currentUser = useAuth()?.currentUser;
  const userDetails = useAuth()?.userDetails;

  return (
    <Route
      {...rest}
      render={(props) => {
        if (allowAdminOnly) {
          const userType = userDetails?.userType;
          return userType && userType !== "user" ? (
            <Component {...props} />
          ) : (
            <div>אין לך הרשאה לעמוד זה</div>
          );
        }

        return currentUser ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        );
        // return <Component {...props} />
      }}
    ></Route>
  );
}
