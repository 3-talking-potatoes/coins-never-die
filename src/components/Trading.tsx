"use client";

import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";

import { useQuery } from "@tanstack/react-query";
import { useRecoilState } from "recoil";
import axios from "axios";

import {
  tradingOrderQuantity,
  tradingPurchasePrice,
  tradingTotalOrderAmount,
} from "@/atoms/atom";

const Trading = () => {
  const searchParams = useSearchParams();

  const market_code = searchParams.get("market_code");
  const abbreviatedEnglishName = market_code?.split("-")[1];
  const korean_name = searchParams.get("korean_name");

  const market = `${abbreviatedEnglishName}/KRW`;

  const { data } = useQuery({
    queryKey: ["currentPrice"],
    queryFn: () =>
      axios(`https://api.upbit.com/v1/ticker?markets=${market_code}`),
  });

  const currentPrice = data?.data[0].trade_price;
  const currentPriceFormat = `${new Intl.NumberFormat("ko-KR").format(
    currentPrice,
  )} KRW`;

  const [purchasePrice, setPurchasePrice] =
    useRecoilState(tradingPurchasePrice);
  const [orderQuantity, setOrderQuantity] =
    useRecoilState(tradingOrderQuantity);
  const [totalOrderAmount, setTotalOrderAmount] = useRecoilState(
    tradingTotalOrderAmount,
  );

  setPurchasePrice(currentPrice);

  const handlePurchasePrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPurchasePrice(event.target.value);
  };

  const handleOrderQuantity = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOrderQuantity(+event.target.value);
  };

  const handleTotalOrderAmount = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setTotalOrderAmount(+event.target.value);
  };

  useEffect(() => {
    if (orderQuantity !== 0) {
      const totalOrderAmountString = orderQuantity * +purchasePrice;
      setTotalOrderAmount(totalOrderAmountString);
    }
  }, [orderQuantity]);

  useEffect(() => {
    if (totalOrderAmount !== 0) {
      const orderQuantityString = totalOrderAmount / +purchasePrice;
      setOrderQuantity(+orderQuantityString);
    }
  }, [totalOrderAmount]);

  return (
    <section className="bg-white w-[26rem] h-[30rem] rounded-xl border-black-100 border-[3px] px-8 py-8 flex-col items-center">
      <article className="border-black-100 flex items-center justify-between mb-4">
        <button className="bg-yellow-200 w-[10.3rem] h-[3rem] rounded-xl border-black-100 border-[3px] text-white text-lg font-semibold">
          매수
        </button>
        <button className="bg-grey w-[10.3rem] h-[3rem] rounded-xl border-black-100 border-[3px] text-black-100 text-lg font-semibold">
          매도
        </button>
      </article>
      <article className="mb-4">
        <figure className="text-black-200 text-lg py-3.5 border-b border-grey px-1 flex justify-between">
          <div className="flex items-baseline">
            <p>{korean_name}</p>
            <p className="text-black-200 text-xs pl-1">{market}</p>
          </div>
          <div>{currentPriceFormat}</div>
        </figure>
        <figure className="text-black-200 text-lg py-3.5 border-b border-grey px-1 flex justify-between">
          <div>매수가격</div>
          <input
            className="w-36 px-2 pb-0.5 text-right"
            value={new Intl.NumberFormat("ko-KR").format(currentPrice)}
            onChange={handlePurchasePrice}
          />
        </figure>
        <figure className="py-3.5 border-b border-grey px-1 flex justify-between">
          <div className="text-black-200 text-lg">주문수량</div>
          <input
            className="w-36 px-2 pb-0.5 text-right"
            value={orderQuantity}
            onChange={handleOrderQuantity}
          />
        </figure>
        <figure className=" py-3.5 border-b border-grey px-1 flex justify-between">
          <div className="text-black-200 text-lg">주문총액</div>
          <input
            className="w-36 px-2 pb-0.5 text-right"
            value={totalOrderAmount}
            onChange={handleTotalOrderAmount}
          />
        </figure>
      </article>
      <article className="bg-yellow-100 rounded-lg border-black-100 border-[3px] flex justify-around items-center mb-4 pt-1.5 pb-2 text-black-100 text-xs font-[Galmuri11] font-semibold">
        <button>10%</button>
        <button>25%</button>
        <button>50%</button>
        <button>100%</button>
      </article>
      <article className="border-black flex justify-between">
        <button className="bg-yellow-100 w-[7.3rem] h-[3rem] rounded-xl border-black-100 border-[3px] text-black-200 text-base font-[Galmuri11]">
          초기화
        </button>
        <button className="bg-yellow-200 w-[13.3rem] h-[3rem] rounded-xl border-black-100 border-[3px] text-white text-lg font-semibold">
          매수
        </button>
      </article>
    </section>
  );
};

export default Trading;
