import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
// import { withRouter } from 'react-router-dom';
import { actions } from '../../redux/actions/action';

import { Table, Button } from 'react-bootstrap'
import AppFirebase from '../Firebase/AppFirebase';
import { Formik, Field, Select, Form } from 'formik';
import NewProduct from '../product/NewProduct';
import Scroll from '../Scroll';
import Carousel from '../Carousel_'
// import Search from '../Search'
import headerBgImag from '../../data/imges/headerBgImag.png'
import Hamborger from '../mainPage/Hamborger/Hamborger'
import TopPageDesktop from '../mainPage/TopPageDesktop'
import useMediaQuery from "../../hooks/useMediaQuery";
import Cart from '../../data/imges/cart.png'
import salads from '../../data/imges/foodCategories/Pictures/fishh.png'
import appetizers from '../../data/imges/foodCategories/Pictures/shabbat.png'
import bakery from '../../data/imges/foodCategories/Pictures/bakery.png'
import commentIcon from '../../data/imges/comment.png'
import searchIcom_ from '../../data/imges/searchIcom_.png';
import desserts from '../../data/imges/foodCategories/Pictures/desserts.png'
import image1 from '../../data/imges/foodCategories/Pictures/image1.png'
import deleteIcom from '../../data/imges/delete.png'

import Modal from "../Popup/Modal";
import useModal from '../Popup/useModal';
import '../Popup/Modal.css'

