import { atom } from "recoil";
import { IsearchedList, UserAssetData } from "@/interface/interface";
import { recoilPersist } from "recoil-persist";
import { AnyNsRecord } from "dns";

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

export const inputValueAtom = atom<string>({
  key: "inputValueAtom",
  default: "",
});

export const searchedListAtom = atom<IsearchedList[] | undefined>({
  key: "searchedListAtom",
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

export const userUidAssetData = atom<UserAssetData>({
  key: "userUidAssetData",
  default: {},
});

export const pageAtom = atom<number>({
  key: "pageAtom",
  default: 1,
});

export const myAssetIsCoinListClick = atom({
  key: "myAssetIsCoinListClick",
  default: false,
});

export const myAssetClickedCoinListId = atom({
  key: "myAssetClickedCoinListId",
  default: 0,
});

export const tradingIsBuy = atom({
  key: "tradingIsBuy",
  default: true,
});

export const tradingIsSell = atom({
  key: "tradingIsSell",
  default: false,
});
