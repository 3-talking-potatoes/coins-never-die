"use client";

import React from "react";

import Trading from "../../components/exchange/Trading";
import MyAssets from "../../components/exchange/MyAssets";

import useExchange from "@/hooks/useExchange";

import Logo from "@/components/Logo";
import LogInOutButton from "@/components/log-in/LogInOutButton";

const page: React.FC = () => {
  const { currentPrice } = useExchange();
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
