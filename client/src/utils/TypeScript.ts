import { ChangeEvent, FormEvent } from "react";

export type InputChange = ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
>;

export type FormSubmit = FormEvent<HTMLFormElement>;

export interface IParams {
  page: string;
  slug: string;
}
