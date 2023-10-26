"use client";
import { ExitToApp } from "@mui/icons-material";
import { Avatar, Button } from "@nextui-org/react";
import React from "react";

const Sidebar = ({ user }) => {
  return (
    <main className="sidebar">
      {/* Header */}
      <div className="">
        <div className="items-center grid grid-cols-6 p-2 border-b-2 bg-neutral-50">
          {/* <Avatar src={user?.photoURL} alt={user?.displayName}/> */}
          <Avatar src={user?.photoURL} alt={user?.displayName} />
          <h4 className="col-span-3">{user?.displayName}</h4>

          <div className="col-start-6">
            <Button isIconOnly>
              <ExitToApp />
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Sidebar;
