import React, { useEffect } from "react";
import { connect } from "react-redux";

import Footer from "../../mainPage/Footer";
import UnderFooter from "../../mainPage/UnderFooter";
import "./ourStory.css";

// import { Form, FormControl, Nav, Button, NavDropdown, Image } from "react-bootstrap";

import useMediaQuery from "../../../hooks/useMediaQuery";
import Hamborger from "../../mainPage/Hamborger/Hamborger";
import TopPageDesktop from "../../mainPage/TopPageDesktop";
import $ from "jquery";
import i18 from "../../../i18/i18";
import { useTranslation } from 'react-i18next';
function OurStory(props) {
  const { t, i18n } = useTranslation();
  const isMobile = useMediaQuery(768);
  const isTablet = useMediaQuery(1024);
  useEffect(() => {
    if ($) {
      $("#navbarScrollingDropdown").addClass("active");
    }
  }, [$]);

  return (
    <div className="ourStoryPage">
      <div className="pageNuv">
        {isTablet && <Hamborger history={props.history} />}

        {!isMobile && !isTablet && <TopPageDesktop />}
      </div>

      <div className="pageHeader">
        <label>{i18.t("OurStory")}</label>
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
        {/* <img className="h-100 w-100" src={'https://scoopcatering.co.il/images/headerBgImag.png'} /> */}
      </div>

      <div className="location pt-3 text-end px-5">
        <div
          className="d-inline btn-pointer"
          onClick={() => props.history.push("/")}
        >
          {i18.t("ScoopCatering")}
        </div>
        {/* <div className='d-inline'>  </div> */}
        <div className="goldColor d-inline"> /{i18.t("OurStory")} </div>
      </div>
      <div className="PageContent mb-5">
        <div className="d-flex justify-content-center mt-3">
          <div className="theContent  mt-5 pt-5 mb-5 ">
            <h3 className="Title mb-3 font-weight-bold">
              {i18.t("ourStoryLable1")}
            </h3>
            <hr
              className=" mb-5 goldColor"
              style={{
                width: "6%",
                height: "2px",
                opacity: "1",
                marginLeft: "49%",
              }}
            ></hr>
            <span className="swithSide ">
              <p className=" mb-0">
                {i18.t("ScoopCatering")} {i18.t("ourStoryTitle1")}
              </p>
              <p className=" mb-0">{i18.t("ourStoryTitle2")}</p>
              <p className=" mb-0">
                {i18.t("ourStoryTitle3")} {i18.t("ScoopCatering")}{" "}
              </p>
              <p className=" mb-0">{i18.t("ourStoryTitle4")}</p>
              <p className=" ">{i18.t("ourStoryTitle5")}</p>

              <p className="">{i18.t("ourStoryTitle6")}</p>
            </span>
            <h3 className="Title mb-3 font-weight-bold mt-5">
              {" "}
              {i18.t("ourStoryLable2")}
            </h3>
            <hr
              className="m-auto mb-5 goldColor"
              style={{ width: "6%", height: "2px", opacity: "1" }}
            ></hr>
            <div className="row d-flex justify-content-center mb-5">
              <div className="col-md-3 teamItem d-flex  align-items-center flex-column mt-5">
                <img
                  alt=""
                  src="/static/media/profile.2f77ba72.png"
                  className="rounded-circle goldBorder w-75"
                />
                <div className="workerName h4 font-weight-bold ">
                  {" "}
                  מייקל סמייגל
                </div>
                <div className="role x-smallFont  ">בתחום ההסעדה 25 שנה </div>
                <div
                  className="role x-smallFont   font-weight-bold mb-4"
                  style={{ lineHeight: "1" }}
                >
                  .אחראי אירועי חוץ ומוסדות
                </div>
                <hr className="hrS m-0 " style={{ opacity: "1" }} />
                <button className="border-0 bg-transparent readMore x-smallFont goldColor font-weight-bold">
                  מוטו לחיים
                </button>
                <div className="role x-smallFont  " style={{ lineHeight: "1" }}>
                  !שירות טוב פירושו, שבאמת אכפת לך
                </div>
              </div>
              <div className="col-md-3 teamItem d-flex  align-items-center flex-column mt-5">
                <img
                  alt=""
                  src="/static/media/profile.2f77ba72.png"
                  className="rounded-circle goldBorder w-75"
                />
                <div className="workerName h4 font-weight-bold ">
                  {" "}
                  אריה בן חמו{" "}
                </div>
                <div className="role x-smallFont  ">בתחום ההסעדה מגיל 16 </div>
                <div
                  className="role x-smallFont   font-weight-bold mb-4"
                  style={{ lineHeight: "1" }}
                >
                  .מנהל תפעול ולוגיסטיקה{" "}
                </div>
                <hr className="hrS m-0 " style={{ opacity: "1" }} />
                <button className="border-0 bg-transparent readMore x-smallFont goldColor font-weight-bold">
                  מוטו לחיים
                </button>
                <div className="role x-smallFont " style={{ lineHeight: "1" }}>
                  .החיים הם כמו סיר, התבשיל שייצא תלוי בעיקר באיכות חומרי הגלם
                  שתכניס
                </div>
              </div>
              <div className="col-md-3 teamItem d-flex  align-items-center flex-column mt-5">
                <img
                  alt=""
                  src="/static/media/profile.2f77ba72.png"
                  className="rounded-circle goldBorder w-75"
                />
                <div className="workerName h4 font-weight-bold ">
                  {" "}
                  גרי שיקמן{" "}
                </div>
                <div className="role x-smallFont  ">בתחום ההסעדה מ 2007</div>
                <div
                  className="role x-smallFont   font-weight-bold mb-2"
                  style={{ lineHeight: "1" }}
                >
                  .מנהל אירועים ואחראי קשרי לקוחות
                </div>
                <hr className="hrS m-0 " style={{ opacity: "1" }} />
                <button className="border-0 bg-transparent readMore x-smallFont goldColor font-weight-bold">
                  מוטו לחיים
                </button>
                <div className="role x-smallFont  " style={{ lineHeight: "1" }}>
                  החיוך נותן לאוכל את טעמו הערב יותר{" "}
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
  return {};
};

const mapDispatchToProps = (dispatch) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(OurStory);
