import React from "react";
import { IItem } from "../../utils/TypeScript";
import Item from "./Item";

interface IProps {
  items: IItem[];
  setItems: React.Dispatch<React.SetStateAction<IItem[]>>;
  type: string;
  season?: string;
  goal?: string;
}

const ItemList: React.FC<IProps> = ({
  items,
  setItems,
  type,
  season,
  goal,
}) => {
  return (
    <>
      {type === "goals" &&
        (items.length === 0 ? (
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
              <Item item={item} key={item._id} />
            ))}
          </div>
        ))}
      {type === "plans" &&
        (items.length === 0 ? (
          <div className='items-zero'>
            <div className='items-message'>
              <span>{goal}</span>
              Break down the goal into steps
            </div>
          </div>
        ) : (
          <div className='items'>
            <div className='item-goal'>
              <div className='item-value'>{goal}</div>
            </div>
            <ul className='timeline'>
              {items.map((item) => (
                <li key={item._id} className='step'>
                  <div className='point'></div>
                  <div>{item.text}</div>
                </li>
              ))}
            </ul>
          </div>
        ))}
    </>
  );
};

export default ItemList;
