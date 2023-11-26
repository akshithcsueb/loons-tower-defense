import React from "react";

const Turret = ({ id }) => {
  const dragStart = (e) => {
    e.dataTransfer.setData("text", id);
  };

  const dragOver = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      id={id}
      draggable="true"
      onDragStart={dragStart}
      onDragOver={dragOver}
      style={{
        width: "50px",
        height: "50px",
        backgroundColor: "blue",
        cursor: "pointer",
      }}
    >
      Turret
    </div>
  );
};

export default Turret;
