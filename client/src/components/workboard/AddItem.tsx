import React from "react";

interface IProps {
  item: string;
  setItem: React.Dispatch<React.SetStateAction<string>>;
}

const AddItem: React.FC<IProps> = ({ item, setItem }) => {
  return (
    <div>
      <div className=''>
        <input
          className='item-input'
          type='text'
          value={item}
          onChange={(e) => setItem(e.target.value)}
          autoComplete='off'
          autoFocus
          maxLength={200}
          placeholder='Type a Task...'
        />
        {/* <small style={{ fontWeight: "bold" }}>
              <span
                style={{
                  color: `${
                    name.length > 25
                      ? "var(--error-color)"
                      : "var(--done-color)"
                  }`,
                }}>
                {name.length}
              </span>{" "}
              / 25
            </small> */}
      </div>
    </div>
  );
};

export default AddItem;
