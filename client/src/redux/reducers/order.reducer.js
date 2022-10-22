
// import {keyBy} from 'lodash'
import produce from "immer";
import createReducer from "./reducerUtils";
// import { Order } from '../../../../server-side/models/Order'

const initialState = {
    currentOrder: {},
    orders: []
}

const orderReducer = {

    setAllOrders(state, action) {
        state.orders = action.payload;
    },



    setOrder(state, action) {
        state.currentOrder = action.payload;

    },
    deleteOrderFromOrders(state, action) {

        const orderId = action.payload;
        const index = state.orders.map((order) => order._id).indexOf(orderId);
        if (index !== -1) {
            state.orders.splice(index, 1);
        }
    }
}

export default produce(
    (state, action) => createReducer(state, action, orderReducer),
    initialState
);