import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import "../../App.css";
import { actions } from "../../redux/actions/action";
// import Search from '../Search';
import arrow_left_white from "../../data/imges/arrow-left-white.png";
import useMediaQuery from "../../hooks/useMediaQuery";
import i18 from "../../i18/i18";
import Footer from "../mainPage/Footer";
import Hamborger from "../mainPage/Hamborger/Hamborger";
import TopPageDesktop from "../mainPage/TopPageDesktop";
import UnderFooter from "../mainPage/UnderFooter";

import $ from "jquery";
export function ShoppingCart(props) {
  const isMobile = useMediaQuery(768);
  const isTablet = useMediaQuery(1024);
  const { products } = props;
  const { language } = props;
  const [cart, setCart] = useLocalStorage("cart", []);
  const [numItems, setNumItems] = useLocalStorage("numItems", 0);
  const [total, setTotal] = useLocalStorage("total", 0);
  const { totalRedux, numItemsRedux, cartRedux } = props;
  if (totalRedux !== 0) {
    props.setTotalRedux(total);
  }
  if (numItemsRedux !== 0) {
    props.setNumItemsRedux(numItems);
  }
  if (cartRedux.length) {
    props.setCartRedux(cart);
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

  // const myStorage = window.localStorage;

  // const cart = JSON.parse(myStorage.cart);
  if (!products || !products.length) {
    props.getAllProducts();
  }

  const changeAmount = async (id, action) => {
    let amountTocart = parseInt(
      $("." + id + " " + ".Am" + " " + "input").val()
    );

    if (action === "minusToCart" || action === "plusToCart") {
      // let shoppingCart = cart
      cart.map((item) => {
        if (item.product._id === id) {
          alert(item.Amount);
          if (action === "plusToCart") {
            $("." + id + " " + ".Am" + " " + "input").val(amountTocart + 1);
            // item = { ...item, Amount: item.Amount + 1 };

            item.Amount = item.Amount + 1;
            setNumItems(numItems + 1);
            props.setNumItemsRedux(numItems + 1);
            setTotal(total + 14.9); //+item.product.price
            props.setTotalRedux(total + 14.9); //+item.product.price
          } else {
            if (amountTocart !== "1") {
              $("." + id + " " + ".Am" + " " + "input").val(amountTocart - 1);
              // item = { ...item, Amount: item.Amount - 1 };

              item.Amount = item.Amount - 1;
              setNumItems(numItems - 1);
              props.setNumItemsRedux(numItems - 1);
              setTotal(total - 14.9); //+item.product.price
              props.setTotalRedux(total - 14.9); //+item.product.price
            }
          }
          // item = { ...item, Total: item.Amount * 14.90 };

          item.Total = item.Amount * 14.9; //*item.product.price
        }
      });

      setCart(cart);
    }
  };

  const deleteItem = async (id) => {
    let totalTodel;
    let less;

    let list = await cart.filter((x) => {
      if (x.product._id === id) {
        totalTodel = x.Total;
        less = x.Amount;
      }
      return x.product._id !== id;
    });
    let currTotal =
      parseFloat(total).toFixed(2) - parseFloat(totalTodel).toFixed(2);

    if (totalTodel < 0) {
      setTotal(parseFloat(0).toFixed(2));
      props.setTotalRedux(parseFloat(0).toFixed(2));
    } else {
      setTotal(currTotal); //product.price
      props.setTotalRedux(currTotal); //product.price
    }

    // let less = $('#' + id + ' ' + '.amountToBuy' + ' ' + 'input').val()

    setCart(list);
    // await props.setCartRedux(list)
    // $('.' + id).remove()

    await setNumItems(numItems - less);
    props.setNumItemsRedux(numItems - less);
  };

  // const deleteItem = async (id) => {
  //
  //     let totalTodel

  //     let list = await cart.filter(x => {
  //         if (x.product._id === id) {
  //             totalTodel = x.Total
  //         }
  //         return x.product._id !== id;
  //     })
  //     let currTotal = parseFloat(total).toFixed(2) - parseFloat(totalTodel).toFixed(2)
  //     if (totalTodel < 0) {
  //         setTotal(parseFloat(0).toFixed(2))
  //         props.setTotalRedux(parseFloat(0).toFixed(2))
  //     }

  //     else {
  //         setTotal(currTotal)//product.price
  //         props.setTotalRedux(currTotal)//product.price
  //     }

  //     let less = $('.' + id + ' ' + '.amountToBuy' + ' ' + 'input').val()

  //     setCart(list);
  //     await props.setCartRedux(list)
  //     // $('.' + id).remove()

  //     await setNumItems(numItems - less)
  //     props.setNumItemsRedux(numItems - less)

  // }

  useEffect(() => {}, [
    props,
    language,
    totalRedux,
    numItemsRedux,
    cartRedux,
    total,
  ]);

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
          {i18.t("ShoppingCart")}{" "}
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
        <div className="goldColor d-inline"> / {i18.t("ShoppingCart")} </div>
      </div>
      <button
        className="goldButton px-3 h5 p-2 mt-5"
        style={{
          left: "150px",
          position: "absolute",
        }}
        onClick={() => props.history.push("/shop")}
      >
        <i
          className="fas fa-long-arrow-alt-left  pr-2"
          style={{ height: "fit-content" }}
        ></i>
        {i18.t("ToTheShop")}
      </button>
      {cart === "" && <div className="pageNoContent"></div>}
      {cart !== "" && (
        <div
          className="page_content justify-content-center pt-5"
          style={{ width: "80%", margin: "auto" }}
        >
          <h2 className="swithSide mb-4 font-weight-bold mt-5 pt-5 ">
            {i18.t("ShoppingCart")}
          </h2>

          <div className="row justify-content-between swithDir">
            <div className=" bg-grey col-8  px-5 pb-3">
              <div className="row justify-content-around text-white align-items-center py-3">
                <div className="col-2 text-black mb-0 h6">
                  {i18.t("ProductName")}
                </div>
                |
                <div className="col-2 text-black mb-0 h6">
                  {i18.t("Amount")}
                </div>
                |
                <div className="col-2 text-black mb-0 h6">{i18.t("price")}</div>
                |
                <div className=" sumColumn col-3 text-black text-end pr-5 mb-0 h6 fontNumber">
                  {i18.t("Total")}
                </div>
              </div>
              <div style={{ overflowY: "scroll", height: "450px" }}>
                {cart &&
                  cart.map((item) => (
                    <div
                      className={`productItem mb-2 row justify-content-between align-items-end border-bottom border-dark py-2 ${item.product._id} `}
                    >
                      <div className="col-3 productName font-weight-bold  ">
                        {" "}
                        {language === "he"
                          ? item.product.hebrewName
                          : item.product.name}
                        <select
                          className="form-select form-select-x-sm rtl pb-0 pt-0 border-0 rounded-custom font-weight-bold"
                          aria-label=".form-select-sm example"
                          style={{ width: "fit-content", fontSize: "12px" }}
                        >
                          {/* <option selected> 1 יחי'</option> */}
                          <option value="1">One</option>
                          <option value="2">Two</option>
                          <option value="3">Three</option>
                        </select>
                      </div>
                      <div
                        className="amountToBuy Am col-3 goldColor d-flex   p-0  align-items-end"
                        style={{ width: "fit-content" }}
                      >
                        <span
                          className="plus"
                          onClick={() =>
                            changeAmount(item.product._id, "plusToCart")
                          }
                          style={{ height: "30px" }}
                        >
                          +
                        </span>
                        {/* <input type="text" value={item.Amount} className='border p-0 text-black bg-white pt-0 pb-0 pl-2 pr-2 m-1 my-0 input_number' style={{ fontSize: '13px' }} />
                         */}
                        <input
                          type="text"
                          defaultValue={item.Amount}
                          className="AmountInput border  p-0 text-black bg-white    m-1 my-0 input_number fontNumber"
                          style={{ height: "fit-content" }}
                        />

                        <span
                          className="minus"
                          onClick={() =>
                            changeAmount(item.product._id, "minusToCart")
                          }
                          style={{ height: "30px" }}
                        >
                          -
                        </span>
                      </div>
                      <div className="col-2 price h6 mb-0 font-weight-bold  goldColor fontNumber">
                        {parseFloat(14.9).toFixed(2)} &#8362;{" "}
                      </div>

                      <div className="sumColumnVal col-2 endprice h6 mb-0 font-weight-bold pr-5 fontNumber">
                        {parseFloat(item.Amount * 14.9).toFixed(2)} &#8362;{" "}
                      </div>
                      <div
                        className="col-1"
                        onClick={() => deleteItem(item.product._id)}
                      >
                        {" "}
                        <i className="fas fa-trash-alt "></i>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <div className=" bg-grey col-3 ml-5 p-0 py-3">
              <label className=" w-100 pt-1 goldColor font-weight-bold swithSide px-3 mb-0">
                {i18.t("OrderSummary")}
              </label>
              <hr
                className="mb-3 mt-0 w-25 mx-3 goldColor"
                style={{ height: "2px" }}
              />
              <div className="px-4">
                <div className="row ">
                  <div className="col-7 swithSide">{i18.t("Items")}</div>
                  <div className="col-5 numItems fontNumber">
                    {numItemsRedux}
                  </div>
                </div>
                <br />
                <br />
                <div className="row border-bottom border-dark pb-3">
                  <div className="col-7 swithSide ">
                    {i18.t("InterimTotal")}
                  </div>
                  <div className="col-5 fontNumber">
                    {parseFloat(totalRedux).toFixed(2)} &#8362;
                  </div>
                </div>
                <div className="row pt-2 font-weight-bold ">
                  <div className="col-7 swithSide">{i18.t("Total")}</div>
                  <div className="col-5  fontNumber">
                    {parseFloat(totalRedux).toFixed(2)} &#8362;
                  </div>
                </div>
                <button
                  className="mt-5 goldButton px-3 mb-5"
                  onClick={() => props.history.push("/Checkout")}
                >
                  {" "}
                  {i18.t("toCheckout")}{" "}
                  <img
                    alt=""
                    src={arrow_left_white}
                    style={{
                      paddingRight: "5px",
                      width: "25px",
                    }}
                  />
                </button>
                <div className="col swithSide h6 px-2">
                  <div>{i18.t("scoop")}</div>
                  <div>{i18.t("OurAddress")}:</div>
                  <div> {i18.t("OpeningHours")}:</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="PageFooter mt-5">
        <Footer />
        <UnderFooter />
      </div>
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    products: state.productReducer.products,
    language: state.languageReducer.language,
    cartRedux: state.cartReducer.cartRedux,
    numItemsRedux: state.numItemsReducer.numItemsRedux,
    totalRedux: state.totalReducer.totalRedux,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getAllProducts: () => dispatch(actions.getAllProducts()),
  setCartRedux: (x) => dispatch(actions.setCartRedux(x)),
  setNumItemsRedux: (NumItems) => dispatch(actions.setNumItemsRedux(NumItems)),
  setTotalRedux: (Total) => dispatch(actions.setTotalRedux(Total)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart);
