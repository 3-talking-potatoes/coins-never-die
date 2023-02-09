"use client";

import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRecoilValue, useSetRecoilState } from "recoil";

import Trading from "../../components/Trading";
import MyAssets from "../../components/MyAsset/MyAssets";

import { getUserData } from "@/hooks/getUserData";
import { userId, userUidAssetData } from "@/atoms/atom";

const page: React.FC = () => {
  const setUserAssetData = useSetRecoilState(userUidAssetData);
  const userUid = useRecoilValue(userId);

  const searchParams = useSearchParams();

  const market_code = searchParams.get("market_code");

  const { data } = useQuery({
    queryKey: ["currentPrice"],
    queryFn: () =>
      axios(`https://api.upbit.com/v1/ticker?markets=${market_code}`),
  });

  const currentPrice = data?.data[0].trade_price;

  useEffect(() => {
    getUserData(userUid, setUserAssetData);
  }, []);

  return (
    <main className="bg-yellow-100 w-screen h-screen flex justify-center items-center">
      <Trading currentPrice={currentPrice}></Trading>
      <MyAssets currentPrice={currentPrice}></MyAssets>
    </main>
  );
};

export default page;
