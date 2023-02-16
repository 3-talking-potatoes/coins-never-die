/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { increment } from "firebase/firestore";

import { useRecoilState, useRecoilValue } from "recoil";

import { updateUserData } from "@/hooks/updateUserData";
import {
  tradingIsBuy,
  tradingIsSell,
  tradingOrderQuantity,
  tradingPurchasePrice,
  tradingTotalOrderAmount,
  tradingIsOrderQuantityChanged,
  tradingIsTotalOderAmountChanged,
  userId,
  userUidAssetData,
} from "@/atoms/atom";
import { IcurrentPrice } from "@/interface/interface";

const useTrading = ({ currentPrice }: { currentPrice: IcurrentPrice }) => {
  const [purchasePrice, setPurchasePrice] =
    useRecoilState(tradingPurchasePrice);
  const [orderQuantity, setOrderQuantity] =
    useRecoilState(tradingOrderQuantity);
  const [totalOrderAmount, setTotalOrderAmount] = useRecoilState(
    tradingTotalOrderAmount,
  );
  const [isOrderQuantityChanged, setIsOrderQuantityChanged] = useRecoilState(
    tradingIsOrderQuantityChanged,
  );
  const [isTotalOderAmountChanged, setIsTotalOderAmountChanged] =
    useRecoilState(tradingIsTotalOderAmountChanged);
  const [isBuy, setIsBuy] = useRecoilState(tradingIsBuy);
  const [isSell, setIsSell] = useRecoilState(tradingIsSell);
  const userAssetData = useRecoilValue(userUidAssetData);
  const userUid = useRecoilValue(userId);
  let fullOrderQuantity = +totalOrderAmount / +purchasePrice;

  const searchParams = useSearchParams();

  const market_code = searchParams.get("market_code");
  const abbreviatedEnglishName = market_code?.split("-")[1]!;
  const korean_name = searchParams.get("korean_name");
  const market = `${abbreviatedEnglishName}/KRW`;

  const currentPriceFormat = `${new Intl.NumberFormat("ko-KR").format(
    +currentPrice,
  )} KRW`;

  const numberOfShares =
    userAssetData.asset?.data[abbreviatedEnglishName]?.numberOfShares;
  // const equitiesValue = Math.round(+currentPrice * numberOfShares);

  setPurchasePrice(currentPrice?.toString());

  let myCash: number;
  if (userAssetData.asset) myCash = +userAssetData.asset.cash;

  const coinsListNameArray: any[] = [];
  for (const coin in userAssetData.asset?.data) {
    coinsListNameArray.push(`KRW-${coin}`);
  }

  const initialization = () => {
    setTotalOrderAmount("0");
    setOrderQuantity("0");
  };

  const handleIsBuy = () => {
    setIsSell(false);
    setIsBuy(true);
    initialization();
  };

  const handleIsSell = () => {
    setIsSell(true);
    setIsBuy(false);
    initialization();
  };

  const handlePurchasePrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPurchasePrice(event.target.value.replace(/[^-\.0-9]/g, ""));
  };

  const handleOrderQuantity = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;

    const splitValue = value.split(".");
    let underDecimal = splitValue[1];
    const int = splitValue[0];

    setIsOrderQuantityChanged(prev => !prev);

    if (underDecimal && underDecimal.length > 8) {
      underDecimal = underDecimal.slice(0, 8);
      value = `${int}.${underDecimal}`;
      setOrderQuantity(value.replace(/[^0-9.]/g, ""));
    } else setOrderQuantity(value.replace(/[^0-9.]/g, ""));
  };

  const handleTotalOrderAmount = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setIsTotalOderAmountChanged(prev => !prev);

    setTotalOrderAmount(event.target.value.replace(/[^0-9]/g, ""));
  };

  const handleTotalOrderAmountPercent = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    const percent = Number((event.target as HTMLButtonElement).id);
    const percent10 = percent === 10;
    const percent25 = percent === 25;
    const percent50 = percent === 50;
    const percent100 = percent === 100;

    const isUserHaveCoin = coinsListNameArray.includes(market_code);
    const isSellWithCoin = isSell && isUserHaveCoin;

    if (!userUid) return;
    if (isSell && !isUserHaveCoin) return;

    if (isBuy && percent10)
      setTotalOrderAmount(Math.ceil(myCash * 0.1).toString());
    if (isBuy && percent25)
      setTotalOrderAmount(Math.ceil(myCash * 0.25).toString());
    if (isBuy && percent50)
      setTotalOrderAmount(Math.ceil(myCash * 0.5).toString());
    if (isBuy && percent100)
      setTotalOrderAmount(Math.ceil(myCash * 0.9995).toString());

    if (isSellWithCoin && percent10)
      setTotalOrderAmount(
        Math.floor(numberOfShares * +currentPrice * 0.1).toString(),
      );
    if (isSellWithCoin && percent25)
      setTotalOrderAmount(
        Math.floor(numberOfShares * +currentPrice * 0.25).toString(),
      );
    if (isSellWithCoin && percent50)
      setTotalOrderAmount(
        Math.floor(numberOfShares * +currentPrice * 0.5).toString(),
      );
    if (isSellWithCoin && percent100) {
      setTotalOrderAmount(
        Math.floor(numberOfShares * +currentPrice * 1).toString(),
      );
    }

    setIsTotalOderAmountChanged(prev => !prev);
  };

  const handleSell = () => {
    const buyAmountKey = `asset.data.${abbreviatedEnglishName}.buyAmount`;
    const numberOfSharesKey = `asset.data.${abbreviatedEnglishName}.numberOfShares`;
    const cashKey = `asset.cash`;

    const saleAmount = +currentPrice * +orderQuantity;
    const commission = Math.ceil(saleAmount * 0.0005);

    const isSaleAvailable = fullOrderQuantity <= +numberOfShares;

    myCash = myCash + saleAmount - commission;

    let data = {
      [buyAmountKey]: increment(saleAmount * -1),
      [numberOfSharesKey]: increment(+fullOrderQuantity * -1),
      [cashKey]: myCash,
    };

    if (numberOfShares === fullOrderQuantity) {
      console.log("먹니??");
      data = {
        [buyAmountKey]: 0,
        [numberOfSharesKey]: increment(+fullOrderQuantity * -1),
        [cashKey]: myCash,
      };
    }

    if (totalOrderAmount === "0") return alert("매도수량을 입력해주세요");
    if (isSaleAvailable) {
      alert("매도 성공!");
      updateUserData(userUid, data);
      initialization();
    } else alert("주문가능 금액이 부족합니다");
  };

  useEffect(() => {
    if (orderQuantity !== "") {
      const totalOrderAmountString = Math.ceil(
        +orderQuantity * +purchasePrice,
      ).toString();
      setTotalOrderAmount(totalOrderAmountString);
    } else setTotalOrderAmount("0");
  }, [isOrderQuantityChanged]);

  useEffect(() => {
    if (totalOrderAmount !== "" && isBuy) {
      fullOrderQuantity = +totalOrderAmount / +purchasePrice;
      const orderQuantityString = fullOrderQuantity.toFixed(8).toString();
      setOrderQuantity(orderQuantityString);
    } else if (totalOrderAmount !== "" && isSell) {
      const orderQuantityString = numberOfShares.toFixed(8).toString();
      setOrderQuantity(orderQuantityString);
    } else setOrderQuantity("0");
  }, [isTotalOderAmountChanged]);

  useEffect(() => {
    initialization();
    setIsBuy(true);
    setIsSell(false);
  }, []);

  const handleBuy = () => {
    const buyPrice = `asset.data.${abbreviatedEnglishName}.buyPrice`;
    const buyAmount = `asset.data.${abbreviatedEnglishName}.buyAmount`;
    const numberOfShares = `asset.data.${abbreviatedEnglishName}.numberOfShares`;
    const cash = `asset.cash`;

    const isBuyAvailable = myCash >= Math.floor(+totalOrderAmount * 1.0005);
    const purchaseAmount = Math.floor(+currentPrice * +fullOrderQuantity);
    const commission = Math.floor(Number(totalOrderAmount) * 0.0005);

    myCash = myCash - Number(totalOrderAmount) - commission;

    const data = {
      [buyPrice]: currentPrice,
      [buyAmount]: increment(+purchaseAmount),
      [numberOfShares]: increment(fullOrderQuantity),
      [cash]: myCash,
    };

    if (totalOrderAmount === "0") return alert("매수수량을 입력해주세요");
    if (isBuyAvailable) {
      alert("매수 성공!");
      updateUserData(userUid, data);
      initialization();
    } else alert("주문가능 금액이 부족합니다");
  };

  return {
    korean_name,
    market,
    currentPriceFormat,
    orderQuantity,
    totalOrderAmount,
    isBuy,
    isSell,
    handleBuy,
    handleSell,
    handleIsSell,
    handleIsBuy,
    handlePurchasePrice,
    handleOrderQuantity,
    handleTotalOrderAmount,
    handleTotalOrderAmountPercent,
    initialization,
  };
};

export default useTrading;
