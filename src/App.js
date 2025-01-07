import logo from './logo.svg';
import './App.css';
import React, { useContext } from 'react';
import { ThemeContext } from './context/ThemeContext';

function App() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  // Set the theme in the HTML document's data-theme attribute
  document.body.setAttribute('data-theme', theme);

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={toggleTheme}>Toggle Theme</button>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
