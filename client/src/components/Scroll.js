import React from 'react';
import '../App.css'

const Scroll = (props) => {
    return (
        <div style={{ overflowY: 'scroll', overflowX: 'hidden', height: '70vh', margin: '5%' }}>
            {props.children}
        </div>
    );
}

export default Scroll;