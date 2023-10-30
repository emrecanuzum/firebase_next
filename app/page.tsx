"use client";

import Login from "./src/components/Login";
import Sidebar from "./src/components/Sidebar";
import Chat from "./src/components/Chat";
import useAuthUser from "./src/hooks/useAuthUser";

export default function Home() {
  const user = useAuthUser();

  if (!user) return <Login />;
  return (
    <main className="container mx-auto border-2 border-black">
      <div className="grid grid-cols-12">
        <div className=" col-span-3 bg-neutral-100 border-r-2 border-black h-screen">
          <Sidebar user={user} />
        </div>
        <div className="col-start-4 col-span-12">
          <Chat user={user} />
        </div>
      </div>
    </main>
  );
}
