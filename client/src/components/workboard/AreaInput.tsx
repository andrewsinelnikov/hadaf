import React, { useState, useRef } from "react";

interface IProps {
  note: string;
  setNote: React.Dispatch<React.SetStateAction<string>>;
}

const AreaInput: React.FC<IProps> = ({ note, setNote }) => {
  const [isFocused, setIsFocused] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  return (
    <form className='add-area'>
      <div className='add-item'>
        <textarea
          className='area-input'
          onChange={(e) => setNote(e.target.value)}
          rows={1}
          autoComplete='off'
          maxLength={2000}
          placeholder='Type a Note...'
          ref={textAreaRef}
          value={note}
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
