import React, { useState, useRef } from "react";
import { useAutosizeTextarea } from "../../utils/hooks";

interface IProps {
  note: string;
  setNote: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent) => void;
}

const AreaInput: React.FC<IProps> = ({ note, setNote, handleAdd }) => {
  const [isFocused, setIsFocused] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useAutosizeTextarea(textAreaRef.current, note);
  return (
    <form
      className='add-area'
      onSubmit={(e) => {
        handleAdd(e);
      }}>
      <textarea
        className='area-input'
        onChange={(e) => setNote(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
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
          borderTop: `${
            textAreaRef.current &&
            textAreaRef.current.clientHeight > window.innerHeight * 0.2
              ? "1px solid var(--lightdark-10-color)"
              : "none"
          }`,
          borderLeft: `${
            textAreaRef.current &&
            textAreaRef.current.clientHeight > window.innerHeight * 0.2
              ? "1px solid var(--lightdark-10-color)"
              : "none"
          }`,
          overflowY: `${
            textAreaRef.current &&
            textAreaRef.current.clientHeight > window.innerHeight * 0.49
              ? "scroll"
              : "hidden"
          }`,
        }}
      />
      <div className='item-options'>
        {note.length > 0 && (
          <>
            <button type='submit' className='btn btn-auto btn-success'>
              Add
            </button>
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
          </>
        )}
      </div>
    </form>
  );
};

export default AreaInput;
