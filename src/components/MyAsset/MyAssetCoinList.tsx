"use client";

import { useRecoilValue } from "recoil";

import { userUidAssetData } from "@/atoms/atom";

import { RiBitCoinFill } from "react-icons/ri";

const MyAssetCoinList = () => {
  const userAssetData = useRecoilValue(userUidAssetData);
  console.log(userAssetData.asset?.data);

  // 평가손익

  // 수익률

  // 매수금액
  //   const getPurchaseAmount = () => {

  //   }

  return (
    <div>
      {userAssetData.asset &&
        Object.entries(userAssetData.asset.data).map(([name, value]) => (
          <>
            <figure
              className="h-12 px-2.5 pt-1 border-b border-grey"
              key={name}
            >
              <div className="flex items-center">
                <RiBitCoinFill className="text-4xl text-yellow-coin w-[10%]" />
                <p className="w-[30%] flex justify-center">{name}</p>
                <p className="w-[30%] flex justify-center">{value.buyPrice}</p>
                <p className="w-[30%] flex justify-center">
                  {value.numberOfShares}
                </p>
              </div>
            </figure>
            <figure>
              <div className="flex py-1">
                <div className="w-1/2 flex flex-col items-end px-2.5">
                  <p>{`${value.numberOfShares} ${name}`}</p>
                  <p>보유수량</p>
                </div>
                <div className="w-1/2 flex flex-col items-end px-2.5">
                  <p>100,000 KRW</p>
                  <p>매수평균가</p>
                </div>
              </div>
              <div className="flex py-1">
                <div className="w-1/2 flex flex-col items-end px-2.5">
                  <p>2,000,000 KRW</p>
                  <p>평가금액</p>
                </div>
                <div className="w-1/2 flex flex-col items-end px-2.5">
                  <p>{`${value.buyPrice} KRW`}</p>
                  <p>매수금액</p>
                </div>
              </div>
            </figure>
          </>
        ))}
    </div>
  );
};

export default MyAssetCoinList;
