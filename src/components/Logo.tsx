import Image from "next/image";
import Link from "next/link";

const Logo = ({ className }: { className: string }) => {
  return (
    <div className=" bg-yellow-100 dark:bg-purple-100">
      <Link
        href="/"
        className={`flex flex-row align-middle justify-center w-fit ${className}`}
      >
        <Image
          src="/cndIcon.png"
          alt="icon"
          width="38"
          height="28"
          className="pr-1 pt-[7px]"
        />
        <p className="text-3xl mt-1.5 text-blue font-[Galmuri7] font-extrabold text-center rounded-lg">
          Coins Never Die
        </p>
      </Link>
    </div>
  );
};

export default Logo;
