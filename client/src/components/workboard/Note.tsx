import React from "react";
import { IJournalNote } from "../../utils/TypeScript";

interface IProps {
  note: IJournalNote;
  notes: IJournalNote[];
  setNotes: React.Dispatch<React.SetStateAction<IJournalNote[]>>;
}

const Note: React.FC<IProps> = ({ note, notes, setNotes }) => {
  return (
    <div>
      <h2>Note</h2>
    </div>
  );
};

export default Note;
