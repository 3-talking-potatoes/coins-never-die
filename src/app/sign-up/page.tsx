"use client";

import React from "react";

import SignUpForm from "@/components/sign-up/SignUpForm";
import Logo from "@/components/Logo";

export default function SignUp() {
  const className = `pl-3 pt-3`;
  return (
    <div className="bg-yellow-100 dark:bg-purple-100 h-screen overflow-x-hidden scrollbar-hide flex flex-col">
      <div>
        <Logo className={className} />
      </div>
      <div className="w-screen mt-auto mb-auto">
        <SignUpForm />
      </div>
    </div>
  );
}
