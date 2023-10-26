"use client";

import Login from "./src/components/Login";
import Sidebar from "./src/components/Sidebar";
import useAuthUser from "./src/hooks/useAuthUser";

export default function Home() {
  const user = useAuthUser();
  console.log(user);
  if (!user) return <Login />;
  return (
    <main className="container">
      <div className="grid grid-cols-12">
        <div className=" col-span-3 bg-neutral-100 border-r-2 border-black h-screen">
          <Sidebar user={user} />
        </div>
      </div>
    </main>
  );
}
