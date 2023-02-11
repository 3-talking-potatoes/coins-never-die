import { signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useSetRecoilState } from "recoil";

import { auth } from "../Firebase";
import { providerName } from "./logIn&SignUp/useAuthorization";
import { userId } from "@/atoms/atom";
import isSignUp from "@/utils/logIn&SignUp/isSignUp";
import { errorAlert } from "./logIn&SignUp/useAuthorization";

const useSocialLogInProvider = () => {
  const router = useRouter();

  const setUserUid = useSetRecoilState(userId);

  const onClickSocialLogIn = async (
    event: React.MouseEvent<HTMLButtonElement> | undefined,
  ) => {
    const { name } = event?.target as HTMLButtonElement;

    const provider = providerName(name);

    try {
      const data = await signInWithPopup(auth, provider);

      if (data.operationType === "signIn") {
        setUserUid(data.user.uid);

        await isSignUp(data.user.uid);

        router.push("/");
      }
    } catch (error) {
      if (typeof error === "object" && error !== null && "code" in error) {
        const errorMessage = errorAlert(String(error.code));

        alert(errorMessage);
      }
    }
  };

  return {
    onClickSocialLogIn,
  };
};

export default useSocialLogInProvider;
