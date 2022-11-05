import React, { useEffect } from "react";
import { connect } from "react-redux";
// import { withRouter } from 'react-router-dom';
import { actions } from "../../redux/actions/action";
// import BootstrapTable from 'react-bootstrap-table-next';
// omit...

function OrderList(props) {
  // const { products } = props;
  // const { productReducer } = props;

  useEffect(() => {
    if (!props.orders || !props.orders.length) props.getAllOrders();
    else {
    }
  }, [props, props.orders]);

  return (
    <>
      {props.orders &&
        props.orders.map((order, key) => {
          return (
            // <BootstrapTable
            //   keyField="id"
            //   data={props.products}
            //   columns={key}
            //   striped
            //   hover
            //   condensed
            // />
            <p key={uuidv4()}>{order.status}</p>
          );
        })}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    orders: state.orderReducer.orders,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getAllOrders: () => dispatch(actions.getAllOrders()),
});
export default connect(mapStateToProps, mapDispatchToProps)(OrderList);
// export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProductList))

function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}
