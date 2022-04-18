import React, { useState, useEffect } from "react";

interface IProps {
  open: boolean;
}
const Search = ({ open }: IProps) => {
  const [search, setSearch] = useState("");

  return (
    <div className='navbar-search' style={{ display: open ? "block" : "" }}>
      <input
        className='search-form'
        type='text'
        placeholder='Search...'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button type='button' className='search-button'>
        Go
      </button>
    </div>
  );
};

export default Search;
