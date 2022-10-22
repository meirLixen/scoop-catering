
// import {keyBy} from 'lodash'
import produce from "immer";
import createReducer from "./reducerUtils";
// import { product } from '../../../src'

const initialState = {
    currentProductOnOrder: {},
    productsOnOrder: []
}
const productsOnOrderReducer = {
    setAllProductsOnOrder(state, action) {
        state.productsOnOrder = action.payload;
    },
    setProductOnOrder(state, action) {
        state.currentProductOnOrder = action.payload;
    },
    deleteProductFromproductsOnOrder(state, action) {
        const productId = action.payload;
        const index = state.productsOnOrder.map((product) => product._id).indexOf(productId);
        if (index !== -1) {
            state.productsOnOrder.splice(index, 1);
        }
    }
}
export default produce(
    (state, action) => createReducer(state, action, productsOnOrderReducer),
    initialState
);


