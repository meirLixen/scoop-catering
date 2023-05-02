import React, { useEffect } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from "./components/Firebase/Dashboard";
import Login from "./components/Firebase/Login";
import ForgotPassword from "./components/Firebase/ForgotPassword";
import PrivateRoute from "./components/Firebase/PrivateRoute";
import Signup from "./components/Firebase/Signup";
import UpdateProfile from "./components/Firebase/UpdateProfile";
import history from "./components/history";
import Home from "./components/Home";
import Terms from "./components/interface-user/_Terms";
import ManagerInterface from "./components/interface-manager/ManagerInterface";
import OrderSummary from "./components/interface-manager/OrderSummary";
import Checkout from "./components/interface-user/Checkout";
import ContactUs from "./components/interface-user/ContactUs";
import Events from "./components/interface-user/Events";
import Gallery from "./components/interface-user/Gallery";
import Kashrut from "./components/interface-user/Kashrut";
import MenuScroll from "./components/interface-user/MenuScroll";
import OurCustomers from "./components/interface-user/OurCustomers";
import OurPeeks from "./components/interface-user/OurPeeks";
import OurStory from "./components/interface-user/ourStory/OurStory";
import Payment from "./components/interface-user/Payment";
import ProductList from "./components/interface-user/ProductList";
import RelatedProducts from "./components/interface-user/RelatedProducts";
import SearchResults from "./components/interface-user/SearchResults";
import ShabbatMenu from "./components/interface-user/ShabbatMenu";
import ShoppingCart from "./components/interface-user/ShoppingCart";
import Nuv from "./components/mainPage/Nuv";
import { actions } from "./redux/actions/action";

import "./App.css";

function App(props) {
  const { categories, products } = props.categories;

  useEffect(() => {
    if (!categories || !categories.length) {
      props.getAllCategories();
    }
    if (!products || !products.length) {
      props.getAllProducts();
    }
  }, []);

  return (
    <Router history={history}>
      <Switch>
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute path="/update-profile" component={UpdateProfile} />
        <PrivateRoute
          exact
          path={["/shop", "/shop/*"]}
          component={ShabbatMenu}
        />

        <Route exact path="/" component={Home} />
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path="/forgot-password" component={ForgotPassword} />
        <div className="App">
          <PrivateRoute
            exact
            path="/manager"
            allowAdminOnly
            component={ManagerInterface}
          />
          <Route exact path="home/ProductList" component={ProductList} />
          <Route
            exact
            path="/shop/relatedProducts"
            component={RelatedProducts}
          />
          <Route exact path="/Nuv/" component={Nuv} />
          <Route exact path="/OrderSummary" component={OrderSummary} />
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
          <Route exact path="/Terms" component={Terms} />


        </div>
      </Switch>
    </Router>
  );
}

const mapStateToProps = (state) => ({
  cartRedux: state.cartReducer.cartRedux,
  numItemsRedux: state.numItemsReducer.numItemsRedux,
  totalRedux: state.totalReducer.totalRedux,
  categories: state.categoryReducer.categories,
  products: state.categoryReducer.products,
});

const mapDispatchToProps = (dispatch) => ({
  setCartRedux: (x) => dispatch(actions.setCartRedux(x)),
  setNumItemsRedux: (NumItems) => dispatch(actions.setNumItemsRedux(NumItems)),
  setTotalRedux: (Total) => dispatch(actions.setTotalRedux(Total)),
  getAllCategories: () => dispatch(actions.getAllCategories()),
  getAllProducts: () => dispatch(actions.getAllProducts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);