/**
 * LineupBox.js
 * 
 * This file defines the LineupBox component which manages a 3D flipping card effect between the front (lineup)
 * and back (info) views. When manually toggled or during a page transition (isAnimating true), the entire card flips.
 * The back side text also uses a drop-out animation before new content is loaded and the card reverts to the front.
 */

import React, { useState, useEffect } from "react";
import "./styles/LineupBox.css";
import FrontSide from "./components/FrontSide";
import BackSide from "./components/BackSide";

/**
 * LineupBox Component manages the 3D flip transition of the card.
 *
 * @param {Object} props - Component properties.
 * @param {Object} props.content - The content to display in the lineup box.
 * @param {boolean} props.isAnimating - Indicates if a page transition is occurring.
 * @returns {JSX.Element} The rendered lineup box component.
 */
const LineupBox = ({ content, isAnimating }) => {
  const [displayedContent, setDisplayedContent] = useState(content);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isChangingContent, setIsChangingContent] = useState(false);

  useEffect(() => {
    if (!isAnimating && !isFlipped && content !== displayedContent) {
      setDisplayedContent(content);
    }
  }, [content, isAnimating, isFlipped, displayedContent]);

  useEffect(() => {
    if (isAnimating && isFlipped) {
      setIsChangingContent(true);
      setTimeout(() => {
        setDisplayedContent(content);
        setIsFlipped(false);
        setIsChangingContent(false);
      }, 300);
    }
  }, [isAnimating, isFlipped, content]);

  /**
   * Toggles the flip state.
   *
   * @returns {void}
   */
  const handleToggle = () => {
    if (isAnimating) return;
    setIsFlipped(prev => !prev);
  };

  const containerClasses = `flip-container ${isFlipped ? "flipped" : ""} ${isAnimating && isFlipped ? "no-transition" : ""}`;

  return (
    <div className="lineup-box">
      <div className={containerClasses}>
        <div className="card-face front">
          <FrontSide
            displayedContent={displayedContent}
            isChangingContent={false}
            handleToggle={handleToggle}
          />
        </div>
        <div className="card-face back">
          <BackSide
            displayedContent={displayedContent}
            isChangingContent={isChangingContent}
            handleToggle={handleToggle}
          />
        </div>
      </div>
    </div>
  );
};

export default LineupBox;