import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import { handleMovement, computeDirection } from "./utils/MovementUtils"; // Assume handleMovement is your new utility
import BackGround from "./components/BackGround";
import "./App.css";

const socket = io("http://localhost:4000");

const App = () => {
  const [players, setPlayers] = useState({});
  const [gameArea, setGameArea] = useState({ width: 0, height: 0 });
  const [playerSize, setPlayerSize] = useState({ width: 0, height: 0 });
  const movementLoopRef = useRef();

  useEffect(() => {
    alert("Use W, A, S, D to move");
    // Movement loop
    const updatePosition = () => {
      const direction = computeDirection();
      if (direction.x !== 0 || direction.y !== 0) {
        socket.emit("playerMove", direction);
      }
      movementLoopRef.current = requestAnimationFrame(updatePosition);
    };
    movementLoopRef.current = requestAnimationFrame(updatePosition);
    return () => {
      cancelAnimationFrame(movementLoopRef.current);
    };
  }, []);

  useEffect(() => {
    socket.on("playersUpdate", (updatedPlayers) => {
      setPlayers(updatedPlayers);
    });
    socket.on("gameArea", (area) => {
      setGameArea(area);
    });
    socket.on("playerSize", (playerSize) => {
      setPlayerSize(playerSize);
    });

    const keyDownHandler = (event) => handleMovement(event, true, socket);
    const keyUpHandler = (event) => handleMovement(event, false, socket);
    window.addEventListener("keydown", keyDownHandler);
    window.addEventListener("keyup", keyUpHandler);

    return () => {
      window.removeEventListener("keydown", keyDownHandler);
      window.removeEventListener("keyup", keyUpHandler);
      socket.off("playersUpdate");
      socket.off("gameArea");
      socket.off("playerSize");
    };
  }, []);

  useEffect(() => {
    
    const updateScrollPosition = () => {
      if (Object.keys(players).includes(socket.id)) {
        const currentPlayer = players[socket.id];

        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        const deltaX = currentPlayer.x - centerX;
        const deltaY = currentPlayer.y - centerY;

        window.scrollTo(deltaX, deltaY);
      }
    };
    updateScrollPosition();
  }, [players]);

  return (
    <BackGround players={players} gameArea={gameArea} playerSize={playerSize} />
  );
};

export default App;
