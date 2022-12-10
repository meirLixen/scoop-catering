import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";

import { connect } from "react-redux";
import "../../App.css";
import Footer from "../mainPage/Footer";
import UnderFooter from "../mainPage/UnderFooter";

import $ from "jquery";
import useMediaQuery from "../../hooks/useMediaQuery";
import i18 from "../../i18/i18";
import Hamborger from "../mainPage/Hamborger/Hamborger";
import TopPageDesktop from "../mainPage/TopPageDesktop";

export function RelatedProducts(props) {
  const isMobile = useMediaQuery(768);
  const isTablet = useMediaQuery(1024);

  const { products } = props;

  useEffect(() => {
    if ($) {
    }
  }, []);
  return (
    <>
      <div className="pageNuv">
        {isTablet && <Hamborger history={props.history} />}

        {!isMobile && !isTablet && <TopPageDesktop />}
      </div>

      <div className="pageHeader">
        <label> מוצרים נלווים </label>
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

      <div className="pageContent pt-3">
        <div
          className="location "
          style={{ right: "50px", position: "absolute" }}
        >
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
            תפריט שבת{" "}
          </div>
          <div className="goldColor d-inline">/מוצרים נלווים </div>
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
    products: state.productReducer.products,
    searchWord: state.searchWordReducer.searchWord,
  };
};

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(RelatedProducts));
