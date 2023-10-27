import { Avatar } from "@nextui-org/react";
import Link from "next/link";
import React from "react";

const SidebarListItem = ({ item }: any) => {
  return (
    <Link className="link" href={`/?roomId=${item.id}`}>
      <div className="flex p-4 hover:bg-neutral-300 items-center">
        <div className="avatar-container pr-3">
          <Avatar
            src={
              item.photoURL ||
              `https://avatars.dicebear.com/api/jdenticon/${item.id}.svg`
            }
            style={{ width: 45, height: 45 }}
          />
        </div>
        <div className="chat-info">
          <h2>{item.name}</h2>
        </div>
      </div>
    </Link>
  );
};

export default SidebarListItem;
