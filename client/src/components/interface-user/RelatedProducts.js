import React, { useEffect } from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import { withRouter } from 'react-router-dom';

import '../../App.css';
import { connect } from 'react-redux';
import Store from '../../redux/store'
import { actions } from '../../redux/actions/action';
import Search from '../Search';
import Nuv from '../mainPage/Nuv'
import Header from './Header'
import Footer from '../mainPage/Footer';
import UnderFooter from '../mainPage/UnderFooter'
import underLogo from '../../data/imges/underLogo.png'
import logo from '../../data/imges/logo.png'

import headerBgImag from '../../data/imges/headerBgImag.png'
import useMediaQuery from "../../hooks/useMediaQuery";
import { Container, Form, FormControl, Nav, Button, NavDropdown, Image, Dropdown, DropdownButton, ButtonGroup } from "react-bootstrap"
import Navbar from 'react-bootstrap/Navbar'
import Offcanvas from 'react-bootstrap/Offcanvas'
import Extras from '../../data/imges/foodCategories/Extras.png'
import fish from '../../data/imges/foodCategories/fish.png'
import salads from '../../data/imges/foodCategories/salads.png'
import shabat from '../../data/imges/foodCategories/shabat.png'
import desserts from '../../data/imges/foodCategories/desserts.png'
import mainCourses from '../../data/imges/foodCategories/mainCourses.png'
import products_ from '../../data/imges/foodCategories/products.png'
import Hamborger from '../mainPage/Hamborger/Hamborger'
import TopPageDesktop from '../mainPage/TopPageDesktop'
import Scroll from '../Scroll';
import SearchList from '../SearchList';
import $ from 'jquery'
import i18 from '../../i18/i18';
import { useTranslation } from 'react-i18next';



export function RelatedProducts(props) {

    const isMobile = useMediaQuery(768);
    const isTablet = useMediaQuery(1024);
    const { t, i18n } = useTranslation();




    const { products } = props

    if (!products || !products.length) {
        props.getAllProducts()
    }





    useEffect(() => {
        if ($) {

        }
    }, [$])
    return (
        <>

            <div className="pageNuv">
                {isTablet && (
                    <Hamborger history={props.history} />

                )}

                {!isMobile && !isTablet && (
                    <TopPageDesktop />
                )}
            </div>

            <div className="pageHeader">
                <label > מוצרים נלווים </label>
                {isTablet ? <img className="h-100 " src={'https://scoopcatering.co.il/images/headerBgImag.png'} /> : <img className="h-100 w-100" src={'https://scoopcatering.co.il/images/headerBgImag.png'} />}
            </div>


            <div className="pageContent pt-3">
                <div className='location ' style={{ right: '50px', position: 'absolute' }}>
                    <div className='d-inline btn-pointer' onClick={() => props.history.push('/')}>{i18.t('ScoopCatering')}</div>   /
                    <div className='d-inline btn-pointer' onClick={() => props.history.push('/shop')}>תפריט שבת </div>
                    <div className='goldColor d-inline'>/מוצרים נלווים   </div>


                </div>


            </div>

            <div className="PageFooter mt-5">
                <Footer />
                <UnderFooter />
            </div>
        </>

    );
}
const mapStateToProps = (state) => {
    return {
        products: state.productReducer.products,
        searchWord: state.searchWordReducer.searchWord
    };
}

const mapDispatchToProps = (dispatch) => ({

    getAllProducts: () => dispatch(actions.getAllProducts()),

})


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RelatedProducts))
