import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
// import { withRouter } from 'react-router-dom';
import { actions } from "../../redux/actions/action";
import StickyBox from "react-sticky-box";
import { Button } from "react-bootstrap";
// import Search from '../Search'
import headerBgImag from "../../data/imges/headerBgImag.png";
import Hamborger from "../mainPage/Hamborger/Hamborger";
import TopPageDesktop from "../mainPage/TopPageDesktop";
import useMediaQuery from "../../hooks/useMediaQuery";
import salads from "../../data/imges/foodCategories/Pictures/fishh.png";
import appetizers from "../../data/imges/foodCategories/Pictures/shabbat.png";
import bakery from "../../data/imges/foodCategories/Pictures/bakery.png";
import commentIcon from "../../data/imges/comment.png";
import searchIcom_ from "../../data/imges/searchIcom_.png";
import desserts from "../../data/imges/foodCategories/Pictures/desserts.png";
import image1 from "../../data/imges/foodCategories/Pictures/image1.png";
import deleteIcom from "../../data/imges/delete.png";

import Modal from "../Popup/Modal";
import useModal from "../Popup/useModal";
import "../Popup/Modal.css";
import Payment from "./Payment";
import "../../App.css";
import $ from "jquery";
import i18 from "../../i18/i18";
import { useAuth } from "../../contexts/AuthContext";

import { useHistory } from "react-router-dom";

