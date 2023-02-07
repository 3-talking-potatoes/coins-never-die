import { atom } from "recoil";
import { IsearchedList } from "@/interface/interface";

export const nameState = atom<string>({
  key: "nameState",
  default: "",
});

export const coinResultAtom = atom<string[]>({
  key: "coinResultAtom",
  default: [],
});

export const coinListArrAtom = atom<string[]>({
  key: "coinListArrAtom",
  default: [],
});

export const searchInputValue = atom<string>({
  key: "searchInputValue",
  default: "",
});

export const searchedList = atom<IsearchedList[]>({
  key: "searchedList",
  default: [],
});

export const userId = atom<string>({
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
