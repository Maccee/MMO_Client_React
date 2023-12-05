import React, { useEffect, useState } from "react";

const Player = ({ id, x, y, color }) => {
  

  return (
    <div key={id} style={{ position: "relative" }}>
      <div
        className="player"
        style={{
          position: "absolute",
          left: x + "px",
          top: y + "px",
          backgroundColor: color,
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
