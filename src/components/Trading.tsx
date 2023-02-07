"use client";

import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";

import { useQuery } from "@tanstack/react-query";
import { useRecoilState, useRecoilValue } from "recoil";
import axios from "axios";

import {
  tradingOrderQuantity,
  tradingPurchasePrice,
  tradingTotalOrderAmount,
  myAssetCash,
} from "@/atoms/atom";

const Trading = () => {
  const [purchasePrice, setPurchasePrice] =
    useRecoilState(tradingPurchasePrice);
  const [orderQuantity, setOrderQuantity] =
    useRecoilState(tradingOrderQuantity);
  const [totalOrderAmount, setTotalOrderAmount] = useRecoilState(
    tradingTotalOrderAmount,
  );
  const myCash = useRecoilValue(myAssetCash);

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

  setPurchasePrice(currentPrice);

  const handlePurchasePrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPurchasePrice(event.target.value.replace(/\D/g, ""));
  };

  const handleOrderQuantity = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOrderQuantity(+event.target.value.replace(/\D/g, ""));
  };

  const handleTotalOrderAmount = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setTotalOrderAmount(+event.target.value.replace(/\D/g, ""));
  };

  const initialization = () => {
    setTotalOrderAmount(0);
    setOrderQuantity(0);
  };

  const handleTotalOrderAmountPercent = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    const percent = Number((event.target as HTMLButtonElement).id);
    if (percent === 10) setTotalOrderAmount(myCash * 0.1);
    if (percent === 25) setTotalOrderAmount(myCash * 0.25);
    if (percent === 50) setTotalOrderAmount(myCash * 0.5);
    if (percent === 100) setTotalOrderAmount(myCash * 1.0);
  };

  useEffect(() => {
    if (orderQuantity !== 0) {
      const totalOrderAmountString = +orderQuantity * +purchasePrice;
      setTotalOrderAmount(totalOrderAmountString);
    } else setTotalOrderAmount(0);
  }, [orderQuantity]);

  useEffect(() => {
    if (totalOrderAmount !== 0) {
      const orderQuantityString = +totalOrderAmount / +purchasePrice;
      setOrderQuantity(orderQuantityString);
    } else setOrderQuantity(0);
  }, [totalOrderAmount]);

  useEffect(() => {
    initialization();
  }, []);

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
            value={new Intl.NumberFormat("ko-KR").format(orderQuantity)}
            onChange={handleOrderQuantity}
          />
        </figure>
        <figure className=" py-3.5 border-b border-grey px-1 flex justify-between">
          <div className="text-black-200 text-lg">주문총액</div>
          <input
            className="w-36 px-2 pb-0.5 text-right"
            value={new Intl.NumberFormat("ko-KR").format(totalOrderAmount)}
            onChange={handleTotalOrderAmount}
          />
        </figure>
      </article>
      <article className="bg-yellow-100 rounded-lg border-black-100 border-[3px] flex justify-around items-center mb-4 pt-1.5 pb-2 text-black-100 text-xs font-[Galmuri11] font-semibold">
        <button onClick={handleTotalOrderAmountPercent} id="10">
          10%
        </button>
        <button onClick={handleTotalOrderAmountPercent} id="25">
          25%
        </button>
        <button onClick={handleTotalOrderAmountPercent} id="50">
          50%
        </button>
        <button onClick={handleTotalOrderAmountPercent} id="100">
          100%
        </button>
      </article>
      <article className="border-black flex justify-between">
        <button
          className="bg-yellow-100 w-[7.3rem] h-[3rem] rounded-xl border-black-100 border-[3px] text-black-200 text-base font-[Galmuri11]"
          onClick={initialization}
        >
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
