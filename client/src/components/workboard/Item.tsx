import React from "react";
import { IItem } from "../../utils/TypeScript";
import { Link } from "react-router-dom";
import Progress from "./Progress";

interface IProps {
  item: IItem;
  items: IItem[];
  setItems: React.Dispatch<React.SetStateAction<IItem[]>>;
  completed: number;
}

const Item: React.FC<IProps> = ({ item, items, setItems, completed }) => {
  return (
    <form className='item-goal'>
      <div className='item'>
        <div className='item-value'>{item.item}</div>
        <small className='item-completeness'>{completed} %</small>
      </div>
      <Progress completed={10} />
      <div className='item-options'>
        <button type='button' className='btn btn-auto btn-action btn-dark'>
          Edit
        </button>
        <button type='button' className='btn btn-auto btn-action btn-dark'>
          Delete
        </button>
        <Link to='/goals' className='btn btn-auto btn-success'>
          Reach it
        </Link>
      </div>
    </form>
  );
};

export default Item;
