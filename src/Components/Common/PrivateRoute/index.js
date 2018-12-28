import React from 'react';
import { Route, Redirect } from 'react-router-dom';

/**
 * Private route only for users logged in
 */
const PrivateRoute = ({component: Component, authed, ...rest}) => {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to='login'/> }
    />
  )
}

export default PrivateRoute
