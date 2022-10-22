
import produce from "immer";
import createReducer from "./reducerUtils";


const initialState = {
    searchWord: ""
}
const searchWordReducer = {

    setSearchWord(state, action) {
        state.searchWord = action.payload;
    },

}
export default produce(
    (state, action) => createReducer(state, action, searchWordReducer),
    initialState
);


