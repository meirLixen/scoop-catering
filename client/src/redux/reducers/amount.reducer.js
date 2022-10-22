
// import {keyBy} from 'lodash'
import produce from "immer";
import createReducer from "./reducerUtils";


const initialState = {
    currentAmount: {},
    amounts: []
}
const amountReducer = {
    setAllAmounts(state, action) {
        state.amounts = action.payload;
    },
    setAmount(state, action) {
        state.currentAmount = action.payload;
    },
    deleteAmountFromAmounts(state, action) {
        const amountId = action.payload;
        const index = state.amounts.map((amount) => amount._id).indexOf(amountId);
        if (index !== -1) {
            state.amounts.splice(index, 1);
        }
    }
}
export default produce(
    (state, action) => createReducer(state, action, amountReducer),
    initialState
);


