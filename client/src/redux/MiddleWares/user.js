import { actions } from "../actions/action";

import api from "../../api";
export const getAllUsers =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    if (action.type === "GET_ALL_USERS") {
      return new Promise((resolve, reject) => {
        return api
          .get("/users/")
          .then((resJson) => {
            dispatch(actions.setAllUsers(resJson.data));
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

export const createUser =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    if (action.type === "CREATE_USER") {
      return new Promise((resolve, reject) => {
        api
          .post("/user/", action.payload)
          .then((res) => {
            dispatch(actions.setUser(res.data));
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

export const updateUserPassword =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    if (action.type === "UPDATE_USER_PASSWORD") {
      return new Promise((resolve, reject) => {
        api
          .post("/updateUserPassword/", action.payload)
          .then((res) => {
            dispatch(actions.setUser(res.data));
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
