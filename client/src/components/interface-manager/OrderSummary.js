import React, { useEffect, useState } from "react";
import $ from "jquery";
import { Table } from "react-bootstrap";
import { Preview, print } from "react-html2pdf";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

import { connect } from "react-redux";
import { actions } from "../../redux/actions/action";

import "../../App.css";

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
    const sortArray = (type) => {
      const types = {
        productId: "productId",
        amount: "amount",
      };
      const sortProperty = types[type];
      // eslint-disable-next-line
      const sorted = [...productsOnOrder].sort((a, b) => {
        if ([sortProperty] !== "" && [sortProperty] !== undefined) {
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
            <Tab key={uuidv4()} eventKey={category._id} title={category.hebrewName}>
              <Preview id={"to" + category._id}>
                <div className="m-3"> סיכום הזמנות</div>

                <div className="col-md-12 productList ">
                  <Table bordered hover size="sm" className="w-50 m-auto">
                    <thead>
                      <tr>
                        <th onClick={(e) => setSortType("amount")}>כמות</th>
                        <th onClick={(e) => setSortType("productId")}>מוצר</th>
                      </tr>
                    </thead>

                    <tbody id="tableBody">
                      {data &&
                        data
                          .filter(
                            (item) => item.productId.categoryID === category._id
                          )
                          .map((item) => (
                            <React.Fragment key={uuidv4()}>
                              <tr key={item._id} id={item._id}>
                                <td>{item.amount}</td>
                                <td>{item.productId.hebrewName}</td>
                              </tr>
                            </React.Fragment>
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
    </>
  );
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
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderSummary);
function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}
