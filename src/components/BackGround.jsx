import Player from "./Player";

const BackGround = ({ players }) => {
  return (
    <div className="bg">
      {Object.entries(players).map(([id, player]) => (
        <Player
          key={id}
          id={id}
          x={player.x}
          y={player.y}
          color={player.color}
          
        />
      ))}
    </div>
  );
};

export default BackGround;
