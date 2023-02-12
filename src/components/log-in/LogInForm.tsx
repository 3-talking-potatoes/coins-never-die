"use client";

import React from "react";
import Link from "next/link";

import { BsGoogle } from "react-icons/bs";
import { DiGithubAlt } from "react-icons/di";

import EmailLogInForm from "./EmailLogInForm";
import SocialLogInButton from "./SocialLogInButton";
import { RiBitCoinFill } from "react-icons/ri";

export default function LogInForm() {
  return (
    <div className="bg-yellow-100 h-screen flex flex-col items-center justify-center justify-items-center ">
      <div className="bg-white form-wrapper w-[30rem] h-[35rem] overflow-x-hidden border-solid border-[3px] border-black rounded-3xl flex flex-col justify-items-center items-center">
        <div>
          <RiBitCoinFill className="w-[4rem] h-[4rem] mt-8 text-yellow-200" />
        </div>
        <div className="w-80 h-12 mb-3 text-3xl text-blue text-center font-[Galmuri7] rounded-lg">
          Log In
        </div>
        <EmailLogInForm />
        <div className="w-80 pr-4 pl-4 flex flex-row justify-between items-center mt-2">
          <SocialLogInButton name={"google"}>
            <BsGoogle className="w-6 h-6 pr-1 text-yellow-200" />
            구글 로그인
          </SocialLogInButton>
          <SocialLogInButton name={"github"}>
            <DiGithubAlt className="w-8 h-8 text-yellow-200" />
            깃허브 로그인
          </SocialLogInButton>
        </div>
        <Link
          href="/sign-up"
          className="w-fit h-8 mt-6 text-center hover:text-xl"
        >
          회원가입
        </Link>
      </div>
    </div>
  );
}
