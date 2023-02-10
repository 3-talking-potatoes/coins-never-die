import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { increment } from "firebase/firestore";

import { useRecoilState, useRecoilValue } from "recoil";

import { updateUserData } from "@/hooks/updateUserData";
import {
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
  const userAssetData = useRecoilValue(userUidAssetData);
  const userUid = useRecoilValue(userId);

  let myCash: number;
  if (userAssetData.asset) myCash = +userAssetData.asset.cash;

  const searchParams = useSearchParams();

  const market_code = searchParams.get("market_code");
  const abbreviatedEnglishName = market_code?.split("-")[1];
  const korean_name = searchParams.get("korean_name");
  const market = `${abbreviatedEnglishName}/KRW`;

  const currentPriceFormat = `${new Intl.NumberFormat("ko-KR").format(
    +currentPrice,
  )} KRW`;

  setPurchasePrice(currentPrice?.toString());

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
    if (percent === 10) setTotalOrderAmount((myCash * 0.1).toString());
    if (percent === 25) setTotalOrderAmount((myCash * 0.25).toString());
    if (percent === 50) setTotalOrderAmount((myCash * 0.5).toString());
    if (percent === 100) {
      setTotalOrderAmount((myCash * 0.9995).toString());
    }

    setIsTotalOderAmountChanged(prev => !prev);
  };

  const handleBuy = () => {
    const buyPrice = `asset.data.${abbreviatedEnglishName}.buyPrice`;
    const buyAmount = `asset.data.${abbreviatedEnglishName}.buyAmount`;
    const numberOfShares = `asset.data.${abbreviatedEnglishName}.numberOfShares`;
    const cash = `asset.cash`;

    const isBuyAvailable = myCash >= +totalOrderAmount * 1.0005;
    const purchaseAmount = Math.ceil(+currentPrice * +orderQuantity);

    myCash =
      myCash -
      Number(totalOrderAmount) -
      Math.ceil(Number(totalOrderAmount) * 0.0005);

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
  }, []);

  return {
    korean_name,
    market,
    currentPriceFormat,
    orderQuantity,
    totalOrderAmount,
    handleBuy,
    handlePurchasePrice,
    handleOrderQuantity,
    handleTotalOrderAmount,
    handleTotalOrderAmountPercent,
    initialization,
  };
};

export default useTrading;
