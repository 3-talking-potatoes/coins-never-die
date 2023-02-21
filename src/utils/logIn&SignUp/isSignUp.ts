import setUserData from "@/utils/logIn&SignUp/setUserData";
import { getDoc } from "firebase/firestore";
import { db } from "../../Firebase";
import { doc } from "firebase/firestore";

const isSignUp = async (userUid: string) => {
  const docRef = doc(db, "user", userUid);
  const userDoc = await getDoc(docRef);

  if (!userDoc.exists()) await setUserData(userUid);
};

export default isSignUp;
