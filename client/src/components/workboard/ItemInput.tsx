import React, { useState, useEffect } from "react";
import { IItem } from "../../utils/TypeScript";

interface IProps {
  item: IItem;
  setItem: React.Dispatch<React.SetStateAction<IItem>>;
  itemType: string;
  items: IItem[];
  handleAdd: (e: React.FormEvent) => void;
  days?: number;
}

const ItemInput: React.FC<IProps> = ({
  item,
  setItem,
  itemType,
  items,
  handleAdd,
  days,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [text, setText] = useState<string>(item.text);

  const [selectPeriod, setSelectPeriod] = useState<String>();
  const [times, setTimes] = useState(1);

  useEffect(() => {
    setItem({ ...item, text: text });
  }, [text]);

  const selectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectPeriod(e.target.value);
  };

  const timesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTimes(e.target.value as unknown as number);
  };

  const timesOptions = (n: number) => {
    const list = [];
    for (let i = 1; i <= n; i++) {
      list.push(<option value={i}>{i}</option>);
    }

    return <select onChange={timesChange}>{list}</select>;
  };

  const quantity = () => {};

  return (
    <form
      className='add'
      style={{
        height: `${itemType === "Step" && "80px"}`,
      }}
      onSubmit={(e) => {
        handleAdd(e);
        setText("");
      }}>
      {itemType === "Goal" &&
        (items.length === 0 ? (
          <div className='items-number'>max number - 3</div>
        ) : 3 - items.length > 0 ? (
          <div className='items-number'>
            possible to add - {3 - items.length}
          </div>
        ) : (
          ""
        ))}
      <div className='add-item'>
        <input
          className='item-input'
          type='text'
          name='text'
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            // setItem({ ...item, text: text });
            // setItem({ ...item, text: e.target.value });
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
        {isFocused && text.length > 0 && (
          <small style={{ fontWeight: "bold" }}>
            <span
              style={{
                color: `${
                  text.length > 200 ? "var(--error-color)" : "var(--done-color)"
                }`,
              }}>
              {text.length}
            </span>{" "}
            / 200
          </small>
        )}
      </div>
      <div className='item-options'>
        {text.length > 0 && itemType === "Step" && (
          <>
            <div>
              <select onChange={selectChange}>
                <option selected disabled>
                  How often
                </option>
                <option value='Daily'>Daily</option>
                <option value='Weekly'>Weekly</option>
                <option value='Monthly'>Monthly</option>
                <option value='Seasonly'>Seasonly</option>
              </select>
              {selectPeriod === "Weekly"
                ? timesOptions(6)
                : selectPeriod === "Monthly"
                ? timesOptions(4)
                : selectPeriod === "Seasonly"
                ? timesOptions(5)
                : ""}
            </div>
            <button type='submit' className='btn btn-auto btn-success'>
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
    </form>
  );
};

export default ItemInput;
