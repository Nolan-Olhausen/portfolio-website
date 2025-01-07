import logo from './logo.svg';
import './App.css';
import React, { useContext } from 'react';
import { ThemeContext } from './context/ThemeContext';
import NavBar from "./components/NavBar";

function App() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  // Set the theme in the HTML document's data-theme attribute
  document.body.setAttribute('data-theme', theme);

  return (
    <div className="App">
      <NavBar />
    </div>
  );
}

export default App;
