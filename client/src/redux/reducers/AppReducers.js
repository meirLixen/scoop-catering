import { combineReducers } from 'redux';
import productReducer from './product.reducer';
import menuReducer from './menu.reducer';
import orderReducer from './order.reducer';
import userReducer from './user.reducer';
import categoryReducer from './category.reducer';
import amountReducer from './amount.reducer'
import productsOnOrderReducer from './productsOnOrder.reducer'
import navReducer from './nav.reducer'
import searchWordReducer from './searchWord.reducer'
import languageReducer from './language.reducer'
import cartReducer from './cart.reducer'
import numItemsReducer from './numItems.reducer'
import totalReducer from './total.reducer'
// Combine with other reducers we may add in the future

const AppReducers = combineReducers({
  productReducer: productReducer,
  menuReducer:menuReducer,
  orderReducer: orderReducer,
  userReducer: userReducer,
  categoryReducer: categoryReducer,
  amountReducer: amountReducer,
  productsOnOrderReducer: productsOnOrderReducer,
  searchWordReducer: searchWordReducer,
  nav: navReducer,
  languageReducer: languageReducer,
  cartReducer: cartReducer,
  numItemsReducer: numItemsReducer,
  totalReducer: totalReducer,

});


export default AppReducers;
