
import produce from "immer";
import createReducer from "./reducerUtils";


const initialState = {
    numItemsRedux: 0
}
const numItemsReducer = {

    setNumItemsRedux(state, action) {
        state.numItemsRedux = action.payload;
    },

}
export default produce(
    (state, action) => createReducer(state, action, numItemsReducer),
    initialState
);


