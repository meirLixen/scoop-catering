import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import { connect } from "react-redux";
import { actions } from "../../redux/actions/action";

import i18 from "../../i18/i18";
import { useTranslation } from 'react-i18next';
export  function Signup(props) {
  const { language } = props;
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const fullNameRef = useRef()

  const phoneNumberRef = useRef()

  const { signup } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit(e) {
    

    e.preventDefault()
    if (passwordRef.current.value.length < 6) {
      return setError(language!=="he"?"password must at least 6 characters":"הסיסמא חייבת להכיל לפחות 6 תווים")
    }
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError(language!=="he"?"Passwords do not match":"אימות סיסמא שגוי")
    }

    try {
      setError("")
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value, fullNameRef.current.value, phoneNumberRef.current.value)
      history.push("/shop")
    } catch (e) {
      console.error(e);
      setError("Failed to create an account")
    }

    setLoading(false)
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center  goldColor">{i18.t("signTitle")}</h2>
          <hr class="hrCheckout m-auto mt-0 mb-4" style={{width:'70px !important'}}></hr>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit} className={language == "he" && "rtl"}>
          <Form.Group id="lastName-confirm">
              <Form.Label className="mb-1 mt-2">*{i18.t("fullName")}{""} </Form.Label>
              <Form.Control className=" rounded-input " type="text" ref={fullNameRef} required />
            </Form.Group>
            <Form.Group id="email">
              <Form.Label className="mb-1 mt-2">*{i18.t("email")}{""}</Form.Label>
              <Form.Control className=" rounded-input " type="email" ref={emailRef} required  />
            </Form.Group>

            <Form.Group id="phoneNumber-confirm">
              <Form.Label className="mb-1 mt-2">*{i18.t("phoneNumber")}{""}</Form.Label>
              <Form.Control className=" rounded-input " type="text" ref={phoneNumberRef} required />
            </Form.Group>

            <Form.Group id="password">
              <Form.Label className="mb-1 mt-2">*{i18.t("password")}{""}</Form.Label>
              <Form.Control className=" rounded-input " type="password" ref={passwordRef} required />
            </Form.Group>

            <Form.Group id="password-confirm">
              <Form.Label className="mb-1 mt-2">*{i18.t("passwordConfirmation")}{""}</Form.Label>
              <Form.Control className=" rounded-input " type="password" ref={passwordConfirmRef} required />
            </Form.Group>
          

          

            <Button disabled={loading} className="mt-5 goldButton px-4 py-2  
            d-flex  m-auto   justify-content-center
            align-items-center
            
            " type="submit">
            {i18.t("signUp")}
            {language === "he" ? (
                      <i
                        className="fas fa-solid fa-arrow-left mr-3"
                        style={{ fontSize: "17px" }}
                      ></i>
                    ) : (
                      <i
                        className="fas fa-solid fa-arrow-right ml-3"
                        style={{ fontSize: "17px" }}
                      ></i>
                    )}{" "}
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
      {i18.t("AlreadyAnAccount")} <Link to="/login" className="text-black">{i18.t("loginButton")}</Link>
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
export default connect(mapStateToProps, mapDispatchToProps)(Signup);
