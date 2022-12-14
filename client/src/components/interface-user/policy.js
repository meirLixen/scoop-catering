import React, { useEffect } from "react";

import "../../App.css";
import { connect } from "react-redux";

import Footer from "../mainPage/Footer";
import UnderFooter from "../mainPage/UnderFooter";

import bneiAkivaImage from "../../data/imges/bneiAkivaImage.png";
import taglitImage from "../../data/imges/taglitImage.png";
import { Image } from "react-bootstrap";

import $ from "jquery";
import useMediaQuery from "../../hooks/useMediaQuery";

import Hamborger from "../mainPage/Hamborger/Hamborger";
import TopPageDesktop from "../mainPage/TopPageDesktop";
import i18 from "../../i18/i18";
import { useTranslation } from 'react-i18next';

export function Policy(props) {
  const { t, i18n } = useTranslation();
  const isMobile = useMediaQuery(768);
  const isTablet = useMediaQuery(1024);
  useEffect(() => {
    if ($) {
      $("#navbarScrollingDropdown").addClass("active");
    }
  }, []);

  return (
    <div
      style={{
        height: "780px",
        width: "100vw",
      }}
    >
      <div className="pageNuv">
        {isTablet && <Hamborger history={props.history} />}

        {!isMobile && !isTablet && <TopPageDesktop />}
      </div>

      <div className="pageHeader">
        <label> {i18.t("Policy")} </label>
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
        {/* <img className="h-100 w-100" src={'https://scoopcatering.co.il/images/headerBgImag.png'} /> */}
      </div>

      <section className="" style={{ height: "100%" }}>
        <div className="location pt-3 text-end px-5">
          <div
            className="d-inline btn-pointer"
            onClick={() => props.history.push("/")}
          >
            {i18.t("ScoopCatering")}
          </div>
          {/* <div className='d-inline'>  </div> */}
          <div className="goldColor d-inline"> /{i18.t("Policy")} </div>
        </div>
<div>
    
</div>
      </section>

      <Footer />
      <UnderFooter />
    </div>
  );
}
const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(Policy);
