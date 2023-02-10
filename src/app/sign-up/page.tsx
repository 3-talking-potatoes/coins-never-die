"use client";

import React from "react";

import SignUpForm from "@/components/sign-up/SignUpForm";
import Logo from "@/components/Logo";

export default function SignUp() {
  const className = `pl-3 pt-3`;
  return (
    <div className="bg-yellow-100 h-screen">
      <Logo className={className} />
      <SignUpForm />
    </div>
  );
}
