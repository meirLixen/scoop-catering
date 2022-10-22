import React from "react"
import Signup from "./Signup"
import { Container } from "react-bootstrap"
import { AuthProvider } from "../../contexts/AuthContext"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Dashboard from "./Dashboard"
import Login from "./Login"
import PrivateRoute from "./PrivateRoute"
import ForgotPassword from "./ForgotPassword"
import UpdateProfile from "./UpdateProfile"
import Home from '../Home'


function AppFirebase() {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
    // style={{ minHeight: "100vh" }}
    >
      {/* <div className="w-100" style={{ maxWidth: "400px" }}> */}
      <div className="w-100" >

        <Router>
          <AuthProvider>
            <Switch>
              {/* <PrivateRoute exact path="/" component={Login} /> */}
              {/* <PrivateRoute exact path="/" component={Login} /> */}
              <PrivateRoute path="/update-profile" component={UpdateProfile} />
              <PrivateRoute path="/Home" component={Home} />
              <Route path="/signup" component={Signup} />
              <Route path="/forgot-password" component={ForgotPassword} />
              <Route path="/" component={Login} />
              {/* <Route path="/login" component={Login} /> */}

            </Switch>
          </AuthProvider>
        </Router>
      </div>
    </Container>
  )
}

export default AppFirebase
