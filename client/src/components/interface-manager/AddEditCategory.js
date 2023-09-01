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
export function AddEditCategory(props) {

    let menuOption = []
    const [show, setShow] = useState(false);
    const [selectedOption, setSelectedOption] = useState([]);
    useEffect(() => {
        if (props.action == "edit") {
            if (props.category && props.category.picUrl) {
                setFile(props.category.picUrl);
                setImage(baseURL + props.category.picUrl);
            }
            //   else {
            //     setFile("generalProduct.png");
            //     setImage(baseURL + "generalProduct.png");
            //   }
        }

        if (!selectedOption || !selectedOption.length) {
            var newMenuList = []
            props.category && props.category.menus.map((menuID) => {
                menus.map((menu) => {
                    if (menuID == menu._id)
                        newMenuList.push({ value: menu._id, label: menu.hebrewName })
                })

            })
            setSelectedOption(newMenuList)
        }


    }, [])




    const handleChange = e => {
        setSelectedOption(e);
    }
    const handleClose = () => setShow(false);

    const { categories, menus, amounts } = props;



    if (!menuOption || !menuOption.length) {

        menus.map((menu) => (
            menuOption.push({ value: menu._id, label: menu.hebrewName })

        ))


    }


    const onSubmit = async (fields) => {

        var menuList = []
        selectedOption.map((x) => {
            menuList.push(x.value)
        })
        if (props.action == "edit") {
            const updateCategory = {
                _id: fields.Id,
                name: fields.name,
                hebrewName: fields.hebrewName,
                menus: menuList,
                picUrl: file && file
            }

            props.updateCategory(updateCategory)

            document.getElementById("editMessage").style.display = "block"
            setTimeout(() => {
                props.closeModal()
            }, 2000)

        }
        else {
            const newCategory = {
                name: fields.name,
                hebrewName: fields.hebrewName,
                menus: menuList,
                picUrl: file && file

            }
            console.log("createCategory");
            const category = await props.createCategory(newCategory)
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

            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center border-0">
                    הקטגוריה התווסף בהצלחה
                </Modal.Body>
                <Modal.Footer className="d-flex justify-content-center"></Modal.Footer>
            </Modal>
            <h4 className="text-end font-weight-bold addOrEditTitle">
                {props.action == "edit" ?
                    "עריכת קטגוריה" : "הוספת קטגוריה חדשה"
                }
            </h4>
            <Formik
                initialValues={{
                    Id: props.category && props.category._id,
                    name: props.category && props.category.name,
                    hebrewName: props.category && props.category.hebrewName,

                }}
                onSubmit={onSubmit}
            >
                {() => (
                    <Form className="" style={{ height: "590px", direction: "rtl" }} id="categoryForm">
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
                                    <lable className="lableForm">שם קטגוריה:</lable>
                                    <Field
                                        id="newHebrewName"
                                        className="form-control rounded-0 newHebrewName_"
                                        type="text"
                                        name="hebrewName"
                                        pl
                                    />
                                </div>
                                <div className="form-group">
                                    <lable className="lableForm">שם קטגוריה אנגלית:</lable>
                                    <Field
                                        id="newName"
                                        className="form-control rounded-0 newName_"
                                        type="text"
                                        name="name"
                                        pl
                                    />
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
                                <lable className="mr-1 lableForm my-0">תמונת קטגוריה</lable>


                                <span className="hiddenCategoryImage d-flex m-auto" style={{ backgroundImage: `url(${image})` }}>


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
                                        "בצע עדכון" : "הוסף קטגוריה"
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

    };
};

const mapDispatchToProps = (dispatch) => ({
    createCategory: (category) => dispatch(actions.createCategory(category)),
    updateCategory: (category) => dispatch(actions.updateCategory(category)),

});

export default connect(mapStateToProps, mapDispatchToProps)(AddEditCategory);
