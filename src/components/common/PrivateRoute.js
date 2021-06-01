import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = (props) => {
  const { loading, children, ...rest } = props;
  const user = useSelector((state) => state.auth.user);

  if (loading) return <div>Loading...</div>;

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
