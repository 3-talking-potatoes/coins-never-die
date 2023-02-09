"use client";

import React from "react";

import SignUpForm from "@/components/SignUpForm";
import Logo from "@/components/Logo";

export default function SignUp() {
  return (
    <div className="bg-yellow-100 h-screen">
      <Logo />
      <SignUpForm />
    </div>
  );
}
