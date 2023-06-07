import React from "react";
import { IItem } from "../../utils/TypeScript";

interface IProps {
  items: IItem[];
  setItems: React.Dispatch<React.SetStateAction<IItem[]>>;
}

const ItemList: React.FC<IProps> = ({ items, setItems }) => {
  return (
    <>
      {items.length === 0 ? (
        <div className='items-zero'>
          <div>
            <p>Start the adventure</p>
            <p>Write down the most important goals to accomplish this season</p>
          </div>
          <div className='items-number'>max number - 3</div>
        </div>
      ) : (
        <div>
          <span>Today</span>
          {items.map((item) => (
            <div key={item._id}>{item.item}</div>
          ))}
        </div>
      )}
    </>
  );
};

export default ItemList;
