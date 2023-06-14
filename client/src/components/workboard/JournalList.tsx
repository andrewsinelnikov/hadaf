import React from "react";
import { IJournalNote } from "../../utils/TypeScript";
import Note from "./Note";

interface IProps {
  notes: IJournalNote[];
  setNotes: React.Dispatch<React.SetStateAction<IJournalNote[]>>;
}

const JournalList: React.FC<IProps> = ({ notes, setNotes }) => {
  return (
    <>
      {notes.length === 0 ? (
        <div className='items-zero'>
          <div className='items-message'>
            Write down the things that made your day
          </div>
        </div>
      ) : (
        <div className='items'>
          <p>
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              day: "numeric",
              month: "short",
            })}
          </p>
          {notes.map((note) => (
            <Note
              note={note}
              key={note._id}
              notes={notes}
              setNotes={setNotes}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default JournalList;
