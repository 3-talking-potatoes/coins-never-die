import { RiBitCoinFill } from "react-icons/ri";

const MyAssetCoinList = () => {
  return (
    <div>
      <figure className="h-12 px-2.5 pt-1 border-b border-grey">
        <div className="flex items-center">
          <RiBitCoinFill className="text-4xl text-yellow-coin w-[10%]" />
          <p className="w-[30%] flex justify-center">BTC</p>
          <p className="w-[30%] flex justify-center">1,000,000</p>
          <p className="w-[30%] flex justify-center">100%</p>
        </div>
      </figure>
      {/* <figure>
        <div className="flex py-1">
          <div className="w-1/2 flex flex-col items-end px-2.5">
            <p>10 BTC</p>
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
            <p>1,000,000 KRW</p>
            <p>매수금액</p>
          </div>
        </div>
      </figure> */}
    </div>
  );
};

export default MyAssetCoinList;
