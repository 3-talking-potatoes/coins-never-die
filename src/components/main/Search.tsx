import React from "react";
import useSearch from "@/hooks/useSearch";

const Search = () => {
  const {
    handleInputChange,
    inputValue,
    searchFunction,
    hasText,
    coinResult,
    nameClick,
    mouseOut,
    state,
    dispatch,
  } = useSearch();

  return (
    <div className="mb-2 sm:w-[38rem] md:w-[40rem] lg:w-[54rem] xl:w-[68rem] flex-none">
      <div className="sm:h-[2.5rem] md:h-[2.5rem] lg:h-[2.5rem] xl:h-[3rem] flex border-2 px-4 border-yellow-200 rounded-lg bg-white ">
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
        <ul className="z-10 absolute sm:w-[38rem] md:w-[40rem] lg:w-[54rem] xl:w-[68rem] items-center justify-start border-2 border-yellow-200 rounded-lg bg-white">
          {coinResult.map((el, index) => (
            <li
              id={index.toString()}
              className={`flex list-none h-8 px-10 items-center ${
                index === state.selectedIndex ? "bg-grey" : "bg-white"
              } `}
              role="presentation"
              onClick={() => {
                nameClick(el);
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
