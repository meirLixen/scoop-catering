import api from "../../api";
import { actions } from "../actions/action";

export const createMenu =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    if (action.type === "CREATE_MENU") {
      return new Promise((resolve, reject) => {
        api
          .post("/menu/", action.payload)
          .then((res) => {
            dispatch(actions.setMenu(res.data));
          })
          .catch((error) => {
            console.error(error);
            reject();
          });
        resolve();
      });
    }
    return next(action);
  };
export const updateMenu =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    if (action.type === "UPDATE_MENU") {
      let menu;
      if (action.payload !== undefined) {
        menu = action.payload._id;
      }
      api
        .post(`/menus/${menu}`, action.payload)
        .then((res) => {
          dispatch(actions.setMenu(res.data));
        })
        .catch((error) => {
          console.error(error);
        });
      return;
    }
    return next(action);
  };



  
export const deleteMenu =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    if (action.type === "DELETE_MENU") {
      if (action.payload !== undefined)
        api
          .delete(`/menu/${action.payload}`)
          .then((res) => {
            dispatch(actions.deleteMenuFromMenus(action.payload));
          })
          .catch((error) => {
            console.error(error);
          });
      return;
    }
    return next(action);
  };
export const copyMenu =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    if (action.type === "COPY_MENU") {
      return new Promise((resolve, reject) => {
        if (action.payload !== undefined)
          api
            .post(`/copyMenu/${action.payload}`)
            .then((res) => {
              dispatch(actions.setMenu(res.data));
              // dispatch(actions.setAllProducts(res.data))
            })
            .catch((error) => {
              console.error(error);
              reject();
            });
        resolve();
      });
    }
    return next(action);
  };

export const getAllMenus =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    if (action.type === "GET_ALL_MENUS") {
      return new Promise((resolve, reject) => {
        return api
          .get("/menus/")
          .then((resJson) => {
            dispatch(actions.setAllMenus(resJson.data));
            resolve();
          })
          .catch((error) => {
            console.error(error);
            reject();
          });
      });
    }
    return next(action);
  };

export const getMenuByID =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    if (action.type === "GET_MENU_BY_ID") {
      return new Promise((resolve, reject) => {
        return api
          .get(`/menu/${action.payload}`)
          .then((resJson) => {
            resolve(resJson.data);
          })
          .catch((error) => {
            console.error(error);
            reject();
          });
      });
    }
    return next(action);
  };
