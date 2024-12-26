import React from 'react';
import './Header.css';
import PropTypes from 'prop-types';

const Header = ({ onFutureClick, disabled }) => (
  <div className="header-container">
    <header
      className={`header ${disabled ? 'header--disabled' : ''}`}
      onClick={!disabled ? onFutureClick : undefined}
      aria-disabled={disabled}
      role="button"
      tabIndex={disabled ? -1 : 0}
      onKeyDown={(e) => {
        if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
          onFutureClick();
        }
      }}
      aria-label={
        disabled
          ? "Nub disabled. No more configurations available."
          : "Nub to view the next configuration"
      }
    >
      <img
        src="/assets/npp.png"
        alt="No Public Purpose Logo"
        className="header-logo"
      />
      
      {/* Nub Element */}
      <div className="header__nub">
        <div className="header__future-container">
          <span className="header__arrow"></span>
          <span className="header__future-label">The Future</span>
        </div>
      </div>
      
    </header>
  </div>
);

Header.propTypes = {
  onFutureClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

Header.defaultProps = {
  disabled: false,
};

export default Header;
