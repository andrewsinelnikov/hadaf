import React, { useState, useEffect } from "react";

const Search = () => {
  const [search, setSearch] = useState("");

  return (
    <div className='navbar-search'>
      <input
        className='search-form'
        type='search'
        placeholder='Search...'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button type='button'>Go</button>
    </div>
  );
};

export default Search;
