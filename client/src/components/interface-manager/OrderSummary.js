import $ from "jquery";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { Preview, print } from "react-html2pdf";
import { connect } from "react-redux";
import "../../App.css";
import { actions } from "../../redux/actions/action";
import Form from "react-bootstrap/Form";
function OrderSummary(props) {
  const { productsOnOrder, menus } = props;
  const [data, setData] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState("selectMenu")
  const [sortType, setSortType] = useState("productId");

  if (!props.productsOnOrder || !props.productsOnOrder.length) {
    props.getAllProductsOnOrder();
  }

  const { categories } = props;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])


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

  // if (error) {
  //   return <div>Error: {error.message}</div>;
  // } else if (!isLoaded) {
  //   return <div>Loading...</div>;
  // } else {
  return (
    <>
      <Form.Select
        aria-label="Default select example"
        className="rounded-0  py-1 my-4 mr-4 col-2 ml-auto rtl"
        required
        onChange={e => setSelectedMenu(e.target.value)}
      >
        <option value="selectMenu">בחר תפריט</option>
        {menus.map((menu) => (
          <option key={menu._id} value={menu._id} >
            {menu.hebrewName}
          </option>
        ))}
      </Form.Select>
      <Tabs
        defaultActiveKey={categories[0] && categories[0]._id}
        transition={false}
        id="noanim-tab-example"
        dir="rtl"
      >
        {categories &&
          categories.length &&
          categories.map((category) => (
            <Tab eventKey={category._id} title={category.hebrewName} >
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
                onClick={() => print(category.hebrewName, "to" + category._id)}
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
    menus: state.menuReducer.menus,
  };
};
const mapDispatchToProps = (dispatch) => ({
  getAllProductsOnOrder: () => dispatch(actions.getAllProductsOnOrder()),
});
export default connect(mapStateToProps, mapDispatchToProps)(OrderSummary);
