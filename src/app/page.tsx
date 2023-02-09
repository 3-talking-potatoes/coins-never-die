"use client";

import React from "react";

import CoinList from "@/components/CoinList";
import PageArrowKey from "@/components/PageArrowKey";

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
