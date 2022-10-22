import axios from "axios"
import { actions } from '../actions/action'




export const getAllEmails = ({ dispatch, getState }) => next => action => {

    if (action.type === 'GET_ALL_EMAILS') {

        return new Promise((resolve, reject) => {
            return axios.get('https://scoopcatering.co.il/emails/')
                .then(resJson => {

                    dispatch(actions.setAllEmails(resJson.data))
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


export const createEmail = ({ dispatch, getState }) => next => action => {
    if (action.type === 'CREATE_EMAIL') {



        return new Promise((resolve, reject) => {
            axios.post('https://scoopcatering.co.il/email/', action.payload)
                .then(res => {
                    dispatch(actions.setEmail(res.data))

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

export const updateEmail = ({ dispatch, getState }) => next => action => {
    if (action.type === 'UPDATE_EMAIL') {

        const emailId = action.payload._id;



        axios.patch(`https://scoopcatering.co.il/emails/${emailId}`, action.payload)

            .then(res => {
                dispatch(actions.setEmail(res.data))
            })
            .catch(error => {
                console.log(error)

            });


        return;
    }
    return next(action);
};


export const deleteEmail = ({ dispatch, getState }) => next => action => {
    let email, emailId

    if (action.type === 'DELETE_EMAIL') {
        email = action.payload;
        if (email !== undefined)
            emailId = email._id;
        axios.delete(`https://scoopcatering.co.il/email/${emailId}`)
            .then(res => {
                dispatch(actions.deleteEmailFromEmails(emailId))


            })
            .catch(error => {
                console.log(error);

            });
        return;
    }
    return next(action);
};