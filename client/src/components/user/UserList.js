import React, { useEffect } from 'react';
import { connect } from 'react-redux';
// import { withRouter } from 'react-router-dom';
import { actions } from '../../redux/actions/action';
// import BootstrapTable from 'react-bootstrap-table-next';
// omit...


function UserList(props) {

    // const { users } = props;
    // const { userReducer } = props;

    useEffect(() => {

        if (!props.users || !props.users.length)
            props.getAllUsers()
        else
            console.log(props.users);
    }, [props, props.users]);

    return (
        <>



            {props.users && props.users.map((user, key) => {
                return (

                    // <BootstrapTable
                    //   keyField="id"
                    //   data={props.users}
                    //   columns={key}
                    //   striped
                    //   hover
                    //   condensed
                    // />
                    <p>{user.name}</p>

                )
            })}

        </>
    )
}

const mapStateToProps = (state) => {
    return {
        users: state.userReducer.users,
    };
}

const mapDispatchToProps = (dispatch) => ({
    getAllUsers: () => dispatch(actions.getAllUsers())

})
export default connect(mapStateToProps, mapDispatchToProps)(UserList)