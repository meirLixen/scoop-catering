import React, { useState } from "react";
import ".././App.css";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { actions } from "../redux/actions/action";
import Cart from "../data/imges/cart.png";
import { Row } from "react-grid-system";
// import { Card, CardHeader, CardTitle, CardSubtitle, CardActions, CardContent } from "@react-md/card"
import $ from "jquery";
// import {
//     Card, CardImg, CardText, CardBody,
//     CardTitle, CardSubtitle
// } from 'reactstrap';

import i18 from "../i18/i18";
function MyCard({ list, lang }, props) {
  const [cart, setCart] = useLocalStorage("cart", []);
  const [numItems, setNumItems] = useLocalStorage("numItems", 0);
  const [total, setTotal] = useLocalStorage("total", 0);

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
  const changeAmount = async (id, action) => {
    let amount = parseInt(
      $("#" + id + " " + ".amountToBuy" + " " + "input").val()
    );

    // cart.map(item => {

    //     if (item.product._id === id) {
    if (action === "plus") {
      // item.Amount = parseInt(item.Amount) + 1
      // setNumItems(numItems + 1)
      amount++;
    } else {
      if (amount !== "1") {
        // item.Amount = parseInt(item.Amount) - 1
        // setNumItems(numItems - 1)

        amount--;
      }
    }

    // }
    // })
    $("#" + id + " " + ".amountToBuy" + " " + "input").val(amount);
    // setCart(cart)
  };

  const AddToCart = async (product) => {
    setNumItems(
      numItems +
        parseInt(
          $("#" + product._id + " " + ".amountToBuy" + " " + "input").val()
        )
    );

    setTotal(
      total +
        parseInt(
          $("#" + product._id + " " + ".amountToBuy" + " " + "input").val()
        ) *
          14.9
    ); //product.price
    let flag = 0;

    let shoppingCart = [];
    if (cart !== undefined) shoppingCart = cart;
    shoppingCart.map((item) => {
      if (item.product._id === product._id) {
        item.Amount =
          parseInt(item.Amount) +
          parseInt(
            $("#" + product._id + " " + ".amountToBuy" + " " + "input").val()
          );
        item.Total =
          parseInt(
            $("#" + product._id + " " + ".amountToBuy" + " " + "input").val()
          ) * 14.9; //item.product.price
        flag = 1;
        // setNumItems(numItems + parseInt($('#' + product._id + ' ' + '.amountToBuy' + ' ' + 'input').val()))
      }
    });
    if (flag === 0) {
      let newItem = {
        product: product,
        Amount: $(
          "#" + product._id + " " + ".amountToBuy" + " " + "input"
        ).val(),
        Total:
          parseInt(
            $("#" + product._id + " " + ".amountToBuy" + " " + "input").val()
          ) * 14.9, //product.price
      };
      await shoppingCart.push(newItem);
      // setNumItems(numItems + parseInt($('#' + product._id + ' ' + '.amountToBuy' + ' ' + 'input').val()))
    }

    await setCart(shoppingCart);

    $(".navbar-toggler").click();
  };

  if (list.length === undefined || list.length === 0) {
    return <h1>{i18.t("NoResults")}</h1>;
  } else {
    if (lang === "he")
      return (
        <Row xs={6} md={2} className="menuList">
          {list.map((item) => (
            <div
              className=" productLine w-100 d-flex row rtl  mb-4  justify-content-around align-items-center pr-1 pl-1 ml-0 pb-1 pt-1 border-left-0"
              id={item._id}
              style={{ borderRight: "8px solid #C59950" }}
            >
              <div className="productName text-end font-weight-bold  col-4">
                {" "}
                {lang === "he" ? item.hebrewName : item.name}{" "}
              </div>
              <div
                className="amountOption font-weight-bold col-2 pb-1 pt-1 pl-0"
                style={{ fontSize: "12px", width: "fit-content" }}
              >
                <div>{i18.t("SelectAnOption")} :</div>
                <select
                  className="form-select form-select-x-sm rtl pb-0 pt-0 border-0 rounded-custom font-weight-bold"
                  aria-label=".form-select-sm example"
                  style={{ width: "fit-content", fontSize: "12px" }}
                >
                  {/* <option selected> 1 יחידה</option> */}
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
              <div
                className="col-1 goldColor p-0"
                style={{ width: "fit-content" }}
              >
                |
              </div>
              <div
                className="price font-weight-bold col-1 goldColor p-0"
                style={{ width: "fit-content" }}
              >
                14.90 &#8362;{" "}
              </div>
              <div
                className="amountToBuy col-3 goldColor d-flex   p-0  align-items-center"
                style={{ width: "fit-content" }}
              >
                <span
                  className="plus"
                  onClick={() => changeAmount(item._id, "plus")}
                >
                  +
                </span>
                <input
                  type="text"
                  defaultValue="1"
                  className="border text-black bg-white pt-0 pb-0 pl-2 pr-2 m-1 input_number"
                  style={{ fontSize: "13px" }}
                />
                <span
                  className="minus"
                  onClick={() => changeAmount(item._id, "minus")}
                >
                  -
                </span>
              </div>

              <div
                onClick={() => AddToCart(item)}
                className="addToCart col-3 bg-black text-white align-items-center d-flex h6 pb-1 pt-1 mb-0"
                style={{ height: "fit-content", width: "fit-content" }}
              >
                {i18.t("addToCart")}
                <div className="mr-2"></div>
                <img
                  alt=""
                  style={{
                    height: "17px",
                  }}
                  src={Cart}
                />
              </div>
            </div>
          ))}
        </Row>
      );
    else
      return (
        <Row xs={6} md={2} className="menuList">
          {list &&
            list.map((item) => (
              <div
                className=" productLine w-100 d-flex row   mb-4  justify-content-around align-items-center pr-1 pl-1 ml-0 pb-1 pt-1"
                id={item._id}
              >
                <div className="productName font-weight-bold  col-4">
                  {" "}
                  {lang === "he" ? item.hebrewName : item.name}{" "}
                </div>
                <div
                  className="amountOption font-weight-bold col-2 pb-1 pt-1 pl-0"
                  style={{ fontSize: "12px", width: "fit-content" }}
                >
                  <div> {i18.t("SelectAnOption")}:</div>
                  <select
                    className="form-select form-select-x-sm rtl pb-0 pt-0 border-0 rounded-custom font-weight-bold"
                    aria-label=".form-select-sm example"
                    style={{ width: "fit-content", fontSize: "12px" }}
                  >
                    {/* <option selected> 1 יחידה</option> */}
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
                <div
                  className="col-1 goldColor p-0"
                  style={{ width: "fit-content" }}
                >
                  |
                </div>
                <div
                  className="price font-weight-bold col-1 goldColor p-0"
                  style={{ width: "fit-content" }}
                >
                  14.90 &#8362;{" "}
                </div>
                <div
                  className="amountToBuy col-3 goldColor d-flex   p-0  align-items-center"
                  style={{ width: "fit-content" }}
                >
                  <span
                    className="plus"
                    onClick={() => changeAmount(item._id, "plus")}
                  >
                    +
                  </span>
                  <input
                    type="text"
                    defaultValue="1"
                    className="border text-black bg-white pt-0 pb-0 pl-2 pr-2 m-1 input_number"
                    style={{ fontSize: "13px" }}
                  />
                  <span
                    className="minus"
                    onClick={() => changeAmount(item._id, "minus")}
                  >
                    -
                  </span>
                </div>

                <div
                  onClick={() => AddToCart(item)}
                  className="addToCart col-3 bg-black text-white align-items-center d-flex h6 pb-1 pt-1 mb-0"
                  style={{ height: "fit-content", width: "fit-content" }}
                >
                  {i18.t("addToCart")}
                  <div className="mr-2"></div>
                  <img
                    alt=""
                    style={{
                      height: "17px",
                    }}
                    src={Cart}
                  />
                </div>
              </div>
            ))}
        </Row>
      );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.productReducer.products,
    searchWord: state.searchWordReducer.searchWord,
    language: state.languageReducer.language,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getAllProducts: () => dispatch(actions.getAllProducts()),
  setSearchWord: (word) => dispatch(actions.setSearchWord(word)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MyCard));
