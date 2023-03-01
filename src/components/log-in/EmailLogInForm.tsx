import React from "react";
import useLogInForm from "../../hooks/useLogInForm";

export default function EmailLogInForm() {
  const { onSubmitLogIn, form, onChangeForm } = useLogInForm();

  return (
    <form
      autoComplete="off"
      onSubmit={onSubmitLogIn}
      className="w-[22rem] h-[12rem] flex flex-col justify-items-center items-center"
    >
      <input
        name="email"
        value={form.email}
        onChange={onChangeForm}
        className="w-[17rem] md:w-[20rem] h-12 p-3 font-[Galmuri7] placeholder:text-black-200 text-black text-xl mb-4 border-solid border-[3px] border-black rounded-lg focus:outline-yellow-200 focus:dark:outline-purple-200 focus:text-yellow-200 focus:dark:text-purple-200"
        type="text"
        placeholder="Email"
      />
      <input
        name="password"
        value={form.password}
        onChange={onChangeForm}
        className="w-[17rem] md:w-[20rem] h-12 p-3 font-[Galmuri7] placeholder:text-black-200 text-xl mb-4 border-solid border-[3px] border-black rounded-lg  focus:outline-yellow-200 focus:dark:outline-purple-200 focus:text-yellow-200 focus:dark:text-purple-200"
        type="password"
        placeholder="Password"
        autoComplete="off"
      />
      <button
        type="submit"
        className="w-[17rem] md:w-[20rem] h-12 font-[Galmuri7] text-2xl mt-2 border-solid border-[3px] border-black bg-yellow-200 dark:bg-purple-200 rounded-lg hover:bg-yellow-100 hover:dark:bg-purple-100 hover:text-3xl"
      >
        Log In
      </button>
    </form>
  );
}
