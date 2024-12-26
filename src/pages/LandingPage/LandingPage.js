// LandingPage.js
import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import LineupBox from "../../components/LineupBox/LineupBox";
import pagesConfig from "../../config/pagesConfig";
import "./LandingPage.css";

/**
 * LandingPage Component
 * 
 * Serves as the main landing page, managing background transitions and rendering the LineupBox.
 * Handles navigation through scroll events and header/footer button clicks.
 */
const LandingPage = () => {
  // Tracks the current active page index
  const [activePageIndex, setActivePageIndex] = useState(0);
  
  // Indicates if a page transition animation is in progress
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Holds the index of the next page during transitions
  const [nextPageIndex, setNextPageIndex] = useState(null);

  // Determine if the current page is the last or first
  const isLastPage = activePageIndex >= pagesConfig.length - 1;
  const isFirstPage = activePageIndex <= 0;

  // Log current state for debugging
  useEffect(() => {
    console.log(`[${performance.now()}] LandingPage: activePageIndex=${activePageIndex}, isAnimating=${isAnimating}, nextPageIndex=${nextPageIndex}`);
  }, [activePageIndex, isAnimating, nextPageIndex]);

  /**
   * Initiates a page transition to a new page index.
   * 
   * @param {number} newIndex - The index of the new page to transition to.
   */
  const startPageTransition = (newIndex) => {
    console.log(`[${performance.now()}] startPageTransition to index=${newIndex}`);
    setNextPageIndex(newIndex);
    setIsAnimating(true);

    setTimeout(() => {
      console.log(`[${performance.now()}] (Timeout) Finishing page transition to index=${newIndex}`);
      setActivePageIndex(newIndex);
      setNextPageIndex(null);
      setIsAnimating(false);
    }, 1000); // Duration matches CSS animation duration (1s)
  };

  /**
   * Handles forward navigation when the footer arrow is clicked.
   */
  const handleArrowClick = () => {
    console.log(`[${performance.now()}] handleArrowClick: isAnimating=${isAnimating}, isLastPage=${isLastPage}`);
    if (isAnimating || isLastPage) return;
    const nextIndex = activePageIndex + 1;
    startPageTransition(nextIndex);
  };

  /**
   * Handles backward navigation when the header's back button is clicked.
   */
  const handleFutureClick = () => {
    console.log(`[${performance.now()}] handleFutureClick: isAnimating=${isAnimating}, isFirstPage=${isFirstPage}`);
    if (isAnimating || isFirstPage) return;
    const previousIndex = activePageIndex - 1;
    startPageTransition(previousIndex);
  };

  /**
   * Handles scroll events to navigate between pages.
   * 
   * @param {object} event - The scroll event object.
   */
  const handleScroll = (event) => {
    // Log scroll event details for debugging
    console.log(`[${performance.now()}] handleScroll: deltaY=${event.deltaY}, isAnimating=${isAnimating}`);
    if (isAnimating) return;
    if (event.deltaY > 0) {
      handleArrowClick();
    } else if (event.deltaY < 0) {
      handleFutureClick();
    }
  };

  /**
   * Adds a wheel event listener for scroll-based navigation.
   * Cleans up the listener on component unmount.
   */
  useEffect(() => {
    console.log(`[${performance.now()}] Adding wheel event listener for scroll`);
    window.addEventListener("wheel", handleScroll, { passive: true });
    return () => {
      console.log(`[${performance.now()}] Removing wheel event listener`);
      window.removeEventListener("wheel", handleScroll);
    };
  }, [isAnimating, activePageIndex, isFirstPage, isLastPage]);

  // Determine if the transition is moving backward
  const isGoingBackward = nextPageIndex !== null && nextPageIndex < activePageIndex;

  // Log render for debugging
  console.log(`[${performance.now()}] LandingPage Render: activePageIndex=${activePageIndex}`);

  return (
    <div className="landing-page">
      {/* Active Background Layer */}
      <div
        className={`background-layer ${
          isAnimating
            ? isGoingBackward
              ? "slide-out-top" // Slide out to top if moving backward
              : "slide-out-bottom" // Slide out to bottom if moving forward
            : "active" // Active state with no animation
        }`}
        style={{ backgroundImage: `url(${pagesConfig[activePageIndex].background})` }} // Set background image based on active page
      ></div>

      {/* Next Background Layer during Transition */}
      {nextPageIndex !== null && (
        <div
          className={`background-layer ${
            isGoingBackward ? "slide-in-top" : "slide-in-bottom" // Slide in from top or bottom based on direction
          }`}
          style={{
            backgroundImage: `url(${pagesConfig[nextPageIndex].background})`, // Set background image for the next page
          }}
        ></div>
      )}

      {/* Header Component with Backward Navigation */}
      <Header onFutureClick={handleFutureClick} disabled={isFirstPage} />

      {/* LineupBox Component displaying current page content */}
      <LineupBox
        content={pagesConfig[activePageIndex]}
        isAnimating={isAnimating}
      />

      {/* Footer Component with Forward Navigation */}
      <Footer onArrowClick={handleArrowClick} disabled={isLastPage} />
    </div>
  );
};

export default LandingPage;
