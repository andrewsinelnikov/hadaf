import React, { useState, useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { RootState } from "../../redux/store";
import { updateGoal, deleteGoal } from "../../redux/actions/goalAction";
import {
  getPlansByGoal,
  updatePlanItem,
  deletePlanItem,
} from "../../redux/actions/planAction";

import { IItem } from "../../utils/TypeScript";
import { Link } from "react-router-dom";
import Progress from "./Progress";

interface IProps {
  item: IItem;
  action: string;
  options?: boolean;
}

const Item: React.FC<IProps> = ({ item, action, options }) => {
  const [text, setText] = useState<string>("");
  const [edit, setEdit] = useState<IItem | null>(null);

  const { auth } = useAppSelector((state: RootState) => state);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (edit) setText(edit.text);
  }, [edit]);

  const handleEdit = () => {
    if (!auth.access_token || !text) return;

    if (edit) {
      if (edit.text === text) {
        return setEdit(null);
      }
      const data = { ...edit, text };
      if (action === "goals") dispatch(updateGoal(data, auth.access_token));
      if (action === "plans") {
        dispatch(updatePlanItem(data, auth.access_token));
        dispatch(getPlansByGoal(data.goal!, auth.access_token));
      }
    }

    setText("");
    setEdit(null);
  };

  const handleDelete = (id: string) => {
    if (!auth.access_token) return;
    if (action === "goals") dispatch(deleteGoal(id, auth.access_token));
    if (action === "plans") {
      dispatch(deletePlanItem(id, auth.access_token));
      if (edit) {
        let data = edit;
        let count = -edit.count!;
        data = { ...data, count };
        dispatch(updateGoal(data, auth.access_token, true));
        dispatch(getPlansByGoal(edit.goal!, auth.access_token));
      }
    }
  };

  return (
    <>
      {action === "goals" && (
        <form className='item item-goal'>
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
          <Progress
            completed={
              item.completeness === 1
                ? 1
                : (item.completeness! * 100) / item.count!
            }
          />
          <div className='item-options'>
            <button
              type='button'
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
            <Link to={`/plan/${item._id}`} className='btn btn-auto btn-success'>
              Plan out
            </Link>
          </div>
        </form>
      )}
      {action === "plans" && !options && (
        <form className='item'>
          {edit ? (
            <>
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
              <div className='item-options'>
                <button
                  type='button'
                  onClick={edit ? () => handleEdit() : () => setEdit(item)}
                  className='btn btn-auto btn-action btn-dark'>
                  Update
                </button>
                <button
                  type='button'
                  onClick={() => handleDelete(edit._id!)}
                  className='btn btn-auto btn-action btn-dark'>
                  Delete
                </button>
              </div>
            </>
          ) : (
            <div className='item-plan'>
              <div className='text'>{item.text}</div>
              <div className='plan-options'>
                <span className='completeness'>
                  {item.completeness} of {item.count}
                </span>
                <button
                  type='button'
                  onClick={() => setEdit(item)}
                  className='btn btn-auto btn-action btn-dark'>
                  Edit
                </button>
                <Link to='/plans' className='btn btn-auto btn-success'>
                  Schedule
                </Link>
              </div>
            </div>
          )}
        </form>
      )}
      {action === "plans" && options && (
        <div className='item'>
          <div className='item-plan'>
            <div className='text'>{item.text}</div>
          </div>
        </div>
      )}
      {action === "plansForDay" && (
        <div className='item item-goal'>
          <div className='item-day'>
            <div className='text'>{item.text}</div>
            <div>
              {item.period !== "Daily" && (
                <button
                  type='button'
                  onClick={() => handleDelete(item._id!)}
                  className='btn btn-auto btn-action btn-dark'>
                  Delete
                </button>
              )}
              <Link to='/actions' className='btn btn-auto btn-success'>
                Realize
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Item;
