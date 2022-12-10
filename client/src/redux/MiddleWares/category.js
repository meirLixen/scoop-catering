import api from "../../api";
import { actions } from "../actions/action";

export const createCategory =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    if (action.type === "CREATE_CATEGORY") {
      return new Promise((resolve, reject) => {
        api
          .post("/category/", action.payload)
          .then((res) => {
            dispatch(actions.setCategory(res.data));
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
export const updateCategory =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    if (action.type === "UPDATE_CATEGORY") {
      let category;
      if (action.payload !== undefined) {
        category = action.payload._id;
      }
      api
        .post(`/categories/${category}`, action.payload)
        .then((res) => {
          dispatch(actions.setCategory(res.data));
        })
        .catch((error) => {
          console.error(error);
        });
      return;
    }
    return next(action);
  };
export const deleteCategory =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    if (action.type === "DELETE_CATEGORY") {
      if (action.payload !== undefined)
        api
          .delete(`/category/${action.payload}`)
          .then((res) => {
            dispatch(actions.deleteCategoryFromCategories(action.payload));
          })
          .catch((error) => {
            console.error(error);
          });
      return;
    }
    return next(action);
  };

export const getAllCategories =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    if (action.type === "GET_ALL_CATEGORIES") {
      return new Promise((resolve, reject) => {
        return api
          .get("/categories/")
          .then((resJson) => {
            dispatch(actions.setAllCategories(resJson.data));
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