let previousClick = "empty";
let previousClickIndex;
let currentClass;
const baseURL = "http://localhost:3001/"
function ShabbatMenu(props) {

  const { isShowing, toggle } = useModal();
  const [currentOrder, setCurrentOrder] = useLocalStorage("currentOrder", []);
  //const [cart, setCart] = useLocalStorage("cart", []);
  const { language } = props;
  const { products } = props;
  const { categories } = props;
  let filteredProducts = [];
  const [side] = useState("");
  const [align] = useState("");
  const isMobile = useMediaQuery(768);
  const isTablet = useMediaQuery(1024);
  const [searchResults, setSearchResults] = useState();
  const [searchWord, setSearchWord] = useState();
  const [cart, setCart] = useLocalStorage("cart", []);
  const [numItems, setNumItems] = useLocalStorage("numItems", 0);
  const [total, setTotal] = useLocalStorage("total", 0);
  const { totalRedux, numItemsRedux, cartRedux } = props;
  const [setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  if (!products || !products.length) {
    props.getAllProducts()

  }
  if (!categories || !categories.length) {
    props.getAllCategories();

  }

  async function handleLogout() {
    //  setError("");

    try {
      await logout();
      history.push("/shop");
    } catch {
      setError("Failed to log out");
    }
  }
  function goToCheckout() {
    if (numItems === 0) {
      alert("add products to cart")
    } else {
      if (currentUser) {
        let orderComment = $("#orderComment").val()
        setCurrentOrder({
          "notes":orderComment
        })
        props.history.push("/Checkout")
      }

      else {
        alert("you must sign in before")
        scrollTopFunc()
      }
    }
  }
  function scrollTopFunc() {
    window.scrollTo(0, 0);
  }

  function hoverCategory(categoryId, index) {
    currentClass = "#" + categoryId;
    if ($(currentClass).hasClass("active")) {
    } else {
      $(currentClass).addClass("active");
      $("." + (index - 1)).addClass("removeBottom");
      console.log(previousClick);
      if (previousClick !== "empty" && previousClick !== categoryId) {
        $("#" + previousClick).removeClass("active");
        $("." + (previousClickIndex - 1)).removeClass("removeBottom");
      } else {
        $("#" + previousClick).addClass("active");
        $("." + (previousClickIndex - 1)).addClass("removeBottom");
      }
      previousClick = categoryId;
      previousClickIndex = index;
    }
    // $('#' + categoryId).addClass('active')
  }

  function categorySelection(name, id, index) {
    $(".searchResults").addClass("d-none");
    $(".shabatMenu").removeClass("d-none");
    $(".categoryList").removeClass("px-3");
    currentClass = "#" + id;
    if ($(currentClass).hasClass("active")) {
    } else {
      $(currentClass).addClass("active");

      $("." + (index - 1)).addClass("removeBottom");
      console.log(previousClick);
      if (previousClick !== "empty" && previousClick !== id) {
        $("#" + previousClick).removeClass("active");
        $("." + (previousClickIndex - 1)).removeClass("removeBottom");
      } else {
        $("#" + previousClick).addClass("active");
        $("." + (previousClickIndex - 1)).addClass("removeBottom");
      }
      previousClick = id;
      previousClickIndex = index;
    }

    if (isTablet) {
      $("#" + name).css("padding-top", "12vh");
    }
  }

  const deleteItem = async (id) => {
    // console.log($('#' + id + ' ' + '.amountToBuy' + ' ' + 'input').val());
    let totalTodel;
    let less;

    let list = await cart.filter((x) => {
      if (x.Id === id) {
        totalTodel = x.Total;
        less = x.Amount;
      }
      return x.Id !== id;
    });
    let currTotal =
      parseFloat(total).toFixed(2) - parseFloat(totalTodel).toFixed(2);

    if (totalTodel < 0) {
      await props.setTotalRedux(parseFloat(0).toFixed(2));
      setTotal(parseFloat(0).toFixed(2));
    } else {
      await props.setTotalRedux(currTotal);
      setTotal(currTotal);
    }

    // let less = $('#' + id + ' ' + '.amountToBuy' + ' ' + 'input').val()

    setCart(list);
    // await props.setCartRedux(list)
    // $('.' + id).remove()

    await setNumItems(numItems - less);
    props.setNumItemsRedux(numItems - less);
    if (total === 0) {
      props.setTotalRedux(0);
    }
  };

  function searchProduct(searchWord_) {

    scrollTopFunc();
    //  let searchWord_ = e.target.value

    setSearchWord(searchWord_);
    $(".shabatMenu").addClass("d-none");
    $(".searchResults").removeClass("d-none");

    filteredProducts =
      products &&
      products.filter((product) => {
        if (language !== "he")
          return (
            product &&
            product.name.toLowerCase().includes(searchWord_.toLowerCase())
          );
        else
          return (
            product &&
            product.hebrewName.toLowerCase().includes(searchWord_.toLowerCase())
          );
      });
    console.log(filteredProducts, "filteredProducts");
    let div = document.getElementById("xxl");
    div.scrollTop -= 590;
    if (searchWord_ === "") {
      console.log("empty results");
      setSearchResults([]);
      $(".shabatMenu").removeClass("d-none");
      $(".searchResults").addClass("d-none");
    } else {
      console.log("full results");
      setSearchResults(filteredProducts);
      console.log("SerchResults", searchResults);
      if (filteredProducts && !filteredProducts || !filteredProducts.length)
        $(".notFound").removeClass("d-none");
      else
        $(".notFound").addClass("d-none");
    }
  }

  function clearSearch() {
    $(".inputOf_Search").val("");
    searchProduct("");
  }
  function useLocalStorage(key, initialValue) {
    const [storedValue, setStoredValue] = useState(() => {
      try {
        const item = window.localStorage.getItem(key);

        return item ? JSON.parse(item) : initialValue;
      } catch (error) {
        console.log(error);
        return initialValue;
      }
    });

    const setValue = (value) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;

        setStoredValue(valueToStore);

        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.log(error);
      }
    };
    return [storedValue, setValue];
  }


  const changePrice = event => {
    if (event.target.value != " ") {

      $("#" + event.target.id + "price").text(event.target.value)
    }

  }



  const changeAmount = async (id, action) => {
    if (action === "minusToCart" || action === "plusToCart") {
      let amountTocart = parseInt(
        $("." + id + " " + ".amountToBuy" + " " + "input").val()
      );
      cart.map((item) => {
        if (item.Id === id) {
          if (action === "plusToCart") {
            item.Amount = parseInt(item.Amount) + 1;
            setNumItems(numItems + 1);
            props.setNumItemsRedux(numItems + 1);
            setTotal(total + item.price);
            props.setTotalRedux(total + item.price);
            amountTocart++;
          } else {
            if (amountTocart !== 1) {
              item.Amount = parseInt(item.Amount) - 1;
              setNumItems(numItems - 1);
              props.setNumItemsRedux(numItems - 1);
              setTotal(total - item.price);
              props.setTotalRedux(total - item.price);
              amountTocart--;
            } else deleteItem(id);
          }
          item.Total = item.Amount * item.price; //*item.product.price
        }
      });

      $("." + id + " " + ".amountToBuy" + " " + "input").val(amountTocart);
      setCart(cart);
    } else {
      let amount = parseInt(
        $("#" + id + " " + ".amountToBuy" + " " + "input").val()
      );
      if (action === "plus") amount++;
      else {
        if (amount !== 1) amount--;
      }
      $("#" + id + " " + ".amountToBuy" + " " + "input").val(amount);
    }
  };

  const AddToCart = async (product) => {
    if (!product.outOfStock) {
      let currentPrice = parseInt($("#" + product._id + "price").text())
      if ($("#" + product._id + " .amountOption_select").val() === " ") {
        $("#" + product._id + " .errorSelect").removeClass("d-none");
        setTimeout(function () {
          $("#" + product._id + " .errorSelect").addClass("d-none");
        }, 2000);
      } else {
        let amountToAdd = parseInt(
          $("#" + product._id + " " + ".amountToBuy" + " " + "input").val()
        );
        props.setTotalRedux(total + amountToAdd * currentPrice);
        setTotal(total + amountToAdd * currentPrice);
        props.setNumItemsRedux(numItems + amountToAdd);
        setNumItems(numItems + amountToAdd);
        let flag = 0;
        let shoppingCart = [];
        if (cart !== undefined) shoppingCart = cart;
        shoppingCart.map((item) => {
          if (item.product._id === product._id && item.price === currentPrice) {

            item.Amount = item.Amount + amountToAdd;
            item.Total = item.Total + amountToAdd * currentPrice;
            flag = 1;
          }
        });
        if (flag === 0) {
          let newItem = {
            Id: product._id + currentPrice,
            product: product,
            Amount: amountToAdd,
            price: currentPrice,
            Total: amountToAdd * currentPrice,
          };
          await shoppingCart.push(newItem);
        }
        await setCart(shoppingCart);
        // await props.setCartRedux(cart)
      }
    }
  };



  useEffect(() => {



    if ($) {
      $("#shop").addClass("active");
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
    }
  }, [props, language, totalRedux, numItemsRedux, cartRedux, total]);

  return (
    <div id="myDiv">

      <button
        className="bg-black text-white d-none scrollTopButton"
        style={{ position: "fixed", top: "90%", left: "4%" }}
        onClick={scrollTopFunc}
      >
        Top
      </button>

      <div>
        <Modal isShowing={isShowing} hide={toggle} />
      </div>

      {/* //הוספתי */}


      {isTablet && (
        <nav
          className="swithDir categoryList rounded-0  bg-white d-flex"
          style={{
            width: "auto",
            overflowX: "auto",
            overflowY: "hidden",
            whiteSpace: "nowrap",
            position: "sticky",
            top: "0",
            zIndex: "1020",
          }}
        >
          {categories &&
            categories.map((category, index) => (
              <a
                key={index}
                className=""
                href={"#" + category.name}
                style={{ textDecoration: "none" }}
              >
                <button
                  className={`text-center bg-white categoryButton ${index}`}
                  id={category._id}
                  onClick={() =>
                    categorySelection(category.name, category._id, index)
                  }
                  style={{ fontSize: "1rem", width: "100% !important" }}
                >
                  {language === "he" ? category.hebrewName : category.name}
                </button>
              </a>
            ))}
        </nav>
      )}


      {/* //הוספתי סיום*/}
      <div className="pageNuvMenu ">
        {isTablet && <Hamborger history={props.history} />}

        {!isMobile && !isTablet && <TopPageDesktop />}
      </div>

      <div
        className="small_pageHeader "
        style={{ backgroundImage: `url(${headerBgImag})` }}
      ></div>

      <h4 className=" goldColor mt-2 text-center">{i18.t("menuTitle")}</h4>

      {/* הוספה */}
      {isTablet && (
        <div className="swithDir d-flex justify-content-between align-items-center">
          <div
            className="mb-3 col-12 d-flex row flex-nowrap pl-1"
            style={{ fontSize: "1rem" }}
          >
            <div className=" p-0 ml-2">
              <input
                placeholder={i18.t("searchPlaceholder")}
                className=" inputOf_Search bg-transparent border-0 w-100 "
                onInput={(e) => {
                  searchProduct(e.target.value);
                }}
                onKeyPress={(e) => searchProduct(e.target.value)}
              />
            </div>

            <div
              className="col-1 p-0"
              onClick={() => searchProduct($(".inputOf_Search").val())}
            >
              <img style={{ width: "15px" }} src={searchIcom_} />
            </div>
          </div>

        </div>
      )}

      {/* content */}
      {isTablet && (
        <div
          data-spy="scroll"
          data-target="#navbar-example2"
          data-offset="0"
          style={
            language === "he" ? { direction: "rtl" } : { direction: "ltr" }
          }
          className=" mx-0  w-100 pageContent overflow-auto pb-3 sidColumn scrollable-content"
        >
          <div className="shabatMenu px-2">
            {categories &&
              categories.map((category, index) => (
                <>
                  <div
                    id={category.name}
                    onMouseEnter={() => hoverCategory(category._id, index)}
                  >
                    <div>
                      <div className="  w-100 categoryImage"
                        style={!category.picUrl || category.picUrl === undefined ? { backgroundImage: `url(${baseURL + "salads.png"})` } : { backgroundImage: `url(${baseURL + "" + category.picUrl})` }}
                      >

                      </div>

                      <div className="d-flex align-items-center m-3 ">
                        <h1 className=" mb-0 font-weight-bold ">
                          {language === "he"
                            ? category.hebrewName
                            : category.name}
                        </h1>
                      </div>
                    </div>

                    {(searchWord !== undefined &&
                      searchWord !== "" &&
                      searchResults.length
                      ? searchResults
                      : category.products
                    ).map((product) => product.display && (
                      <>
                        <div
                          className=" productLine w-100  row  m-0  flex-nowrap    justify-content-around   p-2 mb-2"
                          id={product._id}
                          style={{
                            maxHeight: "150px",
                            height: "118px",
                          }}
                        >
                          <div className="col-3  productPic d-flex align-items-center px-2  "
                            style={!product.img || product.img == undefined ? { backgroundImage: "none" } : { backgroundImage: `url(${baseURL + "" + product.img})` }}
                          >
                            {product.recommended &&

                              <div
                                className=" ml-auto bg-gold d-flex   recommended  justify-content-center align-items-center"
                                style={language === "he" ? { right: "0px" } : { left: "0px" }}

                              >
                                <p
                                  className="m-0 "
                                  style={{ fontSize: "0.6rem" }}
                                >
                                  {i18.t("recommended")}
                                </p>
                              </div>
                            }

                            {product.outOfStock &&
                              <div
                                className=" ml-auto bg-black text-white outOfStock d-flex  justify-content-center align-items-center"
                                style={language === "he" ? { right: "0px" } : { left: "0px" }}

                              >
                                <p
                                  className="m-0 "
                                  style={{ fontSize: "0.6rem" }}
                                >
                                  {i18.t("outOfStock")}
                                </p>
                              </div>
                            }


                            {!product.img || product.img == undefined ?
                              <img className="w-100" src={image1} alt="img" />
                              : ""}
                          </div>
                          <div className="col-4 p-0 " id={product._id}>
                            <div
                              className="h-75 "
                              style={{ lineHeight: "0.99" }}
                            >
                              <div
                                className="productName font-weight-bold  mb-1"
                                style={{ fontSize: "1.5rem" }}
                              >
                                {" "}
                                {language === "he"
                                  ? product.hebrewName
                                  : product.name}
                              </div>

                              {/* <span className="productDetails" style={{ fontSize: "18px" }}>
                                {language === "he"
                                  ? product.hebrewDetails
                                  : product.details
                                }
                              </span>
 */}


                              <div
                                className="amountOption  pl-0  mt-1"
                                style={{ fontWeight: '600', fontSize: '17px' }}
                                id={product._id}
                              >
                                {product.priceList.length > 1 ?
                                  <select id={product._id} onChange={changePrice}
                                    className="btn-pointer amountOption_select
                                                                        pl-0  form-select form-select-x-sm swithDir pb-0 pt-0 border-0 rounded-custom  font-weight-bold"
                                    aria-label=".form-select-sm example"
                                    style={{
                                      lineHeight: "1",
                                      fontSize: "16px",
                                      width: "fit-content",
                                      fontWeight: "600 !important",
                                    }}
                                  >
                                    {/* <option value=" " disabled selected>
                                              {i18.t("selectAmount")}
                                            </option> */}
                                    {product.priceList.map((item) => (
                                      <option value={item.price}>
                                        {
                                          language === "he"
                                            ? item.amount && item.amount.hebrewName
                                            : item.amount && item.amount.name}
                                      </option>
                                    ))}


                                  </select>
                                  :

                                  <div>{language === "he"
                                    ?
                                    product.priceList[0] && product.priceList[0].amount && product.priceList[0].amount.hebrewName
                                    :
                                    product.priceList[0] && product.priceList[0].amount && product.priceList[0].amount.name}</div>

                                }
                              </div>
                            </div>

                            <div
                              className="row d-flex align-items-end  h-25 pb-2 d-none errorSelect"
                              style={{ fontSize: "xx-small" }}
                            >
                              <h6 className="" style={{ color: "red" }}>
                                * יש לבחור כמות או אופציה
                              </h6>
                            </div>
                          </div>
                          <div className="col-1"></div>
                          <div className="col-4 px-1 h-100">
                            <div className="d-flex align-items-end col-12 mx-0 px-0 row justify-content-end h-50 mt-1">
                              <div className="col-5"></div>
                              <div className="price productPrice text-center font-weight-bold  goldColor p-0 mr-0 col-7 fontNumber  mb-2" >
                                <span id={`${product._id}price`}>{product.priceList[0] && product.priceList[0].price}</span>
                                &#8362;{" "}
                              </div>
                            </div>
                            <div
                              className="d-flex align-items-end  row h-50 pb-1 flex-nowrap"
                            // style={{
                            //     justifyContent: "space-evenly",
                            // }}
                            >
                              <div
                                className="amountToBuy mx-2  goldColor d-flex  col-6 p-0  align-items-end"
                                style={{
                                  width: "fit-content",
                                }}
                              >
                                <span
                                  className="plus"
                                  onClick={() =>
                                    changeAmount(product._id, "plus")
                                  }
                                >
                                  +
                                </span>
                                <input
                                  type="text"
                                  // defaultValue="1"
                                  value={1}
                                  className=" text-black bg-white pt-0 pb-0   mt-2 input_number fontNumber gold-border"
                                />
                                <span
                                  className="minus"
                                  onClick={() =>
                                    changeAmount(product._id, "minus")
                                  }
                                >
                                  -
                                </span>
                              </div>

                              <div
                                onClick={() => AddToCart(product)}
                                className="addToCart col-5  bg-black text-white align-items-center d-flex h6  mb-0 py-1   roundButton"
                                style={{
                                  height: "fit-content",
                                  width: "fit-content",
                                }}
                              >
                                {i18.t("addToCart")}
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    ))}
                  </div>
                  <hr
                    className="goldColor mt-0 mb-2 w-100 row"
                    style={{ height: "2.5px", opacity: "1" }}
                  />
                </>
              ))}
          </div>

          <div className="searchResults d-none mt-1">
            <h4 className="swithSide notFound">
              <span className=" "> {i18.t("notFoundResults")}</span> {searchWord}{" "}
              <button className="mx-2" onClick={clearSearch}>x</button>
            </h4>
          </div>
        </div>
      )}

      <div
        className="  swithDir  justify-content-center  col-md-10   m-auto   "
        style={{
          paddingTop: "1.5%",
          display: "flex",
          alignItems: "flex-start",
        }}
      >
        {/* left column */}
        {!isMobile && !isTablet && (
          <StickyBox offsetTop={100} offsetBottom={10}>
            <div className=" mx-4   px-0">
              <div className=" h-100">
                <div>
                  <select
                    className="btn-pointer incrementFont customP text-center w-100  mb-3 form-select rounded-0 border-0 border-dark form-select-x-sm ltr m-auto   font-weight-bold border-bottom amountOption_select"
                    aria-label=".form-select-sm example"
                    style={{
                      lineHeight: "1",
                      width: "160px !important",
                      paddingLeft: "10px !important",
                    }}
                  >
                    <option value="1">{i18.t("shabatMenu")}</option>
                    <option value="2">{i18.t("passover")}</option>
                  </select>
                </div>

                <div
                  className="mb-3 d-flex row justify-content-center"
                  style={{ fontSize: "15px" }}
                >
                  <div className="col-8 p-0 ">
                    <input
                      placeholder={i18.t("searchPlaceholder")}
                      className=" inputOf_Search bg-transparent border-0 w-100 "
                      onInput={(e) => {
                        searchProduct(e.target.value);
                      }}
                      onKeyPress={(e) => searchProduct(e.target.value)}
                    />
                  </div>

                  <div
                    className="col-1 p-0 btn-pointer"
                    onClick={() => searchProduct($(".inputOf_Search").val())}
                  >
                    <img alt="" style={{ width: "15px" }} src={searchIcom_} />
                  </div>
                </div>
                <div className="categoryList   d-flex flex-column  pb-5 ">
                  {categories &&
                    categories.map((category, index) => (
                      <>
                        <a className="text-center" href={"#" + category.name}>
                          <button
                            className={`bg-white categoryButton ${index}`}
                            id={category._id}
                            onClick={() =>
                              categorySelection(
                                category.name,
                                category._id,
                                index
                              )
                            }
                            style={{ height: "60px" }}
                          >
                            {language === "he"
                              ? category.hebrewName
                              : category.name}
                          </button>
                        </a>
                      </>
                    ))}
                </div>
              </div>
            </div>
          </StickyBox>
        )}

        {/* middle column */}
        {!isMobile && !isTablet && (
          <div className="  mt-1 col-sm-12 mx-0 px-0  pageContent swithSide   middleColumn ">
            {/* <div className='overflow-auto pb-3 sidColumn ' id='xxl' style={{ height: '590px' }}> */}
            <div className="overflow-auto pb-3 sidColumn " id="xxl">
              <div className="searchResults d-none mt-1">
                <h4 className="swithSide notFound">
                  <span className=" "> {i18.t("notFoundResults")}</span>{" "}
                  {searchWord} <button className="mx-2" onClick={clearSearch}>x</button>
                </h4>
                {/* searchResults */}
                {searchResults &&
                  searchResults.map((product) => product.display && (
                    <>
                      <div
                        className=" productLine w-100  row    justify-content-around   p-2 mb-4"
                        id={product._id}
                        style={{ maxHeight: "150px", height: "118px" }}
                      >
                        <div className="col-2  productPic addM d-flex align-items-center   ml-3"
                          style={!product.img || product.img == undefined ? { backgroundImage: "none" } : { backgroundImage: `url(${baseURL + "" + product.img})` }}
                        >
                          {product.recommended &&
                            <div
                              className=" ml-auto bg-gold d-flex recommended justify-content-center align-items-center"
                              style={language === "he" ? { right: "0px" } : { left: "0px" }}
                            >
                              <p className="m-0 " style={{ fontSize: "0.6rem" }}>
                                {i18.t("recommended")}
                              </p>
                            </div>
                          }
                          {product.outOfStock &&
                            <div
                              className=" ml-auto bg-black text-white outOfStock d-flex  justify-content-center align-items-center"
                              style={language === "he" ? { right: "0px" } : { left: "0px" }}

                            >
                              <p
                                className="m-0 "
                                style={{ fontSize: "0.6rem" }}
                              >
                                {i18.t("outOfStock")}
                              </p>
                            </div>
                          }
                          {!product.img || product.img == undefined ?
                            <img className="w-100" src={image1} alt="img" />
                            : ""}

                        </div>
                        <div className="col-4 p-0 " id={product._id}>
                          <div className="h-75 " style={{ lineHeight: "0.99" }}>
                            <div
                              className="productName font-weight-bold mb-1 "
                              style={{ fontSize: "1.5rem" }}
                            >
                              {" "}
                              {language === "he"
                                ? product.hebrewName
                                : product.name}
                            </div>
                            <span className="productDetails" style={{ fontSize: "17px" }}>
                              {language === "he"
                                ? product.hebrewDetails
                                : product.details
                              }
                            </span>
                            <div
                              className="amountOption  pl-0 mt-1"
                              style={{ fontWeight: '600', fontSize: '17px' }}
                              id={product._id}
                            >
                              {product.priceList.length > 1 ?

                                <select id={product._id} onChange={changePrice}
                                  className="btn-pointer amountOption_select
                                                                        pl-0  form-select form-select-x-sm swithDir pb-0 pt-0 border-0 rounded-custom  font-weight-bold"
                                  aria-label=".form-select-sm example"
                                  style={{
                                    lineHeight: "1",
                                    fontSize: "16px",
                                    width: "fit-content",
                                    fontWeight: "600 !important",
                                  }}
                                >
                                  {/* <option value=" " disabled selected>
                                              {i18.t("selectAmount")}
                                            </option> */}
                                  {product.priceList.map((item) => (
                                    <option value={item.price}>
                                      {
                                        language === "he"
                                          ? item.amount && item.amount.hebrewName
                                          : item.amount && item.amount.name}
                                    </option>
                                  ))}


                                </select>
                                :

                                <div>{language === "he"
                                  ?
                                  product.priceList[0] && product.priceList[0].amount && product.priceList[0].amount.hebrewName
                                  :
                                  product.priceList[0] && product.priceList[0].amount && product.priceList[0].amount.name}</div>
                              }
                            </div>

                          </div>

                          <div
                            className="row d-flex align-items-end  h-25 pb-2 d-none errorSelect"
                            style={{ fontSize: "xx-small" }}
                          >
                            <h6 className="" style={{ color: "red" }}>
                              * יש לבחור כמות או אופציה
                            </h6>
                          </div>
                        </div>
                        <div className="col-1"></div>
                        <div className="col-4 px-1 h-100">
                          <div className="d-flex col-12 mx-0 px-0 align-items-end row justify-content-end h-50 mt-1">
                            <div className="col-5"></div>
                            <div className="price productPrice text-center font-weight-bold  goldColor p-0 mr-0 col-7 fontNumber mb-2">
                              <span id={`${product._id}price`}>{product.priceList[0] && product.priceList[0].price}</span>
                              &#8362;{" "}

                            </div>
                          </div>

                          <div className="d-flex align-items-end  row justify-content-end  h-50 pb-1 flex-nowrap">
                            <div
                              className="amountToBuy mx-2 goldColor d-flex  col-6 p-0  align-items-end"
                              style={{ width: "fit-content" }}
                            >
                              <span
                                className="plus "
                                onClick={() =>
                                  changeAmount(product._id, "plus")
                                }
                              >
                                +
                              </span>
                              <input
                                type="text"
                                // defaultValue="1"
                                value={1}
                                className=" text-black bg-white pt-0 pb-0  m-1 mt-2 input_number fontNumber gold-border"
                              />
                              <span
                                className="minus"
                                onClick={() =>
                                  changeAmount(product._id, "minus")
                                }
                              >
                                -
                              </span>
                            </div>

                            <div
                              onClick={() => AddToCart(product)}
                              className="addToCart col-5  bg-black text-white align-items-center d-flex h6  mb-0 px-4 mx-1 py-2 roundButton"
                              style={{
                                height: "fit-content",
                                width: "fit-content",
                              }}
                            >
                              {i18.t("addToCart")}
                              <div className=""></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ))}
              </div>

              {/* <div className='shabatMenu overflow-auto pb-3 sidColumn' style={{ height: '590px' }} onScroll={myFunction}> */}
              <div className="shabatMenu ">
                {categories &&
                  categories.map((category, index) => (
                    <>
                      <div
                        id={category.name}
                        onMouseEnter={() => hoverCategory(category._id, index)}
                      >
                        <div>
                          <div className="  w-100 categoryImage"

                            style={!category.picUrl || category.picUrl === undefined ? { backgroundImage: `url(${baseURL + "salads.png"})` } : { backgroundImage: `url(${baseURL + "" + category.picUrl})` }}
                          >
                            {/* <img
                              alt=""
                              className="h-100 w-100 row"
                              src={
                                category.name === "Salads"
                                  ? appetizers
                                  : category.name === "Appetizers"
                                    ? salads
                                    : category.name === "Desserts"
                                      ? desserts
                                      : category.name === "Bakery"
                                        ? bakery
                                        : salads
                              }
                            /> */}
                          </div>

                          <div className="d-flex align-items-center my-3 ">
                            <h1 className="font-weight-bold mb-0">
                              {language === "he"
                                ? category.hebrewName
                                : category.name}
                            </h1>
                          </div>
                        </div>

                        {Object.keys(category)
                          .filter((key) => key === "products")

                          .map((key, val) =>
                            category[key].map((product) => product.display && (

                              <>
                                <div
                                  className=" productLine w-100  row      justify-content-around   p-2 mb-4"
                                  id={product._id}
                                  style={{
                                    maxHeight: "150px",
                                    height: "118px",
                                  }}
                                >
                                  <div
                                    className="col-2  productPic addM d-flex align-items-center   "
                                    style={!product.img || product.img == undefined ? { backgroundImage: 'none' } : { backgroundImage: `url(${baseURL + "" + product.img})` }}

                                  >
                                    {product.recommended &&
                                      <div
                                        className=" ml-auto bg-gold d-flex  recommended   justify-content-center align-items-center"
                                        style={language === "he" ? { right: "0px" } : { left: "0px" }}
                                      >
                                        <p
                                          className="m-0 "
                                          style={{ fontSize: "0.6rem" }}
                                        >
                                          {i18.t("recommended")}
                                        </p>
                                      </div>
                                    }
                                    {product.outOfStock &&
                                      <div
                                        className=" ml-auto bg-black text-white outOfStock d-flex  justify-content-center align-items-center"
                                        style={language === "he" ? { right: "0px" } : { left: "0px" }}

                                      >
                                        <p
                                          className="m-0 "
                                          style={{ fontSize: "0.6rem" }}
                                        >
                                          {i18.t("outOfStock")}
                                        </p>
                                      </div>
                                    }
                                    {!product.img || product.img == undefined ?
                                      <img className="w-100" src={image1} alt="img" />
                                      : ""}
                                  </div>
                                  <div className="col-4 p-0 " id={product._id}>
                                    <div
                                      className="h-75 "
                                      style={{ lineHeight: "0.99" }}
                                    >
                                      <div
                                        className="productName font-weight-bold  mb-1"
                                        style={{ fontSize: "1.5rem" }}
                                      >
                                        {" "}
                                        {language === "he"
                                          ? product.hebrewName
                                          : product.name}
                                      </div>
                                      <span className="productDetails" style={{ fontSize: "18px" }}>
                                        {language === "he"
                                          ? product.hebrewDetails
                                          : product.details
                                        }
                                      </span>

                                      <div
                                        className="amountOption  pl-0  mt-1"
                                        style={{ fontWeight: '600', fontSize: '17px' }}
                                        id={product._id}
                                      >
                                        {product.priceList.length > 1 ?
                                          // selectAmountbasic
                                          <select id={product._id} onChange={changePrice}
                                            className="btn-pointer amountOption_select
                                                                        pl-0  form-select form-select-x-sm swithDir pb-0 pt-0 border-0 rounded-custom  font-weight-bold"
                                            aria-label=".form-select-sm example"
                                            style={{
                                              lineHeight: "1",
                                              fontSize: "16px",
                                              width: "fit-content",
                                              fontWeight: "600 !important",
                                            }}
                                          >
                                            {/* <option value=" " disabled selected>
                                              {i18.t("selectAmount")}
                                            </option> */}
                                            {product.priceList.map((item) => (
                                              <option value={item.price}>
                                                {
                                                  language === "he"
                                                    ? item.amount && item.amount.hebrewName
                                                    : item.amount && item.amount.name}
                                              </option>
                                            ))}


                                          </select>
                                          :

                                          <div>{
                                            language === "he"
                                              ? product.priceList[0] && product.priceList[0].amount && product.priceList[0].amount.hebrewName
                                              : product.priceList[0] && product.priceList[0].amount && product.priceList[0].amount.name

                                          }</div>
                                        }
                                      </div>

                                    </div>

                                    <div
                                      className="row d-flex align-items-end  h-25 pb-2 d-none errorSelect"
                                      style={{ fontSize: "xx-small" }}
                                    >
                                      <h6 className="" style={{ color: "red" }}>
                                        * יש לבחור כמות או אופציה
                                      </h6>
                                    </div>
                                  </div>
                                  <div className="col-1"></div>
                                  <div className="col-4 px-1 h-100">
                                    <div className="d-flex align-items-end col-12 mx-0 px-0 row justify-content-end h-50 mt-1">
                                      <div className="col-5"></div>
                                      <div className="price productPrice text-center font-weight-bold  goldColor p-0 mr-0 col-7 fontNumber  mb-2" >
                                        <span id={`${product._id}price`}>{product.priceList[0] && product.priceList[0].price}</span>
                                        &#8362;{" "}
                                      </div>
                                    </div>

                                    <div className="d-flex align-items-end  row justify-content-end  h-50 pb-1 flex-nowrap">
                                      <div
                                        className="amountToBuy mx-2 goldColor d-flex  col-6 p-0  align-items-end"
                                        style={{ width: "fit-content" }}
                                      >
                                        <span
                                          className="plus "
                                          onClick={() =>
                                            changeAmount(product._id, "plus")
                                          }
                                        >
                                          +
                                        </span>
                                        <input
                                          type="text"
                                          // defaultValue="1"
                                          value={1}
                                          className=" text-black bg-white pt-0 pb-0  m-1 mt-2 input_number fontNumber gold-border"
                                        />
                                        <span
                                          className="minus"
                                          onClick={() =>
                                            changeAmount(product._id, "minus")
                                          }
                                        >
                                          -
                                        </span>
                                      </div>

                                      <div
                                        onClick={() => AddToCart(product)}
                                        className="addToCart col-5  bg-black text-white align-items-center d-flex h6  mb-0 px-4 mx-1 py-2 roundButton"
                                        style={{
                                          height: "fit-content",
                                          width: "fit-content",
                                        }}
                                      >
                                        {i18.t("addToCart")}
                                        <div className=""></div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </>
                            ))
                          )}
                      </div>
                      <hr
                        className="goldColor mt-0 mb-2 w-100 row"
                        style={{ height: "2.5px", opacity: "1" }}
                      />
                    </>

                  ))}
              </div>
            </div>
          </div>
        )}

        {/* middle column */}

        {/* right column */}
        {!isMobile && !isTablet && (
          <StickyBox offsetTop={100} offsetBottom={20}>
            <div className=" px-0 mx-2">
              <div className="  px-1 sidColumn col-12">
                <div className=" mt-1 mb-3 actionSection col-12 p-0">
                  <div className="py-2 col-12 text-center font-weight-bold_ incrementFont">
                    {i18.t("hello")},{" "}
                    {currentUser ? (
                      <>
                        {/* <a className='px-2 text-black' onClick={() => props.history.push('/login')} href=""> התחבר </a> */}
                        {currentUser.email}

                        <div className="w-100 text-center mt-2">
                          <Button variant="link" onClick={handleLogout}>
                            Log Out
                          </Button>
                        </div>
                        {/* <button onClick={set_user} >click</button> */}
                      </>
                    ) : (
                      <>
                        <button
                          className="px-2 text-black bg-transparent font-weight-bold_ "
                          onClick={toggle}
                          style={{ textDecoration: "underline" }}
                        >
                          {" "}
                          {i18.t("connect")}{" "}
                        </button>
                      </>
                    )}
                  </div>

                  <div className="bg-gold py-3  text-white d-flex  justify-content-center incrementFont ">
                    <div className="mx-2 font-medium">
                      {i18.t("ShoppingCart")}
                    </div>
                    <div className="  ">
                      {" "}
                      (<span className="numItems mx-1">{numItems}</span>)
                    </div>
                  </div>

                  <div className="ShoppingCart_itemList  px-2 ">
                    <div className="d-flex w-100     justify-content-center ">
                      {" "}
                      {numItems === 0 ? (
                        <h6
                          className="addToCartMe py-2 px-3   my-5"
                          style={{ color: "gray" }}
                        >
                          {i18.t("addToCartMe")}

                          <img
                            alt=""
                            style={{ width: "15px" }}
                            src={"https://scoopcatering.co.il/images/cart.png"}
                          />

                          {/* <FontAwesomeIcon icon="fa-solid fa-cart-shopping" /> */}
                        </h6>
                      ) : (
                        <h6>{ }</h6>
                      )}
                    </div>
                    {cart &&
                      cart.map((item) => (
                        <div
                          className={`productItem d-flex py-2 ${side} ${item.Id}`}
                        >
                          <div className="col-10 px-1">
                            <div
                              className={`productName px-1 font-weight-bold ${align}`}
                            >
                              {" "}
                              {language === "he"
                                ? item.product.hebrewName
                                : item.product.name}
                            </div>
                            <div className=" d-flex  align-items-end justify-content-between">
                              <div
                                className="  p-0 amountToBuy  goldColor d-flex  p-0  align-items-end"
                                style={{ width: "fit-content" }}
                              >
                                <span
                                  className=" px-1 btn-pointer"
                                  onClick={() =>
                                    changeAmount(item.Id, "plusToCart")
                                  }
                                  style={{ fontSize: "25px", height: "27px" }}
                                >
                                  +
                                </span>
                                <input
                                  type="text"
                                  value={item.Amount}
                                  className=" text-black bg-white pt-0 pb-0    small_input_number fontNumber gold-border"
                                />
                                <span
                                  className=" px-1 btn-pointer"
                                  onClick={() =>
                                    changeAmount(
                                      item.Id,
                                      "minusToCart"
                                    )
                                  }
                                  style={{ fontSize: "25px", height: "27px" }}
                                >
                                  -
                                </span>
                              </div>

                              <div className="col-7 text-center p-0 price h6 mb-0 goldColor fontNumber">
                                {parseFloat(item.price).toFixed(2)} &#8362;{" "}
                              </div>
                            </div>
                          </div>
                          <div className="col-2 d-flex align-items-center justify-content-end">
                            <div
                              className="col-4 d-flex align-items-end btn-pointer"
                              onClick={() => deleteItem(item.Id)}
                            >
                              {" "}
                              <img
                                alt=""
                                style={{ width: "17px" }}
                                src={deleteIcom}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
                <div
                  className=" col-12 rounded-custom-small customShadow px-3 pb-3 mb-3 pt-2"
                  style={{ backgroundColor: "rgb(195, 153, 87, 0.16)" }}
                >
                  <h5 className="font-weight-bold ">{i18.t("moreOffers")}</h5>
                  <div
                    className={`productItem row justify-content-around    py-2 px-2 ${side} `}
                    style={{ borderBottom: "2px solid #ddd" }}
                  >
                    <div className="row d-flex  px-0">
                      <div className="product_Pic col-4 d-flex align-items-center px-2">
                        {/* <div className=' ml-auto bg-gold d-flex     justify-content-center align-items-center' style={{ width: '60%', height: '15px', position: 'absolute', top: 0, right: '1px' }}><p className='m-0 ' style={{ fontSize: '0.4rem' }}> {i18.t("recommended")}</p></div> */}

                        <img alt="" className=" w-100 " src={image1} />
                      </div>

                      <div className="col-8 px-2">
                        <div
                          className={`productName col-12  p-0  ${align} font-medium`}
                        >
                          {" "}
                          תבנית חד"פ
                        </div>
                        <div className="d-flex row justify-content-between  align-items-center">
                          <div
                            className="amountToBuy col-6 goldColor d-flex    align-items-center"
                            style={{ width: "fit-content" }}
                          >
                            <span
                              className="mt-2 btn-pointer"
                              onClick={() => changeAmount("plus")}
                              style={{ fontSize: "25px", height: "44px" }}
                            >
                              +
                            </span>
                            <input
                              type="text"
                              // defaultValue="1"
                              value={1}
                              className="AmountInput p-0 text-black bg-white    m-1 my-0 small_input_number fontNumber gold-border"
                            />
                            <span
                              className="mt-2 btn-pointer"
                              onClick={() => changeAmount("minus")}
                              style={{ fontSize: "25px", height: "44px" }}
                            >
                              -
                            </span>
                          </div>
                          <div className="col-6 price h6 mb-0 px-1   goldColor fontNumber">
                            {parseFloat(14.9).toFixed(2)} &#8362;{" "}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`productItem row justify-content-around    py-2 px-2 ${side} `}
                    style={{ borderBottom: "2px solid #ddd" }}
                  >
                    <div className="row d-flex px-0">
                      <div className="product_Pic col-4 d-flex align-items-center px-2">
                        {/* <div className=' ml-auto bg-gold d-flex     justify-content-center align-items-center' style={{ width: '60%', height: '15px', position: 'absolute', top: 0, right: '1px' }}><p className='m-0 ' style={{ fontSize: '0.4rem' }}> {i18.t("recommended")}</p></div> */}

                        <img alt="" className=" w-100 " src={image1} />
                      </div>

                      <div className="col-8 px-2">
                        <div
                          className={`productName col-12  p-0  ${align} font-medium`}
                        >
                          {" "}
                          תבנית חד"פ
                        </div>
                        <div className="d-flex row justify-content-between  align-items-center">
                          <div
                            className="amountToBuy col-6 goldColor d-flex    align-items-center"
                            style={{ width: "fit-content" }}
                          >
                            <span
                              className="mt-2 btn-pointer"
                              onClick={() => changeAmount("plus")}
                              style={{ fontSize: "25px", height: "44px" }}
                            >
                              +
                            </span>
                            <input
                              type="text"
                              // defaultValue="1"
                              value={1}
                              className="AmountInput p-0 text-black bg-white    m-1 my-0 small_input_number fontNumber gold-border"
                            />
                            <span
                              className="mt-2 btn-pointer"
                              onClick={() => changeAmount("minus")}
                              style={{ fontSize: "25px", height: "44px" }}
                            >
                              -
                            </span>
                          </div>
                          <div className="col-6 price h6 mb-0 px-1   goldColor fontNumber">
                            {parseFloat(14.9).toFixed(2)} &#8362;{" "}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`productItem row justify-content-around    py-2 px-2 ${side} `}
                  >
                    <div className="row d-flex px-0">
                      <div className="product_Pic col-4 d-flex align-items-center px-2">
                        {/* <div className=' ml-auto bg-gold d-flex justify-content-center align-items-center' style={{ width: '60%', height: '15px', position: 'absolute', top: 0, right: '1px' }}><p className='m-0 ' style={{ fontSize: '0.4rem' }}> {i18.t("recommended")}</p></div> */}

                        <img alt="" className=" w-100 " src={image1} />
                      </div>

                      <div className="col-8 px-2">
                        <div
                          className={`productName col-12  p-0  ${align} font-medium`}
                        >
                          {" "}
                          תבנית חד"פ
                        </div>
                        <div className="d-flex row justify-content-between  align-items-center">
                          <div
                            className="amountToBuy col-6 goldColor d-flex    align-items-center"
                            style={{ width: "fit-content" }}
                          >
                            <span
                              className="mt-2 btn-pointer"
                              onClick={() => changeAmount("plus")}
                              style={{ fontSize: "25px", height: "44px" }}
                            >
                              +
                            </span>
                            <input
                              type="text"
                              // defaultValue="1"
                              value={1}
                              className="AmountInput p-0 text-black bg-white    m-1 my-0 small_input_number fontNumber gold-border"
                            />
                            <span
                              className="mt-2 btn-pointer"
                              onClick={() => changeAmount("minus")}
                              style={{ fontSize: "25px", height: "44px" }}
                            >
                              -
                            </span>
                          </div>
                          <div className="col-6 price h6 mb-0 px-1   goldColor fontNumber">
                            {parseFloat(14.9).toFixed(2)} &#8362;{" "}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="  col-12 rounded-custom-small customShadow px-4 py-2 mb-3">
                  <div className=" text-center">
                    {" "}
                    <label className="font-medium ">
                      {i18.t("orderComment")}{" "}
                    </label>
                  </div>
                  <div className="d-flex col-12 align-items-end p-0">
                    <img
                      alt=""
                      className="mx-1"
                      style={{ width: "15px", maxHeight: "15px" }}
                      src={commentIcon}
                    />
                    <textarea
                      id="orderComment"
                      className="  m-auto w94    customTextarea "
                      rows={1}
                      maxLength="250"
                      ng-trim="false"
                    ></textarea>
                  </div>
                </div>

                <div className="rounded-custom-small customShadow  col-12 p-0">
                  <div
                    className="d-flex   pt-3 pb-2 px-2"
                    style={{
                      backgroundColor: "rgb(195, 153, 87, 0.5)",
                      borderRadius: "10px 10px 0px 0px",
                    }}
                  >
                    <div className="col-7 swithSide font-medium px-2">
                      {" "}
                      {i18.t("TotalProducts")}:
                    </div>
                    <div className={language == "he" ? "col-5 text-start numItems  font-weight-bold" : "col-5 text-end numItems  font-weight-bold"}>
                      {numItems}
                    </div>
                  </div>
                  <div className="d-flex mb-5  pt-3 pb-2 px-2">
                    <div className="col-5 swithSide font-medium px-2">
                      {i18.t("Total")}:
                    </div>
                    <div className={language == "he" ? "col-7 text-start numItems  font-weight-bold " : "col-7 text-end numItems  font-weight-bold "}>
                      &#8362; {parseFloat(total).toFixed(2)}
                    </div>
                  </div>
                </div>

                <button
                  className=" d-flex     justify-content-center
                  align-items-center col-12 actionSection rounded-custom-small
                                 customShadow  px-3 py-2 ml-0 w-100 goldButtonShop"
                  onClick={() => goToCheckout()}
                >
                  <div> {i18.t("continueToPayment")}{" "}</div>
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
          </StickyBox>
        )}
      </div>
    </div>
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
    currentUser_: state.userReducer.currentUser_,
  };
};
const mapDispatchToProps = (dispatch) => ({
  getAllProducts: () => dispatch(actions.getAllProducts()),
  getAllCategories: () => dispatch(actions.getAllCategories()),
  setCartRedux: (x) => dispatch(actions.setCartRedux(x)),
  setNumItemsRedux: (x) => dispatch(actions.setNumItemsRedux(x)),
  setTotalRedux: (Total) => dispatch(actions.setTotalRedux(Total)),
  setUser: (user) => dispatch(actions.setUser(user)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ShabbatMenu);
// export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProductList))
