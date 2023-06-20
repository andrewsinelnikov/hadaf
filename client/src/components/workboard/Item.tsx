import React, { useState, useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { RootState } from "../../redux/store";
import { deleteGoal, updateGoal } from "../../redux/actions/goalAction";

import { IItem } from "../../utils/TypeScript";
import { Link } from "react-router-dom";
import Progress from "./Progress";

interface IProps {
  item: IItem;
  items: IItem[];
  setItems: React.Dispatch<React.SetStateAction<IItem[]>>;
}

const Item: React.FC<IProps> = ({ item, items, setItems }) => {
  const [text, setText] = useState<string>("");
  const [edit, setEdit] = useState<IItem | null>(null);

  const { auth, goals } = useAppSelector((state: RootState) => state);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (edit) setText(edit.text);
  }, [edit]);

  const handleEdit = () => {
    if (!auth.access_token || !text) return;

    if (edit) {
      if (edit.text === text) return;
      const data = { ...edit, text };
      dispatch(updateGoal(data, auth.access_token));
    }

    setText("");
    setEdit(null);
  };

  const handleDelete = (id: string) => {
    if (!auth.access_token || !text) return;
    dispatch(deleteGoal(id, auth.access_token));
  };

  return (
    <form className='item-goal'>
      {edit ? (
        <div className='add-item'>
          <input
            className='item-input'
            type='text'
            name='text'
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
            autoComplete='off'
            maxLength={200}
            style={{
              borderBottom: "1px solid var(--lightdark-color)",
            }}
          />
          {text.length > 0 && (
            <small style={{ fontWeight: "bold" }}>
              <span
                style={{
                  color: `${
                    text.length > 200
                      ? "var(--error-color)"
                      : "var(--done-color)"
                  }`,
                }}>
                {text.length}
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
          onClick={edit ? () => handleEdit() : () => setEdit(item)}
          className='btn btn-auto btn-action btn-dark'>
          {edit ? "Update" : "Edit"}
        </button>
        <button
          type='button'
          onClick={() => handleDelete(item._id!)}
          className='btn btn-auto btn-action btn-dark'>
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
