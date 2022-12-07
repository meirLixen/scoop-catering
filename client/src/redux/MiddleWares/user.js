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
            console.log(error);

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
      console.log("fgvhjk");

      return new Promise((resolve, reject) => {
        api
          .post("/user/", action.payload)
          .then((res) => {
            dispatch(actions.setUser(res.data));
          })
          .catch((error) => {
            console.log(error);
            reject();
          });
        resolve();
      });
    }
    return next(action);
  };

  export const updateUser =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    if (action.type === "UPDATE_USER") {
      let uid;
      if (action.payload !== undefined) {
        uid = action.payload.uid;
      }
      api
        .post(`/users/${uid}`, action.payload)
        .then((res) => {
          dispatch(actions.setProduct(res.data));
        })
        .catch((error) => {
          console.log(error);
        });
      return;
    }
    return next(action);
  };





export const updateUserPassword =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    if (action.type === "UPDATE_USER_PASSWORD") {
      console.log("updateUserPassword");

      return new Promise((resolve, reject) => {
        api
          .post("/updateUserPassword/", action.payload)
          .then((res) => {
            dispatch(actions.setUser(res.data));
          })
          .catch((error) => {
            console.log(error);
            reject();
          });
        resolve();
      });
    }
    return next(action);
  };
