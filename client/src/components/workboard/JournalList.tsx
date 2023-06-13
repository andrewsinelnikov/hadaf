import React from "react";
import { IJournalNote } from "../../utils/TypeScript";

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
          {/* <p>Goals for the {season}</p>
          {items.map((item) => (
            <Item
              item={item}
              key={item._id}
              items={items}
              setItems={setItems}
            />
          ))} */}
        </div>
      )}
    </>
  );
};

export default JournalList;
