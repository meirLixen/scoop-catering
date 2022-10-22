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



export function Gallery(props) {

    const { t, i18n } = useTranslation();

    const isMobile = useMediaQuery(768);
    const isTablet = useMediaQuery(1024);

    useEffect(() => {
        if ($) {
            $('#gallery').addClass('active');
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
                <label >{i18.t('gallery')} </label>
                {isTablet ? <img className="h-100 " src={'https://scoopcatering.co.il/images/headerBgImag.png'} /> : <img className="h-100 w-100" src={'https://scoopcatering.co.il/images/headerBgImag.png'} />}
            </div>


            <div className="pageContent ">

                <div className="bg-black " style={{ height: '70vh' }}>
                    <div className='location pt-3 text-end px-5' >
                        <div className='d-inline text-white btn-pointer' onClick={() => props.history.push('/')}>{i18.t('ScoopCatering')}</div>
                        <div className='goldColor d-inline'> /{i18.t('gallery')}    </div>

                    </div>


                    <h1 className="text-white mt-5 pt-5">{i18.t('soon')}</h1>
                </div>


            </div>

            <div className="PageFooter ">
                <Footer />
                <UnderFooter />
            </div>
        </>

    );
}
const mapStateToProps = (state) => {
    return {

    };
}

const mapDispatchToProps = (dispatch) => ({


})


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Gallery))
