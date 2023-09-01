import $, { event } from "jquery";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import { connect } from "react-redux";
import "../../App.css";
import { actions } from "../../redux/actions/action";
import AddEditMenu from "./AddEditMenu";


function MenuList(props) {
  // const [isAddMode, setIsAddMode] = useState(true);

  const [show, setShow] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [idToDelete, setIdToDelete] = useState();
  const [menuToEdit, setMenuToEdit] = useState();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const handleClose = () => setShow(false);
  const addMenu = async () => {
    setShowAddModal(true)
  }
  const closeEditModal = () => {
    setShowEditModal(false)
  
  }
  const closeAddModal = () => {
    setShowAddModal(false)
  }
  const { menus } = props;
  const { products } = props;
  const { categories } = props;
  const [data, setData] = useState([]);
  const [categoryList, setCategoryList] = useState([]);

  const [sortType, setSortType] = useState("hebrewName");
  const [query, setQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState("selectCategory")
  const [selectedMenu, setSelectedMenu] = useState("selectMenu")
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
  }, [props, props.menus]);
  const filteredSearch = (item) => {
    if (query === '') {
      return item;
    } else {

      return item.hebrewName.toLowerCase().includes(query.toLowerCase())

    }
  };

  const filteredByCategory = (item) => {

    if (selectedCategory == "selectCategory") {

      return item;
    } else {
      if (selectedCategory == item.categoryID)
        return item

    }
  };
  const filteredByMenu = (item) => {
    if (selectedMenu == "selectMenu") {

      return item;
    } else {
      if (item.menus.includes(selectedMenu))
        return item
    }

  }
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

  const editItem = async (menu) => {
    console.log("edit menu");
    setMenuToEdit(menu)
    setShowEditModal(true);


  };

  function openDeleteMoodal(item) {
    setIdToDelete(item._id);
    setShow(true);

  }
  function deleteMenu() {
    props.deleteMenu(idToDelete);
    handleClose();
  }


  return (
    <div className="container px-0  pb-0">

      <Modal show={showEditModal} onHide={closeEditModal} animation={false} id="EditModal">
        <Modal.Header closeButton className="bg-light">
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <div className=" text-center p-3 pb-0 bg-light">
          <AddEditMenu menu={menuToEdit} action="edit" closeModal={closeEditModal} />
        </div>
      </Modal>
      <Modal show={showAddModal} onHide={closeAddModal} animation={false} id="AddModal">
        <Modal.Header closeButton className="bg-light">
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <div className=" text-center p-3 pb-0 bg-light">
          <AddEditMenu action="add" closeModal={closeAddModal} />
        </div>
      </Modal>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton className="rtl">
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center border-0">
          ?האם אתה בטוח כי ברצונך למחוק תפריט זה לצמיתות
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
          <Button variant=" secondary" className="" onClick={handleClose}>
            לא
          </Button>
          <Button className="btn goldButton rounded-0" onClick={deleteMenu}>
            כן
          </Button>
        </Modal.Footer>
      </Modal>
      {/* <h1>ממשק מנהל</h1> */}
      <div className="d-flex     justify-content-between rtl mt-2" style={{ height: "800px !important" }}>
        {/* <Search details={products} /> */}

        <div className=" productList col-md-12 p-3 bg-light">
          {/* <button onClick={e => openForm()}>adddddd</button> */}
          <div className="row d-flex titles  mb-3">
            <div className="col-3  text-end">
              מס' תפריטים: {menus.length}
            </div>


          </div>
          <div className="mb-3 text-end">
            <button onClick={addMenu} style={{ border: "1px solid #ced4da !important" }}>הוספת תפריט חדש</button>
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
                  שם תפריט
                </th>
                <th
                  className="col-3 lableForm "
                  value="name"
                  id="name"
                  onClick={(e) => setSortType("name")}
                >
                  שם תפריט (אנגלית)
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

            <tbody className="">
              {menus
                .map((item) => (
                  <>
                    <tr className=" bg-white  col-12">
                      <td className=" border-0 col-2">{item.hebrewName}</td>
                      <td className=" border-0 col-3">{item.name}</td>
                      <td className=" border-0 col-3">{
                        item.createDate.toString().split('T')[0]
                      }</td>
                      <td
                        className="border-0 bg-transparent col-1"
                        onClick={() => openDeleteMoodal(item)}
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

      </div>
    </div>
  );
  // }
}
const mapStateToProps = (state) => {
  return {
    products: state.productReducer.products,
    menus: state.menuReducer.menus,
    categories: state.categoryReducer.categories,
  };
};
const mapDispatchToProps = (dispatch) => ({
  deleteMenu: (id) => dispatch(actions.deleteMenu(id)),
  updateMenu: (menu) => dispatch(actions.updateMenu(menu)),
  copyMenu: (id) => dispatch(actions.copyMenu(id)),
  getMenuByID: (id) => dispatch(actions.getMenuByID(id)),
  getAllMenus: () => dispatch(actions.getAllMenus()),
});
export default connect(mapStateToProps, mapDispatchToProps)(MenuList);
