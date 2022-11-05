import React, { useEffect } from "react";
import { connect } from "react-redux";

// import { actions } from '../redux/actions/action';
import { Table } from "react-bootstrap";

//get list and display it
function List({ list }) {
  // const { products } = props
  // const { productReducer } = props;

  useEffect(() => {}, []);

  const firstLine = Array.isArray(list) && list.length ? list[0] : {};
  const headers = Object.keys(firstLine);

  return (
    <Table bordered hover size="sm">
      <thead>
        <tr key={"header"}>
          {headers.map((key) => (
            <th key={uuidv4()}>{key}</th>
          ))}
        </tr>
      </thead>

      {list &&
        list.map((item) => (
          <tbody key={uuidv4()}>
            <tr>
              {Object.values(item).map((val) => (
                <td>{val}</td>
              ))}
            </tr>
          </tbody>
        ))}
    </Table>
  );
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(List);
// export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProductList))

function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}
