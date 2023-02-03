import { atom } from "recoil";

export const nameState = atom({
  key: "nameState",
  default: "",
});

export const coinResultAtom = atom({
  key: "coinResultAtom",
  default: [],
});

export const coinListArrAtom = atom({
  key: "coinListArrAtom",
  default: [],
});

export const searchInputValue = atom({
  key: "searchInputValue",
  default: "",
});

export const searchedList = atom({
  key: "searchedList",
  default: [],
});
