"use client";

import React from "react";

import CoinList from "@/components/main/CoinList";
import PageArrowKey from "@/components/main/PageArrowKey";
import Logo from "@/components/Logo";
import useCoinList from "@/hooks/useCoinList";

const page = () => {
  const { numPages } = useCoinList();

  return (
    <main className="bg-yellow-100 w-screen h-screen flex justify-center items-center">
      <PageArrowKey arrow={"◀"} disabled={1} setPage={-1} />
      <div className={`flex flex-col justify-center items-center`}>
        <Logo className={`pl-3 pt-3 mb-4`} />
        <CoinList />
      </div>
      <PageArrowKey arrow={"▶"} disabled={numPages!} setPage={1} />
    </main>
  );
};

export default page;
