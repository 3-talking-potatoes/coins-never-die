"use client";

import React from "react";

import useTrading from "@/hooks/useTrading";
import handleNumberFormat from "@/utils/NumberFormat";
import { IcurrentPrice } from "@/interface/interface";

const Trading = ({ currentPrice }: { currentPrice: IcurrentPrice }) => {
  const {
    korean_name,
    market,
    currentPriceFormat,
    currentPriceFormatWithKRW,
    fixedOrderQuantity,
    totalOrderAmount,
    isBuy,
    isSell,
    handleBuy,
    handleSell,
    handleIsSell,
    handleIsBuy,
    handleOrderQuantity,
    handleTotalOrderAmount,
    handleButtonPercent,
    initialization,
  } = useTrading({ currentPrice });

  const isButtonClicked =
    "bg-yellow-200 dark:bg-purple-200 w-[10.3rem] h-[3rem] rounded-xl border-black-100 border-[3px] text-white text-lg font-semibold";
  const isButtonUnClicked =
    "bg-grey w-[10.3rem] h-[3rem] rounded-xl border-black-100 border-[3px] text-black-100 text-lg font-semibold";

  return (
    <section className="bg-white w-[26rem] h-[30rem] rounded-xl border-black-100 border-[3px] px-8 py-8 flex-col items-center max-[910px]:mb-8">
      <article className="border-black-100 flex items-center justify-between mb-4">
        <button
          className={`${isBuy ? `${isButtonClicked}` : `${isButtonUnClicked}`}`}
          onClick={handleIsBuy}
        >
          매수
        </button>
        <button
          className={`${
            isSell ? `${isButtonClicked}` : `${isButtonUnClicked}`
          }`}
          onClick={handleIsSell}
        >
          매도
        </button>
      </article>
      <article className="mb-4">
        <figure className="text-black-200 text-lg py-3.5 border-b border-grey px-1 flex justify-between">
          <div className="flex items-baseline">
            <p>{korean_name}</p>
            <p className="text-black-200 text-xs pl-1">{market}</p>
          </div>
          <div>{currentPriceFormatWithKRW}</div>
        </figure>
        <figure className="text-black-200 text-lg py-3.5 border-b border-grey px-1 flex justify-between">
          <div>매수가격</div>
          <div className="w-36 pb-0.5 text-right">{currentPriceFormat}</div>
        </figure>
        <figure className="py-3.5 border-b border-grey px-1 flex justify-between">
          <div className="text-black-200 text-lg">주문수량</div>
          <input
            className="w-40 px-2 pb-0.5 text-right border border-grey"
            value={handleNumberFormat(fixedOrderQuantity)}
            onChange={handleOrderQuantity}
          />
        </figure>
        <figure className=" py-3.5 border-b border-grey px-1 flex justify-between">
          <div className="text-black-200 text-lg">주문총액</div>
          <input
            className="w-40 px-2 pb-0.5 text-right border border-grey"
            value={handleNumberFormat(totalOrderAmount)}
            onChange={handleTotalOrderAmount}
          />
        </figure>
      </article>
      <article className="bg-yellow-100 dark:bg-purple-100 rounded-lg border-black-100 border-[3px] flex justify-around items-center mb-4 pt-2 pb-2 text-black-100 text-xs font-[Galmuri11] font-semibold">
        <button onClick={handleButtonPercent} id="10">
          10%
        </button>
        <button onClick={handleButtonPercent} id="25">
          25%
        </button>
        <button onClick={handleButtonPercent} id="50">
          50%
        </button>
        <button onClick={handleButtonPercent} id="100">
          100%
        </button>
      </article>
      <article className="border-black flex justify-between">
        <button
          className="bg-yellow-100 dark:bg-purple-100 w-[7.3rem] h-[3rem] rounded-xl border-black-100 border-[3px] text-black-200 text-base font-[Galmuri11]"
          onClick={initialization}
        >
          초기화
        </button>
        {isBuy ? (
          <button
            className="bg-yellow-200 dark:bg-purple-200 w-[13.3rem] h-[3rem] rounded-xl border-black-100 border-[3px] text-white text-lg font-semibold"
            onClick={handleBuy}
          >
            매수
          </button>
        ) : (
          <button
            className="bg-yellow-200 dark:bg-purple-200 w-[13.3rem] h-[3rem] rounded-xl border-black-100 border-[3px] text-white text-lg font-semibold"
            onClick={handleSell}
          >
            매도
          </button>
        )}
      </article>
    </section>
  );
};

export default Trading;
