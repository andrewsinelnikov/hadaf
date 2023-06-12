import React, { useState } from "react";
import { IItem } from "../../utils/TypeScript";

interface IProps {
  item: string;
  setItem: React.Dispatch<React.SetStateAction<string>>;
  itemType: string;
  items: IItem[];
  handleAdd: (e: React.FormEvent) => void;
}

const ItemInput: React.FC<IProps> = ({
  item,
  setItem,
  itemType,
  items,
  handleAdd,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <form
      className='add'
      onSubmit={(e) => {
        handleAdd(e);
      }}>
      {itemType === "Goal" && items.length === 0 ? (
        <div className='items-number'>max number - 3</div>
      ) : 3 - items.length > 0 ? (
        <div className='items-number'>possible to add - {3 - items.length}</div>
      ) : (
        ""
      )}
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
      <div className='item-options'>
        {item.length > 0 && (
          <button type='submit' className='btn btn-auto btn-success'>
            Add
          </button>
        )}
      </div>
    </form>
  );
};

export default ItemInput;
