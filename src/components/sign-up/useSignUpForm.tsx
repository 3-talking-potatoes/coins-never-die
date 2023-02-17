/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prefer-const */
/* eslint-disable no-useless-escape */
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { errorAlert } from "../../utils/logIn&SignUp/useAuthorization";
import setUserData from "@/utils/logIn&SignUp/setUserData";
import createUserWithEmail from "@/utils/logIn&SignUp/createUserWithEmail";

export default function useSignUpForm() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
    verifyPassword: "",
  });

  const [validForm, setValidForm] = useState({
    email: true,
    password: true,
    verifyPassword: true,
  });

  const [disabledButton, setDisabledButton] = useState(true);

  const validation = (name: string, value: string) => {
    if (name === "email") {
      const regExp =
        /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
      setValidForm({ ...validForm, [name]: regExp.test(value) });
    }
    if (name === "password") {
      const regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/;
      setValidForm({
        ...validForm,
        [name]: regExp.test(value),
        verifyPassword: testVerifyPassword(value),
      });
    }
    if (name === "verifyPassword") {
      setValidForm({ ...validForm, [name]: value === form.password });
    }
  };

  const testVerifyPassword = (value: string) => {
    if (form.verifyPassword.length === 0) return true;
    return value === form.verifyPassword;
  };

  const activeButtonTest = ({
    email,
    password,
    verifyPassword,
  }: {
    email: boolean;
    password: boolean;
    verifyPassword: boolean;
  }) => {
    if (email && password && verifyPassword) return true;
    return false;
  };

  const isEmpty = ({
    email,
    password,
    verifyPassword,
  }: {
    email: string;
    password: string;
    verifyPassword: string;
  }) => {
    if (
      email.length !== 0 &&
      password.length !== 0 &&
      verifyPassword.length !== 0
    )
      return true;
    return false;
  };

  const submitButton = () => {
    const passedValidTest = activeButtonTest(validForm);
    const passedLengthTest = isEmpty(form);

    if (passedValidTest && passedLengthTest) return setDisabledButton(false);

    return setDisabledButton(true);
  };

  const onChangeForm = (event: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = event.target;
    value = value.replace(/\s/gi, "");

    setForm({ ...form, [name]: value });

    validation(name, value);
  };

  const onSubmitSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const data = await createUserWithEmail(form);

      if (data.operationType === "signIn") {
        await setUserData(data.user.uid);

        router.push("/log-in");
      }
    } catch (error) {
      if (typeof error === "object" && error !== null && "code" in error) {
        const errorMessage = errorAlert(String(error.code));

        alert(errorMessage);
      }
    } finally {
      setForm({
        email: "",
        password: "",
        verifyPassword: "",
      });
    }
  };

  useEffect(() => {
    submitButton();
  }, [form]);

  const disabledButtonStyle =
    "w-80 h-20 font-[Galmuri7] text-2xl mt-4 border-solid border-[3px] border-black bg-grey rounded-lg text-slate-100 cursor-not-allowed";
  const activeButtonStyle =
    "w-80 h-20 font-[Galmuri7] text-2xl mt-4 border-solid border-[3px] bg-yellow-200 dark:bg-purple-200 border-black rounded-lg hover:bg-yellow-100 hover:dark:bg-purple-100 hover:text-3xl";

  return {
    onSubmitSignUp,
    form,
    onChangeForm,
    validForm,
    disabledButton,
    disabledButtonStyle,
    activeButtonStyle,
  };
}
