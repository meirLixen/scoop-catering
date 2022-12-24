import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { actions } from "../../redux/actions/action";
import { Table } from "react-bootstrap";
// import Example from '../Example';
import { Preview, print } from "react-html2pdf";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
//render
import "../../App.css";
import $ from "jquery";
function OrderSummary(props) {
  const { productsOnOrder } = props;
  const [data, setData] = useState([]);
  const [sortType, setSortType] = useState("productId");

  if (!props.productsOnOrder || !props.productsOnOrder.length) {
    props.getAllProductsOnOrder();
  }
 
  const { categories } = props;
  if (!categories || !categories.length) {
    props.getAllCategories();
  }
  useEffect(() => {
    // console.log(productsOnOrder[0].productId.name);
    const sortArray = (type) => {
      const types = {
        productId: "productId",
        amount: "amount",
      };
      const sortProperty = types[type];
      // eslint-disable-next-line
      const sorted = [...productsOnOrder].sort((a, b) => {
        if ([sortProperty] !== "" && [sortProperty] !== undefined) {
          console.log("::" + a[sortProperty] + b[sortProperty]);

          if (sortProperty === "productId") {
            return a[sortProperty].hebrewName.localeCompare(
              b[sortProperty].hebrewName
            );
          } else {
            return a[sortProperty] - b[sortProperty];
          }
        }
      });
      setData(sorted);
    };

    sortArray(sortType);

    if ($) {
    }
    // eslint-disable-next-line
  }, []);
  // }, [props]);

  // if (error) {
  //   return <div>Error: {error.message}</div>;
  // } else if (!isLoaded) {
  //   return <div>Loading...</div>;
  // } else {
  return (
    <>
      <Tabs
        defaultActiveKey="home"
        transition={false}
        id="noanim-tab-example"
        dir="rtl"
      >
        {categories &&
          categories.length &&
          categories.map((category) => (
            <Tab eventKey={category._id} title={category.hebrewName}>
              <Preview id={"to" + category._id}>
                <div className="m-3"> סיכום הזמנות : {category.hebrewName}</div>

                <div className="col-md-12 productList ">
                  <Table bordered hover size="sm" className="w-50 m-auto">
                    <thead>
                      <tr>
                        <th onClick={(e) => setSortType("amount")}>כמות</th>
                        <th onClick={(e) => setSortType("productId")}>מוצר</th>
                      </tr>
                    </thead>

                    <tbody id="tableBody">
                      {productsOnOrder &&
                        productsOnOrder
                          .filter(
                            (item) => item.productId.categoryID === category._id
                          )
                          .map((item) => (
                            <>
                              <tr key={item._id} id={item._id}>
                                <td>{item.amount}</td>
                                <td>{item.productId.hebrewName}</td>
                              </tr>
                            </>
                          ))}
                    </tbody>
                  </Table>
                </div>
              </Preview>

              <button
                className="mt-3"
                onClick={() => print("a", "to" + category._id)}
              >
                {" "}
                הורדה{" "}
              </button>
            </Tab>
          ))}
      </Tabs>

      {/* <Example Foo={$('.smO').text()} /> */}
    </>
  );
  // }
}
const mapStateToProps = (state) => {
  return {
    categories: state.categoryReducer.categories,
    productsOnOrder: state.productsOnOrderReducer.productsOnOrder,
  };
};
const mapDispatchToProps = (dispatch) => ({
  getAllCategories: () => dispatch(actions.getAllCategories()),
  getAllProductsOnOrder: () => dispatch(actions.getAllProductsOnOrder()),

  // createProduct: (product) => dispatch(actions.createProduct(product)),
  // deleteProduct: (id) => dispatch(actions.deleteProduct(id)),
  // updateProduct: (product) => dispatch(actions.updateProduct(product)),
  // copyProduct: (id) => dispatch(actions.copyProduct(id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(OrderSummary);
