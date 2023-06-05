import React, { useEffect, useState } from "react";

interface IProps {
  item: string;
  setItem: React.Dispatch<React.SetStateAction<string>>;
  itemType: string;
  handleAdd: (e: React.FormEvent) => void;
}

const AddItem: React.FC<IProps> = ({ item, setItem, itemType, handleAdd }) => {
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (item) setIsFocused(true);
  }, [item, setIsFocused]);

  return (
    <div className='add'>
      <div className='add-item'>
        <input
          className='item-input'
          type='text'
          value={item}
          onChange={(e) => setItem(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          autoComplete='off'
          maxLength={200}
          placeholder={`Type a ${itemType}...`}
          style={{
            borderBottom: `${
              isFocused
                ? "1px solid var(--lightdark-color)"
                : "1px solid var(--lightdark-50-color)"
            }`,
          }}
        />
        {isFocused && item.length > 0 && (
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
        )}
      </div>
      {isFocused && (
        <div className='item-options'>
          {item.length > 0 && (
            <button
              className='btn btn-auto btn-success'
              onClick={(e) => {
                handleAdd(e);
                setItem("");
              }}>
              Add
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default AddItem;
