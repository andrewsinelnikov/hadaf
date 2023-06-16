import React, { useState, useEffect } from "react";
import { IItem } from "../../utils/TypeScript";

interface IProps {
  item: IItem;
  setItem: React.Dispatch<React.SetStateAction<IItem>>;
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
  const [text, setText] = useState<string>(item.text);

  useEffect(() => {
    setItem({ ...item, text: text });
  }, [text]);

  return (
    <form
      className='add'
      onSubmit={(e) => {
        handleAdd(e);
        setText("");
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
          name='text'
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            // setItem({ ...item, text: text });
            // setItem({ ...item, text: e.target.value });
          }}
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
        {isFocused && text.length > 0 && (
          <small style={{ fontWeight: "bold" }}>
            <span
              style={{
                color: `${
                  text.length > 200 ? "var(--error-color)" : "var(--done-color)"
                }`,
              }}>
              {text.length}
            </span>{" "}
            / 200
          </small>
        )}
      </div>
      <div className='item-options'>
        {text.length > 0 && (
          <button type='submit' className='btn btn-auto btn-success'>
            Add
          </button>
        )}
      </div>
    </form>
  );
};

export default ItemInput;
