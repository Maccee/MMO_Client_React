const Ui = ({ currentPlayer }) => {
  return (
    <>
      <div className="ui">
        <p>Use W, A, S, D to move</p>
        <p>{Math.round(currentPlayer.velocity * 10)} km/h</p>

      </div>
    </>
  );
};

export default Ui;
