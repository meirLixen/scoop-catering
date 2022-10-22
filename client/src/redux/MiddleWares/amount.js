
import axios from "axios"
import { actions } from '../actions/action'


export const createAmount = ({ dispatch, getState }) => next => action => {
    if (action.type === 'CREATE_AMOUNT') {
        return new Promise((resolve, reject) => {
            axios.post('https://scoopcatering.co.il/amount/', action.payload)
                .then(res => {
                    dispatch(actions.setAmount(res.data))
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
export const updateAmount = ({ dispatch, getState }) => next => action => {
    if (action.type === 'UPDATE_AMOUNT') {
        let amount
        if (action.payload != undefined) {
            amount = action.payload._id;
        }
        axios.post(`https://scoopcatering.co.il/amounts/${amount}`, action.payload)
            .then(res => {
                dispatch(actions.setAmount(res.data))
            })
            .catch(error => {
                console.log(error)
            });
        return;
    }
    return next(action);
};
export const deleteAmount = ({ dispatch, getState }) => next => action => {
    if (action.type === 'DELETE_AMOUNT') {
        if (action.payload !== undefined)
            axios.delete(`https://scoopcatering.co.il/amount/${action.payload}`)
                .then(res => {
                    dispatch(actions.deleteAmountFromAmounts(action.payload))

                })
                .catch(error => {
                    console.log(error);

                });
        return;
    }
    return next(action);
};


export const getAllAmounts = ({ dispatch, getState }) => next => action => {

    if (action.type === 'GET_ALL_AMOUNTS') {
        return new Promise((resolve, reject) => {
            return axios.get('https://scoopcatering.co.il/amounts/')
                .then(resJson => {
                    dispatch(actions.setAllAmounts(resJson.data))
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

