import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { connect } from "react-redux";
import { actions } from "../../redux/actions/action";
import { useAuth } from "../../contexts/AuthContext"
import { Link } from "react-router-dom"
import i18 from "../../i18/i18";
import { useTranslation } from 'react-i18next';
export  function ForgotPassword(props) {
  const { language } = props;
  const emailRef = useRef()
  const { resetPassword } = useAuth()
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setMessage("")
      setError("")
      setLoading(true)
      await resetPassword(emailRef.current.value)
      setMessage(language!=="he"?"Check your inbox for further instructions":"בדוק את תיבת הדואר הנכנס שלך להנחיות נוספות")
    } catch {
      setError(language!=="he"?"Failed to reset password":"איפוס סיסמא נכשל")
    }

    setLoading(false)
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">{i18.t("PasswordReset")} {""}</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <Form onSubmit={handleSubmit} className={language == "he" && "rtl"}>
            <Form.Group id="email">
              <Form.Label>{""}</Form.Label>
              <Form.Control className="rounded-input" type="email" ref={emailRef} required placeholder={i18.t("emailConnect")}  />
            </Form.Group>
            <Button disabled={loading} className="w-100 mt-3 rounded-input text-black goldbg border-0" type="submit">
            {i18.t("resetPassword")} {""}
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/login" className="text-black">{i18.t("login")} {""}</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
      {i18.t("NeedAnAccount")} {""} <Link to="/signup" className="text-black">{i18.t("signUp")} {""}</Link>
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
export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
