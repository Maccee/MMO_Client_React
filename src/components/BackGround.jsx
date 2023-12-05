import Player from "./Player";

const BackGround = ({ players, gameArea, playerSize }) => {
  return (
    <div className="bg"
    style={{ width: gameArea.width, height: gameArea.height }}>
      {Object.entries(players).map(([id, player]) => (
        <Player
          key={id}
          id={id}
          x={player.x}
          y={player.y}
          color={player.color}
          playerSize={playerSize}
        />
      ))}
    </div>
  );
};

export default BackGround;
