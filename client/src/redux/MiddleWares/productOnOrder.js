import api from "../../api";
import { actions } from "../actions/action";
export const createProductOnOrder =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    if (action.type === "CREATE_PRODUCT_ON_ORDER") {
      return new Promise((resolve, reject) => {
        api
          .post("/productOnOrder/", action.payload)
          .then((res) => {
            dispatch(actions.setProductOnOrder(res.data));
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
export const updateProductOnOrder =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    if (action.type === "UPDATE_PRODUCT_ON_ORDER") {
      let product;
      if (action.payload !== undefined) {
        product = action.payload._id;
      }
      api
        .post(`/productsOnOrder/${product}`, action.payload)
        .then((res) => {
          dispatch(actions.setProductOnOrder(res.data));
        })
        .catch((error) => {
          console.error(error);
        });
      return;
    }
    return next(action);
  };
export const deleteProductOnOrder =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    if (action.type === "DELETE_PRODUCT_ON_ORDER") {
      if (action.payload !== undefined)
        api
          .delete(`/productsOnOrder/${action.payload}`)
          .then((res) => {
            dispatch(actions.deleteProductFromProductsOnOrder(action.payload));
          })
          .catch((error) => {
            console.error(error);
          });
      return;
    }
    return next(action);
  };

export const getAllProductsOnOrder =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    if (action.type === "GET_ALL_PRODUCTS_ON_ORDER") {
      return new Promise((resolve, reject) => {
        return api
          .get("/productsOnOrder")
          .then((resJson) => {
            dispatch(actions.setAllProductsOnOrder(resJson.data));
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
