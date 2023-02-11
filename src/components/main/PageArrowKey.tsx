import React from "react";
import { useRecoilState } from "recoil";

import { pageAtom } from "@/atoms/atom";

const PageArrowKey = (props: {
  setPage: number;
  disabled: number;
  arrow: string;
}) => {
  const [page, setPage] = useRecoilState(pageAtom);

  return (
    <button
      className="mx-4 md:mx-8 lg:mx-12 text-3xl text-white font-outline-2"
      onClick={() => setPage(page + props.setPage)}
      disabled={page === props.disabled}
    >
      {props.arrow}
    </button>
  );
};

export default PageArrowKey;
