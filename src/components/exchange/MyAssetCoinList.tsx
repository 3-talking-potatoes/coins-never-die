/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import useMyAssetCoinList from "@/hooks/useMyAssetCoinList";

import { RiBitCoinFill } from "react-icons/ri";

const MyAssetCoinList = () => {
  const {
    userAssetData,
    clickedCoinListId,
    myAssetCoin,
    handleCoinListClick,
    isCoinListClick,
  } = useMyAssetCoinList();

  return (
    <div>
      {userAssetData.asset?.data &&
        Object.entries(userAssetData.asset.data).map(([name, value], index) => {
          const quantity = value.numberOfShares;
          const purchaseAmount = value.buyAmount;
          const filteredCoin = myAssetCoin.filter(
            el => el.market === `KRW-${name}`,
          );
          const currentPrice = +filteredCoin[0]?.trade_price;

          const fixedQuantity = quantity.toFixed(8);
          const averagePurchasePrice = Math.ceil(purchaseAmount / quantity);
          const equitiesValue = Math.floor(+currentPrice * quantity);
          const equitiesProfitOrLoss: number = equitiesValue - purchaseAmount;
          const earningRate = (
            (equitiesProfitOrLoss / purchaseAmount) *
            100
          ).toFixed(2);

          const purchaseAmountFormat = `${new Intl.NumberFormat("ko-KR").format(
            purchaseAmount,
          )} KRW`;
          const quantityFormat = `${fixedQuantity} ${name}`;
          const averagePurchasePriceFormat = `${new Intl.NumberFormat(
            "ko-KR",
          ).format(averagePurchasePrice)} KRW`;
          const equitiesValueFormat = `${new Intl.NumberFormat("ko-KR").format(
            equitiesValue,
          )} KRW`;
          const equitiesProfitOrLossFormat = new Intl.NumberFormat(
            "ko-KR",
          ).format(equitiesProfitOrLoss);

          if (quantity !== 0) {
            return (
              <div key={name}>
                <figure
                  className="h-12 px-2.5 pt-1 border-b border-grey hover:cursor-pointer"
                  onClick={() => handleCoinListClick(index)}
                >
                  <div className="flex items-center">
                    <RiBitCoinFill className="text-4xl text-yellow-coin dark:text-purple-coin w-[10%]" />
                    <p className="w-[30%] flex justify-center">{name}</p>
                    <p
                      className={`${
                        equitiesProfitOrLoss > 0
                          ? "w-[30%] flex justify-center text-red"
                          : "w-[30%] flex justify-center text-blue"
                      }`}
                    >
                      {equitiesProfitOrLossFormat}
                    </p>
                    <p
                      className={`${
                        equitiesProfitOrLoss > 0
                          ? "w-[30%] flex justify-center text-red"
                          : "w-[30%] flex justify-center text-blue"
                      }`}
                    >
                      {earningRate}%
                    </p>
                  </div>
                </figure>
                {isCoinListClick && clickedCoinListId === index && (
                  <figure className="text-sm border-b border-grey">
                    <div className="flex py-2">
                      <div className="w-1/2 flex flex-col items-end px-2.5">
                        <p>{quantityFormat}</p>
                        <p className="font-bold pt-1">보유수량</p>
                      </div>
                      <div className="w-1/2 flex flex-col items-end px-2.5">
                        <p className="pr-2">{averagePurchasePriceFormat}</p>
                        <p className="pr-2 font-bold pt-1">매수평균가</p>
                      </div>
                    </div>
                    <div className="flex py-2">
                      <div className="w-1/2 flex flex-col items-end px-2.5">
                        <p>{equitiesValueFormat}</p>
                        <p className="font-bold pt-1">평가금액</p>
                      </div>
                      <div className="w-1/2 flex flex-col items-end px-2.5">
                        <p className="pr-2">{purchaseAmountFormat}</p>
                        <p className="pr-2 font-bold pt-1">매수금액</p>
                      </div>
                    </div>
                  </figure>
                )}
              </div>
            );
          }
        })}
    </div>
  );
};

export default MyAssetCoinList;
