import React from "react";
import { IItem } from "../../utils/TypeScript";
import { Link } from "react-router-dom";

interface IProps {
  item: IItem;
  items: IItem[];
  setItems: React.Dispatch<React.SetStateAction<IItem[]>>;
}

const Item: React.FC<IProps> = ({ item, items, setItems }) => {
  return (
    <form>
      <span>{item.item}</span>
      <div className='item-options'>
        <span className='btn btn-auto btn-dark'>Edit</span>
        <span className='btn btn-auto btn-dark'>Delete</span>
        <Link to='/goals' className='btn btn-auto btn-success'></Link>
      </div>
    </form>
  );
};

export default Item;
