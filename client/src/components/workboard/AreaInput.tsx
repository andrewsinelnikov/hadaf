import React, { useState, useRef } from "react";
import { useAutosizeTextarea } from "../../utils/hooks";

interface IProps {
  note: string;
  setNote: React.Dispatch<React.SetStateAction<string>>;
}

const AreaInput: React.FC<IProps> = ({ note, setNote }) => {
  const [isFocused, setIsFocused] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useAutosizeTextarea(textAreaRef.current, note);
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
        {isFocused && note.length > 0 && (
          <small style={{ fontWeight: "bold" }}>
            <span
              style={{
                color: `${
                  note.length > 2000
                    ? "var(--error-color)"
                    : "var(--done-color)"
                }`,
              }}>
              {note.length}
            </span>{" "}
            / 2000
          </small>
        )}
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
