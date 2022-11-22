import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";

import "../../App.css";
import { connect } from "react-redux";
import { actions } from "../../redux/actions/action";
// import Search from '../Search';
import Footer from "../mainPage/Footer";
import UnderFooter from "../mainPage/UnderFooter";

import useMediaQuery from "../../hooks/useMediaQuery";
import Hamborger from "../mainPage/Hamborger/Hamborger";
import TopPageDesktop from "../mainPage/TopPageDesktop";
import Scroll from "../Scroll";
import SearchList from "../SearchList";
import $ from "jquery";
import i18 from "../../i18/i18";

export function SearchResults(props) {
  const { language } = props;
  const isMobile = useMediaQuery(768);
  const isTablet = useMediaQuery(1024);

  if (!props.products || !props.products.length) {
     props.getAllProducts()
  }

  const { products } = props;
  const { searchWord } = props;

  // const searchField = urlArray[urlArray.length - 1]
  const filteredProducts =
    products &&
    products.filter((product) => {
      if (language !== "he")
        return (
          product &&
          product.name.toLowerCase().includes(searchWord.toLowerCase())
        );
      else
        return (
          product &&
          product.hebrewName.toLowerCase().includes(searchWord.toLowerCase())
        );
    });
  function searchList() {
    return (
      <Scroll>
        <SearchList filteredProducts={filteredProducts} lang={language} />
      </Scroll>
    );
  }
  useEffect(() => {
    if ($) {
    }
  }, [language]);
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
          {i18.t("SearchResults")}{" "}
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
            className="h-100"
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
      <div className="location pt-3 text-end px-5">
        <div
          className="d-inline btn-pointer"
          onClick={() => props.history.push("/")}
        >
          {i18.t("ScoopCatering")}
        </div>
        <div className="goldColor d-inline btn-pointer">
          {" "}
          / {i18.t("SearchResults")}{" "}
        </div>
      </div>
      <button
        className="goldButton h5 p-2 mt-5"
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
      <div className="pageContent pt-3">{searchList()}</div>
      {/* <button className='bg-black text-white border mb-5 p-2 mt-5'> <i className="fas fa-long-arrow-alt-left  " style={{ height: 'fit-content' }} ></i> לכל המוצרים</button> */}
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
    searchWord: state.searchWordReducer.searchWord,
    language: state.languageReducer.language,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getAllProducts: () => dispatch(actions.getAllProducts()),
  setSearchWord: (word) => dispatch(actions.setSearchWord(word)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SearchResults));
