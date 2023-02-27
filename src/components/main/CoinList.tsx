import React from "react";
import Link from "next/link";

import Search from "@/components/main/Search";
import useCoinList from "@/hooks/useCoinList";

const CoinList = () => {
  const { listSort, searchedCoinList, offset, limit, sortId, sortArrow } =
    useCoinList();

  return (
    <div className="w-[22rem] sm:w-[34rem] md:w-[36rem] lg:w-[50rem] xl:w-[64rem] pb-4 flex-none">
      <Search />
      <div>
        <div className="bg-white mb-1 h-[44px] flex flex-row text-base max-sm:pl-4 lg:text-xl font-semibold border-2 justify-around items-center border-yellow-200 dark:border-purple-200 rounded-lg">
          <p className="max-sm:hidden w-16 flex items-center justify-center">
            순위
          </p>
          <div
            className="w-48 flex items-center justify-center  cursor-pointer"
            id="korean_name"
            onClick={e => listSort(e)}
          >
            코인이름
            {sortId === "korean_name" && sortArrow}
          </div>
          <div
            className="w-28 flex items-center justify-center  cursor-pointer"
            id="trade_price"
            onClick={e => listSort(e)}
          >
            현재가
            {sortId === "trade_price" && sortArrow}
          </div>
          <div
            className="w-24 flex items-center justify-center  cursor-pointer"
            id="signed_change_rate"
            onClick={e => listSort(e)}
          >
            변동률
            {sortId === "signed_change_rate" && sortArrow}
          </div>
          <div
            className="max-md:hidden w-28 flex items-center justify-center  cursor-pointer"
            id="acc_trade_price_24h"
            onClick={e => listSort(e)}
          >
            거래대금
            {sortId === "acc_trade_price_24h" && sortArrow}
          </div>
        </div>
        {searchedCoinList &&
          searchedCoinList.slice(offset, offset + limit).map(coin => (
            <Link
              href={{
                pathname: "/exchange",
                query: {
                  market_code: `${coin.market}`,
                  korean_name: `${coin.korean_name}`,
                },
              }}
              key={coin.market}
            >
              <div className="bg-white my-1 h-10 flex flex-row text-sm max-sm:pl-4 lg:text-base border-2 justify-around items-center border-yellow-200 dark:border-purple-200 rounded-lg hover:cursor-pointer group">
                <p className="max-sm:hidden w-16 flex items-center justify-center group-hover:font-bold">
                  {searchedCoinList.indexOf(coin) + 1}
                </p>
                <p className="w-48 flex items-center justify-center group-hover:font-bold">
                  {coin.korean_name}
                </p>
                <p className="w-28 flex items-center justify-center group-hover:font-bold ">
                  {new Intl.NumberFormat("ko-KR").format(coin.trade_price)}
                </p>
                <p
                  className={`w-24 flex items-center justify-center group-hover:font-bold ${
                    coin.signed_change_rate * 100 > 0 ? `text-red` : `text-blue`
                  }`}
                >
                  {(coin.signed_change_rate * 100).toFixed(2)}%
                </p>
                <p className="max-md:hidden w-28 flex items-center justify-center group-hover:font-bold">
                  {new Intl.NumberFormat("ko-KR").format(
                    parseInt((coin.acc_trade_price_24h / 1000000).toString()),
                  )}
                  백만
                </p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default CoinList;
