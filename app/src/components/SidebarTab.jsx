import React from "react";

const SidebarTab = ({ onClick, isActive, children }) => {
  return (
    <div onClick={onClick} className={`${isActive ? "" : ""}`}>
      {children}
    </div>
  );
};

export default SidebarTab;
