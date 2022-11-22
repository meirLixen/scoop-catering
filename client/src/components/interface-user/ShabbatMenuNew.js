import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
// import { withRouter } from 'react-router-dom';
import { actions } from "../../redux/actions/action";

// import Search from '../Search'
import headerBgImag from "../../data/imges/headerBgImag.png";
import Hamborger from "../mainPage/Hamborger/Hamborger";
import TopPageDesktop from "../mainPage/TopPageDesktop";
import useMediaQuery from "../../hooks/useMediaQuery";

import Modal from "../Popup/Modal";
import useModal from "../Popup/useModal";
import "../Popup/Modal.css";

import "../../App.css";
import $ from "jquery";
import i18 from "../../i18/i18";
import ShabbatMenuSystem from "./ShabbatMenu__.js";
function ShabbatMenu(props) {
  const { isShowing, toggle } = useModal();

  // const [cart, setCart] = useLocalStorage("cart", []);
  const { language } = props;
  const { products } = props;
  const { categories } = props;
  const isMobile = useMediaQuery(768);
  const isTablet = useMediaQuery(1024);

  const [total] = useLocalStorage("total", 0);
  const { totalRedux, numItemsRedux, cartRedux } = props;

  function scrollTopFunc() {
    window.scrollTo(0, 0);
  }

  function useLocalStorage(key, initialValue) {
    const [storedValue, setStoredValue] = useState(() => {
      try {
        const item = window.localStorage.getItem(key);

        return item ? JSON.parse(item) : initialValue;
      } catch (error) {
        console.log(error);
        return initialValue;
      }
    });

    const setValue = (value) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;

        setStoredValue(valueToStore);

        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.log(error);
      }
    };
    return [storedValue, setValue];
  }

  if (!products || !products.length) {
     props.getAllProducts()
  }
  if (!categories || !categories.length) {
    props.getAllCategories();
  }

  useEffect(() => {
    if ($) {
      $("#shop").addClass("active");
      $("textarea")
        .each(function () {
          this.setAttribute(
            "style",
            "height:" + this.scrollHeight + "px;overflow-y:hidden;"
          );
        })
        .on("input", function () {
          this.style.height = "auto";
          this.style.height = this.scrollHeight + "px";
        });
    }
  }, [ props, language, totalRedux, numItemsRedux, cartRedux, total]);

  return (
    <div id="myDiv">
      <button
        className="bg-black text-white d-none scrollTopButton"
        style={{ position: "fixed", top: "90%", left: "4%" }}
        onClick={scrollTopFunc}
      >
        Top
      </button>
      <Modal isShowing={isShowing} hide={toggle} />

      <div className="pageNuv ">
        {isTablet && <Hamborger history={props.history} />}

        {!isMobile && !isTablet && <TopPageDesktop />}
      </div>

      <div
        className="small_pageHeader "
        style={{ backgroundImage: `url(${headerBgImag})` }}
      ></div>

      <h4 className=" goldColor mt-2 text-center">{i18.t("menuTitle")}</h4>

      <ShabbatMenuSystem />
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    products: state.productReducer.products,
    categories: state.categoryReducer.categories,
    language: state.languageReducer.language,
    cartRedux: state.cartReducer.cartRedux,
    numItemsRedux: state.numItemsReducer.numItemsRedux,
    totalRedux: state.totalReducer.totalRedux,
    currentUser_: state.userReducer.currentUser_,
  };
};
const mapDispatchToProps = (dispatch) => ({
  getAllProducts: () => dispatch(actions.getAllProducts()),
  getAllCategories: () => dispatch(actions.getAllCategories()),
  setCartRedux: (x) => dispatch(actions.setCartRedux(x)),
  setNumItemsRedux: (x) => dispatch(actions.setNumItemsRedux(x)),
  setTotalRedux: (Total) => dispatch(actions.setTotalRedux(Total)),
  setUser: (user) => dispatch(actions.setUser(user)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ShabbatMenu);
// export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProductList))
