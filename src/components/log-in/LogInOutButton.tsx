"use client";

import { signOut } from "firebase/auth";
import Link from "next/link";
import { useRecoilState, useResetRecoilState } from "recoil";

import { auth } from "@/Firebase";
import { userId, userUidAssetData } from "@/atoms/atom";
import { useEffect, useState } from "react";

const LogInOutButton = ({ className }: { className: string }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [userUid, setUserUid] = useRecoilState(userId);
  const resetList = useResetRecoilState(userUidAssetData);

  const onClickSignOutButton = () => {
    signOut(auth)
      .then(() => {
        setUserUid("");
        resetList();
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    setIsLoggedIn(userUid === "" ? true : false);
  }, [userUid]);

  return (
    <div className={`bg-yellow-100 ${className}`}>
      {isLoggedIn ? (
        <Link
          href="/log-in"
          className="w-32 h-10 pt-1 flex self-end text-lg rounded-lg text-white bg-yellow-200 justify-center border-[3px] border-solid border-black-100 hover:bg-yellow-100 hover:text-xl"
        >
          Log In
        </Link>
      ) : (
        <Link
          href="/"
          onClick={onClickSignOutButton}
          className="w-32 h-10 pt-1 flex self-end text-lg rounded-lg text-white bg-yellow-200 justify-center border-[3px] border-solid border-black-100 hover:bg-yellow-100 hover:text-xl"
        >
          Log Out
        </Link>
      )}
    </div>
  );
};

export default LogInOutButton;
