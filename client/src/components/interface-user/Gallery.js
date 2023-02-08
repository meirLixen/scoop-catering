import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import "../../App.css";
import { connect } from "react-redux";
import Footer from "../mainPage/Footer";
import UnderFooter from "../mainPage/UnderFooter";

import useMediaQuery from "../../hooks/useMediaQuery";
import Hamborger from "../mainPage/Hamborger/Hamborger";
import TopPageDesktop from "../mainPage/TopPageDesktop";
import $ from "jquery";
import i18 from "../../i18/i18";
import { useTranslation } from 'react-i18next';
export function Gallery(props) {
  const { t, i18n } = useTranslation();
  const isMobile = useMediaQuery(768);
  const isTablet = useMediaQuery(1024);

  useEffect(() => {
    if ($) {
      $("#gallery").addClass("active");
    }
  }, []);
  return (
    <>
      <div className="pageNuv">
        {isTablet && <Hamborger history={props.history} />}

        {!isMobile && !isTablet && <TopPageDesktop />}
      </div>

      <div className="pageHeader">
        <label>{i18.t("gallery")} </label>
        {isTablet ? (
          <img
            alt=""
            className="h-100 "
            src={"https://scoopcatering.co.il/images/backgrounds/headerBgImag.png"}
          />
        ) : (
          <img
            alt=""
            className="h-100 w-100"
            src={"https://scoopcatering.co.il/images/backgrounds/headerBgImag.png"}
          />
        )}
      </div>

      <div className="pageContent ">
        <div className="bg-black " style={{ height: "70vh" }}>
          <div className="location pt-3 text-end px-5">
            <div
              className="d-inline text-white btn-pointer"
              onClick={() => props.history.push("/")}
            >
              {i18.t("ScoopCatering")}
            </div>
            <div className="goldColor d-inline"> /{i18.t("gallery")} </div>
          </div>

          <h1 className="text-white mt-5 pt-5">{i18.t("soon")}</h1>
        </div>
      </div>

      <div className="PageFooter ">
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Gallery));
