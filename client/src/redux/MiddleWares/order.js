import { actions } from "../actions/action";

import api from "../../api";

export const getAllOrders =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    if (action.type === "GET_ALL_ORDERS") {
      return new Promise((resolve, reject) => {
        return api
          .get("/orders/")
          .then((resJson) => {
            dispatch(actions.setAllOrders(resJson.data));
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

export const createOrder =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    if (action.type === "CREATE_ORDER") {
      return new Promise((resolve, reject) => {
        api
          .post("/order/"+action.payload.userId, action.payload)
          .then((res) => {
            dispatch(actions.setOrder(res.data));
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

export const updateOrder =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    if (action.type === "UPDATE_ORDER") {
      const orderId = action.payload._id;

      api
        .patch(`/orders/${orderId}`, action.payload)

        .then((res) => {
          dispatch(actions.setOrder(res.data));
        })
        .catch((error) => {
          console.error(error);
        });

      return;
    }
    return next(action);
  };

export const deleteOrder =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    let order, orderId;

    if (action.type === "DELETE_ORDER") {
      order = action.payload;
      if (order !== undefined) orderId = order._id;
      api
        .delete(`/order/${orderId}`)
        .then((res) => {
          dispatch(actions.deleteOrderFromOrders(orderId));
        })
        .catch((error) => {
          console.error(error);
        });
      return;
    }
    return next(action);
  };
