import { useEffect } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../redux/store";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAutosizeTextarea = (
  textAreaRef: HTMLTextAreaElement | null,
  value: string
) => {
  useEffect(() => {
    if (textAreaRef) {
      textAreaRef.style.height = "0px";
      const scrollHeight = textAreaRef.scrollHeight;
      textAreaRef.style.height = scrollHeight + "px";
    }
    if (textAreaRef && textAreaRef.clientHeight > window.innerHeight * 0.5) {
      textAreaRef.scrollTop = textAreaRef.scrollHeight;
      //   textAreaRef.style.overflow = "hidden scroll";
    }
    // if (textAreaRef!.clientHeight > window.innerHeight * 0.5) {
    //   textAreaRef!.style.overflow = "hidden auto";
    // }
  }, [textAreaRef, value]);
};
