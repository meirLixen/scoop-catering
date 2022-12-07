import React, { useEffect, useState, Fragment } from "react";

import { connect } from "react-redux";
// import { withRouter } from 'react-router-dom';
import { actions } from "../../redux/actions/action";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
// import { Formik, Field, Select, Form } from 'formik';
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
// import BootstrapTable from 'react-bootstrap-table-next';
// omit...
import "../../App.css";
import $ from "jquery";

function Orders(props) {
  // const [isAddMode, setIsAddMode] = useState(true);

  const [show, setShow] = useState(false);
  const [idToDelete] = useState();
  const handleClose = () => setShow(false);
  const { products, orders } = props;
  const { categories } = props;
  const [data, setData] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [sortType] = useState("hebrewName");
  // const [isLoaded, setIsLoaded] = useState(false);
  // const [error, setError] = useState(null);

  if (!props.products || !props.products.length) {
    props.getAllProducts()
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
        outOfStock: "outOfStock",
      };
      const sortProperty = types[type];
      // if (categoryList.length)
      //   setCategoryList(products)
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
          }
          // if (a[sortProperty] !== "" && a[sortProperty] !== undefined && b[sortProperty] !== "" && b[sortProperty] !== undefined)
          else if (sortProperty.match(regex)) {
            console.log(sortProperty);
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

    console.log("list:::::::::::" + categoryList.length);
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
      {/* <h1>ממשק מנהל</h1> */}
      <div className="row  rtl mt-2" style={{ height: "800px !important" }}>
        {/* <Search details={products} /> */}

        <div className=" productList col-md-9 p-3 bg-light">
          {/* <button onClick={e => openForm()}>adddddd</button> */}
          <div className="row d-flex titles  mb-5">
            <div className="col-6  text-end">
              מס' הזמנות: {orders.filter(order => order.status !== 'done').length}
            </div>
            <div className="col-6 text-start row d-flex">
              <div className="col-md-6">
                {/* <Form.Label className="mb-1 lableForm"></Form.Label> */}
                <Form.Select
                  aria-label="Default select example"
                  className="rounded-0 w-fitCon py-1"
                  required
                  onChange={(e) => changeCategory(e)}
                >
                  <option value="selectCategory">סינון לפי</option>
                  <option>
                    מס' הזמנה
                  </option>
                  <option>
                    שם לקוח
                  </option>
                  <option >
                    סכום
                  </option>
                  <option >
                    עיר
                  </option>
                  <option >
                    כתובת משלוח
                  </option>
                  <option>
                    תאירך הזמנה
                  </option>
                  <option >
                    אמצעי תשלום
                  </option>

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
                <th className="  lableForm col-1" value="price" id="price">
                  {" "}
                  סכום
                </th>
                <th
                  className=" lableForm col-1"
                  value="outOfStock"
                  id="outOfStock"
                >
                  עיר
                </th>
                <th
                  className=" lableForm col-2"
                  value="createDate"
                  id="createDate"
                >
                  כתובת משלוח
                </th>

                <th className=" lableForm  col-2">תאריך הזמנה</th>
                <th className=" lableForm  col-2">אמצעי תשלום</th>
                {/* <th className=' lableForm  col-1'>חשבונית</th> */}
              </tr>
            </thead>

            <tbody className="table-responsive">
              {orders.map((item, index) => item.status !== 'done' && (

                <Fragment key={index}>
                  <tr className=" bg-white  col-12 ">
                    <td className=" border-0 col-2">208090</td>
                    <td className=" border-0 col-2">{item.userId.fullName}</td>
                    <td className=" border-0 col-1">
                      {item.CostToPay} &#8362;
                    </td>
                    <td className=" border-0 col-1">{item.city}</td>
                    <td className=" border-0 col-2">{item.shippingAddress}</td>
                    <td className=" border-0 col-2">{item.date}</td>
                    <td className=" border-0 col-2">{item.MethodsOfPayment}</td>
                    {/* <td className=' border-0'>{item.createDate}</td> */}
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
        <div className="col-md-3 p-0">gvbhj</div>
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
  // createProduct: (product) => dispatch(actions.createProduct(product)),
  deleteProduct: (id) => dispatch(actions.deleteProduct(id)),
  updateProduct: (product) => dispatch(actions.updateProduct(product)),
  copyProduct: (id) => dispatch(actions.copyProduct(id)),
  getAllCategories: () => dispatch(actions.getAllCategories()),
  getAllOrders: () => dispatch(actions.getAllOrders()),

  getProductByID: (id) => dispatch(actions.getProductByID(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
// export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProductList))
