import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
// import { withRouter } from 'react-router-dom';
import { actions } from "../../redux/actions/action";
import Carousel from "../Carousel_";
// import Search from '../Search'
import Hamborger from "../mainPage/Hamborger/Hamborger";
import TopPageDesktop from "../mainPage/TopPageDesktop";
import useMediaQuery from "../../hooks/useMediaQuery";
import Cart from "../../data/imges/cart.png";
import "../../App.css";
import $ from "jquery";
import i18 from "../../i18/i18";
function ProductList(props) {
  const url = window.location.href;

  // const [cart, setCart] = useLocalStorage("cart", []);
  const lastSegment = decodeURI(url.split("/").pop().toString());
  const { language } = props;
  const { products } = props;
  const { categories } = props;

  const isMobile = useMediaQuery(768);
  const isTablet = useMediaQuery(1024);

  const [cart, setCart] = useLocalStorage("cart", []);
  const [numItems, setNumItems] = useLocalStorage("numItems", 0);
  const [total, setTotal] = useLocalStorage("total", 0);
  const { totalRedux, numItemsRedux, cartRedux } = props;
  // if (totalRedux === 0) {
  //   props.setTotalRedux(total)
  // }
  // if (numItemsRedux === 0) {
  //   props.setNumItemsRedux(numItems)
  // }
  // if (!cartRedux.length) {
  //
  //   props.setCartRedux(cart)
  // }
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

  if (!products || !products.length) {
    // props.getAllProducts()
  }
  if (!categories || !categories.length) {
    props.getAllCategories();
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

  // const myStorage = window.localStorage;
  const AddToCart = async (product) => {
    let amountToAdd = parseInt(
      $("#" + product._id + " " + ".amountToBuy" + " " + "input").val()
    );

    props.setTotalRedux(total + amountToAdd * 14.9);
    setTotal(total + amountToAdd * 14.9); //product.price
    props.setNumItemsRedux(numItems + amountToAdd);
    setNumItems(numItems + amountToAdd);
    let flag = 0;
    let shoppingCart = [];
    if (cart !== undefined) shoppingCart = cart;
    shoppingCart.map((item) => {
      if (item.product._id === product._id) {
        item.Amount = item.Amount + amountToAdd;
        item.Total = item.Total + amountToAdd * 14.9; //item.product.price
        flag = 1;
      }
    });
    if (flag === 0) {
      let newItem = {
        product: product,
        Amount: amountToAdd,
        Total: amountToAdd * 14.9, //product.price
      };
      await shoppingCart.push(newItem);
    }
    await setCart(shoppingCart);
    // await props.setCartRedux(cart)
    $(".navbar-toggler").click();
  };

  useEffect(() => {
    if ($) {
    }
  }, [language, totalRedux, numItemsRedux, cartRedux]);

  return (
    <>
      <div className="pageNuv">
        {isTablet && <Hamborger history={props.history} />}

        {!isMobile && !isTablet && <TopPageDesktop />}
      </div>

      <div className="pageHeader">
        <label>
          {lastSegment}{" "}
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
      <div className="location  pt-3 text-end px-5">
        <div
          className="d-inline btn-pointer"
          onClick={() => props.history.push("/")}
        >
          {i18.t("ScoopCatering")}
        </div>{" "}
        /
        <div
          className="d-inline btn-pointer"
          onClick={() => props.history.push("/shop")}
        >
          {i18.t("shabatMenu")}{" "}
        </div>
        <div className="goldColor d-inline">/{lastSegment} </div>
      </div>
      <div className="pageContent swithSide m-auto w-50 pt-4 pb-5">
        <br />
        <br />

        <Carousel />

        <button
          className="goldButton px-3 h5 p-2 my-5 "
          style={{}}
          onClick={() => props.history.push("/Cart")}
        >
          <i
            className="fas fa-long-arrow-alt-left  pr-2"
            style={{ height: "fit-content" }}
          ></i>
          {i18.t("ToTheShoppingCart")}
        </button>

        <h3 className=" font-weight-bold mb-1">{lastSegment}</h3>
        <h6 className="  mb-5"> {i18.t("addProductsLable")}</h6>

        {categories &&
          categories
            .filter(
              (category) =>
                category.name === lastSegment ||
                category.hebrewName === lastSegment
            )
            .map((category) =>
              Object.keys(category)
                .filter((key) => key === "products")
                .map((key, val) =>
                  category[key].map((product) => (
                    <div
                      className=" productLine w-100 d-flex row   mb-4  justify-content-around align-items-center pr-1 pl-1 ml-0 pb-1 pt-1"
                      id={product._id}
                    >
                      <div className="productName font-weight-bold  col-4">
                        {" "}
                        {language === "he"
                          ? product.hebrewName
                          : product.name}{" "}
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
                          onClick={() => changeAmount(product._id, "plus")}
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
                          onClick={() => changeAmount(product._id, "minus")}
                        >
                          -
                        </span>
                      </div>

                      <div
                        onClick={() => AddToCart(product)}
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
                  ))
                )
            )}

        <h4 className=" font-weight-bold mb-4 mt-5">?אולי תרצה גם</h4>
        <div className=" productLine w-100 d-flex row   mb-4  justify-content-around align-items-center pr-1 pl-1 ml-0 pb-1 pt-1">
          <div className="productName font-weight-bold  col-4"> תבנית חד"פ</div>
          <div
            className="amountOption font-weight-bold col-2 pb-1 pt-1 pl-0"
            style={{ fontSize: "12px", width: "fit-content" }}
          >
            <div>{i18.t("SelectAnOption")}:</div>
            <select
              className="form-select form-select-x-sm rtl pb-0 pt-0 border-0 rounded-custom font-weight-bold"
              aria-label=".form-select-sm example"
              style={{ width: "fit-content", fontSize: "12px" }}
            >
              <option selected> גדול </option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
          <div className="col-1 goldColor p-0" style={{ width: "fit-content" }}>
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
            +
            <div
              className="border text-black bg-white pt-0 pb-0 pl-2 pr-2 m-1"
              style={{ fontSize: "13px" }}
            >
              1
            </div>
            -
          </div>
          <div
            className="addToCart col-3 bg-black text-white align-items-center d-flex h6 pb-1 pt-1 mb-0"
            style={{ height: "fit-content", width: "fit-content" }}
          >
            {i18.t("addToCart")}
            <div className=" mr-2"></div>
            <img
              alt=""
              style={{
                height: "17px",
              }}
              src={Cart}
            />
          </div>
        </div>

        <div className=" productLine w-100 d-flex row   mb-4  justify-content-around align-items-center pr-1 pl-1 ml-0 pb-1 pt-1">
          <div className="productName font-weight-bold  col-4"> סיר חד"פ </div>
          <div
            className="amountOption font-weight-bold col-2 pb-1 pt-1 pl-0"
            style={{ fontSize: "12px", width: "fit-content" }}
          >
            <div>בחר אפשרות:</div>
            <select
              className="form-select form-select-x-sm rtl pb-0 pt-0 border-0 rounded-custom font-weight-bold"
              aria-label=".form-select-sm example"
              style={{ width: "fit-content", fontSize: "12px" }}
            >
              <option selected> גדול</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
          <div className="col-1 goldColor p-0" style={{ width: "fit-content" }}>
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
            +
            <div
              className="border text-black bg-white pt-0 pb-0 pl-2 pr-2 m-1"
              style={{ fontSize: "13px" }}
            >
              1
            </div>
            -
          </div>
          <div
            className="addToCart col-3 bg-black text-white align-items-center d-flex h6 pb-1 pt-1 mb-0"
            style={{ height: "fit-content", width: "fit-content" }}
          >
            {i18.t("addToCart")}
            <div className=" mr-2"></div>
            <img
              alt=""
              style={{
                height: "17px",
              }}
              src={Cart}
            />
          </div>
        </div>

        <div className=" productLine w-100 d-flex row   mb-4  justify-content-around align-items-center pr-1 pl-1 ml-0 pb-1 pt-1">
          <div className="productName font-weight-bold  col-4">
            {" "}
            חלה פיקנטית
          </div>
          <div
            className="amountOption font-weight-bold col-2 pb-1 pt-1 pl-0"
            style={{ fontSize: "12px", width: "fit-content" }}
          >
            <div>בחר אפשרות:</div>
            <select
              className="form-select form-select-x-sm rtl pb-0 pt-0 border-0 rounded-custom font-weight-bold"
              aria-label=".form-select-sm example"
              style={{ width: "fit-content", fontSize: "12px" }}
            >
              <option selected> בינוני</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
          <div className="col-1 goldColor p-0" style={{ width: "fit-content" }}>
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
            +
            <div
              className="border text-black bg-white pt-0 pb-0 pl-2 pr-2 m-1"
              style={{ fontSize: "13px" }}
            >
              1
            </div>
            -
          </div>
          <div
            className="addToCart col-3 bg-black text-white align-items-center d-flex h6 pb-1 pt-1 mb-0"
            style={{ height: "fit-content", width: "fit-content" }}
          >
            {i18.t("addToCart")}
            <div className=" mr-2"></div>
            <img
              alt=""
              style={{
                height: "17px",
              }}
              src={Cart}
            />
          </div>
        </div>

        <h4 className=" font-weight-bold mb-4 mt-5">מוצרים משדרגים</h4>
        <div className=" productLine w-100 d-flex row   mb-4  justify-content-around align-items-center pr-1 pl-1 ml-0 pb-1 pt-1">
          <div className="productName font-weight-bold  col-4"> קוקה קולה</div>
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
              <option selected> גדול </option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
          <div className="col-1 goldColor p-0" style={{ width: "fit-content" }}>
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
            +
            <div
              className="border text-black bg-white pt-0 pb-0 pl-2 pr-2 m-1"
              style={{ fontSize: "13px" }}
            >
              1
            </div>
            -
          </div>
          <div
            className="addToCart col-3 bg-black text-white align-items-center d-flex h6 pb-1 pt-1 mb-0"
            style={{ height: "fit-content", width: "fit-content" }}
          >
            {i18.t("addToCart")}
            <div className=" mr-2"></div>
            <img
              alt=""
              style={{
                height: "17px",
              }}
              src={Cart}
            />
          </div>
        </div>

        <div className=" productLine w-100 d-flex row   mb-4  justify-content-around align-items-center pr-1 pl-1 ml-0 pb-1 pt-1">
          <div className="productName font-weight-bold  col-4"> פריגת </div>
          <div
            className="amountOption font-weight-bold col-2 pb-1 pt-1 pl-0"
            style={{ fontSize: "12px", width: "fit-content" }}
          >
            <div>בחר אפשרות:</div>
            <select
              className="form-select form-select-x-sm rtl pb-0 pt-0 border-0 rounded-custom font-weight-bold"
              aria-label=".form-select-sm example"
              style={{ width: "fit-content", fontSize: "12px" }}
            >
              <option selected> 600 מ"ל</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
          <div className="col-1 goldColor p-0" style={{ width: "fit-content" }}>
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
            +
            <div
              className="border text-black bg-white pt-0 pb-0 pl-2 pr-2 m-1"
              style={{ fontSize: "13px" }}
            >
              1
            </div>
            -
          </div>
          <div
            className="addToCart col-3 bg-black text-white align-items-center d-flex h6 pb-1 pt-1 mb-0"
            style={{ height: "fit-content", width: "fit-content" }}
          >
            {i18.t("addToCart")}
            <div className=" mr-2"></div>
            <img
              alt=""
              style={{
                height: "17px",
              }}
              src={Cart}
            />
          </div>
        </div>
      </div>
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    products: state.productReducer.products,
    categories: state.categoryReducer.categories,
    language: state.languageReducer.language,
    cartRedux: state.cartReducer.cartRedux,
    numItemsRedux: state.numItemsReducer.numItemsRedux,
    totalRedux: state.totalReducer.totalRedux,
  };
};
const mapDispatchToProps = (dispatch) => ({
  getAllProducts: () => dispatch(actions.getAllProducts()),
  getAllCategories: () => dispatch(actions.getAllCategories()),
  setCartRedux: (x) => dispatch(actions.setCartRedux(x)),
  setNumItemsRedux: (x) => dispatch(actions.setNumItemsRedux(x)),
  setTotalRedux: (Total) => dispatch(actions.setTotalRedux(Total)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
// export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProductList))
