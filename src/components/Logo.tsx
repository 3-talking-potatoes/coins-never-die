import Link from "next/link";
import { RiBitCoinFill } from "react-icons/ri";

const Logo = ({ className }: { className: string }) => {
  return (
    <div className=" bg-yellow-100 dark:bg-purple-100">
      <Link
        href="/"
        className={`flex flex-row align-middle justify-center w-fit ${className}`}
      >
        <RiBitCoinFill className="w-12 h-12 pr-1 text-yellow-coin dark:text-purple-coin" />
        <p className="text-3xl mt-1.5 text-blue font-[Galmuri7] font-extrabold text-center rounded-lg">
          Coins Never Die
        </p>
      </Link>
    </div>
  );
};

export default Logo;
