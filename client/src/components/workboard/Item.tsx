import React, { useState } from "react";
import { IItem } from "../../utils/TypeScript";
import { Link } from "react-router-dom";
import Progress from "./Progress";

interface IProps {
  item: IItem;
  items: IItem[];
  setItems: React.Dispatch<React.SetStateAction<IItem[]>>;
}

const Item: React.FC<IProps> = ({ item, items, setItems }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editItem, setEditItem] = useState<string>(item.text);

  const handleEdit = () => {};

  return (
    <form className='item-goal'>
      {edit ? (
        <div className='add-item'>
          <input
            className='item-input'
            type='text'
            name='text'
            value={editItem}
            onChange={(e) => {
              setEditItem(e.target.value);
            }}
            autoComplete='off'
            maxLength={200}
            style={{
              borderBottom: "1px solid var(--lightdark-color)",
            }}
          />
          {editItem.length > 0 && (
            <small style={{ fontWeight: "bold" }}>
              <span
                style={{
                  color: `${
                    editItem.length > 200
                      ? "var(--error-color)"
                      : "var(--done-color)"
                  }`,
                }}>
                {editItem.length}
              </span>{" "}
              / 200
            </small>
          )}
        </div>
      ) : (
        <div className='item-value'>{item.text}</div>
      )}
      <Progress completed={item.completeness} />
      <div className='item-options'>
        <button
          type={edit ? "submit" : "button"}
          onClick={() => handleEdit()}
          className='btn btn-auto btn-action btn-dark'>
          {edit ? "Update" : "Edit"}
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
