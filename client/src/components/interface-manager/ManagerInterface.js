import React, { useEffect, useState } from 'react';
import { Formik, Field, Select, Form } from 'formik';
import { connect } from 'react-redux';
import { actions } from '../../redux/actions/action';
import MultipleSelect from '../MultipleSelect';
// import { Form } from 'react-bootstrap';
import '../../App.css'
import $ from 'jquery'
import { Checkbox } from '@mui/material';
import Login from '../Firebase/Login';
import { values } from 'lodash';
import { display } from '@mui/system';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
// import Sonnet from 'react-bootstrap/Sonnet'
import ProductList_manager from './ProductList_manager'
// import { Tab, Sonnet } from 'react-bootstrap-tabs';
import { useTranslation } from 'react-i18next';
import i18 from '../../i18/i18';
import OrderSummary from './OrderSummary'
import Orders from './orders'
// import Example from '../Example';
export function ManagerInterface(props) {
 
    const { t, i18n } = useTranslation();


    useEffect(() => {

        if ($) {
            // $(".inputOf_Search").focus()
        }
    }, [props, props.products, props.categories, props.amounts, $]);


    return (
        <>
            <div className='container p-3'>
                <h1 className='mb-0'>ממשק מנהל</h1>
                <Tabs
                    defaultActiveKey="orders"
                    transition={false}
                    id="noanim-tab-example"
                    dir='rtl'
                >
                    {/* <Tab eventKey="home" title="ממשק מנהל" disabled>

                    </Tab> */}
                    <Tab eventKey="orders" title="הזמנות">
                        <Tabs
                            defaultActiveKey="orderList"
                            transition={false}
                            id="noanim-tab-example"
                            dir='rtl'
                        >

                            <Tab eventKey="orderList" title="הזמנות">
                                <Orders />
                            </Tab>
                            <Tab eventKey="OrderSummary" title="סיכום הזמנות">
                                <OrderSummary />
                            </Tab>


                        </Tabs>

                    </Tab>
                    <Tab eventKey="products" title="מוצרים">
                        <ProductList_manager />
                    </Tab>
                    <Tab eventKey="users" title="משתמשים" >
                        moshe
                    </Tab>
                </Tabs>




            </div>

        </>

    );
}
const mapStateToProps = (state) => {
    return {
        products: state.productReducer.products,
        categories: state.categoryReducer.categories,
        amounts: state.amountReducer.amounts,
    };
}

const mapDispatchToProps = (dispatch) => ({
    createProduct: (product) => dispatch(actions.createProduct(product)),
    getAllCategories: () => dispatch(actions.getAllCategories()),
    getAllAmounts: () => dispatch(actions.getAllAmounts()),
})
export default connect(mapStateToProps, mapDispatchToProps)(ManagerInterface)