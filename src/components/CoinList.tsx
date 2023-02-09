import React from "react";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

import { getCoinData } from "@/api/getCoinData";
import Search from "@/components/Search";
import { coinResultAtom, searchInputValue, searchedList } from "@/atoms/atom";
import { useRecoilState, useRecoilValue } from "recoil";

const CoinList = () => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState(true);
  const offset = (page - 1) * limit;
  const coinResult = useRecoilValue(coinResultAtom);
  const inputValue = useRecoilValue(searchInputValue);
  const [searchedCoinList, setSearchedCoinList] = useRecoilState(searchedList);

  // 리액트 쿼리
  const { status, data, error } = useQuery({
    queryKey: ["coins"],
    queryFn: getCoinData,
    refetchInterval: 60000,
  });

  if (status === "loading") {
    return <span>Loading...</span>;
  }

  if (status === "error") {
    return <span>Error: {(error as Error).message}</span>;
  }

  // 페이지네이션용
  const numPages = Math.ceil(data.length / limit);

  // 정렬 함수
  const sortOrderChange = () => {
    setSort(!sort);
  };

  const listSort = event => {
    const id = event?.target.id;

    if (searchedCoinList.length === 0) {
      let tempArr = [...data];
      console.log(tempArr);
      switch (id) {
        case "name":
          sort
            ? setSearchedCoinList(
                tempArr.sort((a, b) =>
                  b.korean_name > a.korean_name ? -1 : 1,
                ),
              )
            : setSearchedCoinList(
                tempArr.sort((a, b) =>
                  a.korean_name > b.korean_name ? -1 : 1,
                ),
              );
          sortOrderChange();
          break;
        case "currentPrice":
          sort
            ? setSearchedCoinList(
                tempArr.sort((a, b) => b.trade_price - a.trade_price),
              )
            : setSearchedCoinList(
                tempArr.sort((a, b) => a.trade_price - b.trade_price),
              );
          sortOrderChange();
          break;
        case "fluctuationRate":
          sort
            ? setSearchedCoinList(
                tempArr.sort(
                  (a, b) => b.signed_change_rate - a.signed_change_rate,
                ),
              )
            : setSearchedCoinList(
                tempArr.sort(
                  (a, b) => a.signed_change_rate - b.signed_change_rate,
                ),
              );
          sortOrderChange();
          break;
        case "tradePrice":
          sort
            ? setSearchedCoinList(
                tempArr.sort(
                  (a, b) => b.acc_trade_price_24h - a.acc_trade_price_24h,
                ),
              )
            : setSearchedCoinList(
                tempArr.sort(
                  (a, b) => a.acc_trade_price_24h - b.acc_trade_price_24h,
                ),
              );
          sortOrderChange();
          break;
      }
    }

    if (searchedCoinList.length > 0) {
      let tempArr = [...searchedCoinList];
      switch (id) {
        case "name":
          sort
            ? setSearchedCoinList(
                tempArr.sort((a, b) =>
                  b.korean_name > a.korean_name ? -1 : 1,
                ),
              )
            : setSearchedCoinList(
                tempArr.sort((a, b) =>
                  a.korean_name > b.korean_name ? -1 : 1,
                ),
              );
          sortOrderChange();
          break;
        case "currentPrice":
          sort
            ? setSearchedCoinList(
                tempArr.sort((a, b) => b.trade_price - a.trade_price),
              )
            : setSearchedCoinList(
                tempArr.sort((a, b) => a.trade_price - b.trade_price),
              );
          sortOrderChange();
          break;
        case "fluctuationRate":
          sort
            ? setSearchedCoinList(
                tempArr.sort(
                  (a, b) => b.signed_change_rate - a.signed_change_rate,
                ),
              )
            : setSearchedCoinList(
                tempArr.sort(
                  (a, b) => a.signed_change_rate - b.signed_change_rate,
                ),
              );
          sortOrderChange();
          break;
        case "tradePrice":
          sort
            ? setSearchedCoinList(
                tempArr.sort(
                  (a, b) => b.acc_trade_price_24h - a.acc_trade_price_24h,
                ),
              )
            : setSearchedCoinList(
                tempArr.sort(
                  (a, b) => a.acc_trade_price_24h - b.acc_trade_price_24h,
                ),
              );
          sortOrderChange();
          break;
      }
    }
  };

  return (
    <>
      <button
        className="text-3xl text-white font-outline-2"
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
      >
        ◀
      </button>
      <div className="mx-16 w-[72rem]">
        <Search />
        <div>
          <div className="bg-white mb-2 h-12 flex flex-row border-2 justify-around items-center border-yellow-200 rounded-lg">
            <p className="w-12 flex items-center justify-center text-xl font-semibold">
              순위
            </p>
            <p
              className="w-44 flex items-center justify-center text-xl font-semibold cursor-pointer"
              id="name"
              onClick={e => listSort(e)}
            >
              코인이름
            </p>
            <p
              className="w-32 flex items-center justify-center text-xl font-semibold cursor-pointer"
              id="currentPrice"
              onClick={e => listSort(e)}
            >
              현재가
            </p>
            <p
              className="w-32 flex items-center justify-center text-xl font-semibold cursor-pointer"
              id="fluctuationRate"
              onClick={e => listSort(e)}
            >
              변동률
            </p>
            <p
              className="w-40 flex items-center justify-center text-xl font-semibold cursor-pointer"
              id="tradePrice"
              onClick={e => listSort(e)}
            >
              거래대금
            </p>
            <p className="w-16 flex items-center justify-center text-xl font-semibold cursor-pointer">
              그래프
            </p>
          </div>
          {searchedCoinList.length > 0
            ? searchedCoinList.slice(offset, offset + limit).map(coin => (
                <Link
                  href={{
                    pathname: "/buy",
                    query: {
                      market_code: `${coin.market}`,
                      korean_name: `${coin.korean_name}`,
                    },
                  }}
                  key={coin.market}
                >
                  <div className="bg-white my-2 h-12 flex flex-row border-2 justify-around items-center border-yellow-200 rounded-lg hover:cursor-pointer group">
                    <p className="w-12 flex items-center justify-center group-hover:font-semibold">
                      {searchedCoinList.indexOf(coin) + 1}
                    </p>
                    <p className="w-44 flex items-center justify-center group-hover:font-semibold">
                      {coin.korean_name}
                    </p>
                    <p className="w-32 flex items-center justify-center group-hover:font-semibold">
                      {new Intl.NumberFormat("ko-KR").format(coin.trade_price)}
                    </p>
                    <p
                      className={`w-32 flex items-center justify-center group-hover:font-semibold ${
                        coin.signed_change_rate * 100 > 0
                          ? `text-red`
                          : `text-blue`
                      }`}
                    >
                      {(coin.signed_change_rate * 100).toFixed(2)}%
                    </p>
                    <p className="w-40 flex items-center justify-center group-hover:font-semibold">
                      {coin.acc_trade_price_24h}
                    </p>
                    <p className="w-16 flex items-center justify-center group-hover:font-semibold">
                      {coin.change}
                    </p>
                  </div>
                </Link>
              ))
            : data.slice(offset, offset + limit).map(coin => (
                <Link
                  href={{
                    pathname: "/buy",
                    query: {
                      market_code: `${coin.market}`,
                      korean_name: `${coin.korean_name}`,
                    },
                  }}
                  key={coin.market}
                >
                  <div className="bg-white my-2 h-12 flex flex-row border-2 justify-around items-center border-yellow-200 rounded-lg hover:cursor-pointer group">
                    <p className="w-12 flex items-center justify-center group-hover:font-semibold">
                      {data.indexOf(coin) + 1}
                    </p>
                    <p className="w-44 flex items-center justify-center group-hover:font-semibold">
                      {coin.korean_name}
                    </p>
                    <p className="w-32 flex items-center justify-center group-hover:font-semibold">
                      {new Intl.NumberFormat("ko-KR").format(coin.trade_price)}
                    </p>
                    <p
                      className={`w-32 flex items-center justify-center group-hover:font-semibold ${
                        coin.signed_change_rate * 100 > 0
                          ? `text-red`
                          : `text-blue`
                      }`}
                    >
                      {(coin.signed_change_rate * 100).toFixed(2)}%
                    </p>
                    <p className="w-40 flex items-center justify-center group-hover:font-semibold">
                      {coin.acc_trade_price_24h}
                    </p>
                    <p className="w-16 flex items-center justify-center group-hover:font-semibold">
                      {coin.change}
                    </p>
                  </div>
                </Link>
              ))}
        </div>
      </div>
      <button
        className="text-3xl text-white font-outline-2"
        onClick={() => setPage(page + 1)}
        disabled={page === numPages}
      >
        ▶
      </button>
    </>
  );
};

export default CoinList;

// data 상태에 저장하기
// 검색내역이나 정렬 등 하나의 data로 접근 가능해지게
