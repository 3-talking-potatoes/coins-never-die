import React from "react";
import useSearch from "@/hooks/useSearch";

const Search = () => {
  const {
    handleInputChange,
    inputValue,
    searchEnter,
    hasText,
    coinResult,
    searchClick,
    mouseOut,
    state,
    dispatch,
  } = useSearch();

  return (
    <div className="mb-1 w-[22rem] sm:w-[34rem] md:w-[36rem] lg:w-[50rem] xl:w-[64rem] flex-none">
      <div className="h-[44px] flex border-2 px-2 sm:px-6 md:px-8 lg:px-10 border-yellow-200 dark:border-purple-200 rounded-lg bg-white ">
        <input
          className="focus:outline-none w-full"
          placeholder="찾고 싶은 코인을 입력하세요"
          onChange={handleInputChange}
          value={inputValue}
          onKeyDown={e => {
            searchEnter(e);
          }}
        ></input>
      </div>
      {hasText ? (
        <ul className="z-10 absolute w-[22rem] sm:w-[34rem] md:w-[36rem] lg:w-[50rem] xl:w-[64rem] items-center justify-start border-2 border-yellow-200 dark:border-purple-200 rounded-lg bg-white">
          {coinResult.map((el, index) => (
            <li
              id={index.toString()}
              className={`flex list-none h-8 px-2 sm:px-6 md:px-8 lg:px-10 items-center ${
                index === state.selectedIndex ? "bg-grey" : "bg-white"
              } `}
              role="presentation"
              onClick={() => {
                searchClick(el);
                mouseOut();
              }}
              onMouseOver={() => dispatch({ type: "select", payload: index })}
              onMouseOut={() => mouseOut()}
              key={index}
              tabIndex={0}
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
