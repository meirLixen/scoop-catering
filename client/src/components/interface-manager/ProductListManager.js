import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import { connect } from "react-redux";
import Form from "react-bootstrap/Form";
import $ from "jquery";

import { actions } from "../../redux/actions/action";
import NewProduct from "../product/NewProduct";

import "../../App.css";

function ProductList_manager(props) {
  const [show, setShow] = useState(false);
  const [idToDelete, setIdToDelete] = useState();
  const handleClose = () => setShow(false);
  const { products } = props;
  const { categories } = props;
  const [data, setData] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [productToEdit] = useState();
  const [sortType, setSortType] = useState("hebrewName");

  if (!props.products || !props.products.length) {
    // props.getAllProducts()
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

  const editItem = async (product) => {
    $("#newId").val(product._id);
    $("#newName").val(product.name);
    $("#newHebrewName").val(product.hebrewName);
    $("#newDescription").val(product.description);
    $("#newHebrewDescription").val(product.hebrewDescription);
    $("#newPrice").val(product.price);
    $("#newCategory").val(product.categoryID);
    $("#newAvailable").prop(
      "checked",
      product.available === true ? false : true
    );
    $("#newDisplay").prop("checked", product.display === true ? false : true);
  };

  function openDeleteMoodal(id) {
    setShow(true);
    setIdToDelete(id);
  }
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
                  <option value="selectCategory">בחר קטגוריה</option>
                  {categories.map((category) => (
                    <option key={uuidv4()} value={category._id}>
                      {category.hebrewName}
                    </option>
                  ))}
                </Form.Select>
              </div>
              <div className="col-md-6">
                <input
                  placeholder="חפש מוצר"
                  className="w-100 inputOf_Search bg-transparent border-0 border-bottom border-dark"
                />
              </div>
            </div>
          </div>

          <Table className="w-100">
            <thead>
              <tr className="col-12 w-100" key={"header"}>
                <th
                  className="col-2 lableForm "
                  value="hebrewName"
                  id="hebrewName"
                  onClick={(e) => setSortType("hebrewName")}
                >
                  שם מוצר
                </th>
                <th
                  className=" col-2 lableForm"
                  value="price"
                  id="price"
                  onClick={(e) => setSortType("price")}
                >
                  {" "}
                  מחיר
                </th>
                <th
                  className=" col-2 lableForm"
                  value="available"
                  id="available"
                  onClick={(e) => setSortType("available")}
                >
                  מלאי
                </th>
                <th
                  className="col-3 lableForm"
                  value="createDate"
                  id="createDate"
                  onClick={(e) => setSortType("createDate")}
                >
                  עדכון אחרון
                </th>

                <th className="col-1 lableForm  "></th>
                <th className="col-1 lableForm  "></th>
              </tr>
            </thead>

            <tbody className="table-responsive">
              {categoryList.map((item) => (
                <React.Fragment key={uuidv4()}>
                  <tr className=" bg-white   col-12">
                    <td className=" border-0 col-2">{item.hebrewName}</td>
                    <td className=" border-0 col-2">
                      {parseFloat(item.price ? item.price : 0).toFixed(2)}{" "}
                      &#8362;
                    </td>
                    <td className=" border-0 col-2">
                      {item.available === true ? "במלאי" : "אזל מהמלאי"}
                    </td>
                    <td className=" border-0 col-3">{item.createDate}</td>
                    <td
                      className="border-0 bg-transparent col-1"
                      onClick={() => openDeleteMoodal(item._id)}
                    >
                      <i className="fas fa-trash-alt "></i>
                    </td>
                    <td
                      className="border-0 bg-transparent col-1"
                      onClick={() => editItem(item)}
                    >
                      ערוך
                    </td>
                  </tr>
                  <tr
                    className="bg-transparent"
                    style={{ height: "15px" }}
                  ></tr>
                </React.Fragment>
              ))}
            </tbody>
          </Table>
        </div>
        <div className="col-md-1 p-0"></div>
        <div className="col-md-4  NewProduct  p-3 pb-0 bg-light">
          <NewProduct product={productToEdit} />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    products: state.productReducer.products,
    categories: state.categoryReducer.categories,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getAllProducts: () => dispatch(actions.getAllProducts()),
  deleteProduct: (id) => dispatch(actions.deleteProduct(id)),
  updateProduct: (product) => dispatch(actions.updateProduct(product)),
  copyProduct: (id) => dispatch(actions.copyProduct(id)),
  getAllCategories: () => dispatch(actions.getAllCategories()),
  getProductByID: (id) => dispatch(actions.getProductByID(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductList_manager);

function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}

