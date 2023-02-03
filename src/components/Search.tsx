import axios from "axios";
import React, { useState, useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";

import { coinList } from "@/interface/interface";
import {
  coinResultAtom,
  coinListArrAtom,
  searchState,
  searchInputValue,
} from "@/atoms/atom";

const Search = () => {
  const [hasText, setHasText] = useState(false);
  const [inputValue, setInputValue] = useRecoilState(searchInputValue);
  const [coinResult, setCoinResult] = useRecoilState(coinResultAtom);
  const [coinListArr, setCoinListArr] = useRecoilState(coinListArrAtom);
  const [searchCoinState, setSearchCoinState] = useRecoilState(searchState);

  useEffect(() => {
    if (inputValue === "") {
      setHasText(false);
    }
  }, [inputValue]);

  useEffect(() => {
    const callCoinListAPI = async () => {
      const options = {
        method: "GET",
        headers: { accept: "application/json" },
      };
      try {
        const response = await axios.get(
          "https://api.upbit.com/v1/market/all?isDetails=false",
          options,
        );
        setCoinListArr(
          response.data
            .filter((el: coinList) => el.market.includes("KRW"))
            .map((value: coinList) => value.korean_name),
        );
      } catch (err) {
        console.log(err);
      }
    };
    callCoinListAPI();
  }, []);

  const handleInputChange = async e => {
    setInputValue(e.target.value);
    setHasText(true);
    setCoinResult(coinListArr.filter(value => value.includes(e.target.value)));
  };

  const nameClick = (clickedOption: React.SetStateAction<string>) => {
    setInputValue(clickedOption);
    setCoinResult([...coinListArr.filter(el => el.includes(clickedOption))]);
    setSearchCoinState(true);
    setHasText(false);
  };

  return (
    <div className="mb-2">
      <div className="h-12 flex border-2 px-4 border-yellow-200 rounded-lg bg-white ">
        <input
          className="focus:outline-none ml-6 w-full"
          placeholder="찾고 싶은 코인을 입력하세요"
          onChange={handleInputChange}
          value={inputValue}
        ></input>
      </div>
      {hasText ? (
        <ul className="z-10 absolute w-[72rem] items-center justify-start border-2 border-yellow-200 rounded-lg bg-white">
          {coinResult.map((el, index) => (
            <li
              className="flex list-none h-8 px-4 ml-6 items-center hover:bg-grey"
              role="presentation"
              key={index}
              onClick={() => nameClick(el)}
            >
              {el}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default Search;

// 검색어 완성 안되도 가능하게
// 검색 키보드로 이동 및 엔터로 선택
// 선택 완료되면 검색창 비우기
// 검색하면 하단 목록 수정하기

// 수정할 점
// 상태가 true가 고정되어서 이후 검색할때마다 하단 바뀌는 점

// data를 렌더링 단계에서 filter를 걸지 말고
// 이름, 현재가, 변동률 정렬 기능이나 검색어 입력 후 데이터 자체를 filter해서 저장 한뒤 그것을 항상 같은 로직으로 map 해주기

// 검색 엔터하면 상태를 true로 바꾸고, 상태를 useEffect 로 psge.tsx에서 관리해서 상태가 변한것을 감지하면 data를 가공 후 다시 상태를 false로 변경
