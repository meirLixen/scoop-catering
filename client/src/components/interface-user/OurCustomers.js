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

export function OurCustomers(props) {
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
        <label> {i18.t("OurCustomers")} </label>
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
        {/* <img className="h-100 w-100" src={'https://scoopcatering.co.il/headerBgImag.png'} /> */}
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
          <div className="goldColor d-inline"> /{i18.t("OurCustomers")} </div>
        </div>

        <div className="OurPeekscontent flex-column ">
          <div className="titel pt-5 mt-5">
            <h1 className="font-weight-bold mb-0">
              {i18.t("OurCustomersLable")}
            </h1>
          </div>
          <hr className="hrStyle " style={{ width: "6%" }} />

          <div className="teamList d-flex  flex-column mt-4">
            <div className="row mb-1 d-flex justify-content-around ">
              <Image className="col-md-3 customerItem mr-3" src={taglitImage} />

              <div className="col-md-3  d-flex  align-items-center flex-column customerItem mr-3 x-smallFont justify-content-center font-weight-bold">
                לוגו בנגיעה מתהפך ורואים את הטקסט הארוך
              </div>
              <div
                className="col-md-3  d-flex justify-content-center flex-column customerItem goldbgColor text-end"
                style={{ fontSize: "11px" }}
              >
                <span className="font-weight-bold mb-2">
                  קליבר - בי"ס לאבטחה
                </span>
                <span>
                  {" "}
                  "ניהול בי"ס ירי המחנך דורות של אנשי ביטחון, מחייב עמידה
                  בסטנדרטים גבוהים ביותר, ודיוק מרבי בזמנים. השירות והרמה הגבוהה
                  של סקופ קייטרינג תורמת לנו ליכולת הזו. תודה על שנים של שיתוף
                  פעולה. רן סופר - מנכ"ל
                </span>
              </div>
            </div>
            <div className="row mb-3 d-flex justify-content-around ">
              <div className="col-md-3  d-flex  align-items-center flex-column   x-smallFont mr-3 font-weight-bold">
                מסע תגלית
              </div>
              <div className="col-md-3  d-flex  align-items-center flex-column "></div>
              <div className="col-md-3  d-flex  align-items-center flex-column "></div>
            </div>
            <div className="row mb-1 d-flex justify-content-around mt-3 ">
              <Image
                className="col-md-3 customerItem mr-3"
                src={bneiAkivaImage}
              />
              <Image
                className="col-md-3 customerItem mr-3"
                src={bneiAkivaImage}
              />
              <div
                className="col-md-3  d-flex  justify-content-center flex-column customerItem text-end "
                style={{ backgroundColor: "#CCCCCC", fontSize: "11px" }}
              >
                <span className="font-weight-bold mb-2">
                  אל"יי – אשנב לשיח יהודי ישראלי
                </span>
                <span>
                  {" "}
                  לפני שהכרנו את סקופ קייטרינג, כל פריסת שטח הייתה מלווה
                  בלוגיסטיקה מורכבת והמון כאב ראש. דבר שפגע לפעמים בפעילות. היום
                  חזרנו ליהנות שוב מהפעילות עצמה, כשאת כל היתר אנחנו משאירים
                  לחברה מסקופ.
                </span>
              </div>
            </div>
            <div className="row mb-3 d-flex justify-content-around ">
              <div className="col-md-3  d-flex  align-items-center flex-column x-smallFont font-weight-bold mr-3">
                {" "}
                בני עקיבא העולמית
              </div>
              <div className="col-md-3  d-flex  align-items-center flex-column x-smallFont font-weight-bold mr-3">
                בני עקיבא TVA
              </div>
              <div className="col-md-3  d-flex  align-items-center flex-column ">
                {" "}
              </div>
            </div>
          </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(OurCustomers);
