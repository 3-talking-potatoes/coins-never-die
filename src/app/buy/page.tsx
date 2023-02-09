"use client";

import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

import Trading from "../../components/Trading";
import MyAssets from "../../components/MyAssets";

import { getUserData } from "@/hooks/getUserData";

import { userId, userUidAssetData } from "@/atoms/atom";

const page = () => {
  const setUserAssetData = useSetRecoilState(userUidAssetData);
  const userUid = useRecoilValue(userId);

  useEffect(() => {
    getUserData(userUid, setUserAssetData);
  }, []);

  return (
    <main className="bg-yellow-100 w-screen h-screen flex justify-center items-center">
      <Trading></Trading>
      <MyAssets></MyAssets>
    </main>
  );
};

export default page;
