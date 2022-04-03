import { useState } from "react";
import { InputChange } from "../../utils/TypeScript";

const LoginPass = () => {
  const initialState = { account: "", password: "" };
  const [userLogin, setUserLogin] = useState(initialState);
  const { account, password } = userLogin;

  const handleChangeInput = (e: InputChange) => {
    const { value, name } = e.target;
    setUserLogin({ ...userLogin, [name]: value });
  };

  return (
    <div>
      <h2>pass</h2>
    </div>
  );
};

export default LoginPass;
