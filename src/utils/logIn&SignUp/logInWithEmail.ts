import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Firebase";

const logInWithEmail = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const data = await signInWithEmailAndPassword(auth, email, password);
  return data;
};

export default logInWithEmail;
