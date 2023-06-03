import React from "react";

const AddItem = () => {
  return (
    <div>
      <input
        className='item-input'
        type='text'
        maxLength={200}
        placeholder='Type a Task...'
      />
    </div>
  );
};

export default AddItem;
