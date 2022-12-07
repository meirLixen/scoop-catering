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
  const [creditCardDetails,setCreditCardDetails] = useLocalStorage("creditCardDetails", []);
  const [yearList, setYearList] = useState([]);
  const [monthList] = useState(["Janaury", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"])
  const now = new Date;
  const { t, i18n } = useTranslation();
  const isMobile = useMediaQuery(768);
  const isTablet = useMediaQuery(1024);
  const { language } = props;
  // const products = Store.getState().productReducer.products
  const [total] = useLocalStorage("total", 0);
  const [currentOrder, setCurrentOrder] = useLocalStorage("currentOrder", []);



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
    if (yearList) {
      let tempList = [], min = now.getFullYear() - 50
      let max = now.getFullYear() + 11
      for (let i = 1950; i < max; i++)
        tempList.push(i)
      setYearList(tempList)
    }

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
          onClick={() => props.history.push("/shop")}
        >
          / {i18.t("Menu")}
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
        className="page_content  pt-5 offset-md-2 col-md-9  offset-sm-0 col-sm-12"
      // style={
      //   isTablet
      //     ? { width: "100%"}
      //     : { width: "65%"}
      // }
      >
        <h1 className="swithSide mb-5 font-weight-bold  ml-5 " style={{ color: "#c59950" }}>
          {i18.t("FormOfPayment")}{" "}
        </h1>

        <div className="row justify-content-start swithDir">
          <div className=" col-md-8 col-sm-12 ml-5 m-0  swithSide ">

            <div className="swithSide  mb-4">
              <Form className="w-100">
                <div className="p-3 swithSide mb-3  bg-grey">
                  <div className={isMobile ? " w-100" : " w-75"}>
                    <label className="  w-100 pt-1 swithSide  goldbgColor mb-0">
                      {i18.t("PersonalInformation")}
                    </label>
                    <hr class="hrCheckout  mt-1 mb-4 "></hr>
                    <Form.Group className="mb-2" controlId="formBasicEmail">
                      <Form.Label className="mb-1 lableForm">
                        {" "}
                        *{i18.t("CardNumber")}
                      </Form.Label>
                      <Form.Control
                        className="rounded-custom fontNumber"
                        type="tel"
                        inputmode="numeric"
                        pattern="[0-9\s]{13,19}"
                        autocomplete="cc-number"
                        maxLength="19"
                        placeholder=""
                        required
                        onChange={(e) => CharacterPrevention(e)}
                      />
                    </Form.Group>


                    <div className="d-flex    align-items-center justify-content-between">
                      <div className="col-6 d-flex align-items-center justify-content-between p-0">
                        <Form.Group className="mb-2 col-6 p-0" controlId="formBasicEmail">
                          {/* <div className="col-6"> */}
                          <Form.Label className="mb-1 lableForm">
                            {" "}
                            *{i18.t("Expiration")}{" "}
                          </Form.Label>
                          <Form.Select

                            // onChange={(e) => setFreightCostFunc(e.target.id)}
                            aria-label="Default  example"
                            className="rounded-custom    "

                            style={
                              language === "he"
                                ? {
                                  padding: "0.375rem 0.95rem 0.375rem 2.25rem",
                                  backgroundPosition: "left 0.75rem center",
                                }
                                : {
                                  padding: " 0.375rem 2.25rem 0.375rem 0.95rem",
                                  backgroundPosition: "right 0.75rem center"
                                }
                            }
                            required
                          >
                            <option value="" disabled selected >{i18.t("Month")}</option>
                            {monthList && monthList.map((month,index) =>
                              <option value={index+1}>{i18.t(month)}</option>


                            )}






                          </Form.Select>

                          {/* </div> */}
                        </Form.Group>


                        <Form.Group className="mt-2 col-6 p-0 mx-2" controlId="formBasicEmail">
                          {/* <div className="col-6"> */}
                          <Form.Label className="mb-1 lableForm">

                          </Form.Label>
                          <Form.Select


                            // onChange={(e) => setFreightCostFunc(e.target.id)}
                            aria-label="Default  example"
                            className="rounded-custom    "

                            style={
                              language === "he"
                                ? {
                                  padding: "0.375rem 0.95rem 0.375rem 2.25rem",
                                  backgroundPosition: "left 0.75rem center",
                                }
                                : {
                                  padding: " 0.375rem 2.25rem 0.375rem 0.95rem",
                                  backgroundPosition: "right 0.75rem center"
                                }
                            }
                            required
                          >
                            <option value="" disabled selected >{i18.t("Year")}</option>
                            {yearList && yearList.map((year) =>
                              <option value={year}>{year}</option>


                            )}



                          </Form.Select>
                          {/* <input class="inputCard" name="expiry" id="expiry" type="month" required/> */}
                          {/* </div> */}
                        </Form.Group>
                      </div>
                      <Form.Group className="mb-1 col-5 p-0" controlId="formBasicName">
                        {/* <div className="col-6"> */}
                        <Form.Label className="mb-1 lableForm">
                          *{i18.t("CVV")}
                        </Form.Label>
                        <Form.Control
                          className="rounded-custom fontNumber"
                          maxLength="3"
                          type="text"
                          required
                          onChange={(e) => CharacterPrevention(e)}
                        />
                        {/* </div> */}
                      </Form.Group>
                    </div>


                    <Form.Group
                      className="mb-2 "
                      controlId="formBasicLastName"
                    >
                      <Form.Label className="mb-1 lableForm">
                        *{i18.t("Id")}
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
                    <Form.Group
                      className="mb-2 "
                      controlId="formBasicLastName"
                    >
                      <Form.Label className="mb-1 lableForm">
                        *{i18.t("PaymentsNumber")}
                      </Form.Label>
                      <Form.Select
                        id="PaymentsNumberId"
                        // onChange={(e) => setFreightCostFunc(e.target.id)}
                        aria-label="Default  example"
                        className="rounded-custom    "

                        style={
                          language === "he"
                            ? {
                              padding: "0.375rem 0.95rem 0.375rem 2.25rem",
                              backgroundPosition: "left 0.75rem center",
                            }
                            : {
                              padding: " 0.375rem 2.25rem 0.375rem 0.95rem",
                              backgroundPosition: "right 0.75rem center"
                            }
                        }
                        required
                      >
                        <option >1</option>
                        <option >2</option>
                        <option >3</option>



                      </Form.Select>
                    </Form.Group>
                  </div>
                </div>


                <div className="bg-grey  p-3 mb-4">
                  <div className={isMobile ? " w-100" : " w-75"}>
                    <label className="  w-100 pt-1 swithSide  goldbgColor  mb-0">
                      {i18.t("AdditionalPayment")}{" "}
                    </label>
                    <hr class="hrCheckout  mt-1 mb-4 "></hr>

                    <p className=" lableForm">
                      {i18.t("AdditionalPayment_")}
                    </p>

                    <Form.Select

                      // onChange={(e) => setFreightCostFunc(e.target.id)}
                      aria-label="Default select example"
                      className="rounded-custom    "

                      style={
                        language === "he"
                          ? {
                            padding: "0.375rem 0.95rem 0.375rem 2.25rem",
                            backgroundPosition: "left 0.75rem center",
                          }
                          : {
                            padding: " 0.375rem 2.25rem 0.375rem 0.95rem",
                            backgroundPosition: "right 0.75rem center"
                          }
                      }
                      required
                    >
                      <option value="" disabled selected style={{ color: "#999" }}>{i18.t("paymentMethod")}</option>
                      <option value="payBox">{i18.t("payBox")}</option>
                      <option value="Bit">{i18.t("Bit")}</option>
                      <option value="BankTransfer">{i18.t("BankTransfer")}</option>
                      <option value="CashORcheck">{i18.t("CashORcheck")}</option>


                    </Form.Select>
                    <p className="lableForm">
                      <span style={{ fontWeight: 'bold' }}>{i18.t("AdditionalPayment_2")}{" "}</span>
                      {i18.t("AdditionalPayment_1")}{" "}
                      <span className="fontNumber lableForm">054-290-2590</span>
                    </p>

                  </div>
                </div>
                <div className="">
                  <label className="  w-100  pt-1 swithSide  font-weight-bolder  px-3 ">

                  </label>
                  <div className=" bg-grey p-3 mb-4">
                    <div className="d-flex pt-2  justify-content-between">
                      <div className="col-7 swithSide p-0" style={{ fontWeight: 'bold' }}>  {i18.t("TotalPayment")}</div>
                      <div className="col-5  fontNumber font-weight-bold_ " style={language === "he" ? { textAlign: "end" } : { textAlign: "end" }}>
                        {currentOrder.CostToPay}{" "}
                        &#8362;
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="d-block    goldButton px-3 py-2 mb-5"
                    style={language === "he" ? { marginRight: "auto" } : { marginLeft: "auto" }}
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
  return {
    language: state.languageReducer.language,
  };
};

const mapDispatchToProps = (dispatch) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(Payment);
