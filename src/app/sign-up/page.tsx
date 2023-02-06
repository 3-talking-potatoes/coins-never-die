"use client";

import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

import { auth, db } from "../../Firebase";
import Link from "next/link";

export default function SignUp() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
    verifyPassword: "",
  });
  const [emailMessage, setEmailMessage] = useState(true);
  const [PasswordMessage, setPasswordMessage] = useState(true);
  const [verifyPasswordMessage, setVerifyPasswordMessage] = useState(true);

  const emailRegex =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

  const passwordRegex = "";

  const onChangeForm = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
    if (!emailRegex.test(form.email)) {
      setEmailMessage(false);
    } else {
      setEmailMessage(true);
    }
    if (form.password.length < 6) {
      setPasswordMessage(false);
    } else {
      setPasswordMessage(true);
    }
    if (
      form.verifyPassword.length > 0 &&
      form.password !== form.verifyPassword
    ) {
      setVerifyPasswordMessage(false);
    } else {
      setVerifyPasswordMessage(true);
    }
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
    <div className="border-solid border-2 border-black h-screen flex flex-col items-center justify-center justify-items-center ">
      <div className="form-wrapper w-[30rem] h-[35rem] overflow-scroll border-solid border-2 border-black rounded-3xl flex flex-col justify-items-center items-center">
        <form
          onSubmit={onSubmitSignUp}
          className="w-[30rem] h-[20rem] flex flex-col justify-items-center items-center"
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
          {emailMessage ? null : "유효한 이메일을 입력해주세요"}
          <input
            name="password"
            value={form.password}
            onChange={onChangeForm}
            className="w-96 h-14"
            type="password"
            placeholder="비밀번호를 입력해주세요"
          />
          {PasswordMessage ? null : "비밀번호는 6자 이상 입력해주세요"}
          <input
            name="verifyPassword"
            value={form.verifyPassword}
            onChange={onChangeForm}
            className="w-96 h-14"
            type="password"
            placeholder="비밀번호를 다시 입력해주세요"
          />
          {verifyPasswordMessage ? null : "비밀번호가 일치하지 않습니다"}
          <button type="submit" className="w-96 h-28">
            회원가입
          </button>
        </form>
        <Link href="/log-in" className="w-96 h-12 text-center">
          로그인
        </Link>
      </div>
    </div>
  );
}
