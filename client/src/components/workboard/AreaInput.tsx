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
          style={{
            borderBottom: `${
              isFocused
                ? "1px solid var(--lightdark-color)"
                : "1px solid var(--lightdark-50-color)"
            }`,
          }}
        />
      </div>
    </form>
  );
};

export default AreaInput;
