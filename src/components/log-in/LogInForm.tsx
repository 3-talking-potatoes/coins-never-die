"use client";

import React from "react";
import Link from "next/link";

import { BsGoogle } from "react-icons/bs";
import { DiGithubAlt } from "react-icons/di";

import EmailLogInForm from "./EmailLogInForm";
import SocialLogInButton from "./SocialLogInButton";
import { RiBitCoinFill } from "react-icons/ri";
import Image from "next/image";

export default function LogInForm() {
  return (
    <div className="bg-yellow-100 dark:bg-purple-100  h-[30rem] relative  flex flex-col items-center justify-center justify-items-center ">
      <Image
        src="/cndIcon.png"
        alt="icon"
        width={100}
        height={100}
        style={{ width: 100, height: 100 }}
        priority
        className="ml-[14rem] mb-[-2rem] md:ml-[21rem] md:mb-[-2rem]"
      />
      <div className="bg-white form-wrapper w-[22rem] md:w-[30rem] h-[35rem] overflow-x-hidden scrollbar-hide border-solid border-[3px] border-black rounded-3xl flex flex-col justify-items-center items-center">
        <div>
          <RiBitCoinFill className="w-[3rem] h-[3rem] mt-3 text-yellow-200 dark:text-purple-200" />
        </div>
        <div className="w-[22rem] h-10 md:h-12 mb-1 text-2xl md:text-3xl text-blue text-center font-[Galmuri7] rounded-lg">
          Log In
        </div>
        <EmailLogInForm />
        <div className="w-[19rem] md:w-[21rem] pr-4 pl-4 flex flex-row justify-between items-center mt-4">
          <SocialLogInButton name={"google"}>
            <BsGoogle className="w-6 h-6 pr-1 text-yellow-200 dark:text-purple-200" />
            구글 로그인
          </SocialLogInButton>
          <SocialLogInButton name={"github"}>
            <DiGithubAlt className="w-8 h-8 text-yellow-200 dark:text-purple-200" />
            깃허브 로그인
          </SocialLogInButton>
        </div>
        <Link
          href="/sign-up"
          className="w-fit h-8 mt-2 text-center hover:text-xl"
        >
          회원가입
        </Link>
      </div>
    </div>
  );
}
