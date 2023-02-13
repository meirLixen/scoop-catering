import $ from "jquery";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import { connect } from "react-redux";
import "../../App.css";
import { actions } from "../../redux/actions/action";
import NewProduct from "../product/NewProduct";

function ProductListManager(props) {
  // const [isAddMode, setIsAddMode] = useState(true);

  const [show, setShow] = useState(false);
  const [idToDelete, setIdToDelete] = useState();
  const handleClose = () => setShow(false);
  const { products } = props;
  const { categories } = props;
  const [data, setData] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [productToEdit] = useState();
  const [sortType, setSortType] = useState("hebrewName");



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
      if (categoryList.length)
        setCategoryList(products)
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

  const editItem = async (product) => {
    $("#newId").val(product._id);
    $("#newName").val(product.name);
    $("#newHebrewName").val(product.hebrewName);
    $("#newDescription").val(product.description);
    $("#newHebrewDescription").val(product.hebrewDescription);
    $("#newPrice").val(product.price);
    $("#newCategory").val(product.categoryID);
    $("#newOutOfStock").prop(
      "checked",
      product.outOfStock === true ? true : false
    );
    $("#newDisplay").prop("checked", product.display);
    $("#newRecommended").prop("checked", product.recommended === true ? true : false)
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
    <div className="container px-0  pb-0">
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
      <div className="d-flex     justify-content-between rtl mt-2" style={{ height: "800px !important" }}>
        {/* <Search details={products} /> */}

        <div className=" productList col-md-7 p-3 bg-light">
          {/* <button onClick={e => openForm()}>adddddd</button> */}
          <div className="row d-flex titles  mb-5">
            <div className="col-6  text-end">
              מס' מוצרים: {products.length}
            </div>
            <div className="col-6 text-start row d-flex justify-content-between ">
              <div className="col-md-6 p-0">
                {/* <Form.Label className="mb-1 lableForm"></Form.Label> */}
                <Form.Select
                  aria-label="Default select example"
                  className="rounded-0  py-1"
                  required
                  onChange={(e) => changeCategory(e)}
                >
                  <option value="selectCategory">בחר קטגוריה</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.hebrewName}
                    </option>
                  ))}
                </Form.Select>
              </div>
              <div className="col-md-5 p-0">
                <input
                  placeholder="חפש מוצר"
                  className="w-100 inputOf_Search bg-transparent border-0 border-bottom border-dark"
                />
              </div>
            </div>
          </div>

          {/* <Table className='border-none' size="sm" >

            <div className='row mr-4 mb-3 ltr' key={"header"}>
              <div className='col-4  lableForm text-center pl-5'>אפשרויות</div>
              <div className='col-2 lableForm' value="createDate" id="createDate" onClick={e => setSortType("createDate")}>עדכון אחרון</div>
              <div className='col-2 lableForm' value="outOfStock" id="outOfStock" onClick={e => setSortType("outOfStock")}>מלאי</div>
              <div className='col-2 lableForm' value="price" id="price" onClick={e => setSortType("price")}>מחיר</div>

              <div className='col-2 lableForm' value='hebrewName' id='hebrewName' onClick={e => setSortType('hebrewName')}>שם מוצר</div>

            </div>


            <div className="overflow-auto border-0 productList-manager ltr" style={{ height: '480px' }}>

              <tbody id="tableBody" >
                {categoryList.map((item) => (
                  <tr className='row m-auto bg-white mb-3 ' key={item._id} id={item._id}>
                    <td className='col-4 '>
                      <td className=' ' onClick={() => openDeleteMoodal(item._id)}><i className="fas fa-trash-alt "></i></td>
                      <td className=''>|</td>
                      <td className=' ' onClick={() => editItem(item)}>עדכון</td>

                    </td>
                    <td className='col-2'>{item.createDate}</td>
                    <td className='col-2'>{item.outOfStock === true ? "במלאי" : "אזל מהמלאי"}</td>
                    <td className='col-2'>{item.price}</td>

                    <td className='col-2'>{item.hebrewName}</td>


                  </tr>
                ))
                }
              </tbody>


            </div>

          </Table>



           */}

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
                {/* <th
                  className=" col-2 lableForm"
                  value="outOfStock"
                  id="outOfStock"
                  onClick={(e) => setSortType("outOfStock")}
                >
                  מלאי
                </th> */}
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
              {products.map((item) => (
                <>
                  <tr className=" bg-white   col-12">
                    <td className=" border-0 col-2">{item.hebrewName}</td>
                    {item.priceList.length > 1 ?


                      <td className=" border-0 col-2">


                        {/* {parseFloat(item.priceList[0].price ? item.priceList[0].price : 0)}{" "} */}
                        {item.priceList.map((price) =>
                          parseFloat(price.price) +
                          "/"
                        )}
                        &#8362;

                      </td>



                      :
                      <td className=" border-0 col-2">
                        {parseFloat(item.priceList[0].price ? item.priceList[0].price : 0).toFixed(1)}{" "}
                        &#8362;
                      </td>
                    }
                    {/* <td className=" border-0 col-2">
                      {item.outOfStock === true ? "במלאי" : "אזל מהמלאי"}
                    </td> */}
                    <td className=" border-0 col-3">{

                      item.createDate.toString().split('T')[0]
                    }</td>
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
                      <i className="fas fa-edit "></i>
                    </td>
                  </tr>
                  <tr
                    className="bg-transparent"
                    style={{ height: "15px" }}
                  ></tr>
                </>
              ))}
            </tbody>
          </Table>
        </div>
        {/* <div className="col-md-1 p-0"></div> */}
        <div className="col-md-4  NewProduct  p-3 pb-0 bg-light">
          <NewProduct product={productToEdit} />
        </div>
        {/* <div className='col-md-4  NewProduct  p-3 pb-0 bg-light' ><AddEdit /></div> */}
      </div>
    </div>
  );
  // }
}
const mapStateToProps = (state) => {
  return {
    products: state.productReducer.products,
    categories: state.categoryReducer.categories,
  };
};
const mapDispatchToProps = (dispatch) => ({
  deleteProduct: (id) => dispatch(actions.deleteProduct(id)),
  updateProduct: (product) => dispatch(actions.updateProduct(product)),
  copyProduct: (id) => dispatch(actions.copyProduct(id)),
  getProductByID: (id) => dispatch(actions.getProductByID(id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ProductListManager);
