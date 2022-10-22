
import React from 'react';
import List from './List';
import { Container, Row, Col } from 'react-grid-system';
import MyCard from './MyCard';
function SearchList({ filteredProducts, lang }) {

    const filtered = <MyCard list={filteredProducts} lang={lang} />
    // const filtered = <List list={filteredProducts} />;
    return (
        <div>

            {filtered}

        </div>
    );
}

export default SearchList;