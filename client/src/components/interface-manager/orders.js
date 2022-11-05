import React, { useEffect, useState, Fragment } from "react";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import $ from "jquery";

import { connect } from "react-redux";
import { actions } from "../../redux/actions/action";

import "../../App.css";

function Orders(props) {
  const [show, setShow] = useState(false);
  const [idToDelete] = useState();
  const handleClose = () => setShow(false);
  const { products, orders } = props;
  const { categories } = props;
  const [data, setData] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [sortType] = useState("hebrewName");

  if (!props.products || !props.products.length) {
    // props.getAllProducts()
  }
  if (!props.orders || !props.orders.length) {
    props.getAllOrders();
  }
  if (!categories || !categories.length) {
    props.getAllCategories();
  }

  useEffect(() => {
    const sortArray = (type) => {
      const types = {
        hebrewName: "hebrewName",
        description: "description",
        available: "available",
      };
      const sortProperty = types[type];
      // eslint-disable-next-line
      const sorted = [...products].sort((a, b) => {
        var regex = /^[a-zA-Z]+$/;
        if ([sortProperty] !== "" && [sortProperty] !== undefined) {
          if (
            a[sortProperty] === true ||
            b[sortProperty] === true ||
            b[sortProperty] === false ||
            a[sortProperty] === false
          ) {
            return a[sortProperty] - b[sortProperty];
          } else if (sortProperty.match(regex)) {
            return a[sortProperty].localeCompare(b[sortProperty]);
          } else {
            return b[sortProperty] - a[sortProperty];
          }
        }
      });
      setData(sorted);
      setCategoryList(data);
    };

    sortArray(sortType);

    if ($) {
      $(".clearButton").on("click", function () {
        $(this).siblings().val("");
        $(this).addClass("d-none");
      });

      $(".itemInput").on("input", function () {
        $(this).siblings().removeClass("d-none");

        if ($(this).val() === "") {
          $(this).siblings().addClass("d-none");
        }
      });
    }
    // eslint-disable-next-line
  }, []);

  const changeCategory = async (event) => {
    let categoryId = event.target.value;
    if (categoryId === "selectCategory") setCategoryList(data);
    else {
      let list = await data.filter((x) => {
        return x.categoryID === categoryId;
      });
      setCategoryList(list);
    }
  };

  function deleteProduct() {
    props.deleteProduct(idToDelete);
    setShow(false);
  }

  return (
    <div className="container   pb-0">
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton className="rtl">
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center border-0">
          ?האם אתה בטוח כי ברצונך למחוק מוצר זה לצמיתות
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
          <Button variant=" secondary" className="" onClick={handleClose}>
            לא
          </Button>
          <Button className="btn goldButton " onClick={deleteProduct}>
            כן
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="row  rtl mt-2" style={{ height: "800px !important" }}>
        <div className=" productList col-md-7 p-3 bg-light">
          <div className="row d-flex titles  mb-5">
            <div className="col-6  text-end">
              מוצרים: {categoryList.length} מוצרים
            </div>
            <div className="col-6 text-start row d-flex">
              <div className="col-md-6">
                <Form.Select
                  aria-label="Default select example"
                  className="rounded-0 w-fitCon py-1"
                  required
                  onChange={(e) => changeCategory(e)}
                >
                  <option value="selectCategory">סינון לפי</option>
                  {categories.map((category) => (
                    <option key={uuidv4()} value={category._id}>
                      {category.hebrewName}
                    </option>
                  ))}
                </Form.Select>
              </div>
              <div className="col-md-6">
                <input
                  placeholder="חפש הזמנה"
                  className="w-100 inputOf_Search bg-transparent border-0 border-bottom border-dark"
                />
              </div>
            </div>
          </div>

          <Table className="w-100">
            <thead>
              <tr className=" w-100 col-12" key={"header"}>
                <th className=" lableForm col-2" value="orderNum" id="orderNum">
                  מס' הזמנה
                </th>

                <th className=" lableForm col-2" value="userName" id="userName">
                  שם לקוח
                </th>
                <th className="  lableForm col-2" value="price" id="price">
                  {" "}
                  סכום
                </th>
                <th
                  className=" lableForm col-2"
                  value="available"
                  id="available"
                >
                  עיר
                </th>
                <th
                  className=" lableForm col-1"
                  value="createDate"
                  id="createDate"
                >
                  כתובת משלוח
                </th>

                <th className=" lableForm  col-3">תאריך הזמנה</th>
                <th className=" lableForm  col-1">אמצעי תשלום</th>
              </tr>
            </thead>

            <tbody className="table-responsive">
              {orders.map((item, index) => (
                <Fragment key={uuidv4()}>
                  <tr className=" bg-white  col-12 ">
                    <td className=" border-0 col-2">208090</td>
                    <td className=" border-0 col-2">{item.userId.firstName}</td>
                    <td className=" border-0 col-2">
                      {item.CostToPay} &#8362;
                    </td>
                    <td className=" border-0 col-2">{item.city}</td>
                    <td className=" border-0 col-1">{item.shippingAddress}</td>
                    <td className=" border-0 col-3">{item.date}</td>
                    <td className=" border-0 col-1">{item.MethodsOfPayment}</td>
                  </tr>
                  <tr
                    className="bg-transparent"
                    style={{ height: "15px" }}
                  ></tr>
                </Fragment>
              ))}
            </tbody>
          </Table>
        </div>
        <div className="col-md-1 p-0"></div>
      </div>
    </div>
  );
  // }
}

const mapStateToProps = (state) => {
  return {
    products: state.productReducer.products,
    categories: state.categoryReducer.categories,
    orders: state.orderReducer.orders,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getAllProducts: () => dispatch(actions.getAllProducts()),
  deleteProduct: (id) => dispatch(actions.deleteProduct(id)),
  updateProduct: (product) => dispatch(actions.updateProduct(product)),
  copyProduct: (id) => dispatch(actions.copyProduct(id)),
  getAllCategories: () => dispatch(actions.getAllCategories()),
  getAllOrders: () => dispatch(actions.getAllOrders()),
  getProductByID: (id) => dispatch(actions.getProductByID(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}
