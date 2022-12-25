import { default as React, useRef, useState } from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import i18 from "../../i18/i18";
import useModal from "../Popup/useModal";

export function Login(props) {
  const { language } = props;

  const { toggle } = useModal();
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { t, i18n } = useTranslation();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);

      history.push("/shop");
    } catch (err) {
      console.error("err: ", err);
      setError("Failed to log in");
    }

    setLoading(false);
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4"> {i18.t("Login")} </h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit} className={language == "he" && "rtl"}>
            <Form.Group id="email">
              <Form.Label></Form.Label>
              <Form.Control
                className="rounded-input border-dark"
                type="email"
                ref={emailRef}
                required
                placeholder={i18.t("emailConnect")}
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label> </Form.Label>
              <Form.Control
                className="rounded-input border-dark"
                type="password"
                ref={passwordRef}
                required
                placeholder={i18.t("password")}
              />
            </Form.Group>
            <Button
              disabled={loading}
              onClick={toggle}
              className="w-100 mt-3  text-black goldbg border-0 rounded-input  "
              type="submit"
            >
              {i18.t("loginButton")}{" "}
            </Button>
          </Form>
          <div
            className={
              language === "he" ? "text-end mt-3" : "w-100 text-start mt-3"
            }
          >
            <Link to="/forgot-password" className="text-black">
              {i18.t("forgotPassword")}{" "}
            </Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        {i18.t("NeedAnAccount")}{" "}
        <Link to="/signup" className="text-black">
          {i18.t("signUp")}{" "}
        </Link>
      </div>
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    language: state.languageReducer.language,
  };
};

const mapDispatchToProps = (dispatch) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(Login);
