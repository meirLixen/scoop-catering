import React, { useEffect, useState } from "react";

import "../../App.css";
import { connect } from "react-redux";
import { actions } from "../../redux/actions/action";
import Footer from "../mainPage/Footer";
import UnderFooter from "../mainPage/UnderFooter";
import editIcon from "../../data/imges/editIcon.png";

import useMediaQuery from "../../hooks/useMediaQuery";
import { Form } from "react-bootstrap";
import Hamborger from "../mainPage/Hamborger/Hamborger";
import TopPageDesktop from "../mainPage/TopPageDesktop";

import $ from "jquery";
import i18 from "../../i18/i18";
export function Checkout(props) {
  const { language } = props;
  const [showEditDetails, setShowEditDetails] = useState(false);
  const [showDetails, setShowDetails] = useState(true);
  const [freightCost, setFreightCost] = useState(0)
  const [currentOrder, setCurrentOrder] = useLocalStorage("currentOrder", []);
  const [cart] = useLocalStorage("cart", []);
  const [citiesList] = useState(
    [

      { "cityName": "BeitShemesh", "cost": 50 },
      { "cityName": "GushEtzion", "cost": 0 },
      { "cityName": "Jerusalem", "cost": 50 },
      { "cityName": "Modiin", "cost": 80 },
      { "cityName": "Raanana", "cost": 120 }
    ]
  )

  const isMobile = useMediaQuery(768);
  const isTablet = useMediaQuery(1024);
  const [numItems] = useLocalStorage("numItems", 0);
  const [total] = useLocalStorage("total", 0);
  const [userDetails, setUserDetails] = useLocalStorage("userDetails", []);

  let previousClick = "empty";
  let currentClass;


  const EditUserDetails = () => {
    setShowEditDetails(true);
    setShowDetails(false);
    setTimeout(() => {

      $("#FullNameInput").val(
        userDetails.fullName ? userDetails.fullName : userDetails.firstName + " " + userDetails.lastName
      );

      $("#EmailInput").val(userDetails.email);
      $("#phoneInput").val(userDetails.phone);
      $("#CityInput").val(userDetails.city ? userDetails.city : "");
      $("#AddressInput").val(userDetails.address ? userDetails.address : "");
    }, 50);
  };
  function back() {
    setShowEditDetails(false);
    setShowDetails(true);
  }
  const updateDetails = async (e) => {
    
    e.preventDefault();
    let updatsFileds = {
      "createDate": userDetails.createDate,
      "orders": userDetails.orders,
      "password": userDetails.password,
      "userType": userDetails.userType,
      "__v": userDetails.__v,
      "_id": userDetails._id,
      "fullName": $("#FullNameInput").val(),
      "email": $("#EmailInput").val(),
      "phone": $("#phoneInput").val(),
      "city": $("#CityInput").val(),
      "address": $("#AddressInput").val(),
      "uid": userDetails.uid
    }

    await setUserDetails(updatsFileds)
    if($('#HomeDelivery').hasClass('active'))
    setFreightCostByChoose(updatsFileds.city)
    const res = await props.updateUser({
      "fullName": updatsFileds.fullName,
      "email": updatsFileds.email,
      "phone": updatsFileds.phone,
      "city": updatsFileds.city,
      "address": updatsFileds.address,
      "uid": updatsFileds.uid
    })
    console.log("mkmk", res);
    console.log("res++", res);
    back()
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

  function loadingUser() {
    // currentUser ? $('#EmailInput').val(currentUser.email) : alert("vghbjnk")
  }
  function setFreightCostByChoose(current_city) {
    
    if (current_city) {
      let currentCity = citiesList.filter((city) => city.cityName === current_city)
      setFreightCost(currentCity[0].cost)

    }
  } 
  function setFreightCostFunc(uu) {
    let res = $(".selectCity option:selected").attr("id")

    setFreightCost(res)
  }
  function checkAddress() {
    if (!userDetails.address || !userDetails.city) {
      alert("you must edit address in the Editing personal details")
    }
  }
  function ContinueToPay() {
    


    if ($("#regulations").is(':checked') && $('.shippingMethodSelect').attr('name')) {
      let city = "", address = "", products = []
      cart.map((item) =>
        products.push({ "productId": item.product._id, "amount": item.Amount })

      )

      if ($('.shippingMethodSelect').attr('name') === "Other") {
        city = $("#OtherVal1 option:selected").val()
        address = $("#OtherVal2").val()
      }
      else {



        city = userDetails.city && userDetails.city
        address = userDetails.address && userDetails.address


      }






      // MethodsOfPayment

      let moreNotes = currentOrder.notes

      setCurrentOrder(
        {
          "userId": userDetails._id,
          "MethodsOfShipping": $('.shippingMethodSelect').attr('name'),
          "notes": moreNotes + " : " + $(".CommentsToOrder").val(),
          "numItems": numItems,
          "interimTotal": parseFloat(total).toFixed(2),
          "shippingCost": parseFloat(freightCost).toFixed(2),
          "CostToPay": (parseFloat(parseFloat((total + parseInt(freightCost))).toFixed(2))).toFixed(2),

          "city": city,
          "shippingAddress": address,
          "products": products
        }
      )
      if ($('.shippingMethodSelect').attr('name') === "HomeDelivery" && !userDetails.address || !userDetails.city) {
        alert("you must edit address in the Editing personal details")
      }
      else {
        props.history.push("/Payment")
      }

    }
    else {
      alert("you must sign regulations")
    }
  }
  useEffect(() => {
    




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
        let currentID = $(this).attr("id")
        
        if (
          currentID === "Pickup" ||
          currentID === "HomeDelivery" ||
          currentID === "Other"
        ) {
          if (currentID === "Pickup" || currentID === "HomeDelivery") {
            $("#OtherVal1").val("")
            $("#OtherVal2").val("")
            if(currentID === "Pickup")
            {
              setFreightCost(0)
            }
            else{
              if(currentID === "HomeDelivery")
              {
                setFreightCostByChoose(userDetails.city)
                // setFreightCost(userDetails.city)
              }
            }

          }
          back()
          $('.shippingMethodSelect').attr('name', currentID);

          currentClass = "." + currentID
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
              previousClick !== currentID
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
            previousClick = currentID;
            console.log(previousClick);
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
        <div className="goldColor d-inline"> / {i18.t("checkout")} </div>
      </div>

      <div className="page_content  pt-5 offset-md-2 col-md-9  offset-sm-0 col-sm-12 ">
        <h1 className="mb-5 font-weight-bold swithSide goldColor">
          {i18.t("checkout")}{" "}
        </h1>
        <div className="swithDir row">

          <div className="swithSide   overflow-checkout col-md-8 col-sm-12">
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
                {!showEditDetails && userDetails.email !== undefined && (
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
                    <h5 className="font-weight-bold Name">{userDetails.fullName ? userDetails.fullName : userDetails.firstName + " " + userDetails.lastName}</h5>
                    <h5 className="Address">{userDetails.address && userDetails.address}  {userDetails.city && i18.t(userDetails.city)}</h5>
                    <h6 className="Email">{userDetails.email && userDetails.email}</h6>
                  </div>
                </div>
              )}
              {showEditDetails && (
                <Form
                  className="col-md-8 col-sm-12 p-0  "
                  onLoad={loadingUser}

                >

                  <input type="text" class={language == "he" ? "icon-rtl" : "icon-ltr"} placeholder={i18.t("FullName")} id="FullNameInput"></input>

                  <div className="d-flex justify-content-between">

                    <select
                      id="CityInput"
                      // class={language == "he" ? "icon-rtl col-5" : "icon-ltrcol-5"}
                     
                      aria-label="Default select example"
                      className="rounded-custom custom-select col-5 selectCity"
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
                      <option disabled selected></option>
                      {citiesList.map((city) =>
                        <option value={city.cityName} id={city.cost} className={city.cityName}>{i18.t(city.cityName)}</option>
                      )}
                    </select>
                    {/* <input type="text"  placeholder={i18.t("AreaOrCity")} id="CityInput"></input> */}
                    <input type="text" class={language == "he" ? "icon-rtl col-6" : "icon-ltr col-5"} placeholder={i18.t("Address")} id="AddressInput"></input>
                  </div>

                  <input type="text" class={language == "he" ? "icon-rtl" : "icon-ltr"} placeholder={i18.t("email")} id="EmailInput"></input>
                  <input type="text" class={language == "he" ? "icon-rtl" : "icon-ltr"} placeholder={i18.t("phone")} id="phoneInput"></input>

                  <div className="d-flex     justify-content-between">

                    <button
                      onClick={back}
                      className=" col-5 align-items-center d-flex justify-content-center actionSection rounded-custom customShadow text-white bg-gold  border-0 goldButton"
                      style={
                        language === "he"
                          ? {
                            fontSize: "17px"
                          }
                          : { fontSize: "17px" }
                      }
                    >

                      {language === "he" ? (

                        <i
                          className="fas fa-solid fa-arrow-right ml-3"
                          style={{ fontSize: "17px" }}
                        ></i>
                      ) : (
                        <i
                          className="fas fa-solid fa-arrow-left mr-3"
                          style={{ fontSize: "17px" }}
                        ></i>
                      )}
                      {i18.t("back")}{" "}
                    </button>



                    <button
                      onClick={updateDetails}
                      className="col-5 align-items-center d-flex justify-content-center actionSection rounded-custom customShadow text-white bg-gold  border-0 goldButton"
                      style={
                        language === "he"
                          ? {
                            fontSize: "17px"
                          }
                          : { fontSize: "17px" }
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




                  </div>

                </Form>
              )}
              {/* {userDetails.email === undefined && (
                <Form className="col-md-8 col-sm-12 p-0">


                  <Form.Group
                    className="mb-3 inputDetails"
                    controlId="formBasicName"
                  >

                    <Form.Control className={language == "he" ? "icon-rtl" : "icon-ltr"} placeholder={i18.t("name")} type="text" />
                  </Form.Group>

                  <Form.Group
                    className="mb-3 inputDetails"
                    controlId="formAddress"
                  >

                    <Form.Control className={language == "he" ? "icon-rtl" : "icon-ltr"} placeholder={i18.t("address")} type="text" />
                  </Form.Group>

                  <Form.Group
                    className="mb-3 inputDetails"
                    controlId="formBasicEmail"
                  >

                    <Form.Control className={language == "he" ? "icon-rtl" : "icon-ltr"} placeholder={i18.t("email")} type="email" />
                  </Form.Group>

                  <Form.Group
                    className="mb-3 inputDetails"
                    controlId="formBasicPhone"
                  >

                    <Form.Control
                      className={language == "he" ? "icon-rtl" : "icon-ltr"}
                      type="text"
                      placeholder={i18.t("phone")}
                    />
                  </Form.Group>

                  <button
                    className="align-items-center d-flex w-50 justify-content-center actionSection rounded-custom customShadow text-white bg-gold  border-0 goldButton"
                    style={
                      language === "he"
                        ? { fontSize: "17px", marginRight: "auto", }
                        : { fontSize: "17px", marginLeft: "auto" }
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
              )} */}
            </div>

            <div className=" bg-grey p-3 mb-5">
              <div className="col-md-8 col-sm-12 p-0">
                <label className="  w-100 pt-1 swithSide  goldbgColor  mb-0">
                  {" "}
                  {i18.t("deliveryDetails")}{" "}
                </label>
                <hr className="hrCheckout mt-0 mb-4" />


                <div className="mt-2">
                  <label className="lableForm">{i18.t("shippingMethod")}</label>
                </div>

                <div
                  className=" justify-content-between d-flex   shippingMethodSelect" name=""

                >
                  <button

                    id="Pickup"
                    className="col-3  shippingOption p-2 text-center"

                  >
                    {" "}
                    {i18.t("shippingMethod1")}
                  </button>
                  <button


                    id="HomeDelivery"
                    onClick={checkAddress}
                    className="col-3  shippingOption p-2 text-center"

                  >
                    {i18.t("shippingMethod2")}
                  </button>
                  <button

                    id="Other"
                    className="col-3  shippingOption p-2 text-center"

                  >
                    <div> {i18.t("shippingMethod3")}</div>
                  </button>
                </div>
                {/* 
                <Form.Group
                  className="my-2 row  "
                  controlId="formBasicAddress"
                  style={{ width: "100%" }}
                >
                  <div className="col-6">
                    <Form.Label className="mb-1 lableForm">
                      {i18.t("Street")}
                    </Form.Label>
                    <Form.Control
                      className="rounded-custom  "
                      type="text"
                    />
                  </div>
                  <div className="col-3">
                    <Form.Label className="mb-1 lableForm">
                      {i18.t("buildingNumber")}
                    </Form.Label>
                    <Form.Control
                      className="rounded-custom  "
                      type="number"
                      min="1"
                    />
                  </div>
                  <div className="col-3">
                    <Form.Label className="mb-1 lableForm">
                      {i18.t("ApartmentNumber")}
                    </Form.Label>
                    <Form.Control
                      className="rounded-custom  "
                      type="number"
                      min="1"
                    />
                  </div>
                </Form.Group> */}

                <Form.Label className="mb-2  lableForm Other d-none">
                  {" "}
                  *{i18.t("AreaOrCity")}
                </Form.Label>
                <Form.Select
                  onChange={(e) => setFreightCostFunc(e.target.id)}
                  aria-label="Default select example"
                  className="rounded-custom Other d-none selectCity "
                  id="OtherVal1"
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
                  <option disabled selected></option>

                  {citiesList.map((city) =>
                    <option value={city.cityName} id={city.cost} className={city.cityName}>{i18.t(city.cityName)}</option>
                  )}
                </Form.Select>

                <Form.Label className="mb-2  lableForm Other d-none">
                  {" "}
                  *{i18.t("Address")}
                </Form.Label>
                <Form.Control
                  className="rounded-custom Other d-none "
                  type="text"
                  placeholder={i18.t("AddressPlaceholder")}
                  id="OtherVal2"

                />
                {/* <Form.Select
                  aria-label="Default select example"
                  className="rounded-custom "
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
               */}

              </div>
            </div>
            <div className="bg-grey p-3 mb-3">
              <label className="  w-100 pt-1  swithSide  goldbgColor mb-0">
                {" "}
                {i18.t("CommentsToOrder")}{" "}
              </label>
              <hr className="hrCheckout mt-0 mb-4" />
              <div
                className=" p-2"

              >
                <div className="form-group  ">

                  <textarea
                    className="w-100    customTextarea CommentsToOrder"
                    rows={1}
                    maxLength="250"
                    ng-trim="false"
                    id="exampleFormControlTextarea1"
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="">

              <div className="form-check d-flex ">
                <input
                  className="form-check-input check-height regulations1"
                  type="checkbox"

                  id="regulations"
                />
                <span
                  className="form-check-label mr-4 "
                  htmlFor="flexCheckDefault"
                  style={{ fontSize: "smaller" }}
                >
                  {i18.t("ApprovalOfRegulations")} {" "}
                  <a target="_blank" style={{ color: "black" }} href="/policy">
                    {i18.t("Policy")}
                  </a>
                </span>


              </div>
              <div className="form-check d-flex ">
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

            {/* <button
             type="submit"
              className=" mt-5 goldButton px-3 py-2   "
              style={isMobile ? { display: "block" } : { display: "block" }}
              onClick={ContinueToPay}
            >
              {" "}
              {i18.t("ContinueToPay")}

            </button> */}
          </div>
          <div className="col-md-4 col-sm-12">
            <div className="fixedDiv ">

              <div className=" bg-grey p-3">
                <label className="  w-100 pt-1  swithSide  goldbgColor  mb-0">
                  {" "}
                  {i18.t("OrderSummary")}{" "}
                </label>
                <hr className="hrCheckout mt-0 mb-4" />
                <div className=" p-3 mb-2 ">
                  <div className="row ">
                    <div className="col-7 swithSide">{i18.t("Items")}</div>
                    <div className="col-5 numItems  " style={{ textAlign: "end" }}>{numItems}</div>
                  </div>
                  <br />
                  <br />
                  <div className="row  pb-3">

                    <div className="col-7 swithSide font-weight-bold ">{i18.t('InterimTotal')}</div>
                    <div className="col-5   font-weight-bold" style={{ textAlign: "end" }}>{parseFloat(total).toFixed(2)} &#8362;</div>

                  </div>
                  <div className="row border-bottom border-dark pb-3" style={{ fontWeight: '500' }}>

                    <div className="col-7 swithSide">{i18.t('ShippingCost')}</div>
                    <div className="col-5  " style={{ textAlign: "end" }}>{parseFloat(freightCost).toFixed(2)} &#8362;</div>

                  </div>
                  <div className="row pt-2 font-weight-bold border-top border-dark pt-3">
                    <div className="col-7 swithSide">{i18.t("Total")}</div>
                    <div className="col-5  " style={{ textAlign: "end" }}>
                      {(parseFloat(parseFloat((total + parseInt(freightCost))).toFixed(2))).toFixed(
                        2
                      )}{" "}
                      &#8362;
                    </div>
                  </div>
                  <button
                    type="submit"
                    className=" mt-5 goldButton px-4 py-2 d-flex  m-auto   justify-content-center
                align-items-center  "

                    onClick={ContinueToPay}
                  >
                    <div>{" "}
                      {i18.t("ContinueToPay")}</div>

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
                  </button>

                </div>
              </div>

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

const mapDispatchToProps = (dispatch) => ({
  updateUser: (user) => dispatch(actions.updateUser(user)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
