import React, { useEffect } from "react";
// import { Card, Button, Alert } from "react-bootstrap"

import { connect } from "react-redux";
import background_image from "../data/imges/EventsImage_.png";
import Footer from "./mainPage/Footer";
import Section from "./mainPage/Section";
import UnderFooter from "./mainPage/UnderFooter";

import $ from "jquery";
import { withRouter } from "react-router-dom";
import blog1 from "../data/imges/blog1.png";
import blog2 from "../data/imges/blog2.png";
import blog3 from "../data/imges/blog3.png";
import img3 from "../data/imges/img3.png";
import img1 from "../data/imges/imgG.png";
import Rectangle from "../data/imges/Rectangle.jpg";

import { Row } from "react-grid-system";
import useMediaQuery from "../hooks/useMediaQuery";
import i18 from "../i18/i18";
import Hamborger from "./mainPage/Hamborger/Hamborger";
import TopPageDesktop from "./mainPage/TopPageDesktop";

export function Home(props) {
  const isMobile = useMediaQuery(768);
  const isTablet = useMediaQuery(1024);
  const { language } = props;
  const { categories } = props;

  useEffect(() => {
    if ($) {
      $(".categoryHover").mouseover(function () {
        $(this).find(".categoryTitle").removeClass("d-none");
      });
      $(".categoryHover").mouseout(function () {
        $(this).find(".categoryTitle").addClass("d-none");
      });
    }
    const secondInputSlide = document.getElementById("secondinput");

    secondInputSlide.oninput = () => {
      secondInputSlide.style.background = `linear-gradient(to right, #FFFFFF 0%, #A38047 ${secondInputSlide.value}%, #A38047 ${secondInputSlide.value}%, #FFFFFF 100%)`;
    };
  }, [props, language]);
  return (
    <>
      <div
        style={{
          height: "700px",
          width: "100vw",
        }}
      >
        <div
          className=""
          style={{
            backgroundImage: `url(${background_image})`,
            width: "100%",
            height: "100%",
            // backgroundColor: 'black',
            // backgroundPosition: 'center',
            // backgroundSize: 'cover'
          }}
        >
          {/* <img className='w-100 h-100' src={background_image}/> */}
          <div>
            {isTablet && <Hamborger history={props.history} />}

            {!isMobile && !isTablet && (
              <>
                <div>
                  <TopPageDesktop className="position-sticky" />
                </div>
              </>
            )}

            <Section className="sectionOne homeBg" style={{}} />
            <div className="sectionTwo text-center bg-black">
              <Row>
                <div
                  className=" border-bottom-0 col-md-3  col-sm-12 d-flex justify-content-center align-items-center flex-column"
                  style={{
                    height: "400px",
                    border: "2px solid #C69A51",

                    backgroundColor: "#111111",
                  }}
                >
                  <div
                    className=" font-weight-bold whiteColor w-50"
                    style={{ lineHeight: "1.1", fontSize: "240%" }}
                  >
                    {" "}
                    {i18.t("Galleries")}
                  </div>
                  <hr
                    className="font-weight-bold whiteColor mt-4"
                    style={{ width: "10%", height: "5px", opacity: "1" }}
                  ></hr>
                </div>

                <div
                  className=" col-md-6 col-sm-12 zoomBOut p-0"
                  onClick={() => props.history.push("/shop")}
                >
                  <div className=" zoomBIn d-flex align-items-center flex-column  justify-content-center">
                    <div className="textHide">
                      <div
                        className="h1 font-weight-bold whiteColor w-75 m-auto mb-4"
                        style={{ fontSize: "240%", lineHeight: "1.1" }}
                      >
                        {i18.t("FoodReadyToShabat")}
                      </div>
                      <hr
                        className="font-weight-bold whiteColor m-auto"
                        style={{ width: "20%", height: "5px", opacity: "1" }}
                      ></hr>
                    </div>
                  </div>
                </div>

                <div
                  className=" col-md-3 col-sm-12 d-flex justify-content-center align-items-center flex-column"
                  style={{
                    height: "400px",
                    border: "2px solid #C69A51",
                    opacity: "1",
                    backgroundColor: "#C69A51",
                  }}
                >
                  <div
                    className="h1 font-weight-bold w-50  whiteColor "
                    style={{ lineHeight: "1.1", fontSize: "240%" }}
                  >
                    {i18.t("MenusForEvents")}
                  </div>

                  <hr
                    className="font-weight-bold whiteColor"
                    style={{ width: "12%", height: "5px", opacity: "1" }}
                  ></hr>
                </div>
              </Row>

              <h1 className="text-white mt-5 font-weight-bold">
                {i18.t("FoodReadyToShabat")}
              </h1>
              <hr
                className="font-weight-bold goldColor m-auto"
                style={{ width: "5rem", height: "5px", opacity: "1" }}
              ></hr>
              <h6 className="text-white mt-4 mb-4">
                {" "}
                {i18.t("homePageTitel2")}
              </h6>

              <div className="foodCategories">
                <div className="container col-md-10 mb-3">
                  <div className="row">
                    {categories &&
                      categories.length &&
                      categories.map((category, index) => (
                        <>
                          {index < 4 ? (
                            <div
                              className="categoryItem  col-xs-6 col-sm-4 col-md-3 item-audio  rounded  mb-3"
                              style={{ height: "300px" }}
                            >
                              <div
                                className="categoryHover"
                                onClick={() =>
                                  props.history.push(
                                    `/shop/${
                                      language === "he"
                                        ? category.hebrewName
                                        : category.name
                                    }`
                                  )
                                }
                              >
                                <div className=" d-flex  categoryTitle d-none  p-3">
                                  <h5 className=" font-weight-bold mb-0">
                                    {language === "he"
                                      ? category.hebrewName
                                      : category.name}
                                  </h5>
                                  {/* <div className="row d-flex swithDir  ">
                                                            <h6 className="col-2 mb-0 p-0">{category.products.length}</h6>
                                                            <h6 className="mb-0 col-2 p-0"></h6>
                                                            <h6 className="mb-0 col-7 p-0 mr-1">{i18.t('products')}</h6>
                                                        </div> */}
                                </div>
                              </div>
                              <img
                                alt=""
                                className="h-100 w-100"
                                src={
                                  "https://scoopcatering.co.il/" +
                                  category.picUrl
                                }
                              />
                            </div>
                          ) : (
                            ""
                          )}
                        </>
                      ))}
                  </div>
                </div>
              </div>
              <button
                className="bg-black text-white border mb-5 "
                onClick={() => props.history.push("/shop")}
              >
                {" "}
                <i
                  className="fas fa-long-arrow-alt-left mr-2 "
                  style={{ height: "fit-content" }}
                ></i>
                {language === "he" ? "לתפריט שבת המלא" : "Full Shabbat Menu"}
              </button>

              <div className="row justify-content-center mt-3  ">
                <div className="col-md-10 col-sm-12 col-xs-12  row d-flex justify-content-between">
                  <div className="  col-md-7 col-sm-12 mb-3 p-0">
                    <div className="d-flex justify-content-center   align-items-center">
                      {/* <div className="text-dark border border-dark pl-4  pr-4 pb-2  pt-2 h4 font-weight-bold position-absolute" >תפריט מומלץ</div> */}
                      <img alt="" className="w-100 h-100" src={img1} />
                    </div>
                  </div>

                  <div className=" col-md-5 col-sm-12 d-flex justify-content-center  flex-column align-items-end px-4">
                    <div
                      className="font-weight-bold h1 mb-0"
                      style={{ color: "#A38047" }}
                    >
                      {" "}
                      ? מתכנן אירוע{" "}
                    </div>
                    <hr
                      className="font-weight-bold goldColor "
                      style={{ width: "8%", height: "5px", opacity: "1" }}
                    ></hr>

                    <p className="mt-2  text-end" style={{ color: "white" }}>
                      לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית להאמית
                      קרהשק סכעיט דז מא, מנכם למטכין נשואי מנורךגולר מונפרר
                      סוברט לורם שבצק יהול, לכנוץ בעריר גק ליץ, ושבעגט. קוואזי
                      במר מודוף. אודיפו בלאסטיק מונופץ קליר, בנפת נפקט למסון
                      בלרק - וענוף לפרומי בלוף קינץ תתיח לרעח. לת צשחמי צש בליא,
                      מנסוטו צמלח לביקו ננבי, צמוקו
                    </p>
                  </div>
                </div>
              </div>

              <div className="row justify-content-center mt-3  ">
                <div className="col-md-10 col-sm-12  row d-flex justify-content-between">
                  {isTablet && (
                    <>
                      <div className="  col-md-7 col-sm-12 mb-3 p-0">
                        <div className="d-flex justify-content-center   align-items-center">
                          {/* <div className="text-dark border border-dark pl-4  pr-4 pb-2  pt-2 h4 font-weight-bold position-absolute" >תפריט מומלץ</div> */}
                          <img alt="" className="w-100 h-100" src={img3} />
                        </div>
                      </div>

                      <div className=" px-4 col-md-5 col-sm-12 d-flex justify-content-center  flex-column align-items-end ">
                        <div
                          className="font-weight-bold h1"
                          style={{ color: "#A38047" }}
                        >
                          {" "}
                          ?מארגנים טיול לעובדים
                        </div>
                        <hr
                          className="font-weight-bold goldColor "
                          style={{ width: "8%", height: "5px", opacity: "1" }}
                        ></hr>

                        <p
                          className="mt-2  text-end"
                          style={{ color: "white" }}
                        >
                          לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית
                          להאמית קרהשק סכעיט דז מא, מנכם למטכין נשואי מנורךגולר
                          מונפרר סוברט לורם שבצק יהול, לכנוץ בעריר גק ליץ,
                          ושבעגט. קוואזי במר מודוף. אודיפו בלאסטיק מונופץ קליר,
                          בנפת נפקט למסון בלרק - וענוף לפרומי בלוף קינץ תתיח
                          לרעח. לת צשחמי צש בליא, מנסוטו צמלח לביקו ננבי, צמוקו
                        </p>
                      </div>
                    </>
                  )}

                  {!isMobile && !isTablet && (
                    <>
                      <div className=" px-4 col-md-5 col-sm-12 d-flex justify-content-center  flex-column align-items-end ">
                        <div
                          className="font-weight-bold h1"
                          style={{ color: "#A38047" }}
                        >
                          {" "}
                          ?מארגנים טיול לעובדים
                        </div>
                        <hr
                          className="font-weight-bold goldColor "
                          style={{ width: "8%", height: "5px", opacity: "1" }}
                        ></hr>

                        <p
                          className="mt-2  text-end"
                          style={{ color: "white" }}
                        >
                          לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית
                          להאמית קרהשק סכעיט דז מא, מנכם למטכין נשואי מנורךגולר
                          מונפרר סוברט לורם שבצק יהול, לכנוץ בעריר גק ליץ,
                          ושבעגט. קוואזי במר מודוף. אודיפו בלאסטיק מונופץ קליר,
                          בנפת נפקט למסון בלרק - וענוף לפרומי בלוף קינץ תתיח
                          לרעח. לת צשחמי צש בליא, מנסוטו צמלח לביקו ננבי, צמוקו
                        </p>
                      </div>
                      <div className="  col-md-7 col-sm-12 mb-3 p-0">
                        <div className="d-flex justify-content-center   align-items-center">
                          {/* <div className="text-dark border border-dark pl-4  pr-4 pb-2  pt-2 h4 font-weight-bold position-absolute" >תפריט מומלץ</div> */}
                          <img alt="" className="w-100 h-100" src={img3} />
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* <div className="sectionThree whiteColor " style={{ backgroundImage: `url(${Rectangle})`, height: "100%", width: '100%', paddingTop: '2%' }}> */}
            <div
              className="sectionThree text-center whiteColor "
              style={{
                backgroundImage: `url(${Rectangle})`,
                height: "100%",
                width: "100%",
              }}
            >
              {/* <div className="partOfSectionTwo  pb-2" style={{ paddingTop: '5%' }}> */}
              <div className="partOfSectionTwo  pb-2">
                <div className="h1 font-weight-bold pt-4 whiteColor">
                  {" "}
                  מתאימים לך אירוע אישית
                </div>
                <hr
                  className="font-weight-bold goldColor m-auto mb-5 mt-3"
                  style={{ width: "5rem", height: "5px", opacity: "1" }}
                ></hr>
                <div className="h4 mb-0 pb-5 whiteColor">
                  {" "}
                  אירוע מושלם בסקופ, בדיוק לפי הנקודה המתאימה לך{" "}
                </div>
              </div>
              <div className="row d-flex col-md-12 col-sm-12 m-auto align-items-center justify-content-center p-0">
                <div className="col-3  h4 ">סקופ</div>

                <div className="slider col-6 grad1 p-0">
                  <div className="field second">
                    <input
                      type="range"
                      className="rangInput"
                      id="secondinput"
                      min="0"
                      max="100"
                      defaultValue="20"
                      steps="1"
                    />
                  </div>
                </div>

                <div className="col-3  h4 ">אירוע מושלם</div>
              </div>

              {!isMobile && !isTablet && (
                <>
                  <div className=" mb-3 row d-flex col-12 m-auto align-items-center">
                    <div className="col-3"></div>
                    <div className="col-6 d-flex h4 p-0 ">
                      <div className="col-2 ">תפריט</div>
                      <div className="col-2 ">טריות ואיכות</div>
                      <div className="col-2">טעם מצוין </div>
                      <div className="col-2">צוות אדיב</div>
                      <div className="col-2">עיצוב</div>
                      <div className="col-2">הפקה</div>
                    </div>
                    <div className="col-3"></div>
                  </div>
                </>
              )}
              <div className="row justify-content-center mt-3  ">
                <div className="col-md-10 col-sm-12 px-4 row d-flex justify-content-between my-5 blogSection">
                  <div className="col-md-4  my-3" style={{ height: "450px" }}>
                    <div
                      className="h-50"
                      style={{ backgroundImage: `url(${blog1})` }}
                    ></div>

                    <div
                      className="h-50 bg-light d-flex justify-content-center  flex-column align-items-center mr-0"
                      style={{ marginRight: "1%" }}
                    >
                      <div
                        className="font-weight-bold h2 mb-0"
                        style={{ color: "#A38047" }}
                      >
                        טרנדים באוכל
                      </div>
                      <hr
                        className="font-weight-bold m-auto mb-2 mt-3"
                        style={{
                          width: "11%",
                          height: "5px",
                          opacity: "1",
                          color: "#A38047",
                        }}
                      ></hr>

                      <p
                        className="mt-3 font-weight-bold h6"
                        style={{ color: "#000000", width: "65%" }}
                      >
                        {" "}
                        מה האורחים שלכם אוהבים לראות בשולחן, ומה המנה הכי
                        מבוקשת?
                      </p>
                    </div>
                  </div>

                  <div className="col-md-4 my-3" style={{ height: "450px" }}>
                    <div
                      className="h-50"
                      style={{ backgroundImage: `url(${blog2})` }}
                    ></div>

                    <div
                      className="h-50 bg-light  d-flex justify-content-center  flex-column align-items-center mr-0"
                      style={{ marginRight: "1%" }}
                    >
                      <div
                        className="font-weight-bold h2 mb-0"
                        style={{ color: "#A38047" }}
                      >
                        צילום ותמונות{" "}
                      </div>
                      <hr
                        className="font-weight-bold m-auto mb-2 mt-3"
                        style={{
                          width: "11%",
                          height: "5px",
                          opacity: "1",
                          color: "#A38047",
                        }}
                      ></hr>

                      <p
                        className="mt-3 font-weight-bold h6"
                        style={{ color: "#000000", width: "50%" }}
                      >
                        איך יודעים איזה צלם לבחור? מה הפורמט שהכי מתאים?{" "}
                      </p>
                    </div>
                  </div>

                  <div className="col-md-4 mt-3" style={{ height: "450px" }}>
                    <div
                      className="h-50"
                      style={{ backgroundImage: `url(${blog3})` }}
                    ></div>

                    <div
                      className="h-50 bg-light d-flex justify-content-center  flex-column align-items-center mr-0"
                      style={{ marginRight: "1%" }}
                    >
                      <div
                        className="font-weight-bold h2 mb-0"
                        style={{ color: "#A38047" }}
                      >
                        עיצובי פרחים{" "}
                      </div>
                      <hr
                        className="font-weight-bold m-auto mb-2 mt-3"
                        style={{
                          width: "11%",
                          height: "5px",
                          opacity: "1",
                          color: "#A38047",
                        }}
                      ></hr>

                      <p
                        className="mt-3 font-weight-bold h6"
                        style={{ color: "#000000", width: "55%" }}
                      >
                        {" "}
                        איזה פרחים כדאי לבחור לאירוע ?ואיך נדע איזה סגנון מתאים{" "}
                      </p>

                      {/* <p className="font-weight-bold  " style={{ width: '11%', height: '5px', opacity: '1', color: "#A38047", marginRight: '60%' }} >&bull; &bull; &bull;</p> */}
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="addLocation row  justify-content-center  px-3"
                style={{ height: "270px" }}
              >
                <div className="col-md-10 col-sm-12 px-4">
                  <div
                    className=" d-flex  align-items-end  justify-content-center flex-column pl-5  pr-5 pb-3  pt-3"
                    style={{
                      backgroundColor: "#404041",
                      border: " 1px solid #C69A51",
                    }}
                  >
                    <div
                      style={{
                        color: "#FFFFFF",
                        fontSize: "60px",
                        lineHeight: "1",
                      }}
                    >
                      ?מתחתנים{" "}
                    </div>
                    <div
                      className="mb-4"
                      style={{
                        color: "#A38047",
                        fontSize: "60px",
                        fontWeight: "900",
                        lineHeight: "1",
                      }}
                    >
                      מזל"ט סקופ
                    </div>
                    <div className="h4" style={{ color: "#FFFFFF" }}>
                      !הזמינו עוד היום אירוע חתונה בטעם מנצח
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ height: "150px" }}></div>
            </div>

            <Footer />
            <UnderFooter />
          </div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    categories: state.categoryReducer.categories,
    language: state.languageReducer.language,
  };
};

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home));
