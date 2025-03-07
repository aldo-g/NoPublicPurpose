/**
 * BackSide.js
 * 
 * This file defines the BackSide component which displays the info view of the lineup box.
 * It uses drop-out and drop-in animations (with increased speed) when content changes.
 */

import React from "react";
import { AnimatedText } from "./AnimatedText";

/**
 * BackSide Component displays the info (back) information of the lineup box.
 *
 * @param {Object} props - Component properties.
 * @param {Object} props.displayedContent - The content to display on the back side.
 * @param {boolean} props.isChangingContent - Indicates if the back text is currently animating.
 * @param {Function} props.handleToggle - Function to revert to the front view.
 * @returns {JSX.Element} The rendered back side.
 */
const BackSide = ({ displayedContent, isChangingContent, handleToggle }) => {
  return (
    <div className="back">
      <div className="flip-trigger">
        <button
          className="flip-button"
          onClick={(e) => {
            e.stopPropagation();
            handleToggle();
          }}
          aria-label="Close Event Details"
        >
          &#x21bb;
        </button>
      </div>
      <h3>
        <AnimatedText text="About the Event" side="back" isChangingContent={isChangingContent} />
      </h3>
      <p>
        <AnimatedText text={displayedContent.details || "No additional details available."} side="back" isChangingContent={isChangingContent} />
      </p>
    </div>
  );
};

export default BackSide;