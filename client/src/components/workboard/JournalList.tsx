import React from "react";
import { IJournalNote } from "../../utils/TypeScript";

interface IProps {
  notes: IJournalNote[];
  setNotes: React.Dispatch<React.SetStateAction<IJournalNote[]>>;
}

const JournalList: React.FC<IProps> = ({ notes, setNotes }) => {
  return (
    <div>
      <h2>JournalList</h2>
    </div>
  );
};

export default JournalList;
