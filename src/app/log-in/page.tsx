"use client";

import Logo from "@/components/Logo";
import LogInForm from "@/components/LogInForm";

export default function LogIn() {
  const className = `pl-3 pt-3`;
  return (
    <div className="bg-yellow-100 h-screen">
      <Logo className={className} />
      <LogInForm />
    </div>
  );
}
