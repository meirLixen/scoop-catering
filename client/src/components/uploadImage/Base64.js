import React, { Component } from "react";
import "../../css/Uploader.css";
import FileBase from "react-file-base64";
import uploadimg from "../../images/image.svg";
import { actions } from "../../redux/actions/action";
import { connect } from "react-redux";

class Base64 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openBase64: false,
      baseImage: uploadimg,
    };
  }

  // function to capture base64 format of an image
  getBaseFile(files) {
    // create a local readable base64 instance of an image
    this.setState({
      baseImage: files.base64,
    });

    this.props._setBase64(files.base64);


    //save in server
  }

  render() {
    return (
      <>
        <div className="uploader">
          <button
            className="base64"
            onClick={() =>
              this.setState({ openBase64: !this.state.openBase64 })
            }
          >
            Open Base64 option
          </button>
          {this.state.openBase64 && (
            <>
              <img
                className="base"
                src={this.state.baseImage ? this.state.baseImage : uploadimg}
                alt="Red dot"
              />
              <FileBase
                className="form__file"
                type="file"
                multiple={false}
                onDone={this.getBaseFile.bind(this)}
              />
            </>
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) => ({
  _setBase64: (base64) => dispatch(actions.setBase64(base64)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Base64);
