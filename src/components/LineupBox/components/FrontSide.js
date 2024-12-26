// components/FrontSide.js
import React from 'react';
import { AnimatedText } from './AnimatedText';

/**
 * FrontSide Component
 * 
 * Displays the front side of the lineup box with animated text for lineup, location, date, and ticket information.
 * 
 * Props:
 * - displayedContent: Object containing the content to display.
 * - isChangingContent: Boolean indicating if content is changing (for animations).
 * - isAnimating: Boolean indicating if a page transition is currently animating.
 * - handleFlip: Function to toggle the flipped state of the lineup box.
 */
const FrontSide = ({ displayedContent, isChangingContent, isAnimating, handleFlip }) => {
  // Log when FrontSide renders and what content it displays
  console.log(`[${performance.now()}] FrontSide Render: displayedContent=`, displayedContent);

  return (
    <div className="front">
      {/* Flip Button */}
      <div className="flip-trigger">
        <button
          className="flip-button"
          onClick={(e) => {
            e.stopPropagation(); // Prevent event bubbling
            console.log(`[${performance.now()}] FrontSide Flip Button Clicked`);
            handleFlip(); // Trigger flip action
          }}
          aria-label="View Event Details" // Accessibility label
        >
          &#x21bb; {/* Unicode character for clockwise open circle arrow */}
        </button>
      </div>

      {/* Animated "LINEUP" Text */}
      <p>
        <AnimatedText text="/ LINEUP" side="front" isChangingContent={isChangingContent} />
      </p>

      {/* List of Artists with Animated Text */}
      {displayedContent.lineup && displayedContent.lineup.map((artist, index) => (
        <p key={index}>
          <a
            href={artist.link} // Artist's external link
            target="_blank" // Opens link in a new tab
            rel="noopener noreferrer" // Security best practices
            className="lineup-link"
          >
            <AnimatedText text={artist.name} side="front" isChangingContent={isChangingContent} />
          </a>
        </p>
      ))}

      {/* Animated "LOCATION" Text */}
      <p>
        <AnimatedText text="/ LOCATION" side="front" isChangingContent={isChangingContent} />
      </p>

      {/* Location Name with Link and Animated Text */}
      <p>
        {displayedContent.location && displayedContent.location.name && (
          <a
            href={displayedContent.location.link} // Location's external link
            target="_blank" // Opens link in a new tab
            rel="noopener noreferrer" // Security best practices
            className="location-link"
          >
            <AnimatedText text={displayedContent.location.name} side="front" isChangingContent={isChangingContent} />
          </a>
        )}
      </p>

      {/* Animated "DATE" Text */}
      <p>
        <AnimatedText text="/ DATE" side="front" isChangingContent={isChangingContent} />
      </p>

      {/* Event Date with Animated Text */}
      <p>
        <AnimatedText text={displayedContent.date || ""} side="front" isChangingContent={isChangingContent} />
      </p>

      {/* Buy Ticket Link with Animated Text */}
      <p>
        {displayedContent.ticketLink && (
          <a
            href={displayedContent.ticketLink} // Ticket purchase link
            target="_blank" // Opens link in a new tab
            rel="noopener noreferrer" // Security best practices
            className="ticket-link"
          >
            <AnimatedText text="BUY TICKET" side="front" isChangingContent={isChangingContent} />
          </a>
        )}
      </p>
    </div>
  );
};

export default FrontSide;
