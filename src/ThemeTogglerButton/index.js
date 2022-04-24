import React from 'react';
import {ThemeContext} from '../ThemeContext';
import './style.css';

function ThemeTogglerButton() {
  return (
    <ThemeContext.Consumer>
      {({theme, toggleTheme}) => (
        <button
          onClick={toggleTheme}
          className="themeButton"
        >{
            theme === 'dark' ? 'Ligth Mode' : 'Night Mode'
          }
        </button>
      )}
    </ThemeContext.Consumer>
  );
}

export default ThemeTogglerButton;