import { ChangeEvent, FormEvent, MouseEvent } from "react";
// import rootReducer from "../redux/reducers/index";

export type InputChange = ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
>;

export type FormSubmit = FormEvent<HTMLFormElement>;

export type ButtonClick = MouseEvent<HTMLButtonElement>;

// export type RootStore = ReturnType<typeof rootReducer>;

export interface IParams {
  page: string;
  slug: string;
  action?: string;
}

export interface IUserLogin {
  account: string;
  password: string;
}

export interface IUserRegister extends IUserLogin {
  name: string;
  cf_password: string;
}

export interface IUser extends IUserLogin {
  image: string;
  createdAt: string;
  name: string;
  usta?: string;
  bbook?: string;
  role: string;
  type: string;
  updatedAt: string;
  _id: string;
}

export interface IUserProfile extends IUserRegister {
  image: string | Blob;
  usta?: string;
  bbook?: string;
}

export interface IAlert {
  loading?: boolean;
  success?: string | string[];
  errors?: string | string[];
}

export interface ICategory {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface IItem {
  _id?: string;
  user?: string | IUser;
  text: string;
  completeness?: number;
  isDone?: boolean;
  goal?: string;
  count?: number;
  createdAt: string;
}

export interface IJournalNote {
  _id: number;
  title?: string;
  text: string;
}
