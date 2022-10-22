import axios from "axios"
import { actions } from '../actions/action'




export const getAllOrders = ({ dispatch, getState }) => next => action => {

    if (action.type === 'GET_ALL_ORDERS') {

        return new Promise((resolve, reject) => {
            return axios.get('https://scoopcatering.co.il/orders/')
                .then(resJson => {

                    dispatch(actions.setAllOrders(resJson.data))
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


export const createOrder = ({ dispatch, getState }) => next => action => {
    if (action.type === 'CREATE_ORDER') {

        console.log("fgvhjk");

        return new Promise((resolve, reject) => {
            axios.post('https://scoopcatering.co.il/order/', action.payload)
                .then(res => {
                    dispatch(actions.setOrder(res.data))

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

export const updateOrder = ({ dispatch, getState }) => next => action => {
    if (action.type === 'UPDATE_ORDER') {

        const orderId = action.payload._id;



        axios.patch(`https://scoopcatering.co.il/orders/${orderId}`, action.payload)

            .then(res => {
                dispatch(actions.setOrder(res.data))
            })
            .catch(error => {
                console.log(error)

            });


        return;
    }
    return next(action);
};


export const deleteOrder = ({ dispatch, getState }) => next => action => {
    let order, orderId

    if (action.type === 'DELETE_ORDER') {
        order = action.payload;
        if (order !== undefined)
            orderId = order._id;
        axios.delete(`https://scoopcatering.co.il/order/${orderId}`)
            .then(res => {
                dispatch(actions.deleteOrderFromOrders(orderId))


            })
            .catch(error => {
                console.log(error);

            });
        return;
    }
    return next(action);
};