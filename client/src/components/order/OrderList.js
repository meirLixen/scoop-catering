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
    window.scrollTo(0, 0)
    if (!props.orders || !props.orders.length) props.getAllOrders();
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
            <p>{order.status}</p>
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
