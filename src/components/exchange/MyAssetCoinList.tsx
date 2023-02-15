"use client";

import { useEffect, useState } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import axios from "axios";

import useInterval from "@/hooks/useInterval";
import {
  userUidAssetData,
  myAssetIsCoinListClick,
  myAssetClickedCoinListId,
} from "@/atoms/atom";
import { IDetailInfo } from "@/interface/interface";

import { RiBitCoinFill } from "react-icons/ri";

const MyAssetCoinList = () => {
  const userAssetData = useRecoilValue(userUidAssetData);
  const [isCoinListClick, setIsCoinListClick] = useRecoilState(
    myAssetIsCoinListClick,
  );
  const [clickedCoinListId, setClickedCoinListId] = useRecoilState(
    myAssetClickedCoinListId,
  );

  const [myAssetCoin, setMyAssetCoin] = useState<IDetailInfo[]>([]);

  let currentPrice: number = 0;
  let coinsListNameArray = [];

  for (let coin in userAssetData.asset?.data) {
    coinsListNameArray.push(`KRW-${coin}`);
  }

  let coinListName = coinsListNameArray.join(",");

  const handleMyAssetCoin = async () => {
    if (coinListName) {
      try {
        const response = await axios.get(
          `https://api.upbit.com/v1/ticker?markets=${coinListName}`,
        );
        setMyAssetCoin([...response.data]);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleCoinListClick = (id: number) => {
    setIsCoinListClick(prev => !prev);
    setClickedCoinListId(id);
  };

  useEffect(() => {
    handleMyAssetCoin();
  }, [coinListName]);

  useInterval(handleMyAssetCoin, 1000);

  return (
    <div>
      {userAssetData.asset?.data &&
        Object.entries(userAssetData.asset.data).map(([name, value], index) => {
          const filteredCoin = myAssetCoin.filter(
            el => el.market === `KRW-${name}`,
          );

          currentPrice = +filteredCoin[0]?.trade_price;

          const averagePurchasePrice = Math.round(
            value.buyAmount / value.numberOfShares,
          );
          const equitiesValue = Math.round(
            +currentPrice * value.numberOfShares,
          );

          const equitiesProfitOrLoss: number = equitiesValue - value.buyAmount;
          const earningRate = (
            (equitiesProfitOrLoss / value.buyAmount) *
            100
          ).toFixed(2);

          return (
            <div key={name}>
              <figure
                className="h-12 px-2.5 pt-1 border-b border-grey"
                onClick={() => handleCoinListClick(index)}
              >
                <div className="flex items-center">
                  <RiBitCoinFill className="text-4xl text-yellow-coin w-[10%]" />
                  <p className="w-[30%] flex justify-center">{name}</p>
                  <p className="w-[30%] flex justify-center">
                    {new Intl.NumberFormat("ko-KR").format(
                      equitiesProfitOrLoss,
                    )}
                  </p>
                  <p className="w-[30%] flex justify-center">{earningRate}%</p>
                </div>
              </figure>
              {isCoinListClick && clickedCoinListId === index && (
                <figure>
                  <div className="flex py-1">
                    <div className="w-1/2 flex flex-col items-end px-2.5">
                      <p>{`${value.numberOfShares} ${name}`}</p>
                      <p>보유수량</p>
                    </div>
                    <div className="w-1/2 flex flex-col items-end px-2.5">
                      <p>{`${new Intl.NumberFormat("ko-KR").format(
                        averagePurchasePrice,
                      )} KRW`}</p>
                      <p>매수평균가</p>
                    </div>
                  </div>
                  <div className="flex py-1">
                    <div className="w-1/2 flex flex-col items-end px-2.5">
                      <p>{`${new Intl.NumberFormat("ko-KR").format(
                        equitiesValue,
                      )} KRW`}</p>
                      <p>평가금액</p>
                    </div>
                    <div className="w-1/2 flex flex-col items-end px-2.5">
                      <p>{`${new Intl.NumberFormat("ko-KR").format(
                        value.buyAmount,
                      )} KRW`}</p>
                      <p>매수금액</p>
                    </div>
                  </div>
                </figure>
              )}
            </div>
          );
        })}
    </div>
  );
};

export default MyAssetCoinList;
