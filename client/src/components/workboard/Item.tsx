import React from "react";
import { IItem } from "../../utils/TypeScript";
import { Link } from "react-router-dom";
import Progress from "./Progress";

interface IProps {
  item: IItem;
  items: IItem[];
  setItems: React.Dispatch<React.SetStateAction<IItem[]>>;
}

const Item: React.FC<IProps> = ({ item, items, setItems }) => {
  return (
    <form className='item-goal'>
      <div className='item'>
        <span className='item-value'>{item.item}</span>
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
