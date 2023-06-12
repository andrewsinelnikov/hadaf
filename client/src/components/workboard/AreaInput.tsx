import React, { useState } from "react";

const AreaInput = () => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <form className='add'>
      <div className='add-item'>
        <textarea className='item-input' placeholder='What' rows={1} />
      </div>
    </form>
  );
};

export default AreaInput;
