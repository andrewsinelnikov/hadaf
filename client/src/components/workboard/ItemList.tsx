import React from "react";
import { IItem } from "../../utils/TypeScript";

interface IProps {
  items: IItem[];
  setItems: React.Dispatch<React.SetStateAction<IItem[]>>;
}

const ItemList: React.FC<IProps> = ({ items, setItems }) => {
  return (
    <div>
      <span>Today</span>
      {items.map((item) => (
        <div key={item._id}>{item.item}</div>
      ))}
    </div>
  );
};

export default ItemList;
