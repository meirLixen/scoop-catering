import { Field, Form, Formik } from "formik";
import React from "react";
import { connect } from "react-redux";
import { actions } from "../../redux/actions/action";
// import  {createUser} from '../../redux/MiddleWares/user'
export function NewUser(props) {
  // const { createProduct } = props
  const handleSubmit = async (values) => {
    const user = await props.createUser(values);
    console.log(user);
  };
  return (
    <Formik
      initialValues={{ name: "", phone: "", email: "" }}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form>
          <div className="form-group">
            <lable>Name:</lable>
            <Field className="form-control" type="text" name="name" pl />
          </div>
          <div className="form-group">
            <lable>phone:</lable>
            <Field className="form-control" type="text" name="phone" />
          </div>
          <div className="form-group">
            <lable>email:</lable>
            <Field className="form-control" type="text" name="email" />
          </div>
          <div className="form-group">
            <button className="btn btn-primary" type="submit">
              Create User
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
const mapStateToProps = (state) => {
  return {
    users: state.userReducer.users,
  };
};

const mapDispatchToProps = (dispatch) => ({
  createUser: (user) => dispatch(actions.createUser(user)),
});
export default connect(mapStateToProps, mapDispatchToProps)(NewUser);
