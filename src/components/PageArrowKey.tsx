import React from "react";
import { useRecoilState } from "recoil";

import { pageAtom } from "@/atoms/atom";
import useCoinList from "@/hooks/useCoinList";

const PageArrowKey = ({ arrow }) => {
  const [page, setPage] = useRecoilState(pageAtom);
  const { numPages } = useCoinList();

  return arrow === "left" ? (
    <button
      className="sm:mx-4 md:mx-8 lg:mx-12 xl:mx-16 text-3xl text-white font-outline-2"
      onClick={() => setPage(page - 1)}
      disabled={page === 1}
    >
      ◀
    </button>
  ) : (
    <button
      className="sm:mx-4 md:mx-8 lg:mx-12 xl:mx-16 text-3xl text-white font-outline-2"
      onClick={() => setPage(page + 1)}
      disabled={page === numPages}
    >
      ▶
    </button>
  );
};

export default PageArrowKey;
