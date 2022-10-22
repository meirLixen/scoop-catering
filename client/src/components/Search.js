import React, { useState } from 'react';
import Scroll from './Scroll';
import SearchList from './SearchList';

function Search({ details, searchItem }) {

    const [searchField, setSearchField] = useState("");

    const filteredProducts = details.filter(
        product => {
            return (
                product
                    .name
                    .toLowerCase()
                    .includes(searchField.toLowerCase())
                // ||
                // product
                //     .description
                //     .toLowerCase()
                //     .includes(searchField.toLowerCase())
            );
        }
    );

    const handleChange = e => {
        setSearchField(e.target.value);
    };

    function searchList() {
        return (
            <Scroll>
                <SearchList filteredProducts={filteredProducts} />
            </Scroll>
        );
    }

    return (
        <section className="garamond">
            <div className="navy georgia ma0 grow">
                <h2 className="f2">Search Box</h2>
            </div>
            <div className="pa2">
                <input
                    className="pa3 bb br3 grow b--none bg-lightest-blue ma3"
                    type="search"
                    placeholder="Search Product"
                    onChange={handleChange}
                />
            </div>
            {searchList()}
        </section>
    );
}

export default Search;