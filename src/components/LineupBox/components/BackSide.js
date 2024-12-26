// components/BackSide.js
import React from "react";
import { AnimatedText } from "./AnimatedText";

/**
 * BackSide Component
 * 
 * Displays the back side of the lineup box with animated text for event details.
 * 
 * Props:
 * - displayedContent: Object containing the content to display.
 * - isChangingContent: Boolean indicating if content is changing (for animations).
 * - isAnimating: Boolean indicating if a page transition is currently animating.
 * - handleFlip: Function to toggle the flipped state of the lineup box.
 */
const BackSide = ({ displayedContent, isChangingContent, isAnimating, handleFlip }) => {
  // Log when BackSide renders and what content it displays
  console.log(`[${performance.now()}] BackSide Render: displayedContent=`, displayedContent);

  return (
    <div className="back">
      {/* Flip Button */}
      <div className="flip-trigger">
        <button
          className="flip-button"
          onClick={(e) => {
            e.stopPropagation(); // Prevent event bubbling
            console.log(`[${performance.now()}] BackSide Flip Button Clicked`);
            handleFlip(); // Trigger flip action
          }}
          aria-label="Close Event Details" // Accessibility label
        >
          &#x21bb; {/* Unicode character for clockwise open circle arrow */}
        </button>
      </div>

      {/* Animated "About the Event" Heading */}
      <h3>
        <AnimatedText 
          text="About the Event"
          side="back"
          isChangingContent={isChangingContent}
        />
      </h3>

      {/* Event Details with Animated Text */}
      <p>
        <AnimatedText
          text={displayedContent.details || "No additional details available."}
          side="back"
          isChangingContent={isChangingContent}
        />
      </p>
    </div>
  );
};

export default BackSide;
