/* eslint-disable react-hooks/rules-of-hooks */
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
    <div className="w-screen h-screen bg-yellow-100 dark:bg-purple-100 justify-center flex items-center flex-col max-[910px]:flex-col max-[910px]:h-[1150px]">
      <div className="flex flex-row w-screen justify-self-start justify-between">
        <Logo className={className2} />
        <LogInOutButton className={className} />
      </div>
      <div className="w-screen h-screen bg-yellow-100 dark:bg-purple-100 m-auto flex justify-center items-center max-[910px]:flex-col">
        <Trading currentPrice={currentPrice}></Trading>
        <MyAssets />
      </div>
    </div>
  );
};

export default page;
