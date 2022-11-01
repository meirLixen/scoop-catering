import React from "react";
import "./../../App.css";
import img1 from "../../data/imges/galeryImag.png";
import { Nav, Button, NavDropdown } from "react-bootstrap";

import { connect } from "react-redux";
import { actions } from "../../redux/actions/action";
// import Search from '../Search';
import ButtonGroup from "@material-ui/core/ButtonGroup";
import $ from "jquery";
import { useTranslation } from "react-i18next";
import i18 from "../../i18/i18";

import Navbar from "react-bootstrap/Navbar";
import { useEffect } from "react";
let previousClick = "empty";
let currentClass;
export function Nuv(props) {
  const { language } = props;
  let url = window.location.pathname.split("/");
  let isTrue = url[url.length - 2];
  async function chang_language(lang) {
    i18n.changeLanguage(lang);
    if (isTrue === "shop") props.history.push("/shop");
    if (lang === "en") {
      await props.setLanguage(lang);
    } else if (lang === "he") {
      await props.setLanguage(lang);
    }
  }

  const { t, i18n } = useTranslation();

  function Selection(id) {
    // $('.categoryList').removeClass('px-3')
    currentClass = "#" + id;
    // if (id === 'pageOne')
    //     currentClass = "." + id

    if ($(currentClass).hasClass("active")) {
    } else {
      props.history.push("/" + id);
      $(currentClass).addClass("active");

      console.log(previousClick);
      if (previousClick !== "empty" && previousClick !== id) {
        $("#" + previousClick).removeClass("active");
      } else {
        $("#" + previousClick).addClass("active");
      }
      previousClick = id;
    }
  }

  return (
    <>
      <Navbar variant="dark" expand="lg" style={{ height: "8vh" }}>
        <Navbar.Brand></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          {/* <Search details={products} /> */}
          <Nav
            className=" my-2 my-lg-0 linksNuv pt-2 pb-2 "
            style={
              {
                // maxHeight: 'fit-content', right: '3%',
                // position: 'absolute'
              }
            }
            navbarScroll
          >
            <NavDropdown
              className=" hoverLink scoopButton"
              title={i18.t("ScoopCatering")}
              id="navbarScrollingDropdown"
              style={{ direction: "ltr" }}
            >
              <div className="row d-flex align-content-center justify-content-center h-100 w-100 m-0">
                <div className="col-md-6 d-flex p-0 flex-column align-conte-center justify-content-center">
                  <NavDropdown.Item
                    onClick={() => props.history.push("/home/ourStory")}
                    style={{ textAlign: "start" }}
                    className="pb-1 pr-0  m-0"
                  >
                    {i18.t("OurStory")}{" "}
                  </NavDropdown.Item>

                  <hr className="hr_Style m-0 mb-2" />
                  <NavDropdown.Item
                    onClick={() => props.history.push("/home/ourCustomers")}
                    style={{ textAlign: "start" }}
                    className="pb-1 pr-0  m-0"
                  >
                    {i18.t("OurCustomers")}
                  </NavDropdown.Item>
                  <hr className="hr_Style m-0 mb-2" />
                  <NavDropdown.Item
                    onClick={() => props.history.push("/home/ourTeam")}
                    style={{ textAlign: "start" }}
                    className="pb-1 pr-0  m-0"
                  >
                    {" "}
                    {i18.t("OurTeam")}{" "}
                  </NavDropdown.Item>
                  <hr className="hr_Style m-0 mb-2" />
                  <NavDropdown.Item
                    onClick={() => props.history.push("/home/kashrut")}
                    style={{ textAlign: "start" }}
                    className="pb-1 pr-0  m-0"
                  >
                    {i18.t("Kashrut")}
                  </NavDropdown.Item>
                  <hr className="hr_Style m-0 mb-2" />
                </div>
                <div className="col-md-6   CustomerItem p-0">
                  {" "}
                  <img alt="" className="h-100 w-100" src={img1} />
                </div>
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
            {/* <Nav.Link className="active hoverLink" onClick={() => props.history.push('/OrderSummary')} >Orders </Nav.Link> */}

            <ButtonGroup
              /* disableElevation */ variant="contained"
              color="primary"
            >
              <Button
                className="HeLanguage bg-black border-0  p-0 ml-4"
                onClick={() => chang_language("he")}
                color="secondary"
              >
                HE
              </Button>
              <Button
                className="EnLanguage d-none bg-black border-white p-0 mr-4"
                onClick={() => chang_language("en")}
              >
                EN
              </Button>
            </ButtonGroup>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    products: state.productReducer.products,
    language: state.languageReducer.language,
  };
};
const mapDispatchToProps = (dispatch) => ({
  getAllProducts: () => dispatch(actions.getAllProducts()),
  setLanguage: (lan) => dispatch(actions.setLanguage(lan)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Nuv);
