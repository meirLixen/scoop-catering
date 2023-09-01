
// import {keyBy} from 'lodash'
import menu from "immer";
import createReducer from "./reducerUtils";


const initialState = {
  currentMenu: {},
  menus: []
}
const menuReducer = {
  setAllMenus(state, action) {
    state.menus = action.payload;
  },
  setMenu(state, action) {
    state.currentMenu = action.payload;
    console.log("state.currentMenu", state.currentMenu);
    const index = state.menus.map((menu) => menu._id).indexOf(state.currentMenu._id);
    if (index !== -1) {
      state.menus[index] = state.currentMenu;
    }
    else {
      state.menus.push(state.currentMenu.product)
    }


  },
  deleteMenuFromMenus(state, action) {
    const menuId = action.payload;
    const index = state.menus.map((menu) => menu._id).indexOf(menuId);
    if (index !== -1) {
      state.menus.splice(index, 1);
    }
  }
}
export default menu(
  (state, action) => createReducer(state, action, menuReducer),
  initialState
);


