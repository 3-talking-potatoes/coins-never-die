import { RiBitCoinFill } from "react-icons/ri";

const MyAssets = () => {
  return (
    <div>
      <section className="bg-yellow-200 w-[26rem] h-[30rem] rounded-xl border-white border-[3px] px-8 py-8 flex-col items-center ml-14">
        <article className="bg-white h-[3.1rem] rounded-xl border-black-100 border-[3px] flex justify-around items-center pt-1.5 pb-2 text-black-100 text-lg font-semibold mb-7">
          보유자산
        </article>
        <article className="bg-white h-[6rem] rounded-xl border-black-100 border-[3px] flex-col justify-center mb-4">
          <figure className="h-1/2 px-2.5 pt-1 border-b border-grey">
            <div className="flex items-center">
              <RiBitCoinFill className="text-4xl text-white w-[10%]" />
              <p className="w-[45%] flex justify-center">현금</p>
              <p className="w-[45%] flex justify-center">자산</p>
            </div>
          </figure>
          <figure className="h-1/2 px-2.5 pt-1">
            <div className="flex items-center">
              <RiBitCoinFill className="text-4xl text-yellow-coin w-[10%]" />
              <p className="w-[45%] flex justify-center">KRW</p>
              <p className="w-[45%] flex justify-center">
                {new Intl.NumberFormat("ko-KR").format(100000)}
              </p>
            </div>
          </figure>
        </article>
        <article className="bg-white h-[13.9rem] rounded-xl border-black-100 border-[3px] flex-col justify-center">
          <figure className="h-12 px-2.5 pt-1 border-b border-grey">
            <div className="flex items-center">
              <RiBitCoinFill className="text-4xl text-white w-[10%]" />
              <p className="w-[30%] flex justify-center">코인</p>
              <p className="w-[30%] flex justify-center">평가손익</p>
              <p className="w-[30%] flex justify-center">수익률</p>
            </div>
          </figure>
          <figure className="h-12 px-2.5 pt-1 border-b border-grey">
            <div className="flex items-center">
              <RiBitCoinFill className="text-4xl text-yellow-coin w-[10%]" />
              <p className="w-[30%] flex justify-center">BTC</p>
              <p className="w-[30%] flex justify-center">1,000,000</p>
              <p className="w-[30%] flex justify-center">100%</p>
            </div>
          </figure>
          <figure className="">
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
          </figure>
        </article>
      </section>
    </div>
  );
};

export default MyAssets;
