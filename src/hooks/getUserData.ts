import { IUserData } from "./../interface/interface";
import { SetterOrUpdater } from "recoil";
import { doc, onSnapshot } from "firebase/firestore";

import { db } from "@/Firebase";

export const getUserData = (
  userUid: string,
  setUserAssetData: SetterOrUpdater<IUserData>,
) => {
  if (userUid !== "") {
    onSnapshot(doc(db, "user", userUid), doc => {
      const data = doc.data();
      setUserAssetData({ ...data });
    });
  }
};
