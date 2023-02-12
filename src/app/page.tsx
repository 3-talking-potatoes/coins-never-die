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
      <div className="max-md:hidden">
        <PageArrowKey arrow={"◀"} disabled={1} setPage={-1} />
      </div>
      <div className={`flex flex-col justify-center items-center`}>
        <Logo className={`pl-3 mt-12 mb-4`} />
        <CoinList />
        <div className="flex mt-1 md:hidden">
          <PageArrowKey arrow={"◀"} disabled={1} setPage={-1} />
          <PageArrowKey arrow={"▶"} disabled={numPages!} setPage={1} />
        </div>
      </div>
      <div className="max-md:hidden">
        <PageArrowKey arrow={"▶"} disabled={numPages!} setPage={1} />
      </div>
    </main>
  );
};

export default page;
