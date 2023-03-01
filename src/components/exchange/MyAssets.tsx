"use client";

import { useRecoilValue } from "recoil";
import { userUidAssetData, userId } from "@/atoms/atom";
import { useEffect, useState } from "react";

import MyAssetCoinList from "./MyAssetCoinList";

import { RiBitCoinFill } from "react-icons/ri";

const MyAssets = () => {
  const userAssetData = useRecoilValue(userUidAssetData);
  const userUid = useRecoilValue(userId);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  let myCash = 0;
  if (userAssetData.asset) {
    myCash = Math.floor(+userAssetData.asset.cash);
  }

  useEffect(() => {
    setIsLoggedIn(userUid === "" ? true : false);
  }, [userUid]);

  return (
    <div>
      <section className="bg-yellow-200 dark:bg-purple-200 w-[22rem] min-[450px]:w-[26rem] h-[482px] rounded-xl border-white border-[3px] px-8 py-8 flex-col items-center ml-14 max-[910px]:ml-0">
        <article className="bg-white h-[3.1rem] rounded-xl border-black-100 border-[3px] flex justify-around items-center pt-1.5 pb-2 text-black-100 text-lg font-semibold mb-7">
          보유자산
        </article>
        {isLoggedIn ? (
          <article className="bg-white h-[20.9rem] rounded-xl border-black-100 border-[3px] flex-col justify-center overflow-scroll scrollbar-hide">
            <figure className="h-full w-full">
              <div className="h-full w-full flex justify-center items-center">
                <p className="flex justify-center text-lg">
                  로그인이 필요한 서비스입니다
                </p>
              </div>
            </figure>
          </article>
        ) : (
          <>
            <article className="bg-white h-[6rem] rounded-xl border-black-100 border-[3px] flex-col justify-center mb-4">
              <figure className="h-1/2 px-2.5 pt-2 border-b border-grey">
                <div className="flex items-center">
                  <RiBitCoinFill className="text-4xl text-white w-[10%]" />
                  <p className="w-[45%] flex justify-center font-semibold text-[15px]">
                    현금
                  </p>
                  <p className="w-[45%] flex justify-center font-semibold text-[15px]">
                    자산
                  </p>
                </div>
              </figure>
              <figure className="h-1/2 px-2.5 pt-1">
                <div className="flex items-center">
                  <RiBitCoinFill className="text-4xl text-yellow-coin dark:text-purple-coin w-[10%]" />
                  <p className="w-[45%] flex justify-center">KRW</p>
                  <p className="w-[45%] flex justify-center">
                    {new Intl.NumberFormat("ko-KR").format(myCash)}
                  </p>
                </div>
              </figure>
            </article>
            <article className="bg-white h-[13.9rem] rounded-xl border-black-100 border-[3px] flex-col justify-center overflow-scroll scrollbar-hide">
              <figure className="h-12 px-2.5 pt-2 border-b border-grey">
                <div className="flex items-center">
                  <RiBitCoinFill className="text-4xl text-white w-[10%]" />
                  <p className="w-[30%] flex justify-center font-bold text-[15px]">
                    코인
                  </p>
                  <p className="w-[30%] flex justify-center font-bold text-[15px]">
                    평가손익
                  </p>
                  <p className="w-[30%] flex justify-center font-bold text-[15px]">
                    수익률
                  </p>
                </div>
              </figure>
              <MyAssetCoinList />
            </article>
          </>
        )}
      </section>
    </div>
  );
};

export default MyAssets;
