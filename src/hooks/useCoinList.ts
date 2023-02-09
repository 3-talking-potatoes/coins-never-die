import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRecoilState } from "recoil";

import { getCoinData } from "@/api/getCoinData";
import { searchedList } from "@/atoms/atom";

const useCoinList = () => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState(true);
  const [searchedCoinList, setSearchedCoinList] = useRecoilState(searchedList);

  const { data } = useQuery({
    queryKey: ["coins"],
    queryFn: getCoinData,
    refetchInterval: 60000,
  });

  useEffect(() => {
    setSearchedCoinList(data);
  }, [data]);

  // 페이지네이션용
  const offset = (page - 1) * limit;
  let numPages;
  if (data) numPages = Math.ceil(data.length / limit);

  const listSort = (
    event: React.MouseEvent<HTMLParagraphElement, MouseEvent>,
  ) => {
    const { id } = event?.target as HTMLButtonElement;
    let tempArr = [...searchedCoinList];
    sort
      ? setSearchedCoinList(tempArr.sort((a, b) => (b[id] > a[id] ? -1 : 1)))
      : setSearchedCoinList(tempArr.sort((a, b) => (a[id] > b[id] ? -1 : 1)));
    setSort(!sort);
  };

  return { setPage, page, listSort, searchedCoinList, offset, limit, numPages };
};

export default useCoinList;
