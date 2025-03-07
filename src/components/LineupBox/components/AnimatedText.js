/**
 * AnimatedText.js
 * 
 * This file defines the AnimatedText component which splits input text into individual characters
 * and applies staggered drop-in or drop-out animations for a dynamic visual effect.
 */

import React from 'react';
import { generateRandomDelays } from '../utils/generateRandomDelays';

/**
 * AnimatedText Component displays text with staggered drop-in or drop-out animations.
 *
 * @param {Object} props - The component properties.
 * @param {string} props.text - The text to display with animations.
 * @param {string} [props.side='front'] - The side indicator ("front" or "back").
 * @param {boolean} props.isChangingContent - Indicates if a content transition animation is in progress.
 * @returns {JSX.Element} The rendered animated text.
 */
export const AnimatedText = ({ text, side = 'front', isChangingContent }) => {
  const animationClass = side === "front"
    ? (isChangingContent ? "drop-out-front" : "drop-in-front")
    : (isChangingContent ? "drop-out-back" : "drop-in-back");

  const delays = generateRandomDelays(text.length, 20, 200);

  console.log(`[${performance.now()}] AnimatedText Render: text="${text}", side="${side}", isChangingContent=${isChangingContent}, animationClass=${animationClass}`);

  return (
    <>
      {text.split("").map((char, index) => (
        <span
          key={index}
          className={animationClass}
          style={{ animationDelay: `${delays[index]}ms` }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </>
  );
};