import React, { useEffect, useState } from 'react';
import './App.css';
import { actions } from './redux/actions/action';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";


import Home from './components/Home'
import ContactUs from './components/interface-user/ContactUs'
import Menu from './components/interface-user/Shop'
import ProductList from './components/interface-user/ProductList';
import ProductList_manager from './components/interface-manager/ProductList_manager';
import history from "./components/history"
import OurPeeks from './components/interface-user/OurPeeks'
import Shop from './components/interface-user/Shop'
import MyCard from './components/MyCard'
import OurCustomers from './components/interface-user/OurCustomers'
import OurStory from './components/interface-user/ourStory/OurStory'
import OrdertList from './components/order/OrderList';
import NewOrder from './components/order/NewOrder';
import UserList from './components/user/UserList';
import NewUser from './components/user/NewUser';
import NewProduct from './components/product/NewProduct';
import { connect } from 'react-redux';
// import Search from './components/Search';
import initialDetails from './data/initialDetails';
import AppFirebase from './components/Firebase/AppFirebase'
import OrderSummary from './components/interface-manager/OrderSummary'
// import Try from './components/try'
import NavBar from './components/navBar/NavBar'
import Nuv from './components/mainPage/Nuv'
import SearchList from './components/SearchList'
import SearchResults from './components/interface-user/SearchResults'
import ShoppingCart from './components/interface-user/ShoppingCart'
import Checkout from './components/interface-user/Checkout'
import Payment from './components/interface-user/Payment'

import Events from './components/interface-user/Events'
import Gallery from './components/interface-user/Gallery'
import Kashrut from './components/interface-user/Kashrut'
import RelatedProducts from './components/interface-user/RelatedProducts'
import Local_Storag from './components/Local_Storag'
import ManagerInterface from './components/interface-manager/ManagerInterface'
import ShabbatMenu from './components/interface-user/ShabbatMenu'
import PostInfo from './components/PostInfo'
// import ComponnentToPrint from './components/ComponnentToPrint'
// import Example from './components/Example'
import Signup from "./components/Firebase/Signup"
import { Container } from "react-bootstrap"
import { AuthProvider } from "./contexts/AuthContext"

import Dashboard from "./components/Firebase/Dashboard"
import Login from "./components/Firebase/Login"
import PrivateRoute from "./components/Firebase/PrivateRoute"
import ForgotPassword from "./components/Firebase/ForgotPassword"
import UpdateProfile from "./components/Firebase/UpdateProfile"
import MenuScroll from "./components/interface-user/MenuScroll"





function App(props) {
  const [cart, setCart] = useLocalStorage("cart", []);
  const [numItems, setNumItems] = useLocalStorage("numItems", 0);
  const [total, setTotal] = useLocalStorage("total", 0);
  const { totalRedux, numItemsRedux, cartRedux } = props

  // if (totalRedux == 0) {
  //   props.setTotalRedux(total)
  // }
  // if (numItemsRedux == 0) {
  //   props.setNumItemsRedux(numItems)
  // }
  // if (!cartRedux.length) {
  //   //debugger
  //   props.setCartRedux(cart)
  // }

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

  const { productReducer } = props
  const list = [
    { 'id': 1, 'name': 'mindy' },
    { 'id': 2, 'name': 'shimon' },
    { 'id': 3, 'name': 'arye' },

  ]
  useEffect(() => {
  }, []);
  return (
    <>

      <Router history={history}>
        <AuthProvider>
          <Switch>

            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute path="/update-profile" component={UpdateProfile} />

            <PrivateRoute exact path="/shop" component={ShabbatMenu} />
            <PrivateRoute exact path="/shop/*" component={ShabbatMenu} />
            <PrivateRoute exact path="/" component={Home} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            {/* <Route path="/forgot-password" component={ForgotPassword} /> */}
          </Switch>
        </AuthProvider>



        <div className="App" >
          <Switch>

            <Route exact path="home/ProductList" component={ProductList} />
            {/* <Route exact path="/ShabbatMenu" component={ShabbatMenu} /> */}
            {/* <Route exact path="/shop" component={Shop} /> */}

            <Route exact path="/shop/relatedProducts" component={RelatedProducts} />
            {/* <Route exact path="/shop/*" component={ProductList} /> */}
            <Route exact path="/Nuv/" component={Nuv} />
            <Route exact path="/OrderSummary" component={OrderSummary} />
            {/* <Route exact path="/login" component={AppFirebase} /> */}
            <Route exact path="/manager" component={ManagerInterface} />
            <Route exact path="/contact-us" component={ContactUs} />
            <Route exact path="/home/ourTeam" component={OurPeeks} />
            <Route exact path="/home/ourCustomers" component={OurCustomers} />
            <Route exact path="/home/OurStory" component={OurStory} />
            <Route exact path="/home/kashrut" component={Kashrut} />
            <Route exact path="/SearchResults/*" component={SearchResults} />
            <Route exact path="/Cart" component={ShoppingCart} />
            <Route exact path="/Checkout" component={Checkout} />
            <Route exact path="/Payment" component={Payment} />
            <Route exact path="/gallery" component={Gallery} />
            <Route exact path="/events" component={Events} />
            <Route exact path="/menu" component={MenuScroll} />

          </Switch>
        </div>
      </Router>

    </>
  );
}
const mapStateToProps = state => ({
  cartRedux: state.cartReducer.cartRedux,
  numItemsRedux: state.numItemsReducer.numItemsRedux,
  totalRedux: state.totalReducer.totalRedux

})

const mapDispatchToProps = dispatch => ({
  setCartRedux: (x) => dispatch(actions.setCartRedux(x)),
  setNumItemsRedux: (NumItems) => dispatch(actions.setNumItemsRedux(NumItems)),
  setTotalRedux: (Total) => dispatch(actions.setTotalRedux(Total))
  // products: (product) => dispatch(actions.setSocket(product)),
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
