"use client";

import React, { useState } from "react";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useRecoilState } from "recoil";
import { doc, getDoc, setDoc } from "firebase/firestore";

import { auth, db } from "../../Firebase";
import { userId } from "../../atoms/atom";

export default function LogIn() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [userUid, setUserUid] = useRecoilState(userId);

  const router = useRouter();

  const onChangeForm = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const onSubmitLogIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      let data = await signInWithEmailAndPassword(
        auth,
        form.email,
        form.password,
      );
      setUserUid(data.user.uid);
      if (data.operationType === "signIn") {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onClickSocialLogIn = async (
    event: React.MouseEvent<HTMLButtonElement> | undefined,
  ) => {
    const { name } = event?.target as HTMLButtonElement;

    let provider: GoogleAuthProvider | GithubAuthProvider =
      new GoogleAuthProvider();

    if (name === "google") {
      provider = new GoogleAuthProvider();
    }
    if (name === "github") {
      provider = new GithubAuthProvider();
    }
    try {
      const data = await signInWithPopup(auth, provider);
      console.log(data);
      await setUserUid(data.user.uid);

      if (data.operationType === "signIn") {
        const docRef = doc(db, "user", data.user.uid);
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) {
          const setUsers = async () => {
            const assetData = {
              asset: {
                cash: 100000,
              },
            };
            await setDoc(doc(db, "user", data.user.uid), assetData);
          };

          await setUsers();
        }
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="border-solid border-2 border-black h-screen flex flex-col items-center justify-center justify-items-center ">
      <div className="form-wrapper w-[30rem] h-[35rem] overflow-scroll border-solid border-2 border-black rounded-3xl flex flex-col justify-items-center items-center">
        <form
          onSubmit={onSubmitLogIn}
          className="w-[30rem] h-[20rem] flex flex-col justify-items-center items-center"
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
        </form>
        <button
          name="google"
          onClick={onClickSocialLogIn}
          type="button"
          className="w-96 h-12"
        >
          구글 로그인
        </button>
        <button
          onClick={onClickSocialLogIn}
          name="github"
          type="button"
          className="w-96 h-12"
        >
          깃허브 로그인
        </button>
        <Link href="/sign-up" className="w-96 h-12 text-center">
          회원가입
        </Link>
      </div>
    </div>
  );
}
