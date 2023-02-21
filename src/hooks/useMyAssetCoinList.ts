import { useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { useRecoilValue, useRecoilState } from "recoil";
import axios from "axios";

import {
  userUidAssetData,
  myAssetIsCoinListClick,
  myAssetClickedCoinListId,
} from "@/atoms/atom";
import { IDetailInfo } from "@/interface/interface";

const useMyAssetCoinList = () => {
  const userAssetData = useRecoilValue(userUidAssetData);
  const [isCoinListClick, setIsCoinListClick] = useRecoilState(
    myAssetIsCoinListClick,
  );
  const [clickedCoinListId, setClickedCoinListId] = useRecoilState(
    myAssetClickedCoinListId,
  );
  const [myAssetCoin, setMyAssetCoin] = useState<IDetailInfo[]>([]);

  const coinsNameListArray = [];
  for (const coin in userAssetData.asset?.data) {
    coinsNameListArray.push(`KRW-${coin}`);
  }
  const coinNameList = coinsNameListArray.join(",");

  const { data } = useQuery({
    queryKey: ["MyAssetCurrentPrice"],
    queryFn: async () =>
      await axios(`https://api.upbit.com/v1/ticker?markets=${coinNameList}`),

    enabled: !!coinNameList,
    refetchInterval: 30000,
  });

  const handleCoinListClick = (id: number) => {
    setIsCoinListClick(prev => !prev);
    setClickedCoinListId(id);
  };

  useEffect(() => {
    if (data) setMyAssetCoin(data.data);
  }, [data]);

  return {
    userAssetData,
    isCoinListClick,
    clickedCoinListId,
    myAssetCoin,
    handleCoinListClick,
  };
};

export default useMyAssetCoinList;
