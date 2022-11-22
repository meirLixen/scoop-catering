import React from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { actions } from "./redux/actions/action";
import Home from "./components/Home";
import ContactUs from "./components/interface-user/ContactUs";
import ProductList from "./components/interface-user/ProductList";
import history from "./components/history";
import OurPeeks from "./components/interface-user/OurPeeks";
import OurCustomers from "./components/interface-user/OurCustomers";
import OurStory from "./components/interface-user/ourStory/OurStory";
import OrderSummary from "./components/interface-manager/OrderSummary";
import Nuv from "./components/mainPage/Nuv";
import SearchResults from "./components/interface-user/SearchResults";
import ShoppingCart from "./components/interface-user/ShoppingCart";
import Checkout from "./components/interface-user/Checkout";
import Payment from "./components/interface-user/Payment";
import Events from "./components/interface-user/Events";
import Gallery from "./components/interface-user/Gallery";
import Kashrut from "./components/interface-user/Kashrut";
import RelatedProducts from "./components/interface-user/RelatedProducts";
import ManagerInterface from "./components/interface-manager/ManagerInterface";
import ShabbatMenu from "./components/interface-user/ShabbatMenu";


import Signup from "./components/Firebase/Signup";
import { AuthProvider } from "./contexts/AuthContext";
import Dashboard from "./components/Firebase/Dashboard";
import Login from "./components/Firebase/Login";
import PrivateRoute from "./components/Firebase/PrivateRoute";
import UpdateProfile from "./components/Firebase/UpdateProfile";
import MenuScroll from "./components/interface-user/MenuScroll";

import "./App.css";

function App(props) {
  return (
    <Router history={history}>
      <AuthProvider>
        <Switch>
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <PrivateRoute path="/update-profile" component={UpdateProfile} />
          <PrivateRoute
            exact
            path={["/shop", "/shop/*"]}
            component={ShabbatMenu}
          />
         
         
          <PrivateRoute exact path="/" component={Home} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
        </Switch>
      </AuthProvider>

      <div className="App">
        <Switch>
          <Route exact path="home/ProductList" component={ProductList} />
          <Route
            exact
            path="/shop/relatedProducts"
            component={RelatedProducts}
          />
          <Route exact path="/Nuv/" component={Nuv} />
          <Route exact path="/OrderSummary" component={OrderSummary} />
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
  );
}

const mapStateToProps = (state) => ({
  cartRedux: state.cartReducer.cartRedux,
  numItemsRedux: state.numItemsReducer.numItemsRedux,
  totalRedux: state.totalReducer.totalRedux,
});

const mapDispatchToProps = (dispatch) => ({
  setCartRedux: (x) => dispatch(actions.setCartRedux(x)),
  setNumItemsRedux: (NumItems) => dispatch(actions.setNumItemsRedux(NumItems)),
  setTotalRedux: (Total) => dispatch(actions.setTotalRedux(Total)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
