import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSetRecoilState } from "recoil";

import { userId } from "../atoms/atom";
import logInWithEmail from "../utils/logIn&SignUp/logInWithEmail";
import { errorAlert } from "../utils/logIn&SignUp/useAuthorization";

const useLogInForm = () => {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const setUserUid = useSetRecoilState(userId);

  const onChangeForm = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setForm({ ...form, [name]: value });
  };

  const onSubmitLogIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      let data = await logInWithEmail(form);

      setUserUid(data.user.uid);

      if (data.operationType === "signIn") {
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
    onSubmitLogIn,
    form,
    onChangeForm,
  };
};

export default useLogInForm;
