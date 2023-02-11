import React from "react";
import useLogInForm from "../../hooks/useLogInForm";
import { RiBitCoinFill } from "react-icons/ri";

export default function EmailLogInForm() {
  const { onSubmitLogIn, form, onChangeForm } = useLogInForm();

  return (
    <form
      autoComplete="off"
      onSubmit={onSubmitLogIn}
      className="w-[30rem] h-[24rem] flex flex-col justify-items-center items-center"
    >
      <RiBitCoinFill className="w-[4rem] h-[4rem] mt-8 text-yellow-200" />
      <div className="w-80 h-12 mb-6 text-3xl text-blue text-center font-[Galmuri7] rounded-lg">
        Log In
      </div>
      <input
        name="email"
        value={form.email}
        onChange={onChangeForm}
        className="w-80 h-14 p-3 font-[Galmuri7] placeholder:text-black-200 text-black text-xl mb-4 border-solid border-[3px] border-black rounded-lg focus:outline-yellow-200  focus:text-yellow-200"
        type="text"
        placeholder="Email"
      />
      <input
        name="password"
        value={form.password}
        onChange={onChangeForm}
        className="w-80 h-14 p-3 font-[Galmuri7] placeholder:text-black-200 text-xl mb-4 border-solid border-[3px] border-black rounded-lg  focus:outline-yellow-200 focus:text-yellow-200"
        type="password"
        placeholder="Password"
      />
      <button
        type="submit"
        className="w-80 h-20 font-[Galmuri7] text-2xl mt-4 border-solid border-[3px] border-black bg-yellow-200 rounded-lg hover:bg-yellow-100 hover:text-3xl"
      >
        Log In
      </button>
    </form>
  );
}
