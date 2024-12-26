// components/AnimatedText.js
import React from 'react';
import { generateRandomDelays } from '../utils/generateRandomDelays';

/**
 * AnimatedText Component
 * 
 * This component splits the input text into individual characters and applies
 * staggered animations to each character for a dynamic visual effect.
 * 
 * Props:
 * - text: String of text to display with animations.
 * - side: String indicating which side ("front" or "back") the text is on.
 * - isAnimating: Boolean indicating if a page transition is currently animating.
 */
export const AnimatedText = ({ text, side = 'front', isAnimating }) => {
  // Determine the appropriate CSS class based on the side and animation state
  const animationClass = side === "front"
    ? (isAnimating ? "drop-out-front" : "drop-in-front")
    : (isAnimating ? "drop-out-back" : "drop-in-back");

  // Generate random delays for each character to create a staggered animation effect
  const delays = generateRandomDelays(text.length, 20, 200);

  // Log the rendering of AnimatedText with current props
  console.log(`[${performance.now()}] AnimatedText Render: text="${text}", side="${side}", isAnimating=${isAnimating}, animationClass=${animationClass}`);

  return (
    <>
      {/* Split the text into individual characters and apply animations */}
      {text.split("").map((char, index) => (
        <span
          key={index}
          className={animationClass}
          style={{ animationDelay: `${delays[index]}ms` }} // Staggered animation delay
        >
          {char === " " ? "\u00A0" : char} {/* Replace space with non-breaking space for consistent rendering */}
        </span>
      ))}
    </>
  );
};
