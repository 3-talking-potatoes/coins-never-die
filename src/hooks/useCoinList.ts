/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRecoilState } from "recoil";

import { getCoinData } from "@/api/getCoinData";
import { searchedListAtom, pageAtom } from "@/atoms/atom";

const useCoinList = () => {
  const [limit, setLimit] = useState(9);
  const [page, setPage] = useRecoilState(pageAtom);
  const [sort, setSort] = useState(true);
  const [searchedCoinList, setSearchedCoinList] =
    useRecoilState(searchedListAtom);

  const { data } = useQuery({
    queryKey: ["coins"],
    queryFn: getCoinData,
    refetchInterval: 60000,
  });

  useEffect(() => {
    setSearchedCoinList(data);
  }, [data]);

  useEffect(() => {
    setPage(1);
  }, []);

  const offset = (page - 1) * limit;
  let numPages;
  if (searchedCoinList) numPages = Math.ceil(searchedCoinList.length / limit);

  const listSort = (
    event: React.MouseEvent<HTMLParagraphElement, MouseEvent>,
  ) => {
    const { id } = event.currentTarget;
    let tempArr;
    if (searchedCoinList) tempArr = [...searchedCoinList];
    sort
      ? setSearchedCoinList(tempArr?.sort((a, b) => (b[id] > a[id] ? -1 : 1)))
      : setSearchedCoinList(tempArr?.sort((a, b) => (a[id] > b[id] ? -1 : 1)));
    setSort(!sort);
  };

  return { setPage, page, listSort, searchedCoinList, offset, limit, numPages };
};

export default useCoinList;
