import { SetterOrUpdater } from "recoil";
import { db } from "./../Firebase";
import { doc, onSnapshot } from "firebase/firestore";

export const getUserData = (
  userUid: string,
  setUserAssetData: SetterOrUpdater<{}>,
) => {
  if (userUid !== "") {
    onSnapshot(doc(db, "user", userUid), doc => {
      console.log("Current data: ", doc.data());
      const data = doc.data();
      setUserAssetData({ ...data });
    });
  }
};
