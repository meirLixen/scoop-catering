
import produce from "immer";
import createReducer from "./reducerUtils";


const initialState = {
    cartRedux: []
}
const cartReducer = {

    setCartRedux(state, action) {
        state.cartRedux = action.payload;
    },

}
export default produce(
    (state, action) => createReducer(state, action, cartReducer),
    initialState
);