import '../../App.css'
import $ from 'jquery'
import { height } from '@mui/system';
import i18 from '../../i18/i18';
import { useTranslation } from 'react-i18next';
import { Sync } from '@material-ui/icons';
import zIndex from '@mui/material/styles/zIndex';
import { useAuth } from "../../contexts/AuthContext"
import ShabbatMenuSystem from "./ShabbatMenu__.js"
import { Link, useHistory } from "react-router-dom"
let previousClick = 'empty'
let previousClickIndex;
let currentClass
function ShabbatMenu(props) {



    const { isShowing, toggle } = useModal();

    const url = window.location.href
    // const [cart, setCart] = useLocalStorage("cart", []);
    const lastSegment = decodeURI(url.split("/").pop().toString());
    const { language } = props
    const { products } = props;
    const { categories } = props
    const { t, i18n } = useTranslation();
    const [side, setSide] = useState('');
    const [align, setAlign] = useState('');
    const isMobile = useMediaQuery(768);
    const isTablet = useMediaQuery(1024);

    const [serchResults, setSerchResults] = useState();
    const [searchWord, setSearchWord] = useState();
    const [userDetails, setUserDetails] = useLocalStorage("userDetails", []);


    const [cart, setCart] = useLocalStorage("cart", []);
    const [numItems, setNumItems] = useLocalStorage("numItems", 0);
    const [total, setTotal] = useLocalStorage("total", 0);
    const { totalRedux, numItemsRedux, cartRedux, currentUser_ } = props
    const [error, setError] = useState("")

    const { currentUser, logout } = useAuth()
    const history = useHistory()

    async function handleLogout() {
        setError("")

        try {
            await logout()
            history.push("/shop")

        } catch {
            setError("Failed to log out")
        }
    }
    function myFunction() {

    }

    function scrollTopFunc() {
        window.scrollTo(0, 0)
    }
    function scrollDetect() {
        var lastScroll = 0;
        let top = $(".fixed-content").css("top")
        window.onscroll = function () {
            // alert($(".fixed-content").css("top"))
            let currentScroll = document.documentElement.scrollTop || document.body.scrollTop; // Get Current Scroll Value
            let fixedContentHeightRight = $(".fixed-content").height();
            let fixedContentHeightLeft = $(".fixed-categoriesContent").height();
            console.log("currentScroll:: ", currentScroll);
            if (currentScroll > 0 && lastScroll <= currentScroll) {
                lastScroll = currentScroll;
                console.log("Scrolling DWON");
                if (currentScroll > fixedContentHeightRight - 720 + 112 + 30) {
                    $(".fixed-content").css("top", currentScroll - fixedContentHeightRight + 550);
                    $(".fixed-categoriesContent").css("top", currentScroll - fixedContentHeightLeft - 50);

                }
            } else {

                lastScroll = currentScroll;
                console.log("Scrolling UP");
                console.log($(".fixed-content").css("top"));
                if (currentScroll - fixedContentHeightRight + 700 > 0)
                    $(".fixed-content").css("top", currentScroll - fixedContentHeightRight + 700);



                if (currentScroll == 99) {
                    $(".fixed-categoriesContent").css("top", currentScroll - fixedContentHeightLeft + 46);
                }
                else

                    if (currentScroll > 99) {
                        $(".fixed-categoriesContent").css("top", currentScroll - fixedContentHeightLeft - 50);
                        // if (currentScroll > fixedContentHeightRight - 720 + 112 + 30) { }
                        // else

                        // if (currentScroll == 114)
                        //     $(".fixed-content").css("top", currentScroll + fixedContentHeightRight - 700);
                    }

                // }
            }
        };
    }





    function set_user() {
        debugger

        props.setUser("bhnj")
        console.log(currentUser_);
    }
    function hoverCategory(categoryId, index) {
        currentClass = "#" + categoryId
        if ($(currentClass).hasClass('active')) {

        }
        else {
            $(currentClass).addClass('active');
            $('.' + (index - 1)).addClass('removeBottom')
            console.log(previousClick);
            if (previousClick != "empty" && previousClick != categoryId) {
                $("#" + previousClick).removeClass('active');
                $('.' + (previousClickIndex - 1)).removeClass('removeBottom')
            }
            else {
                $("#" + previousClick).addClass('active');
                $('.' + (previousClickIndex - 1)).addClass('removeBottom')
            }
            previousClick = categoryId
            previousClickIndex = index
        }
        // $('#' + categoryId).addClass('active')
    }

    function categorySelection(id, index) {
        $('.searchResults').addClass('d-none')
        $('.shabatMenu').removeClass('d-none')
        $('.categoryList').removeClass('px-3')
        currentClass = "#" + id
        if ($(currentClass).hasClass('active')) {
        }
        else {
            $(currentClass).addClass('active');

            $('.' + (index - 1)).addClass('removeBottom')
            console.log(previousClick);
            if (previousClick != "empty" && previousClick != id) {
                $("#" + previousClick).removeClass('active');
                $('.' + (previousClickIndex - 1)).removeClass('removeBottom')
            }
            else {
                $("#" + previousClick).addClass('active');
                $('.' + (previousClickIndex - 1)).addClass('removeBottom')

            }
            previousClick = id
            previousClickIndex = index
        }
    }

    const deleteItem = async (id) => {
        //debugger
        // console.log($('#' + id + ' ' + '.amountToBuy' + ' ' + 'input').val());
        let totalTodel
        let less

        let list = await cart.filter(x => {
            if (x.product._id == id) {
                totalTodel = x.Total
                less = x.Amount
            }
            return x.product._id != id;
        })
        let currTotal = parseFloat(total).toFixed(2) - parseFloat(totalTodel).toFixed(2)

        if (totalTodel < 0) {

            await props.setTotalRedux(parseFloat(0).toFixed(2))
            setTotal(parseFloat(0).toFixed(2))

        }

        else {

            await props.setTotalRedux(currTotal)//product.price
            setTotal(currTotal)//product.price

        }


        // let less = $('#' + id + ' ' + '.amountToBuy' + ' ' + 'input').val()


        setCart(list);
        // await props.setCartRedux(list)
        // $('.' + id).remove()

        await setNumItems(numItems - less)
        props.setNumItemsRedux(numItems - less)
        if (total == 0) {
            props.setTotalRedux(0)
        }

    }


    function searchProduct(searchWord_) {
        // let searchWord_ = e.target.value

        setSearchWord(searchWord_)
        $('.shabatMenu').addClass('d-none')
        $('.searchResults').removeClass('d-none')
        let filteredProducts = []
        filteredProducts = products && products.filter(
            product => {
                if (language != "he")
                    return (
                        product && product
                            .name
                            .toLowerCase()
                            .includes(searchWord_.toLowerCase())
                    );
                else
                    return (
                        product && product
                            .hebrewName
                            .toLowerCase()
                            .includes(searchWord_.toLowerCase())
                    );
            }
        );

        let div = document.getElementById('xxl')
        div.scrollTop -= 590
        if (searchWord_ == '') {
            setSerchResults([])
            $('.shabatMenu').removeClass('d-none')
            $('.searchResults').addClass('d-none')

        }
        else {
            setSerchResults(filteredProducts)
            if (filteredProducts == '')
                $('.notFound').removeClass('d-none')
            else
                $('.notFound').addClass('d-none')
        }


    }

    function clearSearch() {
        $('.inputOf_Search').val('')
        searchProduct('')
    }
    function useLocalStorage(key, initialValue) {

        const [storedValue, setStoredValue] = useState(() => {
            try {

                const item = window.localStorage.getItem(key);

                return item ? JSON.parse(item) : initialValue;
            } catch (error) {

                console.log(error);
                return initialValue;
            }
        });

        const setValue = (value) => {
            try {

                const valueToStore =
                    value instanceof Function ? value(storedValue) : value;

                setStoredValue(valueToStore);

                window.localStorage.setItem(key, JSON.stringify(valueToStore));
            } catch (error) {

                console.log(error);
            }
        };
        return [storedValue, setValue];
    }


    if (!products || !products.length) {
        props.getAllProducts()
    }
    if (!categories || !categories.length) {

        props.getAllCategories()

    }

    const changeAmount = async (id, action) => {
        //debugger
        if (action == 'minusToCart' || action == 'plusToCart') {
            let amountTocart = parseInt($('.' + id + ' ' + '.amountToBuy' + ' ' + 'input').val())
            cart.map(item => {
                if (item.product._id == id) {
                    if (action == 'plusToCart') {
                        item.Amount = parseInt(item.Amount) + 1
                        setNumItems(numItems + 1)
                        props.setNumItemsRedux(numItems + 1)
                        setTotal(total + 14.90)//+item.product.price
                        props.setTotalRedux(total + 14.90)//+item.product.price
                        amountTocart++
                    }
                    else {
                        if (amountTocart != '1') {
                            item.Amount = parseInt(item.Amount) - 1
                            setNumItems(numItems - 1)
                            props.setNumItemsRedux(numItems - 1)
                            setTotal(total - 14.90)//+item.product.price
                            props.setTotalRedux(total - 14.90)//+item.product.price
                            amountTocart--
                        }
                    }
                    item.Total = item.Amount * 14.90//*item.product.price
                }
            })

            $('.' + id + ' ' + '.amountToBuy' + ' ' + 'input').val(amountTocart)
            setCart(cart)
        }



        else {
            let amount = parseInt($('#' + id + ' ' + '.amountToBuy' + ' ' + 'input').val())
            if (action == 'plus')
                amount++
            else {
                if (amount != '1')
                    amount--
            }
            $('#' + id + ' ' + '.amountToBuy' + ' ' + 'input').val(amount)
        }
    }



    const AddToCart = async (product) => {

        if ($("#" + product._id + ' .amountOption_select').val() == " ") {
            $("#" + product._id + ' .errorSelect').removeClass('d-none')
            setTimeout(function () {
                $("#" + product._id + ' .errorSelect').addClass('d-none')
            }, 2000);
        }
        else {
            let amountToAdd = parseInt($('#' + product._id + ' ' + '.amountToBuy' + ' ' + 'input').val())
            props.setTotalRedux(total + (amountToAdd * 14.90))
            setTotal(total + (amountToAdd * 14.90))//product.price
            props.setNumItemsRedux(numItems + amountToAdd)
            setNumItems(numItems + amountToAdd)
            let flag = 0
            let shoppingCart = []
            if (cart != undefined)
                shoppingCart = cart
            shoppingCart.map(item => {
                if (item.product._id == product._id) {
                    //debugger
                    item.Amount = item.Amount + amountToAdd
                    item.Total = item.Total + (amountToAdd * 14.90)//item.product.price
                    flag = 1
                }
            })
            if (flag == 0) {
                let newItem = {
                    product: product,
                    Amount: amountToAdd,
                    Total: amountToAdd * 14.90//product.price
                }
                await shoppingCart.push(newItem)
            }
            await setCart(shoppingCart)
            // await props.setCartRedux(cart)

        }
    }

    useEffect(() => {

        if ($) {
            $('#shop').addClass('active');
            $('textarea').each(function () {
                this.setAttribute('style', 'height:' + (this.scrollHeight) + 'px;overflow-y:hidden;');
            }).on('input', function () {
                this.style.height = 'auto';
                this.style.height = (this.scrollHeight) + 'px';
            });



        }
    }, [$, props, language, totalRedux, numItemsRedux, cartRedux, total]);



    return (
        <div id="myDiv">


            <button className='bg-black text-white d-none scrollTopButton' style={{ position: 'fixed', top: '90%', left: '4%' }} onClick={scrollTopFunc}>Top</button>
            <Modal
                isShowing={isShowing}
                hide={toggle}
            />

            <div className="pageNuv ">
                {isTablet && (
                    <Hamborger history={props.history} />
                )}

                {!isMobile && !isTablet && (
                    <TopPageDesktop />
                )}
            </div>

            <div className="small_pageHeader " style={{ backgroundImage: `url(${headerBgImag})` }}>



            </div>



            <h4 className=' goldColor mt-2 text-center'>{i18.t('menuTitle')}</h4>


            <ShabbatMenuSystem />

        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        products: state.productReducer.products,
        categories: state.categoryReducer.categories,
        language: state.languageReducer.language,
        cartRedux: state.cartReducer.cartRedux,
        numItemsRedux: state.numItemsReducer.numItemsRedux,
        totalRedux: state.totalReducer.totalRedux,
        currentUser_: state.userReducer.currentUser_

    };
}
const mapDispatchToProps = (dispatch) => ({
    getAllProducts: () => dispatch(actions.getAllProducts()),
    getAllCategories: () => dispatch(actions.getAllCategories()),
    setCartRedux: (x) => dispatch(actions.setCartRedux(x)),
    setNumItemsRedux: (x) => dispatch(actions.setNumItemsRedux(x)),
    setTotalRedux: (Total) => dispatch(actions.setTotalRedux(Total)),
    setUser: (user) => dispatch(actions.setUser(user))

})
export default connect(mapStateToProps, mapDispatchToProps)(ShabbatMenu)
// export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProductList))