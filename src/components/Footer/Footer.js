import React from 'react';
import './Footer.css';
import PropTypes from 'prop-types';

const Footer = ({ onArrowClick, disabled }) => (
  <div className="footer-container">
    <footer
      className={`footer ${disabled ? 'footer--disabled' : ''}`}
      onClick={!disabled ? onArrowClick : undefined}
      aria-disabled={disabled}
      role="button"
      tabIndex={disabled ? -1 : 0}
      onKeyDown={(e) => {
        if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
          onArrowClick();
        }
      }}
      aria-label={
        disabled
          ? "Nub disabled. No more configurations available."
          : "Nub to view the next configuration"
      }
    >
      <p className="footer__text">© 2024 No Public Purpose. All Rights Reserved.</p>
      
      {/* Nub Element */}
      <div className="footer__nub">
        <div className="footer__past-container">
          <span className="footer__arrow"></span>
          <span className="footer__past-label">The Past</span>
        </div>
      </div>
    </footer>
  </div>
);

Footer.propTypes = {
  onArrowClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

Footer.defaultProps = {
  disabled: false,
};

export default Footer;
