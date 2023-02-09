import axios from "axios";
import { useState, useEffect, useReducer } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";

import { coinList } from "@/interface/interface";
import { getCoinData } from "@/api/getCoinData";
import {
  coinResultAtom,
  coinListArrAtom,
  searchInputValue,
  searchedList,
  pageAtom,
} from "@/atoms/atom";

const useSearch = () => {
  const [hasText, setHasText] = useState(false);
  const [inputValue, setInputValue] = useRecoilState(searchInputValue);
  const [coinResult, setCoinResult] = useRecoilState(coinResultAtom);
  const [coinListArr, setCoinListArr] = useRecoilState(coinListArrAtom);
  const setSearchedCoinList = useSetRecoilState(searchedList);
  const [page, setPage] = useRecoilState(pageAtom);

  const initialState = { selectedIndex: 0 };

  const mouseOut = () => {
    state.selectedIndex = 0;
  };

  function reducer(
    state: { selectedIndex: number },
    action: { type: any; payload: any },
  ) {
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

  const useKeyPress = (targetKey: unknown) => {
    const [keyPressed, setKeyPressed] = useState(false);

    useEffect(() => {
      const downHandler = ({ key }: { key: string }) => {
        if (key === targetKey) {
          setKeyPressed(true);
        }
      };
      const upHandler = ({ key }: { key: string }) => {
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
      dispatch({
        type: "arrowUp",
        payload: undefined,
      });
    }
  }, [arrowUpPressed]);

  useEffect(() => {
    if (arrowDownPressed) {
      dispatch({
        type: "arrowDown",
        payload: undefined,
      });
    }
  }, [arrowDownPressed]);

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

  const handleInputChange = async (e: { target: { value: string } }) => {
    setInputValue(e.target.value);
    setHasText(true);
    setCoinResult(coinListArr.filter(el => el.includes(e.target.value)));
  };

  const nameClick = (clickedOption: string) => {
    setInputValue(clickedOption); // 검색어 나타내주는것
    setHasText(false); // 아래 렌더링
    setCoinResult(coinListArr.filter(el => el.includes(clickedOption))); // 검색 결과 렌더링
    coinListSort();
    setPage(1);
  };

  const searchFunction = (e: { key: string }) => {
    if (e.key === "Enter") {
      nameClick(inputValue);
      mouseOut();
    }
  };

  const coinListSort = async () => {
    let data = await getCoinData();
    data = data?.filter(el => coinResult.includes(el.korean_name));
    setSearchedCoinList(data);
  };
  return {
    handleInputChange,
    inputValue,
    searchFunction,
    hasText,
    coinResult,
    nameClick,
    mouseOut,
    state,
    dispatch,
  };
};

export default useSearch;
