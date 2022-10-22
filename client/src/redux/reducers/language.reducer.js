
import produce from "immer";
import createReducer from "./reducerUtils";


const initialState = {
    language: "en"
}
const languageReducer = {

    setLanguage(state, action) {
        state.language = action.payload;
    },

}
export default produce(
    (state, action) => createReducer(state, action, languageReducer),
    initialState
);


