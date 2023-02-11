"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { RiBitCoinFill } from "react-icons/ri";
import Link from "next/link";

import { errorAlert } from "../../utils/logIn&SignUp/useAuthorization";
import setUserData from "@/utils/logIn&SignUp/setUserData";
import createUserWithEmail from "@/utils/logIn&SignUp/createUserWithEmail";

export default function SignUpForm() {
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
      var regExp =
        /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
      setValidForm({ ...validForm, [name]: regExp.test(value) });
    }
    if (name === "password") {
      var regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/;
      setValidForm({ ...validForm, [name]: regExp.test(value) });
    }
    if (name === "verifyPassword") {
      setValidForm({ ...validForm, [name]: value === form.password });
    }
  };

  const submitButton = () => {
    if (validForm.email && validForm.password && validForm.verifyPassword) {
      if (
        form.email.length !== 0 &&
        form.password.length !== 0 &&
        form.verifyPassword.length !== 0
      ) {
        return setDisabledButton(false);
      }
      return setDisabledButton(true);
    }
    return setDisabledButton(true);
  };

  useEffect(() => {
    submitButton();
  }, [form]);

  const onChangeForm = (event: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = event.target;
    value = value.replace(/\s/gi, "");

    setForm({ ...form, [name]: value });

    const validTest = validation(name, value);
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

  const disabledButtonStyle =
    "w-80 h-20 font-[Galmuri7] text-2xl mt-4 border-solid border-[3px] border-black bg-grey rounded-lg text-slate-100 cursor-not-allowed";
  const activeButtonStyle =
    "w-80 h-20 font-[Galmuri7] text-2xl mt-4 border-solid border-[3px] bg-yellow-200 border-black rounded-lg hover:bg-yellow-100 hover:text-3xl";

  return (
    <div className="bg-yellow-100 h-screen flex flex-col items-center justify-center justify-items-center ">
      <div className="bg-white form-wrapper w-[30rem] h-[35rem] overflow-x-hidden border-solid border-[3px] border-black rounded-3xl flex flex-col justify-items-center items-center">
        <form
          onSubmit={onSubmitSignUp}
          autoComplete="off"
          className="w-[30rem] h-[26rem] flex flex-col justify-items-center items-center"
        >
          <RiBitCoinFill className="w-[4rem] h-[4rem] mt-8 text-yellow-200" />
          <div className="w-80 h-12 mb-6 text-3xl text-blue text-center font-[Galmuri7] rounded-lg">
            Sign up
          </div>
          <input
            name="email"
            value={form.email}
            onChange={onChangeForm}
            className="w-80 h-10 p-3  placeholder:text-black-200 text-black text-lg border-solid border-[3px] border-black rounded-lg focus:outline-yellow-200  focus:text-yellow-200"
            type="text"
            placeholder="이메일을 입력해주세요."
          />
          <div className="text-[0.7rem] text-red">
            {validForm.email ? null : "이메일 형식이 유효하지 않습니다."}
          </div>
          <input
            name="password"
            value={form.password}
            onChange={onChangeForm}
            className="w-80 h-10 p-3 placeholder:text-black-200 text-lg mt-4 border-solid border-[3px] border-black rounded-lg  focus:outline-yellow-200 focus:text-yellow-200"
            type="password"
            placeholder="비밀번호를 입력해주세요."
          />
          <div className="text-[0.7rem] text-red">
            {validForm.password
              ? null
              : "문자와 하나 이상의 숫자를 포함하여 8~10자리여야 합니다."}
          </div>
          <input
            name="verifyPassword"
            value={form.verifyPassword}
            onChange={onChangeForm}
            className="w-80 h-10 p-3 placeholder:text-black-200 text-lg mt-4 border-solid border-[3px] border-black rounded-lg  focus:outline-yellow-200 focus:text-yellow-200"
            type="password"
            placeholder="비밀번호를 다시 입력해주세요."
          />
          <div className="text-[0.7rem] text-red">
            {validForm.verifyPassword ? null : "비밀번호가 일치하지 않습니다."}
          </div>
          <button
            type="submit"
            disabled={disabledButton}
            className={disabledButton ? disabledButtonStyle : activeButtonStyle}
          >
            Sign Up
          </button>
        </form>
        <Link
          href="/log-in"
          className="w-fit h-8 mt-12 text-center hover:text-xl"
        >
          로그인
        </Link>
      </div>
    </div>
  );
}
