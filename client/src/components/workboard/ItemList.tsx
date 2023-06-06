import React from "react";
import { IItem } from "../../utils/TypeScript";

interface IProps {
  items: IItem[];
  setItems: React.Dispatch<React.SetStateAction<IItem[]>>;
}

const ItemList: React.FC<IProps> = ({ items, setItems }) => {
  return (
    <div>
      <h2>ItemList</h2>
    </div>
  );
};

export default ItemList;
