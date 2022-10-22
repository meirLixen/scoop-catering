
import produce from "immer";
import createReducer from "./reducerUtils";


const initialState = {
    totalRedux: 0
}
const totalReducer = {

    setTotalRedux(state, action) {
        state.totalRedux = action.payload;
    },

}
export default produce(
    (state, action) => createReducer(state, action, totalReducer),
    initialState
);


