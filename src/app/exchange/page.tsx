"use client";

import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRecoilValue, useSetRecoilState } from "recoil";

import Trading from "../../components/exchange/Trading";
import MyAssets from "../../components/exchange/MyAssets";

import { getUserData } from "@/hooks/getUserData";
import { userId, userUidAssetData } from "@/atoms/atom";
import Logo from "@/components/Logo";
import LogInOutButton from "@/components/log-in/LogInOutButton";

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
  const className2 = `pl-3 pt-3`;
  const className = "pr-3 pt-4";

  return (
    <div className="w-screen h-screen bg-yellow-100 justify-center flex items-center flex-col overflow-scroll">
      <div className="flex flex-row w-screen justify-self-start justify-between">
        <Logo className={className2} />
        <LogInOutButton className={className} />
      </div>

      <div className="bg-yellow-100 m-auto flex justify-center items-center">
        <Trading currentPrice={currentPrice}></Trading>
        <MyAssets currentPrice={currentPrice}></MyAssets>
      </div>
    </div>
  );
};

export default page;
