import $ from "jquery";
import React, { useEffect } from "react";
import decorite from "../../data/imges/decorite.png";

// import Nuv from './Nuv';
// import bg1 from '../../assets/img/bg1.jpg'
// import bg3 from '../../assets/img/bg3.jpg'
// import bg4 from '../../assets/img/bg4.jpg'
import { Image } from "react-bootstrap";
import i18 from "../../i18/i18";
export function Section() {
  let previousClick = "empty";
  let currentClass;
  useEffect(() => {
    if ($) {
      $("button").click(function () {
        if (
          $(this).attr("id") === "btnOne" ||
          $(this).attr("id") === "btnTwo" ||
          $(this).attr("id") === "btnThree"
        ) {
          currentClass = "." + $(this).attr("id");
          if ($(this).hasClass("active")) {
            $(this).removeClass("active");
            $(currentClass).addClass("d-none");
            $(".left_side").removeClass("d-none");
          } else {
            $(this).addClass("active");
            $(currentClass).removeClass("d-none");
            $(".left_side").removeClass("d-none");
            if (
              previousClick !== "empty" &&
              previousClick !== $(this).attr("id")
            ) {
              $("#" + previousClick).removeClass("active");
              $("." + previousClick).addClass("d-none");
              $(".left_side").addClass("d-none");
            } else {
              $("#" + previousClick).addClass("active");
              $("." + previousClick).removeClass("d-none");
              if ($(".left_side").hasClass("d-none"))
                $(".left_side").romoveClass("d-none");
              else $(".left_side").addClass("d-none");
            }
            previousClick = $(this).attr("id");
          }
        }
      });
    }
  }, [$]);
  return (
    <section>
      <div
        className="container_"
        style={{
          width: "100vw",
          height: "580px",
        }}
      >
        {/* 
                <div className="searchBox btnOne bc-white centerItems flex-column d-none" style={{ width: '60%', height: "40%", zIndex: '9', position: 'absolute', left: '15%', top: "20%", opacity: "0.9" }}>

                    <div className="text-dark h1 " style={{ marginLeft: "9%" }}>  ?...מה אתם מחפשים  <YourSvg className="svgSize" /></div>
                    <input className="w-50 lineInput" type="text " style={{ lineHeight: '1' }} />

                </div>
                <div className="shoppingCart p-2 btnTwo bc-white row justify-content-between d-none" style={{ width: '30%', height: "40%", zIndex: '9', position: 'absolute', left: '30%', top: "20%", opacity: "0.9" }}>


                    <div className="  d-flex  align-items-center justify-content-center text-dark col-md-5">
                        <div className="w-75 h-75 border border-dark"></div>

                    </div>

                    <div className=" col-md-5 d-flex  align-items-end justify-content-center  flex-column">
                        <div className="text-dark h4 mb-0 "> הסיפור שלנו  </div>
                        <hr className="hrStyle" />
                        <div className="text-dark h4 mb-0">  לקוחותינו  </div>
                        <hr className="hrStyle" />
                        <div className="text-dark h4 mb-0"> חנויות הרשת  </div>
                        <hr className="hrStyle" />
                        <div className="text-dark h4 mb-0">  צור קשר  </div>
                    </div>


                </div>


                <div className="shabtTimes btnThree bc-white centerItems flex-column d-none" style={{ width: '40%', height: "70%", zIndex: '9', position: 'absolute', left: '20%', top: "6%", opacity: "0.9" }}>
                    <div className="d-inline rounded-circle iconBorder " style={{ marginLeft: '8px', paddingRight: '1%', paddingLeft: '1%', paddingTop: '0.5%', paddingBottom: '0.5%', backgroundColor: '#C59950', position: 'absolute', left: '90%', top: '10%' }}>
                        <Image src={locationIcon} style={{ height: '25px', marginBottom: "1px" }} />
                    </div>

                    <div className="text-dark h2 ">זמני כניסת ויציאת השבת <span className="font-weight-bold d-block">פרשת בהר</span> </div>
                    <hr style={{
                        color: '#C69A51',
                        height: '2px',
                        width: '50%'
                        , opacity: '1'
                    }} />
                    <div className="text-dark  h2">כניסת שבת: 18: 55</div>
                    <div className="text-dark  h2">יציאת שבת: 18: 58</div>
                    <button className="mt-5" style={{

                        border: '1px solid #C69A51',
                        background: 'white'
                    }}>הגדר מיקום / עיר</button>



                </div>
 */}

        <div className="centered_  ">{i18.t("homePageTitel")}</div>
        {/* <div className="left_side">הזמינו אירוע 077-255-9982</div> */}
        <Image className="decorite" src={decorite} />
        {/* <div className="row" style={{
                    width: '2.5%',
                    top: '12%',
                    left: '1.5%',
                    position: 'absolute'
                }}>
                    <button className="bc-white p-2 border-top outSvgSize " id="btnOne"><YourSvg className="svgSize" /></button>
                    <button className="bc-white p-2 border-top outSvgSize" id="btnTwo"><YourSvg1 className="svgSize" /></button>
                    <button className="bc-white p-2 border-top outSvgSize" id="btnThree"><YourSvg2 className="svgSize" /></button>

                </div>

 */}
      </div>
    </section>
  );
}

export default Section;
