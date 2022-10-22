import React from 'react';
import { Formik, Form, Field, } from 'formik';
import { connect } from 'react-redux';
import { actions } from '../../redux/actions/action';

export function NewOrder(props) {
    // const { createProduct } = props
    const handleSubmit = async (valuse) => {

        console.log(props.orders);
        const order = await props.createOrder(valuse)
        console.log(order);
    };
    return (
        <Formik
            initialValues={{ status: '' }}
            onSubmit={handleSubmit}
        >
            {() => (
                <Form>
                    <div className="form-group">
                        <lable>status:</lable>
                        <Field className="form-control" type="text" name="status" pl />
                    </div>
                    {/* <div className="form-group">
                        <lable>Description:</lable>
                        <Field className="form-control" type="text" name="description" />
                    </div> */}
                    <div className="form-group">
                        <button className="btn btn-primary" type="submit">Create Order</button>
                    </div>
                </Form>

            )}
        </Formik>

    );
}
const mapStateToProps = (state) => {
    return {
        orders: state.orderReducer.orders,
    };
}

const mapDispatchToProps = (dispatch) => ({
    createOrder: (order) => dispatch(actions.createOrder(order))

})
export default connect(mapStateToProps, mapDispatchToProps)(NewOrder)