"use client";

import Login from "./src/components/Login";
import useAuthUser from "./src/hooks/useAuthUser";

export default function Home() {
  useAuthUser();
  return (
    <main>
      <Login />
    </main>
  );
}
