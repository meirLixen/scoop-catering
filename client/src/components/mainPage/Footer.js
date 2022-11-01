import React, { useEffect } from "react";
import locationIcon from "../../data/imges/locationIcon.png";
import emailIcon from "../../data/imges/emailIcon.png";
import phoneIcon from "../../data/imges/phoneIcon.png";
import VectorSmart from "../../data/imges/VectorSmart.png";
import allVectorSmart from "../../data/imges/allVectorSmart.png";

import i18 from "../../i18/i18";
import { Image } from "react-bootstrap";
import $ from "jquery";

// <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />

// <meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0, shrink-to-fit=no' name='viewport' />

// import "https://fonts.googleapis.com/css?family=Montserrat:400,700,200|Open+Sans+Condensed:700"
// import "https://use.fontawesome.com/releases/v5.7.1/css/all.css"

export function Footer() {
  function sendingEmail(emailToSent) {
    return fetch(`https://scoopcatering.co.il/sendEmail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailToSent),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res);
        return res;
      });
  }
  function sendEmail() {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if ($("#emailToSend").val().match(mailformat)) {
      let emailToSent = {
        to: $("#emailToSend").val(),
        subject: "צורפת בהצלחה לרשימת תפוצה של עידכונים",
        text: "מהיום כל עדכון ",
      };
      sendingEmail(emailToSent);
      $(".successEmail").removeClass("d-none");
      setTimeout(function () {
        $(".successEmail").addClass("d-none");
        $("#emailToSend").val("");
      }, 1000);
    } else alert("Invalid Email");
  }

  return (
    <>
      <footer
        className="footer footer-big "
        style={{ backgroundColor: "#0F0F0F" }}
      >
        <div className="container">
          <div className="content">
            <div className="row swithDir">
              {/* successEmail: 'המייל נשלח בהצלחה',
        ChainStores: 'חנויות הרשת',
        Events: 'אירועים',
        PrivateEvents: 'אירועים פרטיים', */}
              {/* Menus: 'תפריטים', */}
              {/* WeddingMenu: 'תפריט חתונה', */}
              {/* DairyMenu: 'תפריט חלבי', */}
              {/* BasicDairyMenu: 'תפריט חלבי בסיסי', */}
              {/* Recommend: 'ממליצים', */}
              {/* orders: 'הזמנות', */}
              {/* OrganizationsAndCompanies: 'אירגונים וחברות', */}
              {/* OutdoorEvents: 'אירועי חוץ', */}
              {/* InformationAndArticles */}

              <div className="col-md-2 swithSide">
                <h5 className="title"> {i18.t("ScoopCatering")}</h5>
                <ul className="links-vertical">
                  <li>
                    <a href="#pablo" className="text-muted subTitleB TitleB">
                      {i18.t("OurStory")}
                    </a>
                  </li>
                  <li>
                    <a href="#pablo" className="text-muted subTitleB">
                      {i18.t("OurCustomers")}
                    </a>
                  </li>
                  <li>
                    <a href="#pablo" className="text-muted subTitleB">
                      {i18.t("ChainStores")}
                    </a>
                  </li>
                </ul>

                <h5 className="title"> {i18.t("Events")}</h5>
                <ul className="links-vertical">
                  <li>
                    <a href="#pablo" className="text-muted subTitleB">
                      {i18.t("Galleries")}
                    </a>
                  </li>
                  <li>
                    <a href="#pablo" className="text-muted subTitleB">
                      {i18.t("OurTeam")}
                    </a>
                  </li>
                  <li>
                    <a href="#pablo" className="text-muted subTitleB">
                      {i18.t("PrivateEvents")}
                    </a>
                  </li>
                </ul>
              </div>

              <div className="col-md-2 swithSide">
                <h5 className="title">{i18.t("Menus")}</h5>
                <ul className="links-vertical">
                  <li>
                    <a href="#pablo" className="text-muted subTitleB">
                      {i18.t("WeddingMenu")}
                    </a>
                  </li>
                  <li>
                    <a href="#pablo" className="text-muted subTitleB">
                      {i18.t("shabatMenu")}
                    </a>
                  </li>
                  <li>
                    <a href="#pablo" className="text-muted subTitleB">
                      {i18.t("DairyMenu")}
                    </a>
                  </li>
                  <li>
                    <a href="#pablo" className="text-muted subTitleB">
                      {i18.t("BasicDairyMenu")}
                    </a>
                  </li>
                </ul>
                <h5 className="title"> {i18.t("Recommend")}</h5>
                <ul className="links-vertical">
                  <li></li>
                </ul>
              </div>

              <div className="  col-md-2  swithSide">
                <div className=" ">
                  <div className="">
                    <h5 className="title">{i18.t("orders")}</h5>
                    <ul className="links-vertical ">
                      <li>
                        <a href="#pablo" className="text-muted subTitleB">
                          {i18.t("WeddingMenu")}
                        </a>
                      </li>
                      <li>
                        <a href="#pablo" className="text-muted subTitleB">
                          {i18.t("shabatMenu")}
                        </a>
                      </li>
                      <li>
                        <a href="#pablo" className="text-muted subTitleB">
                          {i18.t("DairyMenu")}
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="">
                    <h5 className="title ">
                      {i18.t("OrganizationsAndCompanies")}
                    </h5>
                    <ul className="links-vertical ">
                      <li>
                        <a href="#pablo" className="text-muted subTitleB">
                          {i18.t("OutdoorEvents")}
                        </a>
                      </li>
                      <li>
                        <a href="#pablo" className="text-muted subTitleB">
                          {i18.t("InformationAndArticles")}
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="col-md-1"></div>

              <div className="col-md-5 pt-5">
                <label className="text-white col-12 swithSide pr-5">
                  {i18.t("lableInput")}
                </label>
                <div className="row col-12 align-items-center mr-0 mt-3 mailInput  swithDir ">
                  <div
                    className=" input-group col-8 pl-0"
                    style={{ width: "65%" }}
                  >
                    <input
                      id="emailToSend"
                      type="email"
                      className="rounded-pill form-control plS px-3"
                      placeholder={i18.t("placeholderInput")}
                      required
                    />
                  </div>
                  <div className="col-3  text-center p-0  ">
                    <button
                      className="btn btn-danger rounded-pill pr-4 pl-4 mt-0 mb-0 w-fitCon "
                      onClick={() => sendEmail()}
                      type="button"
                    >
                      {i18.t("send")}
                    </button>
                  </div>
                </div>
                {/* <div className="row">
                                    <div className="h6 col-md-4"></div> */}
                <p
                  className="d-none  swithSide successEmail pl-3 pt-2"
                  style={{
                    color: "white",
                    paddingRight: "12%",
                    fontSize: "0.9rem",
                  }}
                >
                  {i18.t("successEmail")}
                </p>
                {/* </div> */}

                {/* <h5>עקבו אחרינו</h5> */}
                <ul className="social-buttons text-center mt-5">
                  <li>
                    <Image src={allVectorSmart} />
                  </li>

                  <li>
                    <Image src={VectorSmart} style={{ marginLeft: "6px" }} />
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <hr />
          <div
            className="  swithDir row col-12 d-flex whiteColor justify-content-center"
            style={{ marginTop: "2.5%" }}
          >
            <div className=" col-md-3 mb-4 p-0  ml-4">
              {i18.t("CompanyPhone")}
              <div className="d-inline rounded-circle iconBorder mx-3">
                <Image
                  src={phoneIcon ? phoneIcon : emailIcon}
                  style={{ height: "22px", marginBottom: "3px" }}
                />
              </div>
            </div>

            <div className=" col-md-3 mb-4 p-0 mr-3">
              {i18.t("CompanyEmail")}
              <div className="d-inline rounded-circle iconBorder mx-3">
                <Image
                  src={emailIcon}
                  style={{ height: "18px", marginBottom: "3px" }}
                />
              </div>
              {/* <Image src={emailIcon} /> */}
            </div>

            <div className=" col-md-3 mb-4 p-0 ml-5">
              {i18.t("location")}
              <div
                className="d-inline rounded-circle iconBorder mx-3"
                style={{
                  paddingRight: "5%",
                  paddingLeft: "5%",
                  paddingTop: "4%",
                  paddingBottom: "4%",
                  backgroundColor: "#C59950",
                }}
              >
                <Image
                  src={locationIcon}
                  style={{ height: "25px", marginBottom: "4px" }}
                />
              </div>
              {/* <Image src={locationIcon} style={{ marginRight: '8px' }} /> */}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
export default Footer;
