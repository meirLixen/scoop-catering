import React from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { connect } from "react-redux";
import "../../App.css";
import { actions } from "../../redux/actions/action";
import Orders from "./orders";
import OrderSummary from "./OrderSummary";
import ProductListManager from "./ProductListManager";
import UsersList from "./UsersList";
import CategoryListManager from "./CategoryList";
import MenuList from "./MenuList"
export function ManagerInterface(props) {
  return (
    <>
      <div className=" p-3">
        <div className="location pt-3  px-5 text-right rtl h5">
          <div
            className="d-inline btn-pointer"
            onClick={() => window.location = window.location.origin}
          >
            ScoopCatering
          </div>

          <div className="goldColor d-inline"> / ממשק מנהל </div>
        </div>
        <h1 className="mb-0">ממשק מנהל</h1>
        <Tabs
          defaultActiveKey="orders"
          transition={false}
          id="noanim-tab-example"
          dir="rtl"
        >
          {/* <Tab eventKey="home" title="ממשק מנהל" disabled>

                    </Tab> */}
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
          <Tab eventKey="menus" title="תפריטים">

            <Tabs
              defaultActiveKey="menuList"
              transition={false}
              id="noanim-tab-example"
              dir="rtl">
              <Tab eventKey="menuList" title="תפריטים">
               <MenuList/>
              </Tab>
              <Tab eventKey="categoryList" title="קטגוריות">
             <CategoryListManager/>
              </Tab>
              <Tab eventKey="productList" title="מוצרים">
                <ProductListManager />
              </Tab>

            </Tabs>



          </Tab>
          <Tab eventKey="users" title="משתמשים">
            <UsersList />
          </Tab>
        </Tabs>
      </div>
    </>
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
  getAllAmounts: () => dispatch(actions.getAllAmounts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ManagerInterface);
