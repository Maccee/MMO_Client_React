const Ui = ({ currentPlayer }) => {
    
  return (
    <>
      <div className="ui">
        <p>Use W, A, S, D to move</p>
        <p>{currentPlayer.velocity}</p>
      </div>
    </>
  );
};

export default Ui;
