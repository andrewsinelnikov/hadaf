import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { IParams } from "../../utils/TypeScript";

const Active = () => {
  const { slug }: IParams = useParams<keyof IParams>() as IParams;

  return (
    <div>
      <h2>Active</h2>
    </div>
  );
};

export default Active;
