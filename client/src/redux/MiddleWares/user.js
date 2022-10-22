
import axios from "axios"
import { actions } from '../actions/action'


export const getAllUsers = ({ dispatch, getState }) => next => action => {

    if (action.type === 'GET_ALL_USERS') {

        return new Promise((resolve, reject) => {
            return axios.get('https://scoopcatering.co.il/users/')
                .then(resJson => {
                    dispatch(actions.setAllUsers(resJson.data))
                    resolve()
                })
                .catch(error => {
                    console.log(error);

                    reject()
                });
        })
    }
    return next(action);

}



export const createUser = ({ dispatch, getState }) => next => action => {

    if (action.type === 'CREATE_USER') {

        console.log("fgvhjk");

        return new Promise((resolve, reject) => {
            axios.post('https://scoopcatering.co.il/user/', action.payload)
                .then(res => {
                    dispatch(actions.setUser(res.data))

                })
                .catch(error => {
                    console.log(error)
                    reject();
                });
            resolve();
        });
    }
    return next(action);
};





export const updateUserPassword = ({ dispatch, getState }) => next => action => {

    if (action.type === 'UPDATE_USER_PASSWORD') {

        console.log("updateUserPassword");

        return new Promise((resolve, reject) => {
            axios.post('https://scoopcatering.co.il/updateUserPassword/', action.payload)
                .then(res => {
                    dispatch(actions.setUser(res.data))

                })
                .catch(error => {
                    console.log(error)
                    reject();
                });
            resolve();
        });
    }
    return next(action);
};
