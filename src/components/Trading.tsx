"use client";

import { useSearchParams } from "next/navigation";

import { useQuery } from "@tanstack/react-query";

import axios from "axios";

const Trading = () => {
  const searchParams = useSearchParams();

  const market_code = searchParams.get("market_code");
  const abbreviatedEnglishName = market_code?.split("-")[0];
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
        <figure className="text-black-200 text-lg py-3.5 border-b border-grey px-2.5 flex justify-between">
          <div className="flex items-baseline">
            <p>{korean_name}</p>
            <p className="text-black-200 text-xs pl-1">{market}</p>
          </div>
          <div>{currentPriceFormat}</div>
        </figure>
        <figure className="text-black-200 text-lg py-3.5 border-b border-grey px-2.5 flex justify-between">
          <p>가격</p>
          <p>1000</p>
        </figure>
        <figure className="text-black-200 text-lg py-3.5 border-b border-grey px-2.5 flex justify-between">
          <p>수량</p>
          <p>1</p>
        </figure>
        <figure className="text-black-200 text-lg py-3.5 border-b border-grey px-2.5 flex justify-between">
          <p>총액</p>
          <p>1000</p>
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
