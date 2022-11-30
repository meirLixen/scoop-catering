import React, { useEffect, useState } from "react";
import "../../App.css";
import { connect } from "react-redux";
import Footer from "../mainPage/Footer";
import UnderFooter from "../mainPage/UnderFooter";
import useMediaQuery from "../../hooks/useMediaQuery";
import { Form } from "react-bootstrap";
import Hamborger from "../mainPage/Hamborger/Hamborger";
import TopPageDesktop from "../mainPage/TopPageDesktop";
import $ from "jquery";
import i18 from "../../i18/i18";
import { useTranslation } from 'react-i18next';

export function Payment(props) {
  const { t, i18n } = useTranslation();
  const isMobile = useMediaQuery(768);
  const isTablet = useMediaQuery(1024);
  // const products = Store.getState().productReducer.products
  const [total] = useLocalStorage("total", 0);

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
        console.log(error);
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
        console.log(error);
      }
    };
    return [storedValue, setValue];
  }

  function CharacterPrevention(e) {
    e.target.value = e.target.value
      .replace(/[^0-9.]/g, "")
      .replace(/(\..*)\./g, "$1");
  }
  useEffect(() => {
    if ($) {
    }
  }, []);
  return (
    <>
      {/* <Search details={products} /> */}
      <div className="pageNuv">
        {isTablet && <Hamborger history={props.history} />}

        {!isMobile && !isTablet && <TopPageDesktop />}
      </div>

      <div className="pageHeader">
        <label>
          {" "}
          {i18.t("payment")}{" "}
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
        <div
          className="d-inline btn-pointer"
          onClick={() => props.history.push("/Checkout")}
        >
          {" "}
          /{i18.t("checkout")}
        </div>

        <div className="goldColor d-inline"> /{i18.t("payment")} </div>
      </div>
      <div
        className="page_content justify-content-center pt-3 "
        style={
          isTablet
            ? { width: "100%", margin: "auto" }
            : { width: "65%", margin: "auto" }
        }
      >
        <h2 className="swithSide mb-5 font-weight-bold  pt-5 ml-5">
          {i18.t("FormOfPayment")}{" "}
        </h2>
        <div className="row justify-content-start swithDir">
          <div className=" col-md-6 col-sm-12 ml-5 m-0 px-4 swithSide ">
            <label className="  w-100 pt-1 swithSide  goldbgColor px-3">
              {i18.t("PersonalInformation")}
            </label>
            <div className="  mb-4">
              <Form className="w-100">
                <div className="px-3 swithSide  py-3 mb-3  bg-grey">
                  <Form.Group className="mb-2 w-75" controlId="formBasicEmail">
                    <Form.Label className="mb-1 lableForm">
                      {" "}
                      {i18.t("CardNumber")}
                    </Form.Label>
                    <Form.Control
                      className="rounded-custom fontNumber"
                      type="tel"
                      inputmode="numeric"
                      pattern="[0-9\s]{13,19}"
                      autocomplete="cc-number"
                      maxLength="19"
                      placeholder="xxxx xxxx xxxx xxxx"
                      required
                      onChange={(e) => CharacterPrevention(e)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-2 row" controlId="formBasicEmail">
                    <div className="col-6">
                      <Form.Label className="mb-1 lableForm">
                        {" "}
                        {i18.t("Expiration")}{" "}
                      </Form.Label>
                      <Form.Control
                        className="rounded-custom fontNumber"
                        placeholder="MM/YY"
                        type="text"
                        required
                        maxLength="4"
                        onChange={(e) => CharacterPrevention(e)}
                      />
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-2 row " controlId="formBasicName">
                    <div className="col-6">
                      <Form.Label className="mb-1 lableForm">
                        {i18.t("CVV")}
                      </Form.Label>
                      <Form.Control
                        className="rounded-custom fontNumber"
                        maxLength="3"
                        type="text"
                        required
                        onChange={(e) => CharacterPrevention(e)}
                      />
                    </div>
                  </Form.Group>

                  <Form.Group
                    className="mb-2 w-75"
                    controlId="formBasicLastName"
                  >
                    <Form.Label className="mb-1 lableForm">
                      {i18.t("Id")}
                    </Form.Label>
                    <Form.Control
                      className="rounded-custom fontNumber"
                      minLength="8"
                      maxLength="9"
                      type="text"
                      required
                      onChange={(e) => CharacterPrevention(e)}
                    />
                  </Form.Group>
                </div>

                <label className="  w-100 pt-1 swithSide  goldbgColor px-3 mb-0">
                  {i18.t("AdditionalPayment")}{" "}
                </label>
                <div className="bg-grey  p-3 mb-4">
                  <p className="w-75 lableForm">
                    {i18.t("AdditionalPayment_")}
                  </p>
                  <p className="lableForm">
                    {i18.t("AdditionalPayment_1")}{" "}
                    <span className="fontNumber lableForm">054-290-2590</span>
                  </p>
                  {/* <div className="row">
                                        <select className="col-4 px-1 pt-1" style={{ height: 'fit-content', fontSize: 'medium' }}>
                                            <option> {i18.t('paymentMethod')}</option>
                                            <option>{i18.t('payBox')}</option>
                                            <option>{i18.t('Bit')}</option>
                                            <option>{i18.t('BankTransfer')}</option>
                                        </select>
                                        <input className=" col-3 mx-1 pt-1 swithSide px-0" type="text" style={{ fontSize: 'medium' }} />
                                        <button className=" col-3  goldButton px-3  mb-4 mr-1 " > {i18.t('ActivateCode')}  <img style={{ paddingRight: '5px' }} /></button>
                                    </div> */}
                  <div className="d-flex">
                    <div className="col-4 p-0">
                      <Form.Select
                        aria-label="Default select example"
                        className="rounded-custom "
                        required
                        style={{ padding: "0.375rem 2rem 0.375rem 0.75rem" }}
                      >
                        <option style={{ color: "grey" }}>
                          {" "}
                          {i18.t("paymentMethod")}
                        </option>

                        <option>{i18.t("payBox")}</option>
                        <option>{i18.t("Bit")}</option>
                        <option>{i18.t("BankTransfer")}</option>
                      </Form.Select>
                    </div>
                    {/* <input className=" col-3 mx-1 pt-1 swithSide px-0" type="text" style={{ fontSize: 'medium' }} /> */}
                    <Form.Group
                      className=" col-5  swithSide px-1"
                      controlId="formBasicPhone"
                    >
                      <Form.Control
                        className="rounded-custom  customInput fontNumber"
                        type="text"
                        style={{ fontSize: "medium" }}
                      />
                    </Form.Group>
                    <button className=" col-3  px-1  goldButton_  ">
                      {" "}
                      {i18.t("ActivateCode")}{" "}
                    </button>
                  </div>
                </div>
                <div className="w-50 mr50">
                  <label className="  w-100  pt-1 swithSide  font-weight-bolder  px-3 ">
                    {i18.t("TotalPayment")}
                  </label>
                  <div className=" bg-grey p-3 mb-4">
                    <div className="row pt-2 ">
                      <div className="col-5 swithSide">{i18.t("Total")}</div>
                      <div className="col-7 text-end fontNumber">
                        {(
                          parseFloat(parseFloat(total).toFixed(2)) + 25
                        ).toFixed(2)}{" "}
                        &#8362;
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="d-block mr-auto   goldButton px-3 py-2 mb-5"
                  >
                    {i18.t("MakePayment")}
                    {/* <img src={arrow_left_white} style={{ paddingRight: '5px', width: '25px' }} /> */}
                  </button>
                </div>
              </Form>
            </div>
          </div>
          <div className=" bg-grey col-3 ml-5 p-0"></div>
        </div>
      </div>

      <div className="PageFooter mt-5">
        <Footer />
        <UnderFooter />
      </div>
    </>
  );
}
const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(Payment);
