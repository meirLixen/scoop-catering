import $, { event } from "jquery";
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import validator from 'validator';
import "../../App.css";
import useMediaQuery from "../../hooks/useMediaQuery";
import i18 from "../../i18/i18";
import { actions } from "../../redux/actions/action";
import Footer from "../mainPage/Footer";
import Hamborger from "../mainPage/Hamborger/Hamborger";
import TopPageDesktop from "../mainPage/TopPageDesktop";
import UnderFooter from "../mainPage/UnderFooter";

export function Payment(props) {
  const [creditCardDetails, setCreditCardDetails] = useLocalStorage("creditCardDetails", []);
  const [yearList, setYearList] = useState([]);
  const [monthList] = useState(["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"])
  const now = new Date();

  const { t, i18n } = useTranslation();
  const isMobile = useMediaQuery(768);
  const isTablet = useMediaQuery(1024);
  const { language } = props;
  // const products = Store.getState().productReducer.products
  const [total] = useLocalStorage("total", 0);
  const [currentOrder, setCurrentOrder] = useLocalStorage("currentOrder", []);

  const [errorMessage, setErrorMessage] = useState("")

  function selectPayment(e) {
    if (e.target.value === "Bit") {
      $("#Bit").removeClass("d-none")
      $("#CashORcheck").addClass("d-none")
    }
    else

      if (e.target.value === "CashORcheck") {
        $("#CashORcheck").removeClass("d-none")
        $("#Bit").addClass("d-none")
      }
      else {
        $("#CashORcheck").addClass("d-none")
        $("#Bit").addClass("d-none")
      }
    let newCurrentOrder = currentOrder
    newCurrentOrder.paymentType = e.target.value
    setCurrentOrder(newCurrentOrder)
    console.log("currentOrder",currentOrder);
  }







  const validateCreditCard = (value) => {

    if (validator.isCreditCard(value)) {
      setErrorMessage("")
    } else {
      setErrorMessage("CreditCardMessage")
      setTimeout(function () {
        setErrorMessage("")
      }, 3000);
    }
  }

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

  function CharacterPrevention(e) {
    e.target.value = e.target.value
      .replace(/[^0-9.]/g, "")
      .replace(/(\..*)\./g, "$1");
  }
  const MakePayment = async () => {
    debugger
    let MethodsOfPayment = ""
    if ($("#CardNumber").val()) {
      MethodsOfPayment = "credit card"
    }
    else {
      MethodsOfPayment = $("#paymentSelect").val()
    }
    if (MethodsOfPayment === "") {
      alert("you must pay before")
    }
    else {
      const newOrder = {
        "userId": currentOrder.userId,
        "MethodsOfShipping": currentOrder.MethodsOfShipping,
        "notes": currentOrder.notes,
        "numItems": currentOrder.numItems,
        "interimTotal": currentOrder.interimTotal,
        "shippingCost": currentOrder.shippingCost,
        "CostToPay": currentOrder.CostToPay,
        "MethodsOfPayment": MethodsOfPayment,
        "city": currentOrder.city,
        "shippingAddress": currentOrder.shippingAddress,
        "products": currentOrder.products
      }
      let CardNumber = $("#CardNumber").val()
      if(MethodsOfPayment==="credit card")
      validateCreditCard(CardNumber)

      setCreditCardDetails({
        "CardNumber": CardNumber,
        "ExpirationYear": $("#ExpirationYear").val(),
        "ExpirationMonth": $("#ExpirationMonth").val(),
        "CVV": $("#CVV").val(),
        "Id": $("#IdCardHolder").val(),
        "PaymentsNumber": $("#PaymentsNumberId").val()

      })

      // if(creditCardDetails)//if the payment success
      // const order = await props.createOrder(newOrder)
      // else{
      //   alert("somthing wrong")
      // }
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  useEffect(() => {

    if (yearList) {
      let tempList = [], min = now.getFullYear()
      let max = now.getFullYear() + 14
      for (let i = min; i < max; i++)
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
            className="h-100 w-100"
            src={"https://scoopcatering.co.il/headerBgImag.png"}
          />
        ) : (
          <img
            alt=""
            className="h-100 w-100"
            src={"https://scoopcatering.co.il/headerBgImag.png"}
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
        <h1 className="swithSide mb-5 font-weight-bold" style={{ color: "#c59950" }}>
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
                        maxLength="21"
                        placeholder=""
                        required
                        onChange={(e) => CharacterPrevention(e)}

                        id="CardNumber"
                      />
                      <span className={errorMessage !== "" ? "px-2 small" : "d-none"} style={{

                        color: 'red',
                      }}>{i18.t(errorMessage)}</span>
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
                            id="ExpirationMonth"
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
                            {monthList && monthList.map((month, index) =>

                              <option value={index + 1}>{month}</option>







                            )}






                          </Form.Select>

                          {/* </div> */}
                        </Form.Group>


                        <Form.Group className="mt-2 col-6 p-0 mx-2" controlId="formBasicEmail">
                          {/* <div className="col-6"> */}
                          <Form.Label className="mb-1 lableForm">

                          </Form.Label>
                          <Form.Select

                            id="ExpirationYear"
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
                          id="CVV"
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
                        id="IdCardHolder"
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
                      onChange={selectPayment}
                      aria-label="Default select example"
                      className="rounded-custom    "
                      id="paymentSelect"
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
                    <div className="Instructions">
                      <p className="lableForm  d-none" id="Bit">{i18.t("BitInstructions")}</p>
                      <p className="lableForm d-none" id="CashORcheck">{i18.t("CheckInstructions")}<br />
                        {i18.t("CashInstructions")}</p>
                    </div>
                    <p className="lableForm">
                      <span style={{ fontWeight: 'bold' }}>{i18.t("AdditionalPayment_2")}{" "}</span>
                      {i18.t("AdditionalPayment_1")}{" "}
                      <span className=" lableForm">054-290-2590</span>
                    </p>

                  </div>
                </div>
                <div className="">
                  <label className="  w-100  pt-1 swithSide  font-weight-bolder  px-3 ">

                  </label>
                  <div className=" bg-grey p-3 mb-4">
                    <div className="d-flex pt-2  justify-content-between     align-items-center" style={{ fontSize: '18px' }}>
                      <div className="col-7 swithSide p-0  mt-0" style={{ fontWeight: 'bold' }}>  {i18.t("TotalPayment")}</div>
                      <div className="col-5    " style={{ textAlign: "end", fontWeight: 'bold' }}>
                        {currentOrder.CostToPay}{" "}
                        &#8362;
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={MakePayment}
                    type="submit"
                    className="d-flex     justify-content-center
                    align-items-center   goldButton px-3 py-2 mb-5"
                    style={language === "he" ? { marginRight: "auto" } : { marginLeft: "auto" }}
                  >
                    <div>{i18.t("MakePayment")}{""}</div>
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

const mapDispatchToProps = (dispatch) => ({
  createOrder: (order) => dispatch(actions.createOrder(order)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Payment);
