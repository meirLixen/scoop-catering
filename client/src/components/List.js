
import React, { useEffect } from 'react';
import { connect } from 'react-redux';

// import { actions } from '../redux/actions/action';
import { Table, Button } from 'react-bootstrap'


//get list and display it
function List({ list }) {


    // const { products } = props
    // const { productReducer } = props;

    useEffect(() => {


    }, []);


    const firstLine = Array.isArray(list) && list.length ? list[0] : {};
    const headers = Object.keys(firstLine);

    return (


        <Table bordered hover size="sm">
            <thead>

                <tr key={"header"}>

                    {headers.map((key) => (
                        <th>{key}</th>
                    ))}
                </tr>
            </thead>

            {list && list.map((item) => (
                <tbody>
                    <tr key={item._id}>
                        {Object.values(item).map((val) => (
                            <td>{val}</td>

                        ))}

                    </tr>
                </tbody >
            ))
            }

        </Table >





    )

}

const mapStateToProps = (state) => {

    return {


    };
}

const mapDispatchToProps = (dispatch) => ({

})
export default connect(mapStateToProps, mapDispatchToProps)(List)
// export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProductList))
