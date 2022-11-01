import React, { useState } from "react";
import { connect } from "react-redux";
import "../../css/Uploader.css";
import uploadimg from "../../images/image.svg";
import Loading from "./Loading";
import Uploaded from "./Uploaded";
import { actions } from "../../redux/actions/action";
import api from "../../api";

function Uploader(props) {
  const { _uploadedUrl, _setUploadedUrl } = props;

  const [loading, setLoading] = useState(false);
  const [isDrag, setIsDrag] = useState(false);
  const [loadingSuccess, setLoadingSuccess] = useState(false);

  const isValidImage = (file) => {
    if (file.type.match(/image\/[a-z]*/) !== null) {
      return true;
    }
  };

  const setUpload = async (image = {}) => {
    const formData = new FormData(); //Sends image as part of from data to avoid wierd Boundry issues when sending multipart/form data when not part of an actual form
    formData.append("file", image);
    const response = await api.post("/upload", formData);
    _setUploadedUrl(response.data.url);
  };

  const formUploadHandler = () => {
    const image = new FormData(document.forms[0]).get("fileupload");
    if (image.name !== "" && isValidImage(image)) {
      uploadImage(image);
    }
  };

  const uploadImage = (image) => {
    setUpload(image);
    setLoading(true);
  };

  const dragHandler = (e) => {
    switch (e.type) {
      case "dragenter":
        e.preventDefault(e);
        setIsDrag(true);
        break;
      case "dragover":
        e.preventDefault(e);
        setIsDrag(true);
        break;
      case "dragleave":
        e.preventDefault(e);
        setIsDrag(false);
        break;
      case "drop":
        setIsDrag(false);
        if (e.dataTransfer.files.length > 0) {
          e.preventDefault(e);
          const image = e.dataTransfer.files[0];
          if (image.name !== "" && isValidImage(image)) {
            uploadImage(image);
          }
        }
        break;
      default:
        return e;
    }
  };

  const uploadContent = () => {
    return (
      <div className="uploader">
        <h1>Upload your image</h1>
        <h3>File should be Jpeg, Png,...</h3>
        <div
          className={
            "uploader__container " + (isDrag ? " uploader__container-drag" : "")
          }
          onDragEnter={(e) => dragHandler(e)}
          onDragOver={(e) => dragHandler(e)}
          onDragLeave={(e) => dragHandler(e)}
          onDrop={(e) => dragHandler(e)}
        >
          <img src={uploadimg} alt="" />
          <h3 className="container__title">
            {isDrag}Drag & Drop your image here
          </h3>
        </div>
        <span className="container__title">Or</span>
        <form className="uploader__form">
          <label htmlFor="fileupload">
            <input
              type="file"
              accept="image/*"
              id="fileupload"
              name="fileupload"
              className="form__file"
              onChange={() => formUploadHandler()}
            />
            Choose a file
          </label>
        </form>
      </div>
    );
  };

  const returnContent = () => {
    if (!loading)
      if (!loadingSuccess) return uploadContent();
      else
        return (
          <Uploaded
            setLoadingSuccess={setLoadingSuccess}
            uploadedUrl={_uploadedUrl}
          />
        );
    else
      return (
        <Loading
          setLoading={setLoading}
          setLoadingSuccess={setLoadingSuccess}
        />
      );
  };

  return returnContent();
}

const mapStateToProps = (state) => ({
  ...state,
  _uploadedUrl: state.nav.uploadedUrl,
});

const mapDispatchToProps = (dispatch) => ({
  _setUploadedUrl: (style) => dispatch(actions.setUploadedUrl(style)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Uploader);
