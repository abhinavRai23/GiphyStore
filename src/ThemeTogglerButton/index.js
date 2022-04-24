import React from 'react';
import {ThemeContext} from '../ThemeContext';
import './ThemeTogglerButton.css';

function ThemeTogglerButton() {
  return (
    <div className='themeButton'>
    <ThemeContext.Consumer>
      {({theme, toggleTheme}) => (
        <button
          onClick={toggleTheme}
          className={`${theme==='dark'?'sun': 'moon'}`}
        >Switch
        </button>
      )}
    </ThemeContext.Consumer>
    </div>
  );
}

export default ThemeTogglerButton;