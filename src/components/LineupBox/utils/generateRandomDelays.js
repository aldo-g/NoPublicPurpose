// utils/generateRandomDelays.js
export const generateRandomDelays = (length, baseDelay = 20, maxDelay = 500) => {
  // Ignore baseDelay if we want a flat cap. 
  // Each character gets a random delay up to maxDelay.
  return Array.from({ length }, () => Math.floor(Math.random() * maxDelay));
};

  