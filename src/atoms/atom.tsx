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

export const userId = atom({
  key: "userId",
  default: "",
});

export const tradingOrderQuantity = atom({
  key: "tradingOrderQuantity",
  default: 0,
});

export const tradingTotalOrderAmount = atom({
  key: "tradingTotalOrderAmount",
  default: 0,
});

export const tradingPurchasePrice = atom<number | string>({
  key: "tradingPurchasePrice",
  default: "",
});

export const myAssetCash = atom({
  key: "myAssetCash",
  default: 100000,
});
