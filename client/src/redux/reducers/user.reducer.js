
// import {keyBy} from 'lodash'
import produce from "immer";
import createReducer from "./reducerUtils";
// import { User } from '../../../src'

const initialState = {
    currentUser_: {},
    users: []
}

const userReducer = {

    setAllUsers(state, action) {
        state.users = action.payload;
    },



    setUser(state, action) {

        state.currentUser_ = action.payload;

    },
}

// updateCardInCards(state, action) {
//     const updateCard = action.payload;
//     const index = state.cards.map((card) => card._id).indexOf(updateCard._id);
//     if (index !== -1) {
//       state.cards[index] = updateCard;
//     }
//   },



export default produce(
    (state, action) => createReducer(state, action, userReducer),
    initialState
);