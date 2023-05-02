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

export function _Terms(props) {
  const { t, i18n } = useTranslation();
  const isMobile = useMediaQuery(768);
  const isTablet = useMediaQuery(1024);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])



  return (
    <div
      style={{
      
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
            className="h-100 w-100"
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
          <div className="goldColor d-inline"> /{i18.t("Policy")} </div>
        </div>
        <div>
          <div className="px-5 py-5" style={{
           
            direction: "rtl",
            lineHeight: 1.5,
            textAlign: "center",
            maxWidth: "85%",
            margin: "auto"
          }}>
            <artical className="text-right"  >
              <p>תקנון זה מהווה הסכם משפטי מחייב , אשר הוראותיו יחולו על כל שימוש שייעשה על ידי המשתמש באתר ,
                ועל כל רכישה שתתבצע באמצעות האתר , ומהווה הסכמה מחייבת בין המשתמש לבין מפעיל האתר . </p>
              <p>מובהר בזאת, כי האתר רשאי להשתמש בכל מידע שסופק על ידך (המשתמש) או נאסף בעת שימושך .</p>
              <p>הנך מצהיר ומסכים, כי המידע שהנך מעלה באתר אינו סודי ואתה מעניק לאתר רישיון בלתי מוגבל ובלתי חוזר,
                להשתמש במידע בכל דרך, מבלי להידרש להרשאה מיוחדת ומבלי לשלם על כך. </p>
              <p>תנאי השימוש מנוסחים בלשון זכר לצורכי נוחות בלבד, אולם הם מיועדים לגברים ונשים כאחד.
              </p>
              <p  class="font-weight-bold">מדיניות ופרטיות</p>
              <p>1 .בית העסק סקופ קייטרינג , עוסק 309639656 אשר מפעיל את אתר <span><a href="com.scoopcatering.www">www.scoopcatering.com</a></span> ( להלן: "האתר")
                יעשה כמיטב יכולתו להגנת פרטיותם של המבקרים באתר .</p>
              <p>2 .המשתמש באתר מאשר שכל מידע לרבות "מידע אישי" שימסור כעת או בעתיד נמסר מרצונו ובהסכמתו
                ונשמר במאגר המידע של בית העסק לשם הצעת שירותים נוספים בעתיד.</p>

              <p>3 .השימוש במידע ייעשה בהתאם לתנאי השימוש ובהתאם למדיניות הפרטיות, כפי שהם מעת לעת.</p>
              <p  class="font-weight-bold">דיוור ישיר אלקטרוני</p>
              <p>4 .הנך מאשר בזאת לאתר ו/או מי מטעמו לשלוח הצעות פרסומיות כאמור בסעיף 30א' לחוק התקשורת (בזק ושידורים),
                תשמ"ב – 1982 בנושאי האתר, מוצריו, ובכל נושא אחר.
                אם אינך מעוניין במשלוח דברי פרסום, אנא, שלח הודעה לאתר באופן המפורט בהסכם זה.
                הנהלת האתר רשאית לשלוח לרוכשים בדואר אלקטרוני ו/או באמצעות SMS מידע אודות מוצרים שונים וקישורים לרכישתם.
                אם המשתמש \הרוכש אינו מעונין לקבל את הדיוור כאמור לעיל, באפשרותו שלא לקבלו באמצעות פניה למפעיל האתר במייל
                .הסרה ולבקש service@scoopcatering.com
              </p>
              <p  class="font-weight-bold">הגבלת אחריות</p>
              <p>5 .נפלה טעות קולמוס חריגה וברורה בתיאור שירות כלשהו, כגון מחיר הנקוב באגורות במקום בשקלים,
                לא יחייב הדבר את מפעיל האתר.</p>
              <p>6 .ככל שיופיעו באתר קישורים לאתרי אינטרנט שאינם של מפעיל האתר, מפעיל האתר אינו אחראי לתקינותם / אמינותם /
                ביצועיהם של אותם אתרים ו/או לתוכן הנמצא בהם ו/או לאיכות וטיב השירותים או המוצרים המסופקים בהם ו/או באמצעותם .
                המעבר לאתרים אלו באמצעות הקישורים מהאתר נעשית על אחריות המשתמש בלבד, ובהתאם הוא לא יוכלל בוא למפעיל
                האתר בטענה כלשהי בקשר לנזקים שנגרמו לו על ידי ו/או באותם אתרים ו/או בשל הגלישה לאותם אתרים ו/או בכל הקשור
                לנגישות אליהם.</p>
              <p  class="font-weight-bold">איסוף מידע</p>
              <p>7 .בעת השימוש באתר, עשוי האתר לאסוף אודותיך מידע אישי פרטי (כגון, אך לא רק: שמך, דרכי ההתקשרות עמך, כתובת
                הדואר האלקטרוני שלך, מספר טלפון וכדו') וכן מידע לא פרטי (כגון, אך לא רק: סוג מכשיר, מערכת הפעלה, סוג דפדפן ועוד).</p>
              <p>8 .האתר יעביר כל מידע הנמסר לו לרשות המוסמכת על-פי חוק, ככל שיידרש או ככל שתוטל עליו חובה על -פי דין.
              </p>
              <p  class="font-weight-bold">שימוש במידע</p>
              <p>9 .האתר יעשה שימוש במידע הנאסף בהתאם להוראות מדיניות זו או על פי הוראות כל דין,
                לרבות למטרות הבאות:</p>
              <p>1.9 אפשור חוויה מותאמת אישית למשתמש.
              </p>
              <p>2.9 שיפור האתר או השירות, כגון שימוש במשוב מהמשתמשים.</p>
              <p>3.9 טיפול במחלוקות.</p>
              <p>4.9 טיפול בבעיות טכניות.</p>
              <p>5.9 שליחת מיילים תקופתיים למעט אם המשתמש בחר שלא לקבל אותם.</p>
              <p>6.9 פעילות שיווקית או שיפור המוצרים שלנו או פעילות מסחרית ו/או שיווקית . </p>
              <p>7.9 כל פעולה אחרת המותרת לבית העסק לפי כל דין.</p>
              <p  class="font-weight-bold">שמירת המידע</p>
              <p>10 .הנך נותן בזאת לאתר אישור להחזיק את פרטיך במאגר האתר, ולהשתמש במידע לכל שימוש חוקי עליו יחליט בית העסק.
                לרבות שימוש מסחרי.</p>
              <p>11 .על -פי חוק הגנת הפרטיות, התשמ"א - 1981 ,כל אדם זכאי לעיין במידע שעליו המוחזק במאגר מידע. אדם שעיין במידע שעליו
                ומצא כי אינו נכון, שלם, ברור או מעודכן, רשאי לפנות לבעל מאגר המידע בבקשה לתקן את המידע או למוחקו.</p>
              <p>12 .האתר עושה מאמצים רבים לשמירת ואבטחת המידע אך אינו יכול להבטיח בוודאות כי המידע יהיה חסין ולא ייחשף לגישה
                בלתי מורשית. על ידי שימוש באתר הנך מאשר כי הנך מודע למגבלות אלו ומסכים לשימוש באתר. וכן מוותר בזאת על כל תביעה
                ו/או טענה כנגד מפעיל האתר בעניין זה.</p>
              <p  class="font-weight-bold">Cookies</p>
              <p>13 .האתר משתמש ב"עוגיות ( Cookies )"  כדי לאסוף נתונים סטטיסטיים אודות השימוש באתר, לאימות פרטים, כדי להתאים את
                האתר להעדפותיך האישיות ולצורכי אבטחת מידע.</p>
              <p>14 .רוב הדפדפנים כוללים אפשרות להימנע מקבלת . Cookies אם ברצונך להימנע, ואינך יודע כיצד עושים זאת, חפש בקובץ
                העזרה של הדפדפן שלך.</p>
              <p  class="font-weight-bold">שינויים בתקנון ובמדיניות הפרטיות
              </p>
              <p>15 .תקנון זה ניתן לשינוי בכל עת ע“י מפעיל האתר על פי שיקול דעתו הבלעדי.</p>

              <p></p>
              <p></p>
              <p></p>

            </artical>
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
export default connect(mapStateToProps, mapDispatchToProps)(_Terms);
