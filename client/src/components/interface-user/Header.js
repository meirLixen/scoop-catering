import React, { useEffect, useState } from "react"
import { useAuth } from "../../contexts/AuthContext"
import logo from '../../data/imges/logo.png'
import underLogo from '../../data/imges/underLogo.png'
// import Navbar from 'react-bootstrap/Navbar'
import Login from '../Firebase/Login'
import Signup from '../Firebase/Signup'
import AppFirebase from '../Firebase/AppFirebase'
import { withRouter, Link, useHistory } from 'react-router-dom';

import Collapse from 'react-bootstrap/Collapse'
import Offcanvas from 'react-bootstrap/Offcanvas'
import { connect } from 'react-redux';
import { actions } from '../../redux/actions/action';
import { Container, Form, FormControl, Nav, Button, NavDropdown, Image, Row, Card } from "react-bootstrap"
import allVectorSmart from '../../data/imges/allVectorSmart.png'
import Navbar from 'react-bootstrap/Navbar'
import Cart from '../../data/imges/cart.png'
// import { withRouter, Link, useHistory } from 'react-router-dom';
// import UserLogin from '../Firebase/UserLogin'
import $ from 'jquery'
import { useTranslation } from 'react-i18next';
import i18 from '../../i18/i18';
export function Header(props) {
    const { t, i18n } = useTranslation();
    const [side, setSide] = useState('');
    const [align, setAlign] = useState('');
    // const history = useHistory()
    // const [error, setError] = useState("")
    // const { currentUser, logout } = useAuth()
    // const history = useHistory()


    // async function handleLogout() {
    //     setError("")

    //     try {
    //         await logout()
    //         history.push("/login")
    //     } catch {
    //         setError("Failed to log out")
    //     }
    // }
    const [open, setOpen] = useState(false);
    const { language } = props
    const [cart, setCart] = useLocalStorage("cart", []);
    const [numItems, setNumItems] = useLocalStorage("numItems", 0);
    const [total, setTotal] = useLocalStorage("total", 0);
    const { totalRedux, numItemsRedux, cartRedux } = props
    // if (totalRedux == 0) {
    //     props.setTotalRedux(total)
    // }
    if (numItemsRedux == 0) {
        props.setNumItemsRedux(numItems)
    }
    if (!cartRedux.length) {
        //debugger
        props.setCartRedux(cart)
    }
    function useLocalStorage(key, initialValue) {
        //debugger
        // State to store our value
        // Pass initial state function to useState so logic is only executed once
        const [storedValue, setStoredValue] = useState(() => {
            try {
                // Get from local storage by key
                const item = window.localStorage.getItem(key);
                // Parse stored json or if none return initialValue
                return item ? JSON.parse(item) : initialValue;
            } catch (error) {
                // If error also return initialValue
                console.log(error);
                return initialValue;
            }
        });
        // Return a wrapped version of useState's setter function that ...
        // ... persists the new value to localStorage.
        const setValue = (value) => {
            try {
                // Allow value to be a function so we have same API as useState
                const valueToStore =
                    value instanceof Function ? value(storedValue) : value;
                // Save state
                setStoredValue(valueToStore);
                // Save to local storage
                window.localStorage.setItem(key, JSON.stringify(valueToStore));
            } catch (error) {
                // A more advanced implementation would handle the error case
                console.log(error);
            }
        };
        return [storedValue, setValue];
    }

    const changeAmount = async (id, action) => {
        //debugger
        let amount = parseInt($('.' + id + ' ' + '.amountToBuy' + ' ' + 'input').val())

        cartRedux && cartRedux.map(item => {

            if (item.product._id == id) {
                if (action == 'plus') {
                    console.log(item.Amount);
                    // item.Amount = parseInt(item.Amount) + 1
                    setNumItems(numItems + 1)
                    setTotal(total + 14.90)//+item.product.price
                    props.setTotalRedux(total + 14.90)//+item.product.price
                    amount++
                    $('.' + id + ' ' + '.amountToBuy' + ' ' + 'input').val(amount)
                }
                else {
                    if (amount != '1') {
                        item.Amount = parseInt(item.Amount) - 1
                        setNumItems(numItems - 1)
                        setTotal(total + 14.90)//+item.product.price
                        props.setTotalRedux(total + 14.90)//+item.product.price
                        $('.' + id + ' ' + '.amountToBuy' + ' ' + 'input').val(amount)
                        amount--

                    }

                }

            }
        })
        $('.' + id + ' ' + '.amountToBuy' + ' ' + 'input').val(amount)
        setCart(cart)
    }


    const deleteItem = async (id) => {
        //debugger
        let totalTodel


        let list = await cart.filter(x => {
            if (x.product._id == id) {
                totalTodel = x.Total
            }
            return x.product._id != id;
        })
        let currTotal = parseFloat(total).toFixed(2) - parseFloat(totalTodel).toFixed(2)
        if (totalTodel < 0) {
            setTotal(parseFloat(0).toFixed(2))
            props.setTotalRedux(parseFloat(0).toFixed(2))
        }

        else {
            setTotal(currTotal)//product.price
            props.setTotalRedux(currTotal)//product.price
        }


        let less = $('.' + id + ' ' + '.amountToBuy' + ' ' + 'input').val()


        setCart(list);
        await props.setCartRedux(list)
        // $('.' + id).remove()

        await setNumItems(numItems - less)
        props.setNumItemsRedux(numItems - less)

    }


    useEffect(() => {


        if (language == 'he') {
            // $('.navbar-toggler').click()
            setSide('rtl')
            setAlign('text-end')
        }

        else {
            setSide('ltr')
            setAlign('text-start')
        }



    }, [total, language, totalRedux, numItemsRedux, cartRedux])

    return (
        <>
            {/* <Navbar className="cartNuvbar bg-transparent border-0 p-0" expand={false} styl={{
            }}>
                <Container fluid className="p-0 ">

                    <Navbar.Toggle aria-controls="offcanvasNavbar" className=" p-0" />
                    <Navbar.Offcanvas
                        id="offcanvasNavbar"
                        aria-labelledby="offcanvasNavbarLabel"
                        placement="end"
                        className=""
                    >
                        <Offcanvas.Header closeButton className="rtl py-4" style={{ backgroundColor: '#f1f1f2' }}>
                            <Offcanvas.Title className="m-auto   fontNumber  font-weight-bold" id="offcanvasNavbarLabel">{i18.t('ShoppingCart')}
                                (<span className="numItems">{numItems}</span>)</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body className=" d-flex flex-column  pl-4 pt-0 pr-0 overflow-hidden">
                            {cart == "" && (
                                <h4 className="text-center mt-5 pt-5">{i18.t('emptyCart')}</h4>

                            )
                            }

                            <div className="ShoppingCart_itemList mb-5 px-2 pt-3">
                                {cart && cart.map(item =>
                                    <div className={`productItem row justify-content-around align-items-end  border-bottom border-dark py-2 ${side} ${item.product._id}`}  >
                                        <div className={`productName col-12  font-weight-bold   ${align}`}> {language == "he" ? item.product.hebrewName : item.product.name}</div>
                                        <div className='amountToBuy col-3 goldColor d-flex   p-0  align-items-end' style={{ width: 'fit-content' }}>
                                            <span className="plus" onClick={() => changeAmount(item.product._id, "plus")} style={{ height: '29px' }}>+</span>
                                            <input type="text" value={item.Amount} className='AmountInput border p-0 text-black bg-white pt-0 pb-0 pl-2 pr-2 m-1 my-0 input_number fontNumber' style={{ fontSize: '13px' }} />
                                            <span className="minus" onClick={() => changeAmount(item.product._id, "minus")} style={{ height: '29px' }}>-</span>
                                        </div>
                                        <div className='col-6 price h6 mb-0 font-weight-bold  goldColor fontNumber' >{parseFloat(14.90).toFixed(2)} &#8362; </div>

                                        <div className="col-1" onClick={() => deleteItem(item.product._id)}> <i class="fas fa-trash-alt "></i></div>



                                    </div>

                                )}



                            </div>




                            {cart != "" && (
                                <div className=" swithDir d-flex row  justify-content-around " >
                                    <button className="col-5 bg-black text-white" onClick={() => props.history.push('/Cart')} >{i18.t('ToTheShoppingCart')}</button>
                                    <button className=" col-5 goldButton" onClick={() => props.history.push('/Checkout')}>{i18.t('toCheckout')}</button>
                                </div>

                            )}

                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>

 */}


            <div className="bg-black">
                <div className="row px-5 pt-2 pb-2 d-flex  headerPage justify-content-space-around align-items-center swithDir">
                    {/* <div className="registerSection col-6 d-flex">
                        <Button
                            className=""
                            onClick={() => {

                                setOpen(!open)
                            }}
                            aria-controls="example-collapse-text"
                            aria-expanded={open}
                        >

                        </Button>

                        <Collapse in={open}>
                            <div id="example-collapse-text" style={{ position: 'absolute', zIndex: '99999', top: '40px', left: '50%' }}>
                                <Card body style={{ width: '50vw', height: 'fit-content' }} >


                                    <div className=""><AppFirebase /></div>
                                  


                                </Card>
                            </div>
                        </Collapse>
                    </div>
 */}




                    {/* <div className=" col-6 d-flex d-none connectSection">
                        <div className="text-white">    {currentUser.email}</div>
                        <Button variant="link" className="p-0 m-0"
                            onClick={handleLogout}>
                            Log Out
                        </Button>
                    </div> */}



                    <div className=" col-12 h6 whiteColor mb-0 d-flex align-items-center justify-content-center  swithDir" style={{ fontSize: '16px' }} > <div> {i18.t('BookAnEvent')}  : </div>  <div className=" mx-1 " >  077-255-9982 </div> </div>
                    <div className=" registerSection col-6 h6 mb-0   whiteColor d-flex align-items-center justify-content-center d-none" ><div className="mx-5 fontNumber totalReduxUp"> {totalRedux ? parseFloat(totalRedux).toFixed(2) : parseFloat(0).toFixed(2)} &#8362;</div>
                        {/* <div className="ml-5 mr-5" onClick={() => props.history.push('/login')}><a >{i18.t('Login')}</a>/<a >{i18.t('Register')}</a></div> */}

                    </div>




                </div>

            </div>
        </>
    )
}


const mapStateToProps = (state) => {
    return {

        products: state.productReducer.products,
        language: state.languageReducer.language,
        cartRedux: state.cartReducer.cartRedux,
        numItemsRedux: state.numItemsReducer.numItemsRedux,
        totalRedux: state.totalReducer.totalRedux

    };
}
const mapDispatchToProps = (dispatch) => ({
    getAllProducts: () => dispatch(actions.getAllProducts()),
    setLanguage: (lan) => dispatch(actions.setLanguage(lan)),
    setCartRedux: (x) => dispatch(actions.setCartRedux(x)),
    setNumItemsRedux: (NumItems) => dispatch(actions.setNumItemsRedux(NumItems)),
    setTotalRedux: (Total) => dispatch(actions.setTotalRedux(Total))

})
export default connect(mapStateToProps, mapDispatchToProps)(Header)
