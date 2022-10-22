import React, { useEffect } from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import { withRouter } from 'react-router-dom';
import '../../App.css';
import { connect } from 'react-redux';
import Store from '../../redux/store'
import { actions } from '../../redux/actions/action';

import Footer from '../mainPage/Footer';
import UnderFooter from '../mainPage/UnderFooter'


import headerBgImag from '../../data/imges/headerBgImag.png'
import useMediaQuery from "../../hooks/useMediaQuery";
import { Container, Form, FormControl, Nav, Button, NavDropdown, Image, Dropdown, DropdownButton, ButtonGroup } from "react-bootstrap"

import Hamborger from '../mainPage/Hamborger/Hamborger'
import TopPageDesktop from '../mainPage/TopPageDesktop'

import $ from 'jquery'
import i18 from '../../i18/i18';
import { useTranslation } from 'react-i18next';

export function Kashrut(props) {


    const isMobile = useMediaQuery(768);
    const isTablet = useMediaQuery(1024);
    const { t, i18n } = useTranslation();
    useEffect(() => {
        if ($) {
            $('#navbarScrollingDropdown').addClass('active');

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
            <div className="pageHeader ">
                <label >{i18.t('Kashrut')} </label>
                {isTablet ? <img className="h-100 " src={'https://scoopcatering.co.il/images/headerBgImag.png'} /> : <img className="h-100 w-100" src={'https://scoopcatering.co.il/images/headerBgImag.png'} />}
            </div>
            <div className='location pt-3 text-end px-5' >
                <div className='d-inline btn-pointer' onClick={() => props.history.push('/')}>{i18.t('ScoopCatering')}</div>

                <div className='goldColor d-inline'> /{i18.t('Kashrut')}  </div>
            </div>
            <div className="pageContent pt-3">



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

    };
}

const mapDispatchToProps = (dispatch) => ({


})


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Kashrut))
