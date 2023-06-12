import React, { useState } from "react";

interface IProps {
  note: string;
  setNote: React.Dispatch<React.SetStateAction<string>>;
}

const AreaInput: React.FC<IProps> = ({ note, setNote }) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <form className='add-area'>
      <div className='add-item'>
        <textarea
          className='area-input'
          value={note}
          onChange={(e) => setNote(e.target.value)}
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
      <div className='item-options'>
        {note.length > 0 && (
          <button type='submit' className='btn btn-auto btn-success'>
            Add
          </button>
        )}
      </div>
    </form>
  );
};

export default AreaInput;
