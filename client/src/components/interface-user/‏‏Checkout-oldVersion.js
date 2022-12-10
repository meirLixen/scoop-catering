import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { connect } from "react-redux";
import "../../App.css";
import useMediaQuery from "../../hooks/useMediaQuery";
import Footer from "../mainPage/Footer";
import Hamborger from "../mainPage/Hamborger/Hamborger";
import TopPageDesktop from "../mainPage/TopPageDesktop";
import UnderFooter from "../mainPage/UnderFooter";

import $ from "jquery";
import i18 from "../../i18/i18";
export function Checkout(props) {
  // const { currentUser, logout } = useAuth()

  const isMobile = useMediaQuery(768);
  const isTablet = useMediaQuery(1024);
  const [numItems] = useLocalStorage("numItems", 0);
  const [total] = useLocalStorage("total", 0);
  const [userDetails] = useLocalStorage("userDetails", []);

  let previousClick = "empty";
  let currentClass;

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

  function loadingUser() {
    // currentUser ? $('#EmailInput').val(currentUser.email) : alert("vghbjnk")
  }
  useEffect(() => {
    if (userDetails !== []) {
      $("#EmailInput").val(userDetails.email);
      $("#FirstNameInput").val(userDetails.firstName);
      $("#LastNameInput").val(userDetails.lastName);
      $("#phoneInput").val(userDetails.phone);
    }
    window.scrollTo(0, 0);
    if ($) {
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
            // $('.left_side').removeClass('d-none');
          } else {
            $(this).addClass("active");
            $(currentClass).removeClass("d-none");
            // $('.left_side').removeClass('d-none');
            if (
              previousClick !== "empty" &&
              previousClick !== $(this).attr("id")
            ) {
              $("#" + previousClick).removeClass("active");
              $("." + previousClick).addClass("d-none");
              // $('.left_side').addClass('d-none');
            } else {
              $("#" + previousClick).addClass("active");
              $("." + previousClick).removeClass("d-none");
              // if ($('.left_side').hasClass('d-none'))
              // $('.left_side').romoveClass('d-none');
              // else
              //     $('.left_side').addClass('d-none');
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
      {/* <Search details={products} /> */}
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

      <div className="page_content  pt-5 offset-md-2 col-md-8  offset-sm-0 col-sm-12 ">
        <h2 className="mb-5 font-weight-bold  ">{i18.t("checkout")} </h2>
        <div className="swithDir row">
          {/* <div className="  col-6 ml-5 p-0 swithSide overflow-auto overflow-checkout" style={{ height: '550px' }}> */}
          <div className="swithSide  mb-5 overflow-checkout col-md-6 col-sm-12">
            <label className="  w-100 pt-1 swithSide  goldbgColor px-3 ">
              {i18.t("PersonalInformation")}{" "}
            </label>
            <div className=" bg-grey mb-5">
              <Form className="p-3" onLoad={loadingUser}>
                <Form.Group className="mb-2" controlId="formBasicEmail">
                  <Form.Label className="mb-1 lableForm">
                    {" "}
                    {i18.t("mailAdress")}
                  </Form.Label>
                  <Form.Control
                    className="rounded-custom fontNumber"
                    type="email"
                    id="EmailInput"
                  />
                </Form.Group>
                <Form.Group className="mb-2" controlId="formBasicName">
                  <Form.Label className="mb-1 lableForm">
                    {" "}
                    {i18.t("FirstName")}
                  </Form.Label>
                  <Form.Control
                    className="rounded-custom fontNumber"
                    type="text"
                    id="FirstNameInput"
                  />
                </Form.Group>

                <Form.Group className="mb-2" controlId="formBasicLastName">
                  <Form.Label className="mb-1 lableForm">
                    {i18.t("LastName")}
                  </Form.Label>
                  <Form.Control
                    className="rounded-custom fontNumber"
                    type="text"
                    id="LastNameInput"
                  />
                </Form.Group>
                <Form.Group className="mb-2" controlId="formBasicPhone">
                  <Form.Label className="mb-1 lableForm">
                    {" "}
                    {i18.t("phone")}
                  </Form.Label>
                  <Form.Control
                    className="rounded-custom fontNumber "
                    type="text"
                    id="phoneInput"
                  />
                </Form.Group>
                <Form.Group className="mb-2" controlId="formBasicPhone">
                  <Form.Label className="mb-1 lableForm">
                    {" "}
                    {i18.t("anotherPhone")}
                  </Form.Label>
                  <Form.Control
                    className="rounded-custom fontNumber"
                    type="text"
                    id="anotherPhoneInput"
                  />
                </Form.Group>
                <Form.Group className="mb-2" controlId="formBasicPhone">
                  <Form.Label className="mb-1 lableForm">
                    {" "}
                    {i18.t("address")}
                  </Form.Label>
                  <Form.Control
                    className="rounded-custom fontNumber"
                    type="text"
                    id="addressInput"
                  />
                </Form.Group>
              </Form>
            </div>

            <label className="  w-100 pt-1 swithSide  goldbgColor px-3 ">
              {" "}
              {i18.t("deliveryDetails")}{" "}
            </label>
            <div className=" bg-grey p-3 mb-5">
              {/* <div><label >{i18.t('AreaOrCity')}</label></div> */}
              {/* <select className="w-75 rounded-custom p-1">
                                <option></option>
                              
                                <option>{i18.t('BeitShemesh')}</option>
                                <option>{i18.t('GushEtzion')}</option>
                                <option>{i18.t('Jerusalem')}</option>
                                <option>{i18.t('Modiin')}</option>
                                <option>{i18.t('Raanana')}</option>
                            </select>
 */}
              <Form.Label className="mb-2  lableForm">
                {" "}
                {i18.t("AreaOrCity")}
              </Form.Label>
              <Form.Select
                aria-label="Default select example"
                className="rounded-custom w-75"
                required
              >
                <option></option>

                <option>{i18.t("BeitShemesh")}</option>
                <option>{i18.t("GushEtzion")}</option>
                <option>{i18.t("Jerusalem")}</option>
                <option>{i18.t("Modiin")}</option>
                <option>{i18.t("Raanana")}</option>
              </Form.Select>

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
            </div>
            <label className="  w-100  pt-1 swithSide  goldbgColor px-3 ">
              {i18.t("InvoiceDetails")}{" "}
            </label>
            <div className="bg-grey_ p-3 mb-5">
              <div className="form-check d-flex align-items-center">
                <input
                  className="form-check-input"
                  type="checkbox"
                  defaultValue=""
                  id="flexCheckDefault"
                />
                <label
                  className="form-check-label mr-4 lableForm"
                  htmlFor="flexCheckDefault"
                >
                  {i18.t("sameShippingAndAccountDetails")}
                </label>
              </div>
            </div>
            <label className="  w-100 pt-1 pb-1 swithSide  goldbgColor px-3 ">
              {i18.t("CouponCode")}{" "}
            </label>
            <div className="bg-grey p-3 mb-5">
              <div className="lableForm">{i18.t("EnterCouponCode")}</div>
              <div className="row p-2">
                <Form className=" d-flex">
                  <Form.Group className=" col-6 p-0" controlId="formBasicPhone">
                    <Form.Control
                      className="rounded-custom  h-100 fontNumber"
                      type="text"
                      required
                    />
                  </Form.Group>

                  <button className="goldButton_ px-3 col-4 mx-3">
                    {i18.t("ActivateCoupon")}
                  </button>
                </Form>
              </div>
            </div>
            <label className="  w-100 pt-1 pb-1 swithSide  goldbgColor px-3 ">
              {" "}
              {i18.t("CommentsToOrder")}{" "}
            </label>
            <div className="bg-grey p-3 mb-3">
              <div
                className="row p-2"
                style={isTablet ? { width: "100%" } : { width: "80%" }}
              >
                <div className="form-group pr-1">
                  <label
                    htmlFor="exampleFormControlTextarea1 "
                    className="lableForm"
                  >
                    {i18.t("CommentsToOrder")}{" "}
                  </label>
                  <textarea
                    className="form-control rounded-custom fontNumber"
                    id="exampleFormControlTextarea1"
                    rows="3"
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="">
              {/* <div className="d-flex align-items-center"> <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
                                <label className="mr-2 ml-3  mb-0" htmlFor="vehicle1 " style={{ fontSize: 'smaller' }}>{i18.t('ApprovalOfRegulations')}</label>
                            </div>
                            <div className="d-flex align-items-center">  <input type="checkbox" id="vehicle2" name="vehicle1" value="Bike" />
                                <label className="mr-2 ml-3 mb-0" htmlFor="vehicle2   " style={{ fontSize: 'smaller' }}> {i18.t('SaveDetails')}</label>
                            </div> */}
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
                  {i18.t("ApprovalOfRegulations")}
                </label>
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
              {/* <img src={arrow_left_white} style={{ paddingRight: '5px',width: '25px'}} /> */}
            </button>
          </div>
          <div className="col-md-6 col-sm-12">
            <div className="fixedDiv ">
              {/* <label className="    font-weight-bolder w-100 pt-1 swithSide px-3">{i18.t('OrderSummary')}</label> */}
              <label className="  w-100 pt-1  swithSide  goldbgColor px-3 ">
                {" "}
                {i18.t("OrderSummary")}{" "}
              </label>
              <div className="px-4 p-3 mb-5 bg-grey">
                <div className="row ">
                  <div className="col-7 swithSide">{i18.t("Items")}</div>
                  <div className="col-5 numItems fontNumber">{numItems}</div>
                </div>
                <br />
                <br />
                <div className="row  pb-3">
                  <div className="col-7 swithSide">{i18.t("InterimTotal")}</div>
                  <div className="col-5 fontNumber">
                    {parseFloat(total).toFixed(2)} &#8362;
                  </div>
                </div>
                <div className="row border-bottom border-dark pb-3">
                  <div className="col-7 swithSide">{i18.t("ShippingCost")}</div>
                  <div className="col-5 fontNumber">
                    {parseFloat(25).toFixed(2)} &#8362;
                  </div>
                </div>
                <div className="row pt-2 font-weight-bold ">
                  <div className="col-7 swithSide">{i18.t("Total")}</div>
                  <div className="col-5 fontNumber">
                    {(parseFloat(parseFloat(total).toFixed(2)) + 25).toFixed(2)}{" "}
                    &#8362;
                  </div>
                </div>
                {/* <button className="mt-5 goldButton px-3 mb-5" onClick={() => props.history.push('/Checkout')}> {i18.t('toCheckout')} &#8594; </button> */}
              </div>
              <button
                className=" mt-5 goldButton px-3 py-2   "
                style={isMobile ? { display: "block" } : { display: "none" }}
                onClick={() => props.history.push("/Payment")}
              >
                {" "}
                {i18.t("ContinueToPay")}
                {/* <img src={arrow_left_white} style={{ paddingRight: '5px',width: '25px'}} /> */}
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
  return {};
};

const mapDispatchToProps = (dispatch) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
