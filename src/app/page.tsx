"use client";

import React from "react";

import CoinList from "@/components/main/CoinList";
import PageArrowKey from "@/components/main/PageArrowKey";

const page = () => {
  return (
    <main className="bg-yellow-100 w-screen h-screen flex justify-center items-center">
      <PageArrowKey arrow={"left"} />
      <CoinList />
      <PageArrowKey arrow={"right"} />
    </main>
  );
};

export default page;
