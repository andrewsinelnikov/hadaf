import { useState, useRef, useEffect } from "react";

interface IProps {
  open: boolean;
}
const Search = ({ open }: IProps) => {
  const [search, setSearch] = useState("");
  const inputElement = useRef<HTMLInputElement>(null);

  useEffect(() => {
    open && inputElement.current && inputElement.current.focus();
  }, [open, inputElement]);

  return (
    <div className='navbar-search' style={{ display: open ? "block" : "" }}>
      <input
        className='search-form'
        type='text'
        placeholder='Search...'
        autoComplete='off'
        maxLength={240}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        ref={inputElement}
      />
      <button type='button' className='search-button'>
        Go
      </button>
    </div>
  );
};

export default Search;
