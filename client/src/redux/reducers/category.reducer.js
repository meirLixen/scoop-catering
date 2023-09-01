// import {keyBy} from 'lodash'
import produce from "immer";
import createReducer from "./reducerUtils";


const initialState = {
    currentCategory: {},
    categories: []
}
const categoryReducer = {
    setAllCategories(state, action) {
        state.categories = action.payload;
    },
    setCategory(state, action) {
        state.currentCategory = action.payload;

        console.log("state.currentCategory", state.currentCategory);
        const index = state.categories.map((category) => category._id).indexOf(state.currentCategory._id);
        if (index !== -1) {
            state.categories[index] = state.currentCategory;
        }
        // else {
        //     state.categories.push(action.payload)
        // }




    },
    deleteCategoryFromCategories(state, action) {
        const categoryId = action.payload;
        const index = state.categories.map((category) => category._id).indexOf(categoryId);
        if (index !== -1) {
            state.categories.splice(index, 1);
        }
    }
}
export default produce(
    (state, action) => createReducer(state, action, categoryReducer),
    initialState
);


