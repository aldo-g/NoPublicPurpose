/**
 * FrontSide.js
 * 
 * This file defines the FrontSide component which displays the lineup box information
 * without any drop-away animation. It provides a button to switch to the info view.
 */

import React from "react";
import { AnimatedText } from "./AnimatedText";

/**
 * FrontSide Component displays the front (lineup) information of the lineup box.
 *
 * @param {Object} props - Component properties.
 * @param {Object} props.displayedContent - The content to display on the front side.
 * @param {Function} props.handleToggle - Function to switch to the back (info) view.
 * @returns {JSX.Element} The rendered front side.
 */
const FrontSide = ({ displayedContent, handleToggle }) => {
  return (
    <div className="front">
      <div className="flip-trigger">
        <button
          className="flip-button"
          onClick={(e) => {
            e.stopPropagation();
            handleToggle();
          }}
          aria-label="View Event Details"
        >
          &#x21bb;
        </button>
      </div>
      <p>
        <AnimatedText text="/ LINEUP" side="front" isChangingContent={false} />
      </p>
      {displayedContent.lineup && displayedContent.lineup.map((artist, index) => (
        <p key={index}>
          <a
            href={artist.link}
            target="_blank"
            rel="noopener noreferrer"
            className="lineup-link"
          >
            <AnimatedText text={artist.name} side="front" isChangingContent={false} />
          </a>
        </p>
      ))}
      <p>
        <AnimatedText text="/ LOCATION" side="front" isChangingContent={false} />
      </p>
      <p>
        {displayedContent.location && displayedContent.location.name && (
          <a
            href={displayedContent.location.link}
            target="_blank"
            rel="noopener noreferrer"
            className="location-link"
          >
            <AnimatedText text={displayedContent.location.name} side="front" isChangingContent={false} />
          </a>
        )}
      </p>
      <p>
        <AnimatedText text="/ DATE" side="front" isChangingContent={false} />
      </p>
      <p>
        <AnimatedText text={displayedContent.date || ""} side="front" isChangingContent={false} />
      </p>
      <p>
        {displayedContent.ticketLink && (
          <a
            href={displayedContent.ticketLink}
            target="_blank"
            rel="noopener noreferrer"
            className="ticket-link"
          >
            <AnimatedText text="BUY TICKET" side="front" isChangingContent={false} />
          </a>
        )}
      </p>
    </div>
  );
};

export default FrontSide;