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
import EventsImage from '../../data/imges/EventsImage.png'
import useMediaQuery from "../../hooks/useMediaQuery";
import { Container, FormControl, Nav, Button, NavDropdown, Image, Dropdown, DropdownButton, ButtonGroup } from "react-bootstrap"
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
import EventBg from '../../data/imges/drinks.png'
import Form from 'react-bootstrap/Form'

export function Events(props) {
    const { t, i18n } = useTranslation();
    const isMobile = useMediaQuery(768);
    const isTablet = useMediaQuery(1024);

    useEffect(() => {
        if ($) {
            $('#events').addClass('active');

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

            {/* <div className="pageHeader">
                <label >{i18.t('EventBooking')}</label>
                {isTablet ? <img className="h-100 " src={'https://scoopcatering.co.il/images/headerBgImag.png'} /> : <img className="h-100 w-100" src={'https://scoopcatering.co.il/images/headerBgImag.png'} />}
            </div> */}


            <div className="pageContent EventPageContent">
                <div
                    style={{
                        backgroundImage: `url(${EventBg})`,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'black',
                        backgroundPosition: 'center',
                        backgroundSize: 'cover'

                    }}>
                    <div className='location  text-end px-5' style={{ paddingTop: '6rem' }}>
                        <div className='d-inline text-white btn-pointer' onClick={() => props.history.push('/')}>{i18.t('ScoopCatering')}</div>
                        <div className='goldColorWithShadow d-inline'> /{i18.t('EventBooking')}</div>
                    </div>
                    <div className="row justify-content-center ">
                        <div className="EventsDiv  bg-white p-5 mt-2  col-md-5 col-sm-12 " >

                            <Form.Label className="font-weight-bold h1"> {i18.t('eventsTitel')}</Form.Label>
                            <br />
                            <Form.Label className="font-weight-bold h5"> {i18.t('eventsLable')}</Form.Label>
                            <Form.Text style={{ marginLeft: '10px' }} className=" text-black">{i18.t('eventsPiska')}</Form.Text>
                            <Form >
                                <div className="swithSide">
                                    <Form.Group className="mb-2 swithDir" controlId="formBasicPhone">
                                        <Form.Label class="mb-1 lableForm"> *{i18.t('name')}</Form.Label>
                                        <Form.Control className="rounded-custom " type="text" required />
                                    </Form.Group>
                                    <Form.Group className="mb-2 swithDir" controlId="formBasicPhone">
                                        <Form.Label class="mb-1 lableForm"> *{i18.t('phone')}</Form.Label>
                                        <Form.Control className="rounded-custom " type="text" required />
                                    </Form.Group>
                                    <Form.Group className="mb-2 swithDir" controlId="formBasicPhone">
                                        <Form.Label class="mb-1 lableForm"> *{i18.t('email')}</Form.Label>
                                        <Form.Control className="rounded-custom " type="email" required />
                                    </Form.Group>

                                    <Form.Group className="mb-2 row swithDir" controlId="formBasicPhone">
                                        <div className="col-6">
                                            <Form.Label class="mb-1 lableForm"> *{i18.t('EventType')}</Form.Label>
                                            <Form.Select aria-label="Default select example" className="rounded-custom" required>
                                                <option></option>
                                                <option value={i18.t('EventOption1')}>{i18.t('EventOption1')}</option>
                                                <option value={i18.t('EventOption2')}>{i18.t('EventOption2')}</option>
                                                <option value={i18.t('EventOption3')}>{i18.t('EventOption3')}</option>
                                                <option value={i18.t('EventOption4')}>{i18.t('EventOption4')}</option>
                                                <option value={i18.t('EventOption5')}>{i18.t('EventOption5')}</option>
                                                <option value={i18.t('EventOption6')}>{i18.t('EventOption6')}</option>
                                                <option value={i18.t('EventOption7')}>{i18.t('EventOption7')}</option>
                                                <option value={i18.t('EventOption8')}>{i18.t('EventOption8')}</option>
                                                <option value={i18.t('EventOption9')}>{i18.t('EventOption9')}</option>
                                            </Form.Select>
                                        </div>
                                        <div className="col-6">
                                            <Form.Label class="mb-1 lableForm">*{i18.t('NumberOfGuests')}</Form.Label>
                                            <Form.Control className="rounded-custom " type="number" min="5" required />
                                        </div>

                                    </Form.Group>
                                    <Form.Group className="mb-2 row  swithDir pl-1" controlId="formBasicPhone">
                                        <div className="col-6 row ">

                                            <div className="d-flex align-items-center col-6">
                                                <input type="radio" id="vehicle1" name="vehicle1" value="Bike" checked />
                                                <label className="mr-2 ml-1  mb-0 lableForm" for="vehicle1 " >{i18.t('fleshy')}</label>
                                            </div>
                                            <div className="d-flex align-items-center  col-6">  <input type="radio" id="vehicle2" name="vehicle1" value="Bike" />
                                                <label className="mr-2 ml-1 mb-0 lableForm" for="vehicle2   " > {i18.t('milky')}</label>
                                            </div>
                                        </div>
                                        <div className="col-6"></div>




                                    </Form.Group>
                                </div>
                                <Button variant="primary" type="submit" className=" goldButton px-5 py-2 my-5">
                                    {i18.t('send')}
                                    {/* &#8594; */}
                                </Button>
                                <div className="swithSide">
                                    <p className="swithDir small mb-0">*{i18.t('Required')}</p>
                                </div>
                            </Form>
                        </div>
                    </div>
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


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Events))
