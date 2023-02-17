/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { getUserData } from "@/hooks/getUserData";
import { userId, userUidAssetData } from "@/atoms/atom";

const useExchange = () => {
  const setUserAssetData = useSetRecoilState(userUidAssetData);
  const userUid = useRecoilValue(userId);

  const searchParams = useSearchParams();

  const market_code = searchParams.get("market_code");

  const { data } = useQuery({
    queryKey: ["TradingCurrentPrice"],
    queryFn: () =>
      axios(`https://api.upbit.com/v1/ticker?markets=${market_code}`),
    refetchInterval: 30000,
  });

  const currentPrice = data?.data[0].trade_price;

  useEffect(() => {
    getUserData(userUid, setUserAssetData);
  }, [data]);

  return { currentPrice };
};

export default useExchange;
