import React from "react";
import { IJournalNote } from "../../utils/TypeScript";

interface IProps {
  note: IJournalNote;
  notes: IJournalNote[];
  setNotes: React.Dispatch<React.SetStateAction<IJournalNote[]>>;
}

const Note: React.FC<IProps> = ({ note, notes, setNotes }) => {
  return (
    <div className='note'>
      {note.title && <div>{note.title}</div>}
      <div>{note.text}</div>
    </div>
  );
};

export default Note;
