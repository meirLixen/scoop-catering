import React, { useEffect, useState } from "react";

import { Formik, Form, Field } from "formik";
import { connect } from "react-redux";
import { actions } from "../../redux/actions/action";
// import { Form } from 'react-bootstrap';
import "../../App.css";
import $ from "jquery";
import Modal from "react-bootstrap/Modal";

// import Form from 'react-bootstrap/Form'

export function NewProduct(props, { product }) {

  let temp = 0

  let [deletedPrices, setdeletedPrices] = useState([])
  const [show, setShow] = useState(false);
  const [count, setCount] = useState(0);


  const handleClose = () => setShow(false);
  // const [names, setNames] = useState([]);

  // const [checked, setChecked] = useState(true);
  const { categories } = props;
  const { amounts } = props;
  if (!categories || !categories.length) {
    props.getAllCategories();
  }
  if (!amounts || !amounts.length) {
    props.getAllAmounts();
  }

  useEffect(() => {
    if ($) {
      // $(".saveProduct").on("click", function () {
      //     console.log("save");
      //     $('#newName').val('')
      //     $('#newDescription').val('')
      //     $('#newStatus').val('')
    }
  }, []);
  // const { createProduct } = props
  const onSubmit = async (fields) => {

    console.log(fields);
    // event.preventDefault();
    var priceList = []

    var result = Object.entries(fields);
    var amount = "", price = ""

    let res = result.filter(item => !deletedPrices.includes(item[0]))

    res.map((item, index) => {

      if (res[index][0].startsWith('amountId'))
        amount = res[index][1]

      if (res[index][0].startsWith('price'))
        price = res[index][1]

      if (amount != "" && price != "") {
        priceList[temp] = {
          "amount": amount,
          "price": price
        }
        amount = ""
        price = ""
        temp++;
      }

    })
    console.log("priceList", priceList);
    const newProduct = {

      name: fields.name,
      hebrewName: fields.hebrewName,
      details: fields.description,
      hebrewDetails: fields.hebrewDescription,
      categoryID: fields.categoryId,
      outOfStock: fields.outOfStock,
      display: fields.display,
      recommended: fields.recommended,
      priceList: priceList
    }


    //const product = await props.createProduct(newProduct)

    setShow(true);
    window.setTimeout(function () {
      setShow(false);
    }, 5000);

    // clear all input values in the form
    document.getElementById("productForm").reset();

  }

  function addPrice(index) {
    return (
      <div className="d-flex  row align-items-center pl-2" id={"productPrice" + index}>

        <div className="form-group col-6">
          <lable className="lableForm">כמות:</lable>
          <Field
            as="select"
            name={"amountId" + index}
            id={"newAmount" + index}
            className="browser-default custom-select  rounded-0"
          >
            <option value={""}>

            </option>
            {amounts.map((amount) => (
              <option key={amount._id} value={amount._id}>
                {amount.hebrewName}
              </option>
            ))}
          </Field>
        </div>

        <div className="form-group col-4">
          <lable className="lableForm">מחיר:</lable>
          <Field
            id={"newPrice" + index}
            className="form-control rounded-0 newPrice1_"
            type="text"
            name={"price" + index}
          />
        </div>
        <div className="col-2 mt-2">
          <button type="button" onClick={() => removePrice("productPrice" + index)} style={{ fontSize: '19px' }}>x</button>
        </div>
      </div>

    )

  }
  function removePrice(elemntId) {
    debugger
    if (elemntId) {
      let tempArray = deletedPrices
      const myArray = elemntId.split("productPrice");
      const currentID = myArray[1]
      tempArray.push("amountId" + currentID)
      tempArray.push("price" + currentID)
      setdeletedPrices(tempArray)
      document.getElementById(elemntId) && document.getElementById(elemntId).remove();


    }

  }
  const handleSubmit = async (values) => {
    alert(values.name);

    if (values.Id === "") alert("add");
    else alert("edit");

    // closeForm()

    // const product = await props.createProduct(newProduct)
    setShow(true);
    window.setTimeout(function () {
      setShow(false);
    }, 5000);
    // alert("added successfully")
  };

  return (
    <>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center border-0">
          המוצר התווסף בהצלחה
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center"></Modal.Footer>
      </Modal>
      <h4 className="px-4 text-end font-weight-bold">פרטי המוצר:</h4>

      <Formik
        initialValues={{
          Id: "",
          name: " ",
          hebrewName: "",
          description: " ",
          hebrewDescription: " ",
          categoryId: " ",
          outOfStock: false,
          display: true,
          recommended: false,
        }}
        onSubmit={onSubmit}
      >
        {() => (
          <Form className="" style={{ height: "590px" }} id="productForm">
            <div className=" px-4 overflow-auto" style={{ height: "560px" }}>
              <div className="text-end">
                <div className="form-group">
                  <Field
                    id="newId"
                    className="form-control rounded-0 newId_"
                    type="hidden"
                    name="Id"
                    pl
                  />
                </div>

                <div className="form-group">
                  <lable className="lableForm">שם מוצר:</lable>
                  <Field
                    id="newName"
                    className="form-control rounded-0 newName_"
                    type="text"
                    name="name"
                    pl
                  />
                </div>
                <div className="form-group">
                  <lable className="lableForm">שם מוצר(HE):</lable>
                  <Field
                    id="newHebrewName"
                    className="form-control rounded-0 newHebrewName_"
                    type="text"
                    name="hebrewName"
                    pl
                  />
                </div>

                <div className="form-group">
                  <lable className="lableForm">תאור מוצר:</lable>
                  <Field
                    id="newDescription"
                    className="form-control rounded-0 newDescription_"
                    type="text"
                    name="description"
                  />
                </div>
                <div className="form-group">
                  <lable className="lableForm">תאור מוצר(HE):</lable>
                  <Field
                    id="newHebrewDescription"
                    className="form-control rounded-0 newHebrewDescription_"
                    type="text"
                    name="hebrewDescription"
                  />
                </div>
                {/* <div className="pricesDiv"> */}
                <div className="d-flex  row align-items-center pl-2" id="productPrice">

                  <div className="form-group col-6">
                    <lable className="lableForm">כמות:</lable>
                    <Field
                      as="select"
                      name="amountId"
                      id="newAmount"
                      className="browser-default custom-select  rounded-0"
                    >
                      <option value={""}>

                      </option>
                      {amounts.map((amount) => (
                        <option key={amount._id} value={amount._id}>
                          {amount.hebrewName}
                        </option>
                      ))}
                    </Field>
                  </div>

                  <div className="form-group col-4">
                    <lable className="lableForm">מחיר:</lable>
                    <Field
                      id="newPrice"
                      className="form-control rounded-0 newPrice_"
                      type="text"
                      name="price"
                    />
                  </div>

                  <div className="col-2 mt-2">
                    <button type="button" onClick={() => setCount(count + 1)} style={{ fontSize: '19px' }}>+</button>
                    {/* <button type="button" onClick={()=>removePrice("productPrice")}>x</button> */}
                  </div>

                </div>
                {/* </div> */}

                {[...Array(count)].map((_, i) => addPrice(i))}


                <div className="form-group">
                  <lable className="lableForm">קטגוריה:</lable>
                  <Field
                    as="select"
                    name="categoryId"
                    id="newCategory"
                    className="browser-default custom-select  rounded-0"
                  >
                    <option value={""}>

                    </option>
                    {categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.hebrewName}
                      </option>
                    ))}
                  </Field>
                </div>
                <div className="form-group row d-flex     justify-content-around; mr-1">
                  <div className="col-4 align-items-center  d-flex p-0">
                    <Field
                      type="checkbox"
                      name="outOfStock"
                      id="newOutOfStock"
                      className=""
                    />
                    <lable className="mr-1 lableForm my-0">חסר במלאי</lable>
                  </div>

                  <div className="col-5 p-0 align-items-center justify-content-center d-flex">
                    <Field
                      type="checkbox"
                      name="display"
                      id="newDisplay"
                      className=""
                    />
                    <lable className="mr-1 lableForm my-0">תצוגה באתר</lable>
                  </div>
                  <div className="col-2 p-0 align-items-center justify-content-center d-flex">
                    <Field
                      type="checkbox"
                      name="recommended"
                      id="newRecommended"
                      className=""
                    />
                    <lable className="mr-1 lableForm my-0">מומלץ</lable>
                  </div>

                </div>

              </div>
            </div>
            <form action="/single" method="POST" enctype="multipart/form-data">
              <input type="file" name="image" />
              <button type="submit">Upload</button>
            </form>
            <button
              className="btn goldButton "
              id="addProduct"
              type="submit"
            >
              העלה מוצר
            </button>
            {/* <button className="btn    goldButton " id="editProduct" type="submit" >עדכן מוצר</button> */}

          </Form>

        )}
      </Formik>
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
  getAllCategories: () => dispatch(actions.getAllCategories()),
  getAllAmounts: () => dispatch(actions.getAllAmounts()),
});
export default connect(mapStateToProps, mapDispatchToProps)(NewProduct);
