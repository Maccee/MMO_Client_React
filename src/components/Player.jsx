import CarSvg from "./CarSvg";

const Player = ({
  id,
  x,
  y,
  color,
  playerWidth,
  playerHeight,
  isNew,
  rotation,
}) => {
  return (
    <div key={id} style={{ position: "relative" }}>
      <div
        className="player"
        style={{
          left: `calc(${x}px - 25px)`, // Adjusting X to center
          top: `calc(${y}px - 25px)`, // Adjusting Y to center
          color: color,
          animation: isNew ? "spawnAnimation 0.2s ease-out" : "none",
          transform: `translate(0%, 0%) rotate(${rotation}deg)`, // Combine rotate with translate
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
