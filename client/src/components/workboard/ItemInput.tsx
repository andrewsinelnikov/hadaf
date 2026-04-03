import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { IItem, InputChange } from "../../types";
import Quantity from "./Quantity";

interface IProps {
  item?: IItem;
  setItem?: React.Dispatch<React.SetStateAction<IItem>>;
  itemType: string;
  items?: IItem[];
  activeGoal?: string;
  handleAdd?: (e: React.FormEvent) => void;
  days?: number;
}

interface IInput {
  selectInput: boolean;
  isFocused: boolean;
  // setIsFocused: React.Dispatch<React.SetStateAction<boolean>>;
}

const Input: React.FC<IInput> = ({ selectInput, isFocused }) => {
  if (selectInput)
    return (
      <select
        className='choose-input'
        style={{
          borderBottom: `${
            isFocused
              ? "1px solid var(--lightdark-color)"
              : "1px solid var(--lightdark-50-color)"
          }`,
          color: "var(--lightdark-50-color)",
        }}>
        <option selected hidden>
          Choose a Task...
        </option>
        <option value='1'>1</option>
        <option value='2'>2</option>
      </select>
    );

  return (
    <input
      className='item-input'
      type='text'
      name='text'
      // value={text}
      // onChange={(e) => {
      //   setText(e.target.value);
      // }}
      // onFocus={() => setIsFocused(true)}
      // onBlur={() => setIsFocused(false)}
      autoComplete='off'
      maxLength={200}
      placeholder='Type a Task'
      style={{
        borderBottom: `${
          isFocused
            ? "1px solid var(--lightdark-color)"
            : "1px solid var(--lightdark-50-color)"
        }`,
      }}
    />
  );
};
const ItemInput: React.FC<IProps> = ({
  item,
  setItem,
  itemType,
  items,
  activeGoal,
  handleAdd,
  days,
}) => {
  const navigate = useNavigate();

  const [isFocused, setIsFocused] = useState(false);
  const [text, setText] = useState("");

  const [selectPeriod, setSelectPeriod] = useState<string>();
  const [times, setTimes] = useState(1);
  const [count, setCount] = useState(1);
  const [addInput, setAddInput] = useState(true);
  const [selectInput, setSelectInput] = useState(false);

  useEffect(() => {
    if (item && setItem) {
      if (itemType === "Goal") setItem({ ...item, text: text });
      if (itemType === "Step")
        setItem({ ...item, text: text, period: selectPeriod, count: count });
    }
  }, [text, count]);

  useEffect(() => {
    if (
      (items && items.length > 4) ||
      itemType === "Plan" ||
      itemType === "NoGoals" ||
      itemType === "NoPlans"
    )
      setAddInput(false);
  }, [items, itemType]);

  useEffect(() => {
    if (selectPeriod === "Daily") {
      if (days && days > 0) {
        setCount(days);
      }
    }
    if (selectPeriod === "Weekly") {
      if (days && days >= 7) {
        setCount(Math.trunc(days / 7) * times);
      } else setCount(times);
    }
    if (selectPeriod === "Monthly") {
      if (days && days >= 30) {
        setCount(Math.trunc(days / 30) * times);
      } else setCount(times);
    }
    if (selectPeriod === "Seasonly") setCount(times);
  }, [days, selectPeriod, times, setCount, setTimes, setSelectPeriod]);

  let elementInput;

  useEffect(() => {
    if (selectInput) {
      elementInput = (
        <select>
          <option>Option 1</option>
          <option>Option 2</option>
        </select>
      );
    } else {
      elementInput = (
        <input type='text' placeholder={`Type a ${itemType}...`} />
      );
    }
  }, [selectInput, elementInput]);

  const selectChange = (e: InputChange) => {
    setSelectPeriod(e.target.value);
  };

  const timesChange = (e: InputChange) => {
    setTimes(e.target.value as unknown as number);
  };

  const timesOptions = (n: number) => {
    const list = [];

    for (let i = 1; i <= n; i++) {
      list.push(
        <option value={i} key={i}>
          {i}
        </option>
      );
    }

    return (
      <select onChange={timesChange} defaultValue={times}>
        {list}
      </select>
    );
  };

  const getFormClassName = () => {
    const classes = ["add"];
    if (addInput === false) classes.push("add--collapsed");
    if (itemType === "Step" || itemType === "Todo") classes.push("add--short");
    return classes.join(" ");
  };

  return (
    <form
      className={getFormClassName()}
      onSubmit={(e) => {
        handleAdd && handleAdd(e);
        setText("");
        if (itemType === "Step") {
          setSelectPeriod("");
          if (items && items.length > 4) setAddInput(false);
        }
      }}>
      {itemType === "Goal" && (
        <div className='add-goal-composer'>
          <input
            className='add-goal-input'
            type='text'
            value={text}
            onChange={(e) => setText(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            autoComplete='off'
            maxLength={200}
            placeholder='What do you want to achieve this season?'
          />
          <button
            type='submit'
            className='add-goal-submit'
            disabled={!text.trim()}>
            Add goal
          </button>
        </div>
      )}
      {itemType === "Goal" && (
        <div className='add-goal-hint'>
          {items && items.length === 0
            ? "3 goals max — choose wisely"
            : items && 3 - items.length > 0
              ? `${3 - items.length} slot${3 - items.length !== 1 ? "s" : ""} remaining`
              : null
          }
        </div>
      )}
      {itemType === "Plan" && addInput === false && (
        <span
          className='items-number'
          // onClick={() => navigate(`/plan/${activeGoal}`)}
          style={{
            cursor: "pointer",
            display: "inline-block",
            color: "var(--lightdark-color)",
            backgroundColor: "var(--darklight-color)",
          }}>
          update the plan
        </span>
      )}
      {itemType === "Task" && (
        <span
          className='items-number'
          onClick={
            () => setSelectInput(!selectInput)
            // setSelectInput((prevInputType) => !prevInputType)
          }
          style={{
            cursor: "pointer",
            display: "inline-block",
            color: "var(--lightdark-color)",
            backgroundColor: "var(--darklight-color)",
          }}>
          {selectInput ? "additional tasks" : "first to do"}
        </span>
      )}
      {itemType === "NoGoals" && addInput === false && (
        <div
          className='items-number'
          // onClick={() => navigate(`/goals`)}
          style={{
            cursor: "pointer",
            display: "inline-block",
            color: "var(--lightdark-color)",
            backgroundColor: "var(--darklight-color)",
          }}>
          set goals
        </div>
      )}
      {itemType === "NoPlans" && addInput === false && (
        <div
          className='items-number'
          // onClick={() => navigate(`/plans`)}
          style={{
            cursor: "pointer",
            display: "inline-block",
            color: "var(--lightdark-color)",
            backgroundColor: "var(--darklight-color)",
          }}>
          make plans
        </div>
      )}
      {itemType === "Step" && addInput === false && (
        <div
          className='items-number'
          onClick={() => setAddInput(true)}
          style={{
            cursor: "pointer",
            display: "inline-block",
            color: "var(--lightdark-color)",
            backgroundColor: "var(--darklight-color)",
          }}>
          one more step
        </div>
      )}
      {itemType !== "Plan" && itemType !== "Goal" && (
        <div
          className='add-item'
          style={{
            display:
              ((itemType === "Step" ||
                itemType === "NoGoals" ||
                itemType === "NoPlans") &&
                addInput === false) ||
              itemType === "Task"
                ? "none"
                : "block",
          }}>
          {itemType !== "Todo" && (
            <input
              className='item-input'
              type='text'
              name='text'
              value={text}
              onChange={(e) => {
                setText(e.target.value);
              }}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              autoComplete='off'
              maxLength={200}
              placeholder={`Type a ${itemType}...`}
              style={{
                borderBottom: `${
                  isFocused
                    ? "1px solid var(--lightdark-color)"
                    : "1px solid var(--lightdark-50-color)"
                }`,
              }}
            />
          )}

          {itemType === "Todo" && (
            <Input selectInput={selectInput} isFocused={isFocused} />
            // <>
            //   {selectInput ? (
            //     <select
            //       className='choose-input'
            //       style={{
            //         borderBottom: `${
            //           isFocused
            //             ? "1px solid var(--lightdark-color)"
            //             : "1px solid var(--lightdark-50-color)"
            //         }`,
            //         color: "var(--lightdark-50-color)",
            //       }}>
            //       <option selected hidden>
            //         Choose a Task...
            //       </option>
            //       <option value='1'>1</option>
            //       <option value='2'>2</option>
            //     </select>
            //   ) : (
            //     <input
            //       className='item-input'
            //       type='text'
            //       name='text'
            //       value={text}
            //       onChange={(e) => {
            //         setText(e.target.value);
            //       }}
            //       onFocus={() => setIsFocused(true)}
            //       onBlur={() => setIsFocused(false)}
            //       autoComplete='off'
            //       maxLength={200}
            //       placeholder='Type a Task'
            //       style={{
            //         borderBottom: `${
            //           isFocused
            //             ? "1px solid var(--lightdark-color)"
            //             : "1px solid var(--lightdark-50-color)"
            //         }`,
            //       }}
            //     />
            //   )}
            // </>
          )}
          {isFocused && text.length > 0 && (
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
      )}

      {text.length > 0 && itemType !== "Goal" && (
        <div className='item-options'>
          {itemType === "Step" && addInput && (
            <>
              <Quantity
                selectChange={selectChange}
                selectPeriod={selectPeriod!}
                timesOptions={timesOptions}
              />
              <button
                type='submit'
                className='btn btn-auto btn-success'
                disabled={selectPeriod ? false : true}>
                Add
              </button>
            </>
          )}
          {text.length > 0 && itemType === "Goal" && (
            <button type='submit' className='btn btn-auto btn-success'>
              Add
            </button>
          )}
        </div>
      )}
    </form>
  );
};

export default ItemInput;