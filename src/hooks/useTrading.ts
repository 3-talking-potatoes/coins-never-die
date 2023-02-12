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

  const searchParams = useSearchParams();

  const market_code = searchParams.get("market_code");
  const abbreviatedEnglishName = market_code?.split("-")[1];
  const korean_name = searchParams.get("korean_name");
  const market = `${abbreviatedEnglishName}/KRW`;

  const currentPriceFormat = `${new Intl.NumberFormat("ko-KR").format(
    +currentPrice,
  )} KRW`;

  const numberOfShares =
    userAssetData.asset?.data[abbreviatedEnglishName].numberOfShares;
  const equitiesValue = Math.round(+currentPrice * numberOfShares);

  setPurchasePrice(currentPrice?.toString());

  let myCash: number;
  if (userAssetData.asset) myCash = +userAssetData.asset.cash;

  let coinsListNameArray: any[] = [];
  for (let coin in userAssetData.asset?.data) {
    coinsListNameArray.push(`KRW-${coin}`);
  }

  const handleIsBuy = () => {
    setIsSell(false);
    setIsBuy(true);
    setOrderQuantity("0");
    setTotalOrderAmount("0");
  };

  const handleIsSell = () => {
    setIsSell(true);
    setIsBuy(false);
    setOrderQuantity("0");
    setTotalOrderAmount("0");
  };

  const handlePurchasePrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPurchasePrice(event.target.value.replace(/[^-\.0-9]/g, ""));
  };

  const handleOrderQuantity = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;

    let splitValue = value.split(".");
    let underDecimal = splitValue[1];
    let int = splitValue[0];

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

  const initialization = () => {
    setTotalOrderAmount("0");
    setOrderQuantity("0");
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
    if (!isUserHaveCoin) return;

    if (isBuy && percent10) setTotalOrderAmount((myCash * 0.1).toString());
    if (isBuy && percent25) setTotalOrderAmount((myCash * 0.25).toString());
    if (isBuy && percent50) setTotalOrderAmount((myCash * 0.5).toString());
    if (isBuy && percent100) setTotalOrderAmount((myCash * 0.9995).toString());

    if (isSellWithCoin && percent10)
      setTotalOrderAmount((equitiesValue * 0.1).toString());
    if (isSellWithCoin && percent25)
      setTotalOrderAmount((equitiesValue * 0.25).toString());
    if (isSellWithCoin && percent50)
      setTotalOrderAmount((equitiesValue * 0.5).toString());
    if (isSellWithCoin && percent100)
      setTotalOrderAmount((equitiesValue * 1).toString());

    setIsTotalOderAmountChanged(prev => !prev);
  };

  const handleBuy = () => {
    const buyPrice = `asset.data.${abbreviatedEnglishName}.buyPrice`;
    const buyAmount = `asset.data.${abbreviatedEnglishName}.buyAmount`;
    const numberOfShares = `asset.data.${abbreviatedEnglishName}.numberOfShares`;
    const cash = `asset.cash`;

    const isBuyAvailable = myCash >= +totalOrderAmount * 1.0005;
    const purchaseAmount = Math.ceil(+currentPrice * +orderQuantity);
    const commission = Math.ceil(Number(totalOrderAmount) * 0.0005);

    myCash = myCash - Number(totalOrderAmount) - commission;

    const data = {
      [buyPrice]: currentPrice,
      [buyAmount]: increment(+purchaseAmount),
      [numberOfShares]: increment(+orderQuantity),
      [cash]: myCash,
    };

    if (isBuyAvailable) {
      alert("매수 성공!");
      updateUserData(userUid, data);
    } else alert("주문가능 금액이 부족합니다");
  };

  console.log(
    totalOrderAmount,
    equitiesValue,
    +totalOrderAmount <= equitiesValue,
  );

  const handleSell = () => {
    const buyAmount = `asset.data.${abbreviatedEnglishName}.buyAmount`;
    const numberOfShares = `asset.data.${abbreviatedEnglishName}.numberOfShares`;
    const cash = `asset.cash`;

    const saleAmount = Math.ceil(+currentPrice * +orderQuantity);
    const commission = Math.ceil(saleAmount * 0.0005);

    const isSaleAvailable = +totalOrderAmount <= equitiesValue;

    myCash = myCash + saleAmount - commission;

    const data = {
      [buyAmount]: increment(saleAmount * -1),
      [numberOfShares]: increment(+orderQuantity * -1),
      [cash]: myCash,
    };

    if (isSaleAvailable) {
      alert("매도 성공!");
      updateUserData(userUid, data);
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
    if (totalOrderAmount !== "") {
      const orderQuantityString = (+totalOrderAmount / +purchasePrice)
        .toFixed(8)
        .toString();
      setOrderQuantity(orderQuantityString);
    } else setOrderQuantity("0");
  }, [isTotalOderAmountChanged]);

  useEffect(() => {
    initialization();
    setIsBuy(true);
    setIsSell(false);
  }, []);

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
