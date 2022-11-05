import { actions } from "../actions/action";
import api from "../../api";

export const createProduct =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    if (action.type === "CREATE_PRODUCT") {
      return new Promise((resolve, reject) => {
        api
          .post("/product/", action.payload)
          .then((res) => {
            dispatch(actions.setProduct(res.data));
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
export const updateProduct =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    if (action.type === "UPDATE_PRODUCT") {
      let product;
      if (action.payload !== undefined) {
        product = action.payload._id;
      }
      api
        .post(`/products/${product}`, action.payload)
        .then((res) => {
          dispatch(actions.setProduct(res.data));
        })
        .catch((error) => {
          console.error(error);
        });
      return;
    }
    return next(action);
  };
export const deleteProduct =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    if (action.type === "DELETE_PRODUCT") {
      if (action.payload !== undefined)
        api
          .delete(`/product/${action.payload}`)
          .then((res) => {
            dispatch(actions.deleteProductFromProducts(action.payload));
          })
          .catch((error) => {
            console.error(error);
          });
      return;
    }
    return next(action);
  };
export const copyProduct =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    if (action.type === "COPY_PRODUCT") {
      return new Promise((resolve, reject) => {
        if (action.payload !== undefined)
          api
            .post(`/copyProduct/${action.payload}`)
            .then((res) => {
              dispatch(actions.setProduct(res.data));
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

export const getAllProducts =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    if (action.type === "GET_ALL_PRODUCTS") {
      return new Promise((resolve, reject) => {
        return api
          .get("/products/")
          .then((resJson) => {
            dispatch(actions.setAllProducts(resJson.data));
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
export const getProductByID =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    if (action.type === "GET_PRODUCT_BY_ID") {
      return new Promise((resolve, reject) => {
        return api
          .get(`/product/${action.payload}`)
          .then((resJson) => {
            // dispatch(actions.setAllProducts(resJson.data))
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
