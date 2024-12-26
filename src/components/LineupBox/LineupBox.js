// LineupBox.js
import React, { useState, useEffect } from "react";
import "./styles/LineupBox.css";
import FrontSide from "./components/FrontSide";
import BackSide from "./components/BackSide";

/**
 * LineupBox Component
 * 
 * Manages flipping between FrontSide and BackSide, and handles content transitions
 * with drop-out and drop-in animations.
 * 
 * Props:
 * - content: Content to display on the lineup box.
 * - isAnimating: Indicates if a page transition is occurring.
 */
const LineupBox = ({ content, isAnimating }) => {
  // State to hold the currently displayed content
  const [displayedContent, setDisplayedContent] = useState(content);

  // State to track if the box is currently flipped to the back side
  const [isFlipped, setIsFlipped] = useState(false);

  // State to indicate if a content change (drop-out/drop-in) is in progress
  const [isChangingContent, setIsChangingContent] = useState(false);

  // State to force remounting of FrontSide and BackSide components to reset animations
  const [renderKey, setRenderKey] = useState(0);

  /**
   * useEffect Hook - Logs state changes whenever the component re-renders.
   * Helps in debugging by tracking the sequence of state updates.
   */
  useEffect(() => {
    console.log(`[${performance.now()}] LineupBox Render:`, {
      displayedContent,
      isFlipped,
      isChangingContent,
      isAnimating,
      renderKey
    });
  });

  /**
   * useEffect Hook - Resets flipping state during page transitions.
   */
  useEffect(() => {
    if (isAnimating && isFlipped) {
      console.log(`[${performance.now()}] Page transition detected. Resetting flip state.`);
      setIsFlipped(false); // Reset to front side during page transition
    }
  }, [isAnimating, isFlipped]);

  /**
   * useEffect Hook - Watches for changes in the `content` prop to determine
   * when to update the displayed content with corresponding animations.
   */
  useEffect(() => {
    // Check if the incoming content is different from what's currently displayed
    if (content !== displayedContent) {
      console.log(
        `[${performance.now()}] LineupBox content changed from:`,
        displayedContent,
        "to:",
        content
      );

      // Start content change sequence
      setIsChangingContent(true); // Trigger drop-out animation

      // Wait for the drop-out animation to complete before updating content
      setTimeout(() => {
        setDisplayedContent(content); // Update content

        // Force remount to reset animations
        setRenderKey((k) => k + 1);

        setIsChangingContent(false); // Trigger drop-in animation
      }, 500); // Duration matches CSS animation (500ms)
    }
  }, [content, displayedContent]);

  /**
   * handleFlip - Toggles the flipped state of the lineup box.
   * Prevents flipping if a page transition is currently animating.
   */
  const handleFlip = () => {
    console.log(
      `[${performance.now()}] handleFlip called, isAnimating: ${isAnimating}`
    );
    if (isAnimating) return; // Prevent flipping during page transitions
    setIsFlipped(!isFlipped); // Toggle the flipped state
  };

  return (
    <div className="lineup-box">
      <div className={`flip-container ${isFlipped ? "flipped" : ""}`}>
        {/* FrontSide and BackSide components are rendered with a unique key to force remounting */}
        <FrontSide
          key={`front-${renderKey}`}
          displayedContent={displayedContent}
          isChangingContent={isChangingContent}
          isAnimating={isAnimating}
          handleFlip={handleFlip}
        />
        <BackSide
          key={`back-${renderKey}`}
          displayedContent={displayedContent}
          isChangingContent={isChangingContent}
          isAnimating={isAnimating}
          handleFlip={handleFlip}
        />
      </div>
    </div>
  );
};

export default LineupBox;
