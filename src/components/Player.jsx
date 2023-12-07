import React, { useEffect, useState } from "react";

const Player = ({ id, x, y, color, playerWidth, playerHeight, isNew }) => {
  

  return (
    <div key={id} style={{ position: "relative" }}>
      <div
        className="player"
        style={{
          width: playerWidth,
          height: playerHeight,
          position: "absolute",
          left: x + "px",
          top: y + "px",
          backgroundColor: color,
          animation: isNew ? "spawnAnimation 0.2s ease-out" : "none",
        }}
      />
      <div
        className="playerName"
        style={{
          position: "absolute",
          left: x + "px",
          top: y + "px",
        }}
      >
        {"<" + id + ">"}
      </div>
    </div>
  );
};

export default Player;
