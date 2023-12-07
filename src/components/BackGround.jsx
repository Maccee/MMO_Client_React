import Player from "./Player";


const BackGround = ({ players, gameArea}) => {
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
          playerWidth={player.size.width}
          playerHeight={player.size.height}
          isNew={player.isNew}
          rotation={player.rotation}
        />
      ))}
      
    </div>
  );
};

export default BackGround;
