
// import {keyBy} from 'lodash'
import produce from "immer";
import createReducer from "./reducerUtils";
// import { product } from '../../../src'

const initialState = {
  currentProduct: {},
  products: []
}
const productReducer = {
  setAllProducts(state, action) {
    state.products = action.payload;
  },
  setProduct(state, action) {
    state.currentProduct = action.payload;
    console.log(" state.currentProduct", state.currentProduct);
    const index = state.products.map((product) => product._id).indexOf(state.currentProduct._id);
    if (index !== -1) {
        state.products[index] = state.currentProduct;
    }
   
   
  },
  deleteProductFromProducts(state, action) {
    const productId = action.payload;
    const index = state.products.map((product) => product._id).indexOf(productId);
    if (index !== -1) {
      state.products.splice(index, 1);
    }
   
  }
}
export default produce(
  (state, action) => createReducer(state, action, productReducer),
  initialState
);


