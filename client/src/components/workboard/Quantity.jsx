import React from "react";

const Quantity = () => {
  return (
    <div className='quantity'>
      <select onChange={selectChange}>
        <option disabled selected>
          How often
        </option>
        <option value='Daily'>Daily</option>
        <option value='Weekly'>Weekly</option>
        <option value='Monthly'>Monthly</option>
        <option value='Seasonly'>Seasonly</option>
      </select>
      {selectPeriod &&
        (selectPeriod === "Weekly"
          ? timesOptions(6)
          : selectPeriod === "Monthly"
          ? timesOptions(4)
          : selectPeriod === "Seasonly"
          ? timesOptions(5)
          : "")}
    </div>
  );
};

export default Quantity;
