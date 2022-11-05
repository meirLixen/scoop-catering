import React, { useEffect } from "react";
import { connect } from "react-redux";
// import { withRouter } from 'react-router-dom';
import { actions } from "../../redux/actions/action";
// import BootstrapTable from 'react-bootstrap-table-next';
// omit...

function UserList(props) {
  // const { users } = props;
  // const { userReducer } = props;

  useEffect(() => {
    if (!props.users || !props.users.length) props.getAllUsers();
    else {console.info(props.users);}
  }, [props, props.users]);

  return (
    <>
      {props.users &&
        props.users.map((user, key) => {
          return (
            // <BootstrapTable
            //   keyField="id"
            //   data={props.users}
            //   columns={key}
            //   striped
            //   hover
            //   condensed
            // />
            <p key={uuidv4()}>{user.name}</p>
          );
        })}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    users: state.userReducer.users,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getAllUsers: () => dispatch(actions.getAllUsers()),
});
export default connect(mapStateToProps, mapDispatchToProps)(UserList);

function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}
