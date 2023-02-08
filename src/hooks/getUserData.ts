import { db } from "./../Firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { SetterOrUpdater } from "recoil";

export const getUserData = (
  userUid: string,
  setUserAssetData: SetterOrUpdater<{}>,
) => {
  if (userUid !== "") {
    onSnapshot(doc(db, "user", userUid), doc => {
      const data = doc.data();
      setUserAssetData({ ...data });
    });
  }
};
