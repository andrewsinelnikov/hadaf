import React from "react";

const AddItem = () => {
  return (
    <div>
      <input
        className='item-input'
        type='text'
        autoComplete='off'
        autoFocus
        maxLength={200}
        placeholder='Type a Task...'
      />
    </div>
  );
};

export default AddItem;
