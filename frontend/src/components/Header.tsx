"use client";

import UsernameDisplay from "./UsernameDisplay";
import LogoutButton from "./LogoutButton";
import LoginForm from "./LoginForm";

export default function Header() {
  const username = typeof window !== "undefined" ? localStorage.getItem("username") : null;

  return (
    <header className="p-4 border-b flex justify-between items-center">
      <h1 className="text-xl font-bold">Mi App</h1>
      {username ? (
        <div className="flex items-center gap-4">
          <UsernameDisplay />
          <LogoutButton />
        </div>
      ) : (
        <LoginForm />
      )}
    </header>
  );
}
