// Initial state for key presses
export const keyState = {
  w: false,
  a: false,
  s: false,
  d: false,
};
// Function to handle key down and key up events
export const handleMovement = (event, isKeyDown, socket) => {
  const key = event.key.toLowerCase();

  if (key in keyState) {
    keyState[key] = isKeyDown;
    //socket.emit("playerInput", keyState);
  }
};
// Function to compute direction based on the current keyState
export const computeDirection = () => {
  let x = 0;
  let y = 0;
  if (keyState.w) y -= 1; // Move up
  if (keyState.s) y += 1; // Move down
  if (keyState.a) x -= 1; // Move left
  if (keyState.d) x += 1; // Move right
  return { x, y };
};
// Function to compute rotation angle based on direction
export const computeRotation = (x, y) => {
  if (x === 0 && y === 0) return 0; // No movement
  const angle = Math.atan2(y, x);
  return angle * (180 / Math.PI); // Convert radians to degrees
};