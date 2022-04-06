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

export const checkPassword = (password: string, cf_password: string) => {
  if (password.length < 8) {
    return "Password must be at least 8 chars long";
  } else if (password !== cf_password) {
    return "Passwords do not match";
  }
};

export const validateEmail = (email: string) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const validatePhone = (phone: string) => {
  const re = /^[+]/g;
  return re.test(phone);
};
