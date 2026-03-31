import React from "react";
import { Link } from "react-router-dom";

import { IItem } from "../../types";
import Item from "./Item";

interface IProps {
  items: IItem[];
  setItems?: React.Dispatch<React.SetStateAction<IItem[]>>;
  action: string;
  options?: boolean;
  season?: string;
  goal?: string;
}

const ItemList: React.FC<IProps> = ({
  items,
  setItems,
  action,
  options,
  season,
  goal,
}) => {
  return (
    <>
      {action === "goals" &&
        (items.length === 0 ? (
          <div className='items-zero'>
            <div className='items-message'>
              Write down the most important Goals to accomplish this {season}
            </div>
          </div>
        ) : (
          <div className='items'>
            <p className='items-heading'>Goals for the {season}</p>
            {items.map((item) => (
              <Item item={item} key={item._id} action={action} />
            ))}
          </div>
        ))}
      {action === "plans" &&
        (items.length === 0 ? (
          <div className='items-zero'>
            <div className='items-message'>
              <span>{goal}</span>
              Break down the goal into steps
            </div>
          </div>
        ) : (
          <div className='items'>
            {goal && (
              <div className='item-goal'>
                <div className='item-title'>{goal}</div>
              </div>
            )}
            <ul className='timeline'>
              {items.map((item) => (
                <li key={item._id} className='step'>
                  <div className='point'></div>
                  <Item
                    item={item}
                    key={item._id}
                    action={action}
                    options={options}
                  />
                </li>
              ))}
            </ul>
          </div>
        ))}
      {action === "plansForDay" &&
        (items.length === 0 ? (
          <div className='items-zero'>
            <div className='items-message'>
              {/* <p>Start the adventure</p> */}
              {/* What plans will make this day successful and bring you closer to
              your goals? */}
              What Plans for the Day will bring you closer to your Goals?
            </div>
            {/* <div className='items-number'>max number - 3</div> */}
          </div>
        ) : (
          <div className='items'>
            <p>
              Plans for the Day
              <Link to='/actions' className='btn btn-auto btn-success'>
                Realize
              </Link>
            </p>

            {items.map((item) => (
              <Item item={item} key={item._id} action={action} />
            ))}
          </div>
        ))}
    </>
  );
};

export default ItemList;