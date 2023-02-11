import React from "react";

import useSocialLogInProvider from "@/hooks/useSocialLogInProvider";

const SocialLogInButton = ({
  name,
  children,
}: {
  name: string;
  children: React.ReactNode;
}) => {
  const { onClickSocialLogIn } = useSocialLogInProvider();

  return (
    <button
      name={name}
      onClick={onClickSocialLogIn}
      type="button"
      className="w-fit h-8 flex flex-row items-center hover:text-yellow-200"
    >
      {children}
    </button>
  );
};

export default SocialLogInButton;
