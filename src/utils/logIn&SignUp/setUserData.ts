import { setDoc } from "firebase/firestore";
import { db } from "../../Firebase";
import { doc } from "firebase/firestore";
import { assetData } from "./useAuthorization";

const setUserData = async (userUid: string) => {
  await setDoc(doc(db, "user", userUid), assetData);
};

export default setUserData;
