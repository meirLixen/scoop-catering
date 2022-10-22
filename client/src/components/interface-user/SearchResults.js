import React, { useEffect } from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import { withRouter } from 'react-router-dom';

import '../../App.css';
import { connect } from 'react-redux';
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
import Scroll from '../Scroll';
import SearchList from '../SearchList';
import $ from 'jquery'
import i18 from '../../i18/i18';
import { useTranslation } from 'react-i18next';
import languageReducer from "../../redux/reducers/language.reducer";



export function SearchResults(props) {
    const { t, i18n } = useTranslation();
    const { language } = props
    const isMobile = useMediaQuery(768);
    const isTablet = useMediaQuery(1024);



    if (!props.products || !props.products.length) {
        props.getAllProducts()
    }

    const { products } = props
    const { searchWord } = props

    // const searchField = urlArray[urlArray.length - 1]
    const filteredProducts = products && products.filter(
        product => {
            if (language != "he")
                return (
                    product && product
                        .name
                        .toLowerCase()
                        .includes(searchWord.toLowerCase())
                );
            else
                return (
                    product && product
                        .hebrewName
                        .toLowerCase()
                        .includes(searchWord.toLowerCase())
                );
        }
    );
    function searchList() {

        return (
            <Scroll>
                <SearchList filteredProducts={filteredProducts} lang={language} />
            </Scroll>
        );
    }
    useEffect(() => {
        if ($) {

        }
    }, [$, language])
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

                <label >  {i18.t('SearchResults')} <button className='white-arrow h4 p-1 ' onClick={() => props.history.goBack()} ><i class="fas fa-long-arrow-alt-right  pr-2" style={{ height: 'fit-content' }} ></i> </button> </label>

                {isTablet ? <img className="h-100" src={'https://scoopcatering.co.il/images/headerBgImag.png'} /> : <img className="h-100 w-100" src={'https://scoopcatering.co.il/images/headerBgImag.png'} />}
            </div>
            <div className='location pt-3 text-end px-5' >
                <div className='d-inline btn-pointer' onClick={() => props.history.push('/')}>{i18.t('ScoopCatering')}</div>
                <div className='goldColor d-inline btn-pointer'> / {i18.t('SearchResults')} </div>

            </div>
            <button className='goldButton h5 p-2 mt-5' style={{
                left: '150px',
                position: 'absolute'
            }} onClick={() => props.history.push('/shop')}><i class="fas fa-long-arrow-alt-left  pr-2" style={{ height: 'fit-content' }}></i>{i18.t('ToTheShop')}
            </button>
            <div className="pageContent pt-3">


                {searchList()}

            </div>
            {/* <button className='bg-black text-white border mb-5 p-2 mt-5'> <i class="fas fa-long-arrow-alt-left  " style={{ height: 'fit-content' }} ></i> לכל המוצרים</button> */}
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
        searchWord: state.searchWordReducer.searchWord,
        language: state.languageReducer.language
    };
}

const mapDispatchToProps = (dispatch) => ({

    getAllProducts: () => dispatch(actions.getAllProducts()),
    setSearchWord: (word) => dispatch(actions.setSearchWord(word)),
})


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SearchResults))
