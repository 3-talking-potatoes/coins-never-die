import Link from "next/link";
import { RiBitCoinFill } from "react-icons/ri";

const Logo = () => {
  return (
    <>
      <Link
        href="/"
        className="flex flex-row align-middle justify-center w-fit"
      >
        <RiBitCoinFill className="w-12 h-12 pr-1 text-yellow-coin" />
        <p className="text-3xl mt-1.5 text-blue font-[Galmuri7] font-extrabold text-center rounded-lg">
          Coins Never Die
        </p>
      </Link>
    </>
  );
};

export default Logo;
