"use client";

import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

import { auth, db } from "../../Firebase";
import Link from "next/link";
import { RiBitCoinFill } from "react-icons/ri";

export default function SignUp() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
    verifyPassword: "",
  });

  const onChangeForm = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const onSubmitSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const data = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password,
      );

      await setForm({
        email: "",
        password: "",
        verifyPassword: "",
      });

      if (data.operationType === "signIn") {
        const setUsers = async () => {
          const assetData = {
            asset: {
              cash: 100000,
            },
          };
          await setDoc(doc(db, "user", data.user.uid), assetData);
        };

        await setUsers();
        router.push("/log-in");
      }
    } catch (error) {
      console.log(error);
    }
  };

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
            className="w-80 h-10 p-3  placeholder:text-black-200 text-black text-lg mb-4 border-solid border-[3px] border-black rounded-lg focus:outline-yellow-200  focus:text-yellow-200"
            type="text"
            placeholder="이메일을 입력해주세요."
          />
          <input
            name="password"
            value={form.password}
            onChange={onChangeForm}
            className="w-80 h-10 p-3 placeholder:text-black-200 text-lg mb-4 border-solid border-[3px] border-black rounded-lg  focus:outline-yellow-200 focus:text-yellow-200"
            type="password"
            placeholder="비밀번호를 입력해주세요."
          />
          <input
            name="verifyPassword"
            value={form.verifyPassword}
            onChange={onChangeForm}
            className="w-80 h-10 p-3 placeholder:text-black-200 text-lg mb-4 border-solid border-[3px] border-black rounded-lg  focus:outline-yellow-200 focus:text-yellow-200"
            type="password"
            placeholder="비밀번호를 다시 입력해주세요."
          />
          <button
            type="submit"
            className="w-80 h-20 font-[Galmuri7] text-2xl mt-4 border-solid border-[3px] border-black bg-yellow-200 rounded-lg hover:bg-yellow-100 hover:text-3xl"
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
