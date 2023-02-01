import { RiBitCoinFill } from "react-icons/ri";

const MyAssets = () => {
  return (
    <div>
      <section className="bg-yellow-200 w-[26rem] h-[30rem] rounded-xl border-white border-[3px] px-8 py-8 flex-col items-center ml-14">
        <article className="bg-white h-[3.1rem] rounded-xl border-black-100 border-[3px] flex justify-around items-center pt-1.5 pb-2 text-black-100 text-lg font-semibold mb-7">
          보유자산
        </article>
        <article className="bg-white h-[6rem] rounded-xl border-black-100 border-[3px] flex-col justify-center mb-6">
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
        <article className="bg-white h-[6rem] rounded-xl border-black-100 border-[3px] flex-col justify-center">
          <figure className="flex justify-around py-2.5 border-b border-grey ">
            <p>코인</p>
            <p>보유(평가금)</p>
            <p>수익률</p>
          </figure>
          <figure></figure>
        </article>
      </section>
    </div>
  );
};

export default MyAssets;
