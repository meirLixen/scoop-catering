
import React from 'react';
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