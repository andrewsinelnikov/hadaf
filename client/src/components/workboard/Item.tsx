import React from "react";
import { IItem } from "../../utils/TypeScript";

interface IProps {
  item: IItem;
  items: IItem[];
  setItems: React.Dispatch<React.SetStateAction<IItem[]>>;
}

const Item: React.FC<IProps> = ({ item, items, setItems }) => {
  return (
    <div>
      <h2>Item</h2>
    </div>
  );
};

export default Item;
