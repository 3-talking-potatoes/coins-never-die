"use client";

import React from "react";
import { RiBitCoinFill } from "react-icons/ri";
import Link from "next/link";

import useSignUpForm from "./useSignUpForm";
import SignUpFormInput from "./SignUpFormInput";

export default function SignUpForm() {
  const {
    onSubmitSignUp,
    form,
    onChangeForm,
    validForm,
    disabledButton,
    disabledButtonStyle,
    activeButtonStyle,
  } = useSignUpForm();

  return (
    <div className="bg-yellow-100 dark:bg-purple-100 h-screen flex flex-col items-center justify-center justify-items-center ">
      <div className="bg-white form-wrapper w-[30rem] h-[35rem] overflow-x-hidden border-solid border-[3px] border-black rounded-3xl flex flex-col justify-items-center items-center">
        <div>
          <RiBitCoinFill className="w-[4rem] h-[4rem] mt-8 text-yellow-200 dark:text-purple-200" />
        </div>
        <div className="w-80 h-12 mb-1 text-3xl text-blue text-center font-[Galmuri7] rounded-lg">
          Sign up
        </div>
        <form
          onSubmit={onSubmitSignUp}
          autoComplete="off"
          className="w-[30rem] h-[28rem] flex flex-col justify-items-center items-center"
        >
          <SignUpFormInput
            name="email"
            form={form}
            onChangeForm={onChangeForm}
            validForm={validForm}
          />
          <SignUpFormInput
            name="password"
            form={form}
            onChangeForm={onChangeForm}
            validForm={validForm}
          />
          <SignUpFormInput
            name="verifyPassword"
            form={form}
            onChangeForm={onChangeForm}
            validForm={validForm}
          />
          <button
            type="submit"
            disabled={disabledButton}
            className={disabledButton ? disabledButtonStyle : activeButtonStyle}
          >
            Sign Up
          </button>
          <Link
            href="/log-in"
            className="w-fit h-8 mt-12 text-center hover:text-xl"
          >
            로그인
          </Link>
        </form>
      </div>
    </div>
  );
}
