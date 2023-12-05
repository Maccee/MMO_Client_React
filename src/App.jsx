import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import { handleMouseClick, handleMovement, computeDirection } from "./utils/MovementUtils"; // Assume handleMovement is your new utility
import BackGround from "./components/BackGround";
import "./App.css";

const socket = io("http://localhost:4000");

const App = () => {
  const [players, setPlayers] = useState({});
  const movementLoopRef = useRef();

  useEffect(() => {
    // Movement loop
    const updatePosition = () => {
      const direction = computeDirection();
      if (direction.x !== 0 || direction.y !== 0) {
        socket.emit('playerMove', direction);
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

    const mouseEventHandler = handleMouseClick(socket);
    window.addEventListener("click", mouseEventHandler);

    const keyDownHandler = (event) => handleMovement(event, true, socket);
    const keyUpHandler = (event) => handleMovement(event, false, socket);
    window.addEventListener("keydown", keyDownHandler);
    window.addEventListener("keyup", keyUpHandler);

    return () => {
      window.removeEventListener("click", mouseEventHandler);
      window.removeEventListener("keydown", keyDownHandler);
      window.removeEventListener("keyup", keyUpHandler);
      socket.off("playersUpdate");
    };
  }, []);

  return <BackGround players={players}  />;
};

export default App;
