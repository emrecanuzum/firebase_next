"use client";

import { Add, ExitToApp, Home, Message, PeopleAlt } from "@mui/icons-material";
import { Avatar, Button } from "@nextui-org/react";
import { useState } from "react";
import React from "react";
import SidebarTab from "./SidebarTab";
import SidebarList from "./SidebarList";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/router";
import useRooms from "../hooks/useRooms";
import useUsers from "../hooks/useUsers";
import useChats from "../hooks/useChats";
import { auth, db } from "../utils/firebase";

const tabs = [
  {
    id: 1,
    icon: <Home />,
  },
  {
    id: 2,
    icon: <Message />,
  },
  {
    id: 3,
    icon: <PeopleAlt />,
  },
];

const Sidebar = ({ user }) => {
  const [menu, setMenu] = useState(1);
  const [roomName, setRoomName] = useState("");
  const [isCreatingRoom, setCreatigRoom] = useState(false);
  const rooms = useRooms();
  const users = useUsers(user);
  const chats = useChats(user);
  const data = [
    {
      id: 1,
      name: "John",
      photoURL:
        "https://lh3.googleusercontent.com/a/ACg8ocJvVylQgEHaWqtyvqgwCplMJRK3ds2rbRLfmzKVrCIKCk_Z=s96-c",
    },
  ];

  async function createRoom() {
    if (roomName?.trim()) {
      const roomsRef = collection(db, "rooms");
      const newRoom = await addDoc(roomsRef, {
        name: roomName,
        timestamp: serverTimestamp(),
      });
      setCreatigRoom(false);
      setRoomName("");
      setMenu(2);
      // router.push(`/?roomId=${newRoom.id}`);
    }
  }

  return (
    <main className="sidebar overflow-auto h-screen">
      {/* Header */}
      <div className="addRoom absolute bottom-5 left-5">
        <Button
          onClick={() => setCreatigRoom(true)}
          color="success"
          className=" shadow-xl"
          isIconOnly
        >
          <Add className="text-white" />
        </Button>
      </div>
      <div className="sidebar-main">
        <div className="items-center grid grid-cols-6 p-2 border-b-2 bg-neutral-50">
          {/* <Avatar src={user?.photoURL} alt={user?.displayName}/> */}
          <Avatar src={user?.photoURL} alt={user?.displayName} />
          <h4 className="col-span-3">{user?.displayName}</h4>

          <div className="col-start-6">
            <Button
              onClick={() => auth.signOut()}
              size="sm"
              color="danger"
              isIconOnly
            >
              <ExitToApp />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-3 p-4 border-b-2">
          {tabs.map((tab) => (
            <Button
              className="mx-1"
              key={""}
              onClick={() => setMenu(tab.id)}
              isActive={tab.id === menu}
            >
              <SidebarTab
                key={tab.id}
                onclick={() => setMenu(tab.id)}
                isActive={tab.id === menu}
              >
                <div className="sidebar-menu-home">
                  {tab.icon}
                  <div className="sidebar-menu-line" />
                </div>
              </SidebarTab>
            </Button>
          ))}
        </div>

        {menu === 1 ? (
          <SidebarList title="Chats" data={chats} />
        ) : menu === 2 ? (
          <SidebarList title="Rooms" data={rooms} />
        ) : menu === 3 ? (
          <SidebarList title="Users" data={users} />
        ) : menu === 4 ? (
          <SidebarList title="Search Results" data={data} />
        ) : null}
      </div>

      <Dialog open={isCreatingRoom} onClose={() => setCreatigRoom(false)}>
        <DialogTitle>CREATE ROOM</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Type the name of your public room.
          </DialogContentText>
          <TextField
            onChange={(event) => setRoomName(event.target.value)}
            autoFocus
            margin="dense"
            id="room_name"
            label="Room Name"
            type="text"
            value={roomName}
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button color="danger" onClick={() => setCreatigRoom(false)}>
            Cancel
          </Button>
          <Button color="primary" onClick={createRoom}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </main>
  );
};

export default Sidebar;
