import React, { useEffect } from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import '../../App.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Store from '../../redux/store'
import { actions } from '../../redux/actions/action';
// import Search from '../Search';
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
import soops from '../../data/imges/foodCategories/soops_.jpg'
import drinks from '../../data/imges/drinks.png'

import $ from 'jquery'
import i18 from '../../i18/i18';
import { useTranslation } from 'react-i18next';


import { height } from "@mui/system";

export function Shop(props) {


    const isMobile = useMediaQuery(768);
    const isTablet = useMediaQuery(1024);
    const { t, i18n } = useTranslation();
    // const products = Store.getState().productReducer.products
    const { language } = props
    const { categories } = props
    if (!categories || !categories.length) {
        props.getAllCategories()
    }

    useEffect(() => {
        if ($) {

            $(".categoryHover").mouseover(function () {
                $(this).find('.categoryTitle').removeClass("d-none")
            });
            $(".categoryHover").mouseout(function () {
                $(this).find('.categoryTitle').addClass("d-none")

            });
        }
    }, [$, props, language])
    return (
        <>

            {/* <Search details={products} /> */}
            <div className="pageNuv">
                {isTablet && (
                    <Hamborger history={props.history} />


                )}

                {!isMobile && !isTablet && (
                    <TopPageDesktop />
                )}
            </div>

            <div className="pageHeader">
                <label > {i18.t('shabatMenu')} </label>
                {/* <label >  {i18.t('shabatMenu')} <button className='white-arrow h4 p-1 ' onClick={() => props.history.goBack()} ><i class="fas fa-long-arrow-alt-right  pr-2" style={{ height: 'fit-content' }} ></i> </button> </label> */}
                {isTablet ? <img className="h-100 " src={'https://scoopcatering.co.il/images/headerBgImag.png'} /> : <img className="h-100 w-100" src={'https://scoopcatering.co.il/images/headerBgImag.png'} />}


            </div>

            <div className='location pt-3 text-end px-5 ' >
                <div className='d-inline btn-pointer' onClick={() => props.history.push('/')}>{i18.t('ScoopCatering')}</div>
                <div className='goldColor d-inline'> /{i18.t('shabatMenu')}  </div>
            </div>
            <div className="page_content justify-content-center pt-5">

                <h2>{i18.t('PreparedFoodCategories')} </h2>
                <hr className="m-auto mb-3 goldColor" style={{ width: '4%', height: '3px', opacity: '1' }} ></hr>
                <h6>{i18.t('ComeAndTasteTheShabbatFood')}</h6>
                <div className="foodCategories">


                    <div className="row mb-3 d-flex justify-content-center wrapper  m-auto" style={{ width: '80%' }}>
                        {categories && categories.map((category) => (
                            <div className="categoryItem  p-0 col-3 mr-3 mb-3" style={{ height: '380px' }}><div className="categoryHover" onClick={() => props.history.push(`/shop/${language == "he" ? category.hebrewName : category.name}`)}>
                                <div className=" d-flex  categoryTitle d-none  p-3"><h5 className=" font-weight-bold ">{language == "he" ? category.hebrewName : category.name}</h5>
                                    <div className="row d-flex swithDir ">
                                        <h6 className="col-2 mb-0 p-0">{category.products.length}</h6>
                                        <h6 className="mb-0 col-2 p-0"></h6>
                                        <h6 className="mb-0 col-7 p-0 mr-1">{i18.t('products')}</h6>
                                    </div>
                                </div>
                            </div>
                                <img className="h-100 w-100" src={'https://scoopcatering.co.il/images/foodCategories/' + category.picUrl} />
                            </div>

                        ))}

                    </div>
                </div>
            </div>


            {/* <button className='bg-black text-white border mb-5 p-2 mt-5'> <i className="fas fa-long-arrow-alt-left  " style={{ height: 'fit-content' }} ></i> לכל המוצרים</button> */}
            <div className="PageFooter mt-5">
                <Footer />
                <UnderFooter />
            </div>
        </>

    );
}
const mapStateToProps = (state) => {
    return {
        categories: state.categoryReducer.categories,
        language: state.languageReducer.language
    };
}

const mapDispatchToProps = (dispatch) => ({
    getAllCategories: () => dispatch(actions.getAllCategories()),


})
// export default connect(mapStateToProps, mapDispatchToProps)(Shop);
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Shop))

