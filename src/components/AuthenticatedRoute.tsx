import * as React from "react";
import { Route } from "react-router-dom";


export const PrivateRoute = ({component: Component, ...rest }: any) => (
  // tslint:disable-next-line:jsx-no-lambda
  <Route render={ () => <Component {...rest} />} />
);
