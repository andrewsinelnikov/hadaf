import React, { useState } from "react";

interface IProps {
  item: string;
  setItem: React.Dispatch<React.SetStateAction<string>>;
}

const AddItem: React.FC<IProps> = ({ item, setItem }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div>
      <div className='add-item'>
        <input
          className='item-input'
          type='text'
          value={item}
          onChange={(e) => setItem(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          autoComplete='off'
          autoFocus
          maxLength={200}
          placeholder='Type a Task...'
        />
        <small style={{ fontWeight: "bold" }}>
          <span
            style={{
              color: `${
                item.length > 200 ? "var(--error-color)" : "var(--done-color)"
              }`,
            }}>
            {item.length}
          </span>{" "}
          / 200
        </small>
      </div>
      {isFocused && <div className='item-options'>add</div>}
    </div>
  );
};

export default AddItem;
