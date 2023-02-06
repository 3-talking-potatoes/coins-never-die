import axios from "axios";
import React, { useState, useEffect, useReducer } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";

import { coinList } from "@/interface/interface";
import { getCoinData } from "@/api/getCoinData";
import {
  coinResultAtom,
  coinListArrAtom,
  searchInputValue,
  searchedList,
} from "@/atoms/atom";

const Search = () => {
  const [hasText, setHasText] = useState(false);
  const [inputValue, setInputValue] = useRecoilState(searchInputValue);
  const [coinResult, setCoinResult] = useRecoilState(coinResultAtom);
  const [coinListArr, setCoinListArr] = useRecoilState(coinListArrAtom);
  const [searchedCoinList, setSearchedCoinList] = useRecoilState(searchedList);

  //
  const initialState = { selectedIndex: 0 };

  const mouseOver = index => {
    state.selectedIndex = index;
  };

  function reducer(state, action) {
    switch (action.type) {
      case "arrowUp":
        return {
          selectedIndex:
            state.selectedIndex !== 0
              ? state.selectedIndex - 1
              : coinResult.length - 1,
        };
      case "arrowDown":
        return {
          selectedIndex:
            state.selectedIndex !== coinResult.length - 1
              ? state.selectedIndex + 1
              : 0,
        };
      case "select":
        return { selectedIndex: action.payload };
      default:
        throw new Error();
    }
  }

  const useKeyPress = targetKey => {
    const [keyPressed, setKeyPressed] = useState(false);

    useEffect(() => {
      const downHandler = ({ key }) => {
        if (key === targetKey) {
          setKeyPressed(true);
        }
      };
      const upHandler = ({ key }) => {
        if (key === targetKey) {
          setKeyPressed(false);
        }
      };

      window.addEventListener("keydown", downHandler);
      window.addEventListener("keyup", upHandler);

      return () => {
        window.removeEventListener("keydown", downHandler);
        window.removeEventListener("keyup", upHandler);
      };
    }, [targetKey]);

    return keyPressed;
  };

  const arrowUpPressed = useKeyPress("ArrowUp");
  const arrowDownPressed = useKeyPress("ArrowDown");
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (arrowUpPressed) {
      dispatch({ type: "arrowUp" });
    }
  }, [arrowUpPressed]);

  useEffect(() => {
    if (arrowDownPressed) {
      dispatch({ type: "arrowDown" });
    }
  }, [arrowDownPressed]);
  //

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
    setCoinResult(coinListArr.filter(el => el.includes(e.target.value)));
  };

  // 검색결과 클릭시 해당 내용으로 검색
  const nameClick = (clickedOption: React.SetStateAction<string>) => {
    setCoinResult([...coinListArr.filter(el => el.includes(clickedOption))]);
    setInputValue(clickedOption);
    setHasText(false);
    coinListSort();
  };

  // 검색창에서 엔터 눌렀을 때 동작하는 함수
  const searchFunction = (e: React.KeyboardEvent<HTMLLIElement>) => {
    if (e.key === "Enter") {
      nameClick(inputValue);
    }
  };

  // data 가공 함수, 가공 후 상태를 다시 false로
  const coinListSort = async () => {
    let data = await getCoinData();
    data = data.filter(el => coinResult.includes(el.korean_name));
    setSearchedCoinList(data);
  };

  return (
    <div className="mb-2">
      <div className="h-12 flex border-2 px-4 border-yellow-200 rounded-lg bg-white ">
        <input
          className="focus:outline-none ml-6 w-full"
          placeholder="찾고 싶은 코인을 입력하세요"
          onChange={handleInputChange}
          value={inputValue}
          onKeyDown={e => {
            searchFunction(e);
          }}
        ></input>
      </div>
      {hasText ? (
        <ul className="z-10 absolute w-[72rem] items-center justify-start border-2 border-yellow-200 rounded-lg bg-white">
          {coinResult.map((el, index) => (
            <li
              className={`flex list-none h-8 px-10 items-center ${
                index === state.selectedIndex ? "bg-grey" : "bg-white"
              } hover:bg-grey`}
              role="presentation"
              onClick={() => nameClick(el)}
              onMouseOver={index => mouseOver(index)}
              key={el}
              aria-pressed={index === state.selectedIndex}
              tabIndex={0}
              // onKeyDown 이벤트 엔터 눌렀을 때, li 내용이 검색어로 등록되게 하기
              onKeyDown={e => {
                if (e.key === "Enter") {
                  dispatch({ type: "select", payload: index });
                }
              }}
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

// 검색 키보드 엔터로 선택

// 마우스 hover했을때와 키보드로 이동 시 상태를 나누어 관리하기

// 정렬 기능 구현
