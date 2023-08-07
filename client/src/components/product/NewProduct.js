import axios from 'axios';
import $ from 'jquery'
import { Field, Form, Formik } from "formik";
import React, { useState, useEffect } from "react";
import Select from 'react-select';
import { connect } from "react-redux";
import { actions } from "../../redux/actions/action";
// import { Form } from 'react-bootstrap';
import Modal from "react-bootstrap/Modal";
import api from "../../api";
import "../../App.css";


// import Form from 'react-bootstrap/Form'
const baseURL = window.location.origin + "/"
export function NewProduct(props) {
  let temp = 0;
  let menuOption = []
  let [deletedPrices, setdeletedPrices] = useState([]);
  const [show, setShow] = useState(false);
  const [count, setCount] = useState(0);
  const [selectedOption, setSelectedOption] = useState([]);
  useEffect(() => {
    if (props.action == "edit") {
      if (props.product && props.product.img) {
        setFile(props.product.img);
        setImage(baseURL + props.product.img);
      }
      else {
        setFile("generalProduct.png");
        setImage(baseURL + "generalProduct.png");
      }
    }
    else {
      setFile("generalProduct.png");
      setImage(baseURL + "generalProduct.png");
    }
    if (!selectedOption || !selectedOption.length) {
      var newMenuList = []

      props.product && props.product.menus.map((menuID) => {
        menus.map((menu) => {
          if (menuID == menu._id)
            newMenuList.push({ value: menu._id, label: menu.hebrewName })
        })

      })
      setSelectedOption(newMenuList)
    }


  }, [])



  // handle onChange event of the dropdown
  const handleChange = e => {
    setSelectedOption(e);
  }
  const handleClose = () => setShow(false);
  // const [names, setNames] = useState([]);

  // const [checked, setChecked] = useState(true);
  const { categories, menus, amounts } = props;


  if (!amounts || !amounts.length) {
    props.getAllAmounts();
  }
  if (!menuOption || !menuOption.length) {

    menus.map((menu) => (
      menuOption.push({ value: menu._id, label: menu.hebrewName })

    ))


  }
  // const { createProduct } = props

  const onSubmit = async (fields) => {
    debugger
    // event.preventDefault();
    var priceList = [];
    var result = Object.entries(fields);
    var amount = "",
      price = "";

    let res = result.filter((item) => !deletedPrices.includes(item[0]));

    res.map((item, index) => {
      if (res[index][0].startsWith("amountId")) amount = res[index][1];

      if (res[index][0].startsWith("price")) price = res[index][1];

      if (amount != "" && price != "") {
        priceList[temp] = {
          amount: amount,
          price: price,
        };
        amount = "";
        price = "";
        temp++;
      }

    });
    var menuList = []
    selectedOption.map((x) => {
      menuList.push(x.value)
    })
    if (props.action == "edit") {
      const updateProduct = {
        _id: fields.Id,
        name: fields.name,
        hebrewName: fields.hebrewName,
        details: fields.description,
        hebrewDetails: fields.hebrewDescription,
        categoryID: fields.categoryId,
        outOfStock: fields.outOfStock,
        display: fields.display,
        recommended: fields.recommended,
        priceList: priceList,
        menus: menuList,
        img: file && file

      }

      //props.updateProduct(updateProduct)
      document.getElementById("editMessage").style.display = "block"
      //close popup
    }
    else {
      const newProduct = {
        _id: fields.Id,
        name: fields.name,
        hebrewName: fields.hebrewName,
        details: fields.description,
        hebrewDetails: fields.hebrewDescription,
        categoryID: fields.categoryId,
        outOfStock: fields.outOfStock,
        display: fields.display,
        recommended: fields.recommended,
        priceList: priceList,
        menus: menuList,
        img: file && file

      }

      // const product = await props.createProduct(newProduct)
      document.getElementById("addMessage").style.display = "block"
      window.scrollBy(0, 50)
      //close popup
    }


    //add product



    // // clear all input values in the form
    // document.getElementById("productForm").reset();

    // if (file !== null) {
    //   const formData = new FormData();
    //   formData.append("photo", file);
    //   const config = {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //     }
    //   }
    //   api
    //     .post("/upload/", formData, config).then((response) => {
    //       console.log('Image Uploaded Successfully!!', response);
    //       // alert('Image Uploaded Successfully!!')
    //     }).catch((err) => {
    //       console.log('err ', err);
    //     })
    // }
    //end add product
  }

  function addPrice(index) {
    return (
      <div
        className="d-flex  row align-items-center pl-2"
        id={"productPrice" + index}
      >
        <div className="form-group col-6">
          <lable className="lableForm">כמות:</lable>
          <Field
            as="select"
            name={"amountId" + (index + 1)}
            id={"newAmount" + (index + 1)}
            className="browser-default custom-select  rounded-0"
          >
            <option value={""}></option>
            {amounts.map((amount) => (
              <option key={amount._id} value={JSON.stringify(amount)}>
                {amount.hebrewName}
              </option>
            ))}
          </Field>
        </div>

        <div className="form-group col-4">
          <lable className="lableForm">מחיר:</lable>
          <Field
            id={"newPrice" + (index + 1)}
            className="form-control rounded-0 newPrice1_"
            type="text"
            name={"price" + (index + 1)}
          />
        </div>
        <div className="col-2 mt-2">
          <button
            type="button"
            onClick={() => removePrice("productPrice" + index)}
            style={{ fontSize: "19px" }}
            id={"ButtonNewPrice" + (index + 1)}
          >
            x
          </button>
        </div>
      </div>
    );
  }
  function removePrice(elemntId) {
    if (elemntId) {
      let tempArray = deletedPrices;
      const myArray = elemntId.split("productPrice");
      const currentID = myArray[1];
      tempArray.push("amountId" + currentID);
      tempArray.push("price" + currentID);
      setdeletedPrices(tempArray);
      document.getElementById(elemntId) &&
        document.getElementById(elemntId).remove();
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
  const [file, setFile] = useState(null);
  const [image, setImage] = useState('http://localhost:3001/image1.png');
  const [name, setname] = useState();
  const [hebrewName, setHebrewName] = useState();
  const [categoryId, setCategoryId] = useState();
  const onFormSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("photo", file);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    }
    const url = "http://localhost:3001/upload"

    axios.post(url, formData, config).then((response) => {
      console.log('response upload', response);
      // alert('Image Uploaded Successfully!!')
    }).catch((err) => {
      console.log('err ', err);
    })


  };

  const onInputChange = async (e) => {
    setFile(e.target.files[0]);
    setImage(URL.createObjectURL(e.target.files[0]))

  };


  // handleInputChange = this.handleInputChange.bind(this);
  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    `set${name}`(value)

  }

  return (
    <>
      {/* <form onSubmit={onFormSubmit}>
        <h1>Simaple File Upload</h1>
        <input type="file" name="photo" onChange={onInputChange} />
        <button type="submit" >Upload</button>
      </form> */}
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center border-0">
          המוצר התווסף בהצלחה
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center"></Modal.Footer>
      </Modal>
      <h4 className="text-end font-weight-bold addOrEditTitle">
        {props.action == "edit" ?
          "עריכת מוצר" : "הוספת מוצר חדש"
        }
      </h4>
      <Formik
        initialValues={{
          Id: props.product && props.product._id,
          name: props.product && props.product.name,
          hebrewName: props.product && props.product.hebrewName,
          description: props.product && props.product.details,
          hebrewDescription: props.product && props.product.hebrewDetails,
          amountId0: props.product && props.product.priceList[0].amount,
          price0: props.product && props.product.priceList[0].price,
          categoryId: props.product && props.product.categoryID,
          outOfStock: props.product && props.product.outOfStock,
          display: props.product && props.product.display,
          recommended: props.product && props.product.recommended,
        }}
        onSubmit={onSubmit}
      >
        {() => (
          <Form className="" style={{ height: "590px", direction: "rtl" }} id="productForm">
            <div className="  overflow-auto customOverflow" style={{ height: "560px", overflowX: "hidden !important" }}>
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
                    id="newHebrewName"
                    className="form-control rounded-0 newHebrewName_"
                    type="text"
                    name="hebrewName"
                    pl
                  />
                </div>
                <div className="form-group">
                  <lable className="lableForm">שם מוצר אנגלית:</lable>
                  <Field
                    id="newName"
                    className="form-control rounded-0 newName_"
                    type="text"
                    name="name"
                    pl
                  />
                </div>
                <div className="form-group">
                  <lable className="lableForm">תאור מוצר:</lable>
                  <Field
                    id="newHebrewDescription"
                    className="form-control rounded-0 newHebrewDescription_"
                    type="text"
                    name="hebrewDescription"
                  />
                </div>
                <div className="form-group">
                  <lable className="lableForm">תאור מוצר אנגלית:</lable>
                  <Field
                    id="newDescription"
                    className="form-control rounded-0 newDescription_"
                    type="text"
                    name="description"
                  />
                </div>
                {/* <div className="pricesDiv"> */}
                <div
                  className="d-flex row align-items-center pl-2"
                  id="productPrice"
                >
                  <div className="form-group col-6">
                    <lable className="lableForm">כמות:</lable>
                    <Field
                      as="select"
                      name="amountId0"
                      id="newAmount0"
                      className="browser-default custom-select  rounded-0"
                    >
                      <option value={""}></option>
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
                      id="newPrice0"
                      className="form-control rounded-0 newPrice_"
                      type="text"
                      name="price0"
                    />
                  </div>

                  <div className="col-2 mt-2">
                    <button
                      type="button"
                      onClick={() => setCount(count + 1)}
                      style={{ fontSize: "19px" }}
                      id="ButtonNewPrice0"
                    >
                      +
                    </button>
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
                    <option value={""}></option>

                    {categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.hebrewName}
                      </option>
                    ))}
                  </Field>
                </div>
                <div className='form-group ltr'>
                  <label className='lableForm'>:משויך לתפריט</label>
                  <Select
                    isMulti
                    placeholder=""
                    value={selectedOption} // set selected value
                    options={menuOption}
                    onChange={handleChange} // assign onChange function
                  />
                </div>

                <div className="form-group row d-flex      mr-1">
                  <div className="col-4 align-items-center  d-flex p-0">
                    <Field
                      type="checkbox"
                      name="outOfStock"
                      id="newOutOfStock"
                      className=""
                    />
                    <lable className="mr-1 lableForm my-0">חסר במלאי</lable>
                  </div>

                  <div className="col-4 ml-4 p-0 align-items-center justify-content-center d-flex">
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

                <span className="hiddenFileInput" style={{ backgroundImage: `url(${image})` }}>


                  <Field
                    type="file"
                    name="photo"
                    id="newPhoto"
                    className=""
                    onChange={onInputChange}
                  />
                  {/* <input type="file" name="photo" onChange={onInputChange} /> */}
                </span>

              </div>
             
              <div className='mb-3 mt-2'>
              <button
                className="btn goldButton  my-2"
                id="addProduct"
                type="submit"
              >
                {props.action == "edit" ?
                  "בצע עדכון" : "העלה מוצר"
                }

              </button>
                <div id="editMessage" style={{ display: "none" }}>המוצר עודכן בהצלחה</div>
                <div id="addMessage" style={{ display: "none" }}>המוצר התווסף בהצלחה</div>
              </div>


            </div>


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
    menus: state.menuReducer.menus,
    amounts: state.amountReducer.amounts,
  };
};

const mapDispatchToProps = (dispatch) => ({
  createProduct: (product) => dispatch(actions.createProduct(product)),
  updateProduct: (product) => dispatch(actions.updateProduct(product)),
  getAllAmounts: () => dispatch(actions.getAllAmounts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewProduct);
