import { atom } from "recoil";

const nameState = atom({
  key: "nameState",
  default: "",
});

export { nameState };
