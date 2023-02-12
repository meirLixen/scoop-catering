import React, { useEffect } from "react";

import "../../App.css";
import { connect } from "react-redux";
import $ from "jquery";

import Footer from "../mainPage/Footer";
import UnderFooter from "../mainPage/UnderFooter";
import { Image } from "react-bootstrap";
import profile from "../../data/imges/profile.png";
import teamImages from "../../data/imges/teamImages.png";

import useMediaQuery from "../../hooks/useMediaQuery";

import Hamborger from "../mainPage/Hamborger/Hamborger";
import TopPageDesktop from "../mainPage/TopPageDesktop";
import i18 from "../../i18/i18";
import { useTranslation } from 'react-i18next';

export function OurPeeks(props) {
  const { t, i18n } = useTranslation();
  const isMobile = useMediaQuery(768);
  const isTablet = useMediaQuery(1024);
  useEffect(() => {
    window.scrollTo(0, 0);
    if ($) {
      $("#navbarScrollingDropdown").addClass("active");
    }
  }, []);
  return (
    <div
      style={{
        // backgroundImage: `url(${bgImagOurPeeks})`,
        height: "1600px",
        width: "100vw",
      }}
    >
      <div className="pageNuv">
        {isTablet && <Hamborger history={props.history} />}

        {!isMobile && !isTablet && <TopPageDesktop />}
      </div>

      <div className="pageHeader">
        {/* <label > {i18.t('OurTeam')}</label> */}
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

      <section className="" style={{ height: "100%" }}>
        <div className="location pt-3 text-end px-5">
          <div
            className="d-inline btn-pointer"
            onClick={() => props.history.push("/")}
          >
            {i18.t("ScoopCatering")}
          </div>
          {/* <div className='d-inline'>  </div> */}
          <div className="goldColor d-inline"> /{i18.t("OurTeam")} </div>
        </div>

        <div className="OurPeekscontent flex-column ">
          <div className="titel pt-5 mt-5">
            <h1 className="font-weight-bold mb-0">{i18.t("OurTeam")}</h1>
          </div>
          <hr className="hrStyle " style={{ width: "10%" }} />
          <div className="content mt-5  px-4">
            <span className="swithSide ">
              <p className="preStyle font-weight-bold h5">
                {i18.t("ourTeamTitle1")}
              </p>
              <p className="preStyle h5">{i18.t("ourTeamTitle2")}</p>
              <br />
              <p className="preStyle h5">{i18.t("ourTeamTitle3")}</p>
              <p className="preStyle h5">{i18.t("ourTeamTitle4")}</p>
              <br />
              <p className="preStyle h5">{i18.t("ourTeamTitle5")}</p>
              <p className="preStyle h5">{i18.t("ourTeamTitle6")}</p>
              <p className="preStyle h5">{i18.t("ourTeamTitle7")}</p>
            </span>

            <div className="teamList mt-5">
              <div className="d-flex mb-3">
                <div className="col-md-4 col-sm-6 teamItem d-flex  align-items-center flex-column">
                  <Image className="rounded-circle border" src={profile} />
                  <div className="workerName h4 font-weight-bold ">
                    {" "}
                    מייקל סמייגל
                  </div>
                  <div className="role h6  font-weight-bold">
                    .אחראי אירועי חוץ ומוסדות
                  </div>
                  <hr className="hrS m-0 " />
                  <button className="border-0 bg-transparent readMore x-smallFont goldColor">
                    ...קראו עוד
                  </button>
                </div>
                <div className=" col-md-4 col-sm-6 teamItem d-flex  align-items-center flex-column">
                  <Image className="rounded-circle border" src={profile} />
                  <div className="workerName h4 font-weight-bold ">
                    {" "}
                    מייקל סמייגל
                  </div>
                  <div className="role h6  font-weight-bold">
                    .אחראי אירועי חוץ ומוסדות
                  </div>
                  <hr className="hrS m-0 " />
                  <button className="border-0 bg-transparent readMore x-smallFont goldColor">
                    ...קראו עוד
                  </button>
                </div>
                <div className="col-md-4 col-sm-6 teamItem d-flex  align-items-center flex-column">
                  <Image className="rounded-circle border" src={profile} />
                  <div className="workerName h4 font-weight-bold ">
                    {" "}
                    מייקל סמייגל
                  </div>
                  <div className="role h6  font-weight-bold">
                    .אחראי אירועי חוץ ומוסדות
                  </div>
                  <hr className="hrS m-0 " />
                  <button className="border-0 bg-transparent readMore x-smallFont goldColor">
                    ...קראו עוד
                  </button>
                </div>
              </div>

              <div className="d-flex">
                <div className="col-md-4 col-sm-6 teamItem d-flex  align-items-center flex-column">
                  <Image className="rounded-circle border" src={profile} />
                  <div className="workerName h4 font-weight-bold ">
                    {" "}
                    מייקל סמייגל
                  </div>
                  <div className="role h6  font-weight-bold">
                    .אחראי אירועי חוץ ומוסדות
                  </div>
                  <hr className="hrS m-0 " />
                  <button className="border-0 bg-transparent readMore x-smallFont goldColor">
                    ...קראו עוד
                  </button>
                </div>
                <div className=" col-md-4 col-sm-6 teamItem d-flex  align-items-center flex-column">
                  <Image className="rounded-circle border" src={profile} />
                  <div className="workerName h4 font-weight-bold ">
                    {" "}
                    מייקל סמייגל
                  </div>
                  <div className="role h6  font-weight-bold">
                    .אחראי אירועי חוץ ומוסדות
                  </div>
                  <hr className="hrS m-0 " />
                  <button className="border-0 bg-transparent readMore x-smallFont goldColor">
                    ...קראו עוד
                  </button>
                </div>
                <div className="col-md-4 col-sm-6 teamItem d-flex  align-items-center flex-column">
                  <Image className="rounded-circle border" src={profile} />
                  <div className="workerName h4 font-weight-bold ">
                    {" "}
                    מייקל סמייגל
                  </div>
                  <div className="role h6  font-weight-bold">
                    .אחראי אירועי חוץ ומוסדות
                  </div>
                  <hr className="hrS m-0 " />
                  <button className="border-0 bg-transparent readMore x-smallFont goldColor">
                    ...קראו עוד
                  </button>
                </div>
              </div>

              <div className="titel d-flex flex-column align-items-center mt-3">
                <h1 className="font-weight-bold mb-0">
                  {" "}
                  {i18.t("ourTeamLable2")}{" "}
                </h1>
                <hr className="hrStyle " style={{ width: "8%" }} />
              </div>

              <div className="imgContainer mb-5  mt-5 ">
                <div className="row ">
                  <div className="col-3">
                    {" "}
                    <Image
                      src={teamImages}
                      style={{ width: "150px", height: "150px" }}
                    />
                  </div>
                  <div className="col-3">
                    {" "}
                    <Image
                      src={teamImages}
                      style={{ width: "150px", height: "150px" }}
                    />
                  </div>
                  <div className="col-3">
                    {" "}
                    <Image
                      src={teamImages}
                      style={{ width: "150px", height: "150px" }}
                    />
                  </div>
                  <div className="col-3">
                    {" "}
                    <Image
                      src={teamImages}
                      style={{ width: "150px", height: "150px" }}
                    />
                  </div>
                </div>

                <div className="row mt-3">
                  <div className="col-3">
                    {" "}
                    <Image
                      src={teamImages}
                      style={{ width: "150px", height: "150px" }}
                    />
                  </div>
                  <div className="col-3">
                    {" "}
                    <Image
                      src={teamImages}
                      style={{ width: "150px", height: "150px" }}
                    />
                  </div>
                  <div className="col-3">
                    {" "}
                    <Image
                      src={teamImages}
                      style={{ width: "150px", height: "150px" }}
                    />
                  </div>
                  <div className="col-3">
                    {" "}
                    <Image
                      src={teamImages}
                      style={{ width: "150px", height: "150px" }}
                    />
                  </div>
                </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(OurPeeks);
