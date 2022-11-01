import React from "react";

import i18 from "../../i18/i18";
export function UnderFooter() {
  return (
    <footer style={{ backgroundColor: "#403F3F" }}>
      <div className="row pt-2 pb-2 col-md-12 justify-content-between  align-items-center whiteColor mr-0">
        <div className="col-md-2 h6 mb-0 ">{i18.t("Policy")}</div>
        <div className="col-md-3 h6 mb-0"> {i18.t("Copyright")}- scoop</div>
        <div className="col-md-2 h6 mb-0 " style={{ color: "#C59950" }}>
          ui | ux
        </div>
      </div>
    </footer>
  );
}
export default UnderFooter;
