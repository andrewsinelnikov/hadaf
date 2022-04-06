import { IUserRegister } from "./TypeScript";

export const validateRegister = (userRegister: IUserRegister) => {
  const { name, account, password, cf_password } = userRegister;
  const errors: string[] = [];

  if (!name) {
    errors.push("Please provide your name");
  } else if (name.length > 20) {
    errors.push("Your name is up to 20 chars long");
  }

  if (!account) {
    errors.push("Please provide your email or phone");
  } else if (!validateEmail(account) && !validatePhone(account)) {
    errors.push("Email or phone number format is incorrect");
  }

  const msg = checkPassword(password, cf_password);
  if (msg) errors.push(msg);

  return {
    errMsg: errors,
    errLength: errors.length,
  };
};
