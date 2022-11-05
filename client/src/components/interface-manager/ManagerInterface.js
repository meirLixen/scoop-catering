import React from "react";
import { connect } from "react-redux";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

import { actions } from "../../redux/actions/action";
import ProductListManager from "./ProductListManager";
import OrderSummary from "./OrderSummary";
import Orders from "./orders";

import "../../App.css";

export function ManagerInterface(props) {
  return (
    <div className="container p-3">
      <h1 className="mb-0">ממשק מנהל</h1>
      <Tabs
        defaultActiveKey="orders"
        transition={false}
        id="noanim-tab-example"
        dir="rtl"
      >
        <Tab eventKey="orders" title="הזמנות">
          <Tabs
            defaultActiveKey="orderList"
            transition={false}
            id="noanim-tab-example"
            dir="rtl"
          >
            <Tab eventKey="orderList" title="הזמנות">
              <Orders />
            </Tab>
            <Tab eventKey="OrderSummary" title="סיכום הזמנות">
              <OrderSummary />
            </Tab>
          </Tabs>
        </Tab>
        <Tab eventKey="products" title="מוצרים">
          <ProductListManager />
        </Tab>
        <Tab eventKey="users" title="משתמשים">
          moshe
        </Tab>
      </Tabs>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    products: state.productReducer.products,
    categories: state.categoryReducer.categories,
    amounts: state.amountReducer.amounts,
  };
};

const mapDispatchToProps = (dispatch) => ({
  createProduct: (product) => dispatch(actions.createProduct(product)),
  getAllCategories: () => dispatch(actions.getAllCategories()),
  getAllAmounts: () => dispatch(actions.getAllAmounts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ManagerInterface);
