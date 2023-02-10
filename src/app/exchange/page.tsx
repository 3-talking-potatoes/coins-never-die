"use client";

import React from "react";

import Trading from "../../components/exchange/Trading";
import MyAssets from "../../components/exchange/MyAssets";

import useExchange from "@/hooks/useExchange";

const page: React.FC = () => {
  const { currentPrice } = useExchange();

  return (
    <main className="bg-yellow-100 w-screen h-screen flex justify-center items-center">
      <Trading currentPrice={currentPrice}></Trading>
      <MyAssets currentPrice={currentPrice}></MyAssets>
    </main>
  );
};

export default page;
