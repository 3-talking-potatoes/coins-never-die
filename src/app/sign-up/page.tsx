"use client";
import React, { useState } from "react";

export default function SignUp() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    verifyPassword: "",
  });

  const onChangeForm = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const onSubmitSignUp = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(form);
  };

  return (
    <div className="border-solid border-2 border-black h-screen flex flex-col items-center justify-center justify-items-center ">
      <form
        onSubmit={onSubmitSignUp}
        className="w-[30rem] h-[35rem] overflow-scroll border-solid border-2 border-black rounded-3xl flex flex-col justify-items-center items-center"
      >
        <div className="w-96 h-24 text-6xl text-center ">sign up</div>
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
        <input
          name="verifyPassword"
          value={form.verifyPassword}
          onChange={onChangeForm}
          className="w-96 h-14"
          type="password"
          placeholder="비밀번호를 다시 입력해주세요"
        />
        <button type="submit" className="w-96 h-28">
          회원가입
        </button>
      </form>
    </div>
  );
}
