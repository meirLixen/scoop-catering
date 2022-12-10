import api from "../../api";
import { actions } from "../actions/action";

export const createAmount =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    if (action.type === "CREATE_AMOUNT") {
      return new Promise((resolve, reject) => {
        api
          .post("/amount/", action.payload)
          .then((res) => {
            dispatch(actions.setAmount(res.data));
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
export const updateAmount =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    if (action.type === "UPDATE_AMOUNT") {
      let amount;
      if (action.payload !== undefined) {
        amount = action.payload._id;
      }
      api
        .post(`/amounts/${amount}`, action.payload)
        .then((res) => {
          dispatch(actions.setAmount(res.data));
        })
        .catch((error) => {
          console.error(error);
        });
      return;
    }
    return next(action);
  };
export const deleteAmount =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    if (action.type === "DELETE_AMOUNT") {
      if (action.payload !== undefined)
        api
          .delete(`/amount/${action.payload}`)
          .then((res) => {
            dispatch(actions.deleteAmountFromAmounts(action.payload));
          })
          .catch((error) => {
            console.error(error);
          });
      return;
    }
    return next(action);
  };

export const getAllAmounts =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    if (action.type === "GET_ALL_AMOUNTS") {
      return new Promise((resolve, reject) => {
        return api
          .get("/amounts/")
          .then((resJson) => {
            dispatch(actions.setAllAmounts(resJson.data));
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
