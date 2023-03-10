/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { db } from "./../Firebase";
import { doc, updateDoc, increment } from "firebase/firestore";

export const updateUserData = async (userUid: string, userAssetData: {}) => {
  if (userUid !== "") {
    const userAssetRef = doc(db, "user", userUid);
    await updateDoc(userAssetRef, userAssetData);
  }
};
