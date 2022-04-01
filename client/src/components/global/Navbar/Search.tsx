import React, { useState, useEffect } from "react";

const Search = () => {
  const [search, setSearch] = useState("");

  return (
    <div className='navbar__search'>
      <input
        className='navbar__form'
        type='text'
        placeholder='Enter your search...'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

export default Search;
