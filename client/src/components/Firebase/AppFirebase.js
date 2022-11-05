import React from "react";
import Signup from "./Signup";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./ForgotPassword";
import UpdateProfile from "./UpdateProfile";
import Home from "../Home";

function AppFirebase() {
  return (
    <Container className="d-flex align-items-center justify-content-center">
      <div className="w-100">
        <Router>
          <Switch>
            <PrivateRoute path="/update-profile" component={UpdateProfile} />
            <PrivateRoute path="/Home" component={Home} />
            <Route path="/signup" component={Signup} />
            <Route path="/forgot-password" component={ForgotPassword} />
            <Route path="/" component={Login} />
          </Switch>
        </Router>
      </div>
    </Container>
  );
}

export default AppFirebase;
