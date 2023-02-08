import { atom } from "recoil";
import { IsearchedList } from "@/interface/interface";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

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
  effects_UNSTABLE: [persistAtom],
});

export const tradingOrderQuantity = atom({
  key: "tradingOrderQuantity",
  default: "0",
});

export const tradingTotalOrderAmount = atom({
  key: "tradingTotalOrderAmount",
  default: "0",
});

export const tradingPurchasePrice = atom({
  key: "tradingPurchasePrice",
  default: "",
});

export const tradingIsOrderQuantityChanged = atom({
  key: "isOrderQuantity",
  default: false,
});

export const tradingIsTotalOderAmountChanged = atom({
  key: "isTotalOderAmount",
  default: false,
});

export const userUidAssetData = atom({
  key: "userUidAssetData",
  default: {},
});
