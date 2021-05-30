import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = (props) => {
  const { children, ...rest } = props;
  const user = useSelector((state) => state.auth.user);

  return (
    <Route
      {...rest}
      render={() =>
        Object.keys(user).length > 0 ? children : <Redirect to="/signin" />
      }
    ></Route>
  );
};

export default PrivateRoute;
