import React, { useState } from "react";

const AreaInput = () => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <form className='add'>
      <div className='add-item'>
        <textarea
          className='item-input'
          rows={1}
          autoComplete='off'
          maxLength={2000}
          placeholder='Type a Note...'
        />
      </div>
    </form>
  );
};

export default AreaInput;
