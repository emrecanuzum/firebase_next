import { CircularProgress } from "@nextui-org/react";
import React from "react";
import SidebarListItem from "./SidebarListItem";

interface ComingProp {
  map: any;
  id: number;
  name: string;
  photoURL: string;
}
[];

const SidebarList = ({ title, data }: { title: string; data: ComingProp }) => {
  if (!data) {
    return (
      <div className="loader-container">
        <CircularProgress></CircularProgress>
      </div>
    );
  }
  return (
    <div className="sidebar-chat-container">
      <h2 className="p-2 text-2xl border-b-2 text-center">{title}</h2>
      {data.map((item: { id: any }) => (
        <SidebarListItem key={item.id} item={item}></SidebarListItem>
      ))}
    </div>
  );
};

export default SidebarList;
