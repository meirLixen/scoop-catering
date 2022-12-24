import React, { useState } from "react"
import { Card, Button, Alert } from "react-bootstrap"
import { useAuth } from "../../contexts/AuthContext"

import { Link, useHistory } from "react-router-dom"
import { connect } from "react-redux";
import { actions } from "../../redux/actions/action";

import i18 from "../../i18/i18";
import { useTranslation } from 'react-i18next';
export  function Dashboard(props) {
  const {language}=props
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const history = useHistory()

  async function handleLogout() {
    setError("")

    try {
      await logout()
      history.push("/login")
    } catch {
      setError("Failed to log out")
    }
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>{i18.t("email")}:</strong> {currentUser.email}
          <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
            Update Profile
          </Link>
          {/* <a href="/home"> <Button > continue</Button></a> */}
          {/* <Button onClick={() => history.push("")}>  continue</Button> */}
          <Link to="/Home" className="btn btn-primary w-100 mt-3" >
            continue
          </Link>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </>
  )
}
const mapStateToProps = (state) => {
  return {
    language: state.languageReducer.language,
  };
};

const mapDispatchToProps = (dispatch) => ({

});
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);