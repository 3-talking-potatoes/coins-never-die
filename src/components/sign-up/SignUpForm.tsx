"use client";

import React from "react";
import { RiBitCoinFill } from "react-icons/ri";
import Link from "next/link";

import useSignUpForm from "./useSignUpForm";
import SignUpFormInput from "./SignUpFormInput";
import Image from "next/image";

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
    <div className="bg-yellow-100 h-[30rem] dark:bg-purple-100 flex flex-col items-center justify-center justify-items-center ">
      <Image
        src="/cndIcon.png"
        alt="icon"
        width={100}
        height={100}
        priority
        className="ml-[14rem] mb-[-2rem] md:ml-[21rem] md:mb-[-2rem]"
      />
      <div className="bg-white form-wrapper w-[22rem] md:w-[30rem] h-[35rem] overflow-x-hidden scrollbar-hide border-solid border-[3px] border-black rounded-3xl flex flex-col justify-items-center items-center">
        <div>
          <RiBitCoinFill className="w-[3rem] h-[3rem] mt-3 text-yellow-200 dark:text-purple-200" />
        </div>
        <div className="w-[22rem] h-10 md:h-12 mb-1 text-2xl md:text-3xl text-blue text-center font-[Galmuri7] rounded-lg">
          Sign up
        </div>
        <form
          onSubmit={onSubmitSignUp}
          autoComplete="off"
          className="w-[22rem] h-[20rem] flex flex-col justify-items-center items-center"
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
            className="w-fit h-8 mt-8 text-center hover:text-xl"
          >
            로그인
          </Link>
        </form>
      </div>
    </div>
  );
}
