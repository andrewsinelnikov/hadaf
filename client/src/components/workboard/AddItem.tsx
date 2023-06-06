import React, { useEffect, useRef, useState } from "react";

interface IProps {
  item: string;
  setItem: React.Dispatch<React.SetStateAction<string>>;
  itemType: string;
  handleAdd: (e: React.FormEvent) => void;
}

const AddItem: React.FC<IProps> = ({ item, setItem, itemType, handleAdd }) => {
  const [isFocused, setIsFocused] = useState(false);

  // const formRef = useRef<HTMLFormElement>(null);

  // useEffect(() => {
  //   if (item) setIsFocused(true);
  // }, [item, setItem, setIsFocused]);

  return (
    <form
      className='add'
      // ref={formRef}
      onSubmit={(e) => {
        handleAdd(e);
      }}>
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
      {/* {isFocused && ( */}
      <div className='item-options'>
        {item.length > 0 && (
          <button
            type='submit'
            className='btn btn-auto btn-success'
            // onClick={() => {
            //   formRef.current?.submit();
            // }}
          >
            Add
          </button>
        )}
      </div>
      {/* )} */}
    </form>
  );
};

export default AddItem;
