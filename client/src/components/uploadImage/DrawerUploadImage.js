import React from "react";
import Drawer from "@material-ui/core/Drawer";
import { connect } from "react-redux";
import { actions } from "../../redux/actions/action";
import Uploader from "./Uploader";
import Base64 from "./Base64";

function TemporaryDrawer(props) {
  const { _openDrawerLoadingImage, _setOpenDrawerUploadImage } = props;

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    _setOpenDrawerUploadImage(open);
  };

  return (
    <div>
      <React.Fragment>
        <Drawer
          anchor={"right"}
          open={_openDrawerLoadingImage}
          onClose={toggleDrawer(false)}
        >
          <Uploader />
          <Base64 />
        </Drawer>
      </React.Fragment>
    </div>
  );
}

const mapStateToProps = (state) => ({
  ...state,
  _openDrawerLoadingImage: state.nav.openDrawerLoadingImage,
});

const mapDispatchToProps = (dispatch) => ({
  _setOpenDrawerUploadImage: (open) =>
    dispatch(actions.setOpenDrawerUploadImage(open)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TemporaryDrawer);
