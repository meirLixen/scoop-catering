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
import store from '../../redux/store';
import menuReducer from '../../redux/reducers/menu.reducer';


// import Form from 'react-bootstrap/Form'
const baseURL = window.location.origin + "/"
export function AddEditMenu(props) {


    const [show, setShow] = useState(false);

    useEffect(() => {
        if (props.action == "edit") {
            // if (props.menu && props.menu.picUrl) {
            //     setFile(props.menu.picUrl);
            //     setImage(baseURL + props.menu.picUrl);
            // }
            //   else {
            //     setFile("generalProduct.png");
            //     setImage(baseURL + "generalProduct.png");
            //   }
        }




    }, [props.menus])





    const handleClose = () => setShow(false);

    const { categories, menus, amounts } = props;





    const onSubmit = async (fields) => {


        if (props.action == "edit") {
            const updateMenu = {
                _id: fields.Id,
                name: fields.name,
                hebrewName: fields.hebrewName,
                // picUrl: file && file
            }

            const a = await props.updateMenu(updateMenu)
            document.getElementById("editMessage").style.display = "block"
            setTimeout(() => {
                props.closeModal()
            }, 2000)
          console.log("props.currentMenu",props.currentMenu); 
            props.getAllMenus()
        }
        else {
            const newMenu = {
                name: fields.name,
                hebrewName: fields.hebrewName,
                // picUrl: file && file

            }

            const menu = await props.createMenu(newMenu)
            document.getElementById("addMessage").style.display = "block"
            setTimeout(() => {
                props.closeModal()
            }, 2000)

        }
    }


    const handleSubmit = async (values) => {
        alert(values.name);

        if (values.Id === "") alert("add");
        else alert("edit");

    };
    const [file, setFile] = useState(null);
    const [image, setImage] = useState('http://localhost:3001/image1.png');
    const [name, setname] = useState();
    const [hebrewName, setHebrewName] = useState();
    const [menuId, setMenuId] = useState();
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

            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center border-0">
                    התפריט התווסף בהצלחה
                </Modal.Body>
                <Modal.Footer className="d-flex justify-content-center"></Modal.Footer>
            </Modal>
            <h4 className="text-end font-weight-bold addOrEditTitle">
                {props.action == "edit" ?
                    "עריכת תפריט" : "הוספת תפריט חדש"
                }
            </h4>
            <Formik
                initialValues={{
                    Id: props.menu && props.menu._id,
                    name: props.menu && props.menu.name,
                    hebrewName: props.menu && props.menu.hebrewName,

                }}
                onSubmit={onSubmit}
            >
                {() => (
                    <Form className="" style={{ direction: "rtl" }} id="menuForm">
                        <div className="  overflow-auto customOverflow" style={{ overflowX: "hidden !important" }}>
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
                                    <lable className="lableForm">שם תפריט:</lable>
                                    <Field
                                        id="newHebrewName"
                                        className="form-control rounded-0 newHebrewName_"
                                        type="text"
                                        name="hebrewName"
                                        pl
                                    />
                                </div>
                                <div className="form-group">
                                    <lable className="lableForm">שם תפריט אנגלית:</lable>
                                    <Field
                                        id="newName"
                                        className="form-control rounded-0 newName_"
                                        type="text"
                                        name="name"
                                        pl
                                    />
                                </div>



                            </div>

                            <div className='mb-3 mt-2'>
                                <button
                                    className="btn goldButton  my-2"
                                    id="addProduct"
                                    type="submit"
                                >
                                    {props.action == "edit" ?
                                        "בצע עדכון" : "הוסף תפריט"
                                    }

                                </button>
                                <div id="editMessage" style={{ display: "none" }}> העדכון בוצע בהצלחה</div>
                                <div id="addMessage" style={{ display: "none" }}>התווסף בהצלחה</div>
                            </div>


                        </div>



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
        currentMenu: state.menuReducer.currentMenu,
    };
};

const mapDispatchToProps = (dispatch) => ({
    createMenu: (menu) => dispatch(actions.createMenu(menu)),
    updateMenu: (menu) => dispatch(actions.updateMenu(menu)),
    getAllMenus: () => dispatch(actions.getAllMenus()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddEditMenu);
