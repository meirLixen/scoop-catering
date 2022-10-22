
import axios from "axios"
import { actions } from '../actions/action'
export const createProduct = ({ dispatch, getState }) => next => action => {
    if (action.type === 'CREATE_PRODUCT') {
        return new Promise((resolve, reject) => {
            axios.post('https://scoopcatering.co.il/product/', action.payload)
                .then(res => {
                    dispatch(actions.setProduct(res.data))
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
export const updateProduct = ({ dispatch, getState }) => next => action => {
    if (action.type === 'UPDATE_PRODUCT') {
        let product
        if (action.payload != undefined) {
            product = action.payload._id;
        }
        axios.post(`https://scoopcatering.co.il/products/${product}`, action.payload)
            .then(res => {
                dispatch(actions.setProduct(res.data))
            })
            .catch(error => {
                console.log(error)
            });
        return;
    }
    return next(action);
};
export const deleteProduct = ({ dispatch, getState }) => next => action => {
    if (action.type === 'DELETE_PRODUCT') {
        if (action.payload !== undefined)
            axios.delete(`https://scoopcatering.co.il/product/${action.payload}`)
                .then(res => {
                    dispatch(actions.deleteProductFromProducts(action.payload))

                })
                .catch(error => {
                    console.log(error);

                });
        return;
    }
    return next(action);
};
export const copyProduct = ({ dispatch, getState }) => next => action => {
    if (action.type === 'COPY_PRODUCT') {
        return new Promise((resolve, reject) => {
            if (action.payload !== undefined)
                axios.post(`https://scoopcatering.co.il/copyProduct/${action.payload}`)
                    .then(res => {
                        dispatch(actions.setProduct(res.data))
                        // dispatch(actions.setAllProducts(res.data))
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

export const getAllProducts = ({ dispatch, getState }) => next => action => {
    if (action.type === 'GET_ALL_PRODUCTS') {
        return new Promise((resolve, reject) => {
            return axios.get('https://scoopcatering.co.il/products/')
                .then(resJson => {
                    dispatch(actions.setAllProducts(resJson.data))
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
export const getProductByID = ({ dispatch, getState }) => next => action => {
    if (action.type === 'GET_PRODUCT_BY_ID') {
        return new Promise((resolve, reject) => {
            return axios.get(`https://scoopcatering.co.il/product/${action.payload}`)
                .then(resJson => {
                    // dispatch(actions.setAllProducts(resJson.data))
                    resolve(resJson.data)
                })
                .catch(error => {
                    console.log(error);
                    reject()
                });
        })
    }
    return next(action);
}

