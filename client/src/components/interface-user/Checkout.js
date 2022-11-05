import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import $ from "jquery";
import { Form } from "react-bootstrap";

import Footer from "../mainPage/Footer";
import UnderFooter from "../mainPage/UnderFooter";
import editIcon from "../../data/imges/editIcon.png";
import useMediaQuery from "../../hooks/useMediaQuery";
import Hamborger from "../mainPage/Hamborger/Hamborger";
import TopPageDesktop from "../mainPage/TopPageDesktop";
import i18 from "../../i18/i18";

import "../../App.css";

export function Checkout(props) {
  const { language } = props;
  const [showEditDetails, setShowEditDetails] = useState(false);
  const [showDetails, setShowDetails] = useState(true);

  const isMobile = useMediaQuery(768);
  const isTablet = useMediaQuery(1024);
  const [numItems] = useLocalStorage("numItems", 0);
  const [total] = useLocalStorage("total", 0);
  const [userDetails] = useLocalStorage("userDetails", []);

  let previousClick = "empty";
  let currentClass;
  const EditUserDetails = () => {
    setShowEditDetails(true);
    setShowDetails(false);
    setTimeout(() => {
      $("#FirstNameInput").val(
        userDetails.firstName + " " + userDetails.lastName
      );
      $("#EmailInput").val(userDetails.email);
      $("#phoneInput").val(userDetails.phone);
      if (userDetails.orders && userDetails.orders[0] !== null)
        $("#AddressInput").val(userDetails.orders[0].shippingAddress);
    }, 500);
  };
  function useLocalStorage(key, initialValue) {
    // State to store our value
    // Pass initial state function to useState so logic is only executed once
    const [storedValue, setStoredValue] = useState(() => {
      try {
        // Get from local storage by key
        const item = window.localStorage.getItem(key);
        // Parse stored json or if none return initialValue
        return item ? JSON.parse(item) : initialValue;
      } catch (error) {
        // If error also return initialValue
        console.error(error);
        return initialValue;
      }
    });
    // Return a wrapped version of useState's setter function that ...
    // ... persists the new value to localStorage.
    const setValue = (value) => {
      try {
        // Allow value to be a function so we have same API as useState
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        // Save state
        setStoredValue(valueToStore);
        // Save to local storage
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        // A more advanced implementation would handle the error case
        console.error(error);
      }
    };
    return [storedValue, setValue];
  }

  function loadingUser() {}

  useEffect(() => {
    if (userDetails === [] || userDetails.email === undefined) {
      $(".Email").text("");
      $(".Name").text("");
      $(".Address").text("");
    } else if (userDetails !== []) {
      $(".Email").text(userDetails.email);
      $(".Name").text(userDetails.firstName + " " + userDetails.lastName);
      if (userDetails.orders && userDetails.orders[0] !== null)
        $(".Address").text(userDetails.orders[0].shippingAddress);
    }

    //scroll top
    if ($) {
      $("textarea")
        .each(function () {
          this.setAttribute(
            "style",
            "height:" + this.scrollHeight + "px;overflow-y:hidden;"
          );
        })
        .on("input", function () {
          this.style.height = "auto";
          this.style.height = this.scrollHeight + "px";
        });
      $("button").click(function () {
        if (
          $(this).attr("id") === "btnOne" ||
          $(this).attr("id") === "btnTwo" ||
          $(this).attr("id") === "btnThree"
        ) {
          // eslint-disable-next-line
          currentClass = "." + $(this).attr("id");
          if ($(this).hasClass("active")) {
            $(this).removeClass("active");
            $(currentClass).addClass("d-none");
          } else {
            $(this).addClass("active");
            $(currentClass).removeClass("d-none");
            if (
              previousClick !== "empty" &&
              previousClick !== $(this).attr("id")
            ) {
              $("#" + previousClick).removeClass("active");
              $("." + previousClick).addClass("d-none");
            } else {
              $("#" + previousClick).addClass("active");
              $("." + previousClick).removeClass("d-none");
            }
            // eslint-disable-next-line
            previousClick = $(this).attr("id");
          }
        }
      });
    }
  }, [$]);
  return (
    <div onScroll={() => alert("bgvf")}>
      <div className="pageNuv" onScroll={() => alert("bgvf")}>
        {isTablet && <Hamborger history={props.history} />}

        {!isMobile && !isTablet && <TopPageDesktop />}
      </div>

      <div className="pageHeader">
        <label>
          {" "}
          {i18.t("checkout")}{" "}
          <button
            className="white-arrow h4 p-1 "
            onClick={() => props.history.goBack()}
          >
            <i
              className="fas fa-long-arrow-alt-right  pr-2"
              style={{ height: "fit-content" }}
            ></i>{" "}
          </button>{" "}
        </label>
        {isTablet ? (
          <img
            alt=""
            className="h-100 "
            src={"https://scoopcatering.co.il/images/headerBgImag.png"}
          />
        ) : (
          <img
            alt=""
            className="h-100 w-100"
            src={"https://scoopcatering.co.il/images/headerBgImag.png"}
          />
        )}
      </div>
      <div className="location pt-3 swithSide px-5 ">
        <div
          className="d-inline btn-pointer"
          onClick={() => props.history.push("/")}
        >
          {i18.t("ScoopCatering")}
        </div>
        <div className="goldColor d-inline"> / {i18.t("checkout")} </div>
      </div>

      <div className="page_content  pt-5 offset-md-2 col-md-9  offset-sm-0 col-sm-12 ">
        <h1 className="mb-5 font-weight-bold swithSide goldColor">
          {i18.t("checkout")}{" "}
        </h1>
        <div className="swithDir row">
          <div className="swithSide  mb-5 overflow-checkout col-md-8 col-sm-12">
            <div className=" bg-grey mb-5 p-3">
              <div
                className="justify-content-between"
                style={{ display: "flex", alignItems: "center" }}
              >
                <div>
                  <label className="  w-100 pt-1 swithSide  goldbgColor  mb-0">
                    {i18.t("PersonalInformation")}{" "}
                  </label>
                  <hr className="hrCheckout mt-0 mb-4" />
                </div>
                {userDetails.email !== undefined && (
                  <div
                    className="d-flex align-items-center "
                    style={{ cursor: "pointer" }}
                  >
                    <img
                      alt=""
                      className="mx-1"
                      style={{ width: "15px", maxHeight: "15px" }}
                      src={editIcon}
                    />
                    <h6 className="mb-0" onClick={EditUserDetails}>
                      {i18.t("EditDetails")}
                    </h6>
                  </div>
                )}
              </div>
              {showDetails && (
                <div className="userDetailsSection">
                  <div>
                    <h5 className="font-weight-bold Name">{}</h5>
                    <h5 className="Address">{}</h5>
                    <h6 className="Email">{}</h6>
                  </div>
                </div>
              )}
              {showEditDetails && (
                <Form
                  className=" "
                  onLoad={loadingUser}
                  style={{ width: "45%" }}
                >
                  <Form.Group
                    className="mb-3 inputDetails"
                    controlId="formBasicName"
                  >
                    <Form.Control
                      className="rounded-custom  "
                      type="text"
                      id="FirstNameInput"
                    />
                  </Form.Group>

                  <Form.Group
                    className="mb-3 inputDetails"
                    controlId="formAddress"
                  >
                    <Form.Control
                      className="rounded-custom  "
                      type="text"
                      id="AddressInput"
                    />
                  </Form.Group>

                  <Form.Group
                    className="mb-3 inputDetails"
                    controlId="formBasicEmail"
                  >
                    <Form.Control
                      className="rounded-custom  "
                      type="email"
                      id="EmailInput"
                    />
                  </Form.Group>

                  <Form.Group
                    className="mb-3 inputDetails"
                    controlId="formBasicPhone"
                  >
                    <Form.Control
                      className="rounded-custom fontNumber "
                      type="text"
                      id="phoneInput"
                    />
                  </Form.Group>

                  <button
                    className="align-items-center d-flex justify-content-center actionSection rounded-custom customShadow text-white bg-gold  border-0 goldButton"
                    style={
                      language === "he"
                        ? {
                            fontSize: "17px",
                            width: "65%",
                            marginRight: "auto",
                          }
                        : { fontSize: "17px", width: "65%", marginLeft: "auto" }
                    }
                  >
                    {i18.t("update")}{" "}
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
                    )}
                  </button>
                </Form>
              )}
              {userDetails.email === undefined && (
                <Form style={{ width: "45%" }}>
                  <input
                    type="text"
                    className="icon-rtl"
                    placeholder="Search"
                  />

                  <Form.Group
                    className="mb-3 inputDetails"
                    controlId="formBasicName"
                  >
                    <Form.Control className="rounded-custom  " type="text" />
                  </Form.Group>

                  <Form.Group
                    className="mb-3 inputDetails"
                    controlId="formAddress"
                  >
                    <Form.Control className="rounded-custom  " type="text" />
                  </Form.Group>

                  <Form.Group
                    className="mb-3 inputDetails"
                    controlId="formBasicEmail"
                  >
                    <Form.Control className="rounded-custom  " type="email" />
                  </Form.Group>

                  <Form.Group
                    className="mb-3 inputDetails"
                    controlId="formBasicPhone"
                  >
                    <Form.Control
                      className="rounded-custom fontNumber "
                      type="text"
                    />
                  </Form.Group>

                  <button
                    className="align-items-center d-flex justify-content-center actionSection rounded-custom customShadow text-white bg-gold  border-0 goldButton"
                    style={
                      language === "he"
                        ? {
                            fontSize: "17px",
                            width: "65%",
                            marginRight: "auto",
                          }
                        : { fontSize: "17px", width: "65%", marginLeft: "auto" }
                    }
                  >
                    {i18.t("save")}{" "}
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
                    )}
                  </button>
                </Form>
              )}
            </div>

            <div className=" bg-grey p-3 mb-5">
              <label className="  w-100 pt-1 swithSide  goldbgColor  mb-0">
                {" "}
                {i18.t("deliveryDetails")}{" "}
              </label>
              <hr className="hrCheckout mt-0 mb-4" />

              <div className="mt-2">
                <label className="lableForm">{i18.t("shippingMethod")}</label>
              </div>

              <div
                className="row  justify-content-around d-flex"
                style={isTablet ? { width: "100%" } : { width: "80%" }}
              >
                <button
                  id="btnOne"
                  className="col-3  shippingOption p-2 text-center"
                >
                  {" "}
                  {i18.t("shippingMethod1")}
                </button>
                <button
                  id="btnTwo"
                  className="col-3  shippingOption p-2 text-center"
                >
                  {i18.t("shippingMethod2")}
                </button>
                <button
                  id="btnThree"
                  className="col-3  shippingOption p-2 text-center"
                >
                  <div> {i18.t("shippingMethod3")}</div>
                </button>
              </div>

              <Form.Group
                className="my-2 row  btnThree d-none"
                controlId="formBasicAddress"
                style={{ width: "100%" }}
              >
                <div className="col-6">
                  <Form.Label className="mb-1 lableForm">
                    {i18.t("Street")}
                  </Form.Label>
                  <Form.Control
                    className="rounded-custom fontNumber"
                    type="text"
                  />
                </div>
                <div className="col-3">
                  <Form.Label className="mb-1 lableForm">
                    {i18.t("buildingNumber")}
                  </Form.Label>
                  <Form.Control
                    className="rounded-custom fontNumber"
                    type="number"
                    min="1"
                  />
                </div>
                <div className="col-3">
                  <Form.Label className="mb-1 lableForm">
                    {i18.t("ApartmentNumber")}
                  </Form.Label>
                  <Form.Control
                    className="rounded-custom fontNumber"
                    type="number"
                    min="1"
                  />
                </div>
              </Form.Group>

              <Form.Label className="mb-2  lableForm">
                {" "}
                {i18.t("AreaOrCity")}
              </Form.Label>
              <Form.Select
                aria-label="Default select example"
                className="rounded-custom w-75"
                style={
                  language === "he"
                    ? {
                        padding: "0.375rem 0.75rem 0.375rem 2.25rem",
                        backgroundPosition: "left 0.75rem center",
                      }
                    : { backgroundPosition: "right 0.75rem center" }
                }
                required
              >
                <option></option>

                <option>{i18.t("BeitShemesh")}</option>
                <option>{i18.t("GushEtzion")}</option>
                <option>{i18.t("Jerusalem")}</option>
                <option>{i18.t("Modiin")}</option>
                <option>{i18.t("Raanana")}</option>
              </Form.Select>

              <Form.Label className="mb-2  lableForm">
                {" "}
                {i18.t("Address")}
              </Form.Label>
              <Form.Select
                aria-label="Default select example"
                className="rounded-custom w-75"
                style={
                  language === "he"
                    ? {
                        padding: "0.375rem 0.75rem 0.375rem 2.25rem",
                        backgroundPosition: "left 0.75rem center",
                      }
                    : {
                        padding: "0.375rem 2.25rem 0.375rem 0.75rem",
                        backgroundPosition: "right 0.75rem center",
                      }
                }
                required
              >
                <option></option>
                <option></option>
              </Form.Select>
            </div>
            <div className="bg-grey p-3 mb-3">
              <label className="  w-100 pt-1  swithSide  goldbgColor mb-0">
                {" "}
                {i18.t("CommentsToOrder")}{" "}
              </label>
              <hr className="hrCheckout mt-0 mb-4" />
              <div
                className="row p-2"
                style={isTablet ? { width: "100%" } : { width: "100%" }}
              >
                <div className="form-group pr-1">
                  <textarea
                    className="w-100  fontNumber customTextarea"
                    rows={1}
                    maxLength="250"
                    ng-trim="false"
                    id="exampleFormControlTextarea1"
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="">
              <div className="form-check d-flex align-items-center">
                <input
                  className="form-check-input check-height"
                  type="checkbox"
                  defaultValue=""
                  id="flexCheckDefault"
                />
                <u
                  className="form-check-label mr-4 "
                  htmlFor="flexCheckDefault"
                  style={{ fontSize: "smaller" }}
                >
                  {i18.t("ApprovalOfRegulations")}
                </u>
              </div>
              <div className="form-check d-flex align-items-center">
                <input
                  className="form-check-input check-height"
                  type="checkbox"
                  defaultValue=""
                  id="flexCheckDefault"
                />
                <label
                  className="form-check-label mr-4 "
                  htmlFor="flexCheckDefault"
                  style={{ fontSize: "smaller" }}
                >
                  {i18.t("SaveDetails")}
                </label>
              </div>
            </div>

            <button
              className=" mt-5 goldButton px-3 py-2   "
              style={isMobile ? { display: "none" } : { display: "block" }}
              onClick={() => props.history.push("/Payment")}
            >
              {" "}
              {i18.t("ContinueToPay")}
            </button>
          </div>
          <div className="col-md-4 col-sm-12">
            <div className="fixedDiv ">
              <div className=" bg-grey p-3">
                <label className="  w-100 pt-1  swithSide  goldbgColor  mb-0">
                  {" "}
                  {i18.t("OrderSummary")}{" "}
                </label>
                <hr className="hrCheckout mt-0 mb-4" />
                <div className=" p-3 mb-5 ">
                  <div className="row ">
                    <div className="col-7 swithSide">{i18.t("Items")}</div>
                    <div className="col-5 numItems fontNumber">{numItems}</div>
                  </div>
                  <br />
                  <br />
                  <div className="row pt-2 font-weight-bold border-top border-dark pt-3">
                    <div className="col-7 swithSide">{i18.t("Total")}</div>
                    <div className="col-5 fontNumber">
                      {(parseFloat(parseFloat(total).toFixed(2)) + 25).toFixed(
                        2
                      )}{" "}
                      &#8362;
                    </div>
                  </div>
                </div>
              </div>
              <button
                className=" mt-5 goldButton px-3 py-2   "
                style={isMobile ? { display: "block" } : { display: "none" }}
                onClick={() => props.history.push("/Payment")}
              >
                {" "}
                {i18.t("ContinueToPay")}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="PageFooter mt-5">
        <Footer />
        <UnderFooter />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    language: state.languageReducer.language,
  };
};

const mapDispatchToProps = (dispatch) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
