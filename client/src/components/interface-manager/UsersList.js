import $ from "jquery";
import React, { Fragment, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import { connect } from "react-redux";
import "../../App.css";
import { actions } from "../../redux/actions/action";

function UsersList(props) {
  const [show, setShow] = useState(false);
  const [idToDelete] = useState();
  const handleClose = () => setShow(false);
  const { products, orders, users, categories } = props;

  const [data, setData] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [sortType] = useState("hebrewName");
  // const [isLoaded, setIsLoaded] = useState(false);
  // const [error, setError] = useState(null);

  if (!props.orders || !props.orders.length) {
    props.getAllOrders();
  }
  if (!users || !users.length) {
    props.getAllUsers();
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

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
   // props.deleteProduct(idToDelete);
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

        <div className=" productList  p-3 bg-light">
          {/* <button onClick={e => openForm()}>adddddd</button> */}
          <div className="row d-flex titles  mb-5">
            <div className="col-6  text-end">מס' לקוחות: {users.length}</div>
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
                  <option>מס' לקוח</option>
                  <option>מס' הזמנות</option>
                  <option>שם לקוח</option>
                  <option>דוא"ל</option>
                  <option>טלפון</option>
                  <option>טלפון נוסף</option>
                  <option>קוד קופון</option>
                </Form.Select>
              </div>
              <div className="col-md-6">
                <input
                  placeholder="חיפוש"
                  className="w-100 inputOf_Search bg-transparent border-0 border-bottom border-dark"
                />
              </div>
            </div>
          </div>

          <Table className="w-100">
            <thead>
              <tr className=" w-100 col-12" key={"header"}>
                <th className=" lableForm col-1" value="orderNum" id="orderNum">
                  מס'לקוח
                </th>

                <th className=" lableForm col-2" value="userName" id="userName">
                  מס' הזמנות
                </th>
                <th className=" lableForm col-2" value="userName" id="userName">
                  שם לקוח
                </th>
                <th className="  lableForm col-2" value="price" id="price">
                  {" "}
                  דוא"ל
                </th>
               
                <th
                  className=" lableForm col-1"
                  value="createDate"
                  id="createDate"
                >
                  טלפון
                </th>

                <th className=" lableForm  col-1">טלפון נוסף </th>

                <th className=" lableForm  col-1">קוד קופון </th>
                {/* <th className=' lableForm  col-1'>חשבונית</th> */}
              </tr>
            </thead>

            <tbody className="">
              {users.map((item, index) => (
                <Fragment key={index}>
                  <tr className=" bg-white  col-12 ">
                    <td className=" border-0 col-1 text-center">{index+1}</td>
                    <td className=" border-0 col-2">{item.orders.length}</td>
                    <td className=" border-0 col-2 text-center">
                      {item.fullName
                        ? item.fullName
                        : item.name
                        ? item.name
                        : item.firstName
                        ? item.firstName + " " + item.lastName
                        : ""}
                    </td>
                    <td className=" border-0 col-2">{item.email}</td>
                    <td className=" border-0 col-1">{item.phone}</td>
                    <td className=" border-0 col-1">
                      {item.anotherPhone ? item.anotherPhone : ""}
                    </td>

                    <td className=" border-0 col-1">
                      {item.codeCupon ? item.codeCupon : ""}
                    </td>

                    {/* <td className=' border-0'>{item.createDate}</td> */}
                  </tr>
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
    users: state.userReducer.users,
  };
};

const mapDispatchToProps = (dispatch) => ({
  deleteProduct: (id) => dispatch(actions.deleteProduct(id)),
  updateProduct: (product) => dispatch(actions.updateProduct(product)),
  copyProduct: (id) => dispatch(actions.copyProduct(id)),
  getAllOrders: () => dispatch(actions.getAllOrders()),
  getAllUsers: () => dispatch(actions.getAllUsers()),
  getProductByID: (id) => dispatch(actions.getProductByID(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UsersList);
