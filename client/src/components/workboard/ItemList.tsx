import React from "react";
import { IItem } from "../../utils/TypeScript";
import Item from "./Item";

interface IProps {
  items: IItem[];
  setItems: React.Dispatch<React.SetStateAction<IItem[]>>;
  season: string;
}

const ItemList: React.FC<IProps> = ({ items, setItems, season }) => {
  return (
    <>
      {items.length === 0 ? (
        <div className='items-zero'>
          <div className='items-message'>
            {/* <p>Start the adventure</p> */}
            Write down the most important goals to accomplish this season
          </div>
          {/* <div className='items-number'>max number - 3</div> */}
        </div>
      ) : (
        <div className='items'>
          <p>Goals for the {season}</p>
          {items.map((item) => (
            <Item
              item={item}
              key={item._id}
              items={items}
              setItems={setItems}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default ItemList;
