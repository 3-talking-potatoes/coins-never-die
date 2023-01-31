"use client";
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Firebase";
import { useRouter } from "next/navigation";

export default function LogIn() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const onChangeForm = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const onSubmitSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      let data = await signInWithEmailAndPassword(
        auth,
        form.email,
        form.password,
      );
      console.log(data.operationType);
      if (data.operationType === "signIn") {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="border-solid border-2 border-black h-screen flex flex-col items-center justify-center justify-items-center ">
      <form
        onSubmit={onSubmitSignUp}
        className="w-[30rem] h-[35rem] overflow-scroll border-solid border-2 border-black rounded-3xl flex flex-col justify-items-center items-center"
      >
        <div className="w-96 h-24 text-6xl text-center font-[Galmuri9]">
          Log In
        </div>
        <input
          name="email"
          value={form.email}
          onChange={onChangeForm}
          className="w-96 h-14"
          type="text"
          placeholder="이메일을 입력해주세요"
        />
        <input
          name="password"
          value={form.password}
          onChange={onChangeForm}
          className="w-96 h-14"
          type="password"
          placeholder="비밀번호를 입력해주세요"
        />
        <button type="submit" className="w-96 h-28">
          Log In
        </button>
        <button type="button" className="w-96 h-12">
          구글 로그인
        </button>
        <button type="button" className="w-96 h-12">
          깃허브 로그인
        </button>
        <button type="button" className="w-96 h-12">
          회원가입
        </button>
      </form>
    </div>
  );
}
