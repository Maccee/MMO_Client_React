import CarSvg from "./CarSvg";

const Player = ({ id, x, y, color, playerWidth, playerHeight, isNew, rotation }) => {
 
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
          color: color,
          animation: isNew ? "spawnAnimation 0.2s ease-out" : "none",
          transform: `rotate(${rotation}deg)`, // Apply rotation
          
        }}
      >
        <CarSvg width={playerWidth} height={playerHeight} fill={color} />
      </div>
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
