import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import "../../App.css";
import { connect } from "react-redux";
import Footer from "../mainPage/Footer";
import UnderFooter from "../mainPage/UnderFooter";

import useMediaQuery from "../../hooks/useMediaQuery";
import { Form, Button } from "react-bootstrap";
import Hamborger from "../mainPage/Hamborger/Hamborger";
import TopPageDesktop from "../mainPage/TopPageDesktop";
import $ from "jquery";
import i18 from "../../i18/i18";
import EventBg from "../../data/imges/drinks.png";
import { useTranslation } from 'react-i18next';
export function ContactUs(props) {
  const { t, i18n } = useTranslation();
  const isMobile = useMediaQuery(768);
  const isTablet = useMediaQuery(1024);




  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])
  
  useEffect(() => {
   
    if ($) {
      $("#contact-us").addClass("active");
      $(".sendcontactUsForm").click(() => {
        alert(`${i18.t("notActiveMsg")}`)
      })
    }
  }, []);
  return (
    <>
      <div className="pageNuv">
        {isTablet && <Hamborger history={props.history} />}

        {!isMobile && !isTablet && <TopPageDesktop />}
      </div>
      <div className="pageContent">
        <div className="pageContent EventPageContent">
          <div
            style={{
              backgroundImage: `url(${EventBg})`,
              width: "100%",
              height: "100%",
              backgroundColor: "black",
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          >
            <div
              className="location  text-end px-5"
              style={{ paddingTop: "6rem" }}
            >
              <div
                className="d-inline text-white btn-pointer"
                onClick={() => props.history.push("/")}
              >
                {i18.t("ScoopCatering")}
              </div>
              <div className="goldColorWithShadow d-inline">
                {" "}
                /{i18.t("ContactUs")}
              </div>
            </div>
            <div className="row justify-content-center ">
              <div className="EventsDiv  bg-white p-5 mt-2  col-md-5 col-sm-12 ">
                <Form.Label className="font-weight-bold h1">
                  {" "}
                  {i18.t("ContactUs")}
                </Form.Label>
                <br />

                <Form.Text
                  style={{ marginLeft: "10px" }}
                  className=" text-black"
                >
                  {i18.t("ContactUsTitle1")}
                </Form.Text>
                <Form.Text
                  style={{ marginLeft: "10px" }}
                  className=" text-black mt-0"
                >
                  {i18.t("ContactUsTitle2")}
                </Form.Text>
                <br />
                <Form className="px-3">
                  <div className="swithSide">
                    <Form.Group
                      className="mb-2 swithDir"
                      controlId="formBasicPhone"
                    >
                      <Form.Label className="mb-1 lableForm">
                        {" "}
                        *{i18.t("name")}
                      </Form.Label>
                      <Form.Control
                        className="rounded-custom "
                        type="text"
                        required
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-2 swithDir"
                      controlId="formBasicPhone"
                    >
                      <Form.Label className="mb-1 lableForm">
                        {" "}
                        *{i18.t("phone")}
                      </Form.Label>
                      <Form.Control
                        className="rounded-custom "
                        type="text"
                        required
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-2 swithDir"
                      controlId="formBasicPhone"
                    >
                      <Form.Label className="mb-1 lableForm">
                        {" "}
                        *{i18.t("email")}
                      </Form.Label>
                      <Form.Control
                        className="rounded-custom "
                        type="email"
                        required
                      />
                    </Form.Group>

                    <Form.Group
                      className="mb-2 row swithDir"
                      controlId="formBasicPhone"
                    >
                      <div className="">
                        <Form.Label className="mb-1 lableForm">
                          {" "}
                          {i18.t("EventType")}
                        </Form.Label>
                        <Form.Select
                          aria-label="Default select example"
                          className="rounded-custom"
                          required
                        >
                          <option></option>
                          <option value={i18.t("EventOption1")}>
                            {i18.t("EventOption1")}
                          </option>
                          <option value={i18.t("EventOption2")}>
                            {i18.t("EventOption2")}
                          </option>
                          <option value={i18.t("EventOption3")}>
                            {i18.t("EventOption3")}
                          </option>
                          <option value={i18.t("EventOption4")}>
                            {i18.t("EventOption4")}
                          </option>
                          <option value={i18.t("EventOption5")}>
                            {i18.t("EventOption5")}
                          </option>
                          <option value={i18.t("EventOption6")}>
                            {i18.t("EventOption6")}
                          </option>
                          <option value={i18.t("EventOption7")}>
                            {i18.t("EventOption7")}
                          </option>
                          <option value={i18.t("EventOption8")}>
                            {i18.t("EventOption8")}
                          </option>
                          <option value={i18.t("EventOption9")}>
                            {i18.t("EventOption9")}
                          </option>
                        </Form.Select>
                      </div>
                    </Form.Group>
                    <Form.Group
                      className="mb-2 swithDir"
                      controlId="formBasicPhone"
                    >
                      <Form.Label className="mb-1 lableForm">
                        {i18.t("ContactUsMore")}
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        placeholder=""
                        style={{ height: "100px" }}
                        className="rounded-custom "
                      />
                    </Form.Group>
                  </div>
                  <Button
                    variant="primary"
                    type="submit"
                    className=" goldButton px-5 py-2 my-5 sendcontactUsForm"
                  >
                    {i18.t("send")}
                    {/* &#8594; */}
                  </Button>
                  <div className="swithSide">
                    <p className="swithDir small mb-0">*{i18.t("Required")}</p>
                  </div>
                </Form>
              </div>
            </div>
          </div>
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
)(withRouter(ContactUs));
