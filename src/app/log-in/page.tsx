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

import { RiBitCoinFill } from "react-icons/ri";
import { BsGoogle } from "react-icons/bs";
import { DiGithubAlt } from "react-icons/di";

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
    <div className="bg-yellow-100 h-screen flex flex-col items-center justify-center justify-items-center ">
      <div className="bg-white form-wrapper w-[30rem] h-[35rem] overflow-scroll border-solid border-[3px] border-black rounded-3xl flex flex-col justify-items-center items-center">
        <form
          onSubmit={onSubmitLogIn}
          className="w-[30rem] h-[24rem] flex flex-col justify-items-center items-center"
        >
          <RiBitCoinFill className="w-[4rem] h-[4rem] mt-8 text-yellow-200" />
          <div className="w-80 h-12 mb-6 text-3xl text-blue text-center font-[Galmuri7] rounded-lg">
            Log In
          </div>
          <input
            name="email"
            value={form.email}
            onChange={onChangeForm}
            className="w-80 h-14 p-3 font-[Galmuri7] placeholder:text-black-200 text-black text-xl mb-4 border-solid border-[3px] border-black rounded-lg focus:outline-yellow-200  focus:text-yellow-200"
            type="text"
            placeholder="Email"
          />
          <input
            name="password"
            value={form.password}
            onChange={onChangeForm}
            className="w-80 h-14 p-3 font-[Galmuri7] placeholder:text-black-200 text-xl mb-4 border-solid border-[3px] border-black rounded-lg  focus:outline-yellow-200 focus:text-yellow-200"
            type="password"
            placeholder="Password"
          />
          <button
            type="submit"
            className="w-80 h-20 font-[Galmuri7] text-2xl mt-4 border-solid border-[3px] border-black bg-yellow-200 rounded-lg hover:bg-yellow-100 hover:text-3xl"
          >
            Log In
          </button>
        </form>
        <div className="w-80 pr-4 pl-4 flex flex-row justify-between items-center mt-6">
          <button
            name="google"
            onClick={onClickSocialLogIn}
            type="button"
            className="w-fit h-8 flex flex-row items-center hover:text-yellow-200"
          >
            <BsGoogle className="w-6 h-6 pr-1 text-yellow-200" />
            구글 로그인
          </button>
          <button
            onClick={onClickSocialLogIn}
            name="github"
            type="button"
            className="w-fit h-8 flex flex-row items-center hover:text-yellow-200"
          >
            <DiGithubAlt className="w-8 h-8 text-yellow-200" />
            깃허브 로그인
          </button>
        </div>
        <Link
          href="/sign-up"
          className="w-fit h-8 mt-12 text-center hover:text-xl"
        >
          회원가입
        </Link>
      </div>
    </div>
  );
}
// border-solid border-[3px] border-black rounded-lg
