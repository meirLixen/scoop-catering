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
  const [show, setShow] = useState(false);

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
      //     $('#newName').val('')
      //     $('#newDescription').val('')
      //     $('#newStatus').val('')
    }
  }, [props, props.products, props.categories, props.amounts, $, product]);
  // const { createProduct } = props
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
          price: " ",
          category: " ",
          available: false,
          display: false,
        }}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className=" px-4 overflow-auto" style={{ height: "590px" }}>
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
              <div className="form-group">
                <lable className="lableForm">מחיר:</lable>
                <Field
                  id="newPrice"
                  className="form-control rounded-0 newPrice_"
                  type="text"
                  name="price"
                />
              </div>

              <div className="form-group">
                <lable className="lableForm">קטגוריה:</lable>
                <Field
                  as="select"
                  name="category"
                  id="newCategory"
                  className="browser-default custom-select  rounded-0"
                >
                  {categories.map((category) => (
                    <option key={uuidv4()} value={category._id}>
                      {category.hebrewName}
                    </option>
                  ))}
                </Field>
              </div>
              <div className="form-group row d-flex">
                <div className="col-5 align-items-center  d-flex">
                  <Field
                    type="checkbox"
                    name="available"
                    id="newAvailable"
                    className="mt-1"
                  />
                  <lable className="mr-1 lableForm">חסר במלאי</lable>
                </div>

                <div className="col-6 p-0 align-items-center justify-content-center d-flex">
                  <Field
                    type="checkbox"
                    name="display"
                    id="newDisplay"
                    className="mt-1"
                  />
                  <lable className="mr-1 lableForm">הסר תצוגה מהאתר</lable>
                </div>
              </div>
              {/* <br /> */}
              {/* <div id="amountsAndPrices">
                            <div className="form-group form-row">
                                <div className='col-md-5'>
                                    <lable>Price:</lable>
                                    <Field id="newPrice" className="form-control" type="text" name="price" />
                                </div>
                                <div className='col-md-5'>
                                    <lable>amount:</lable>
                                    <Field id="newAmount" as="select" name="amount" className="form-control"

                                        className="browser-default custom-select">
                                        {
                                            amounts.map((amount) => <option key={amount._id} value={amount._id}>{amount.name}
                                            </option>)
                                        }
                                    </Field>

                                </div>
                                <div className='col-md-2 ' style={{ marginTop: '2%' }}>
                                    <button type='button' onClick={newPrice}>add price</button>
                                </div>

                            </div>
                            {prices.length !== 0 ? renderNewPrice() : <React.Fragment />}
                        </div>
                         */}
              {/* <lable className="mr-1 lableForm ">קטגוריות נוספות</lable>

                            <MultipleSelect list={categories} /> */}
            </div>

            <button
              className="btn    goldButton "
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

function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}
