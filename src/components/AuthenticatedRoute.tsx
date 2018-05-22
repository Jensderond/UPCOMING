import * as React from "react";
import { Route } from "react-router-dom";


export const PrivateRoute = ({component: Component, ...rest }: any) => (
  <Route {...rest} render={PrivateRender(Component)} />
);

export const PrivateRender = (Component: any) => {
  return (props: any) => {
    return <Component {...props}/>;
  };
};

// function ProtectedRoute({component: Component, path, ...other}) {
//   return <Route {...other} path={path} render={(props) => (
//     isSignedIn()
//       ? <Component {...props} />
//       : <Redirect to={'/signin?redir='+encodeURIComponent(path)} /> 
//   )} />
// }

