import { auth } from "../../Firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const createUserWithEmail = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const data = await createUserWithEmailAndPassword(auth, email, password);
  return data;
};

export default createUserWithEmail;
