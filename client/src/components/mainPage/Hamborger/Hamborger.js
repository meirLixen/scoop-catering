import "bootstrap/dist/css/bootstrap.min.css";
import $ from "jquery";
import React, { useEffect } from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { connect } from "react-redux";
import i18 from "../../../i18/i18";

// import './hamborger.css';
let previousClick = "empty";
let currentClass;

export function Hamborger(props) {
  const { language } = props;

  function Selection(id) {
    currentClass = "#" + id;

    if ($(currentClass).hasClass("active")) {
    } else {
      props.history.push("/" + id);
      $(currentClass).addClass("active");

      if (previousClick !== "empty" && previousClick !== id) {
        $("#" + previousClick).removeClass("active");
      } else {
        $("#" + previousClick).addClass("active");
      }
      previousClick = id;
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    if ($) {
    }
  }, [$, language]);

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="#">
          <div
            alt=""
            width="30"
            height="30"
            className="d-inline-block align-top"
          />
          Scoop catering
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <NavDropdown
              title={i18.t("ScoopCatering")}
              style={{ direction: "ltr" }}
              className="bg-transparent"
              variant="dark"
            >
              <div
                className="row d-flex align-content-center justify-content-center h-100  "
                variant="dark"
              >
                <NavDropdown.Item
                  onClick={() => props.history.push("/home/ourStory")}
                  style={{ textAlign: "center" }}
                  className="h5 bg-transparent"
                >
                  {i18.t("OurStory")}{" "}
                </NavDropdown.Item>

                <NavDropdown.Item
                  onClick={() => props.history.push("/home/ourCustomers")}
                  style={{ textAlign: "center" }}
                  className="h5 bg-transparent"
                >
                  {i18.t("OurCustomers")}
                </NavDropdown.Item>

                <NavDropdown.Item
                  onClick={() => props.history.push("/home/ourTeam")}
                  style={{ textAlign: "center" }}
                  className="h5 bg-transparent"
                >
                  {" "}
                  {i18.t("OurTeam")}{" "}
                </NavDropdown.Item>

                <NavDropdown.Item
                  onClick={() => props.history.push("/home/kashrut")}
                  style={{ textAlign: "center" }}
                  className="h5 bg-transparent"
                >
                  {i18.t("Kashrut")}
                </NavDropdown.Item>
              </div>
            </NavDropdown>

            <Nav.Link
              id="events"
              className=" hoverLink"
              onClick={() => {
                Selection("events");
              }}
            >
              {i18.t("EventBooking")}
            </Nav.Link>
            <Nav.Link
              id="shop"
              className=" hoverLink"
              onClick={() => {
                Selection("shop");
              }}
            >
              {i18.t("shabatMenu")}
            </Nav.Link>
            <Nav.Link
              id="gallery"
              className=" hoverLink"
              onClick={() => {
                Selection("gallery");
              }}
            >
              {i18.t("gallery")}
            </Nav.Link>
            <Nav.Link
              id="contact-us"
              className=" hoverLink"
              onClick={() => {
                Selection("contact-us");
              }}
            >
              {i18.t("ContactUs")}{" "}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* 
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#features">Features</Nav.Link>
                            <Nav.Link href="#pricing">Pricing</Nav.Link>
                            <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Nav>
                            <Nav.Link href="#deets">More deets</Nav.Link>
                            <Nav.Link eventKey={2} href="#memes">
                                Dank memes
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar> */}
    </>
  );
}
const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(Hamborger);
