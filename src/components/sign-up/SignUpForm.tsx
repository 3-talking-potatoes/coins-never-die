"use client";

import React from "react";
import { RiBitCoinFill } from "react-icons/ri";
import Link from "next/link";

import useSignUpForm from "./useSignUpForm";

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
    <div className="bg-yellow-100 h-screen flex flex-col items-center justify-center justify-items-center ">
      <div className="bg-white form-wrapper w-[30rem] h-[35rem] overflow-x-hidden border-solid border-[3px] border-black rounded-3xl flex flex-col justify-items-center items-center">
        <div>
          <RiBitCoinFill className="w-[4rem] h-[4rem] mt-8 text-yellow-200" />
        </div>
        <div className="w-80 h-12 mb-6 text-3xl text-blue text-center font-[Galmuri7] rounded-lg">
          Sign up
        </div>
        <form
          onSubmit={onSubmitSignUp}
          autoComplete="off"
          className="w-[30rem] h-[26rem] flex flex-col justify-items-center items-center"
        >
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
