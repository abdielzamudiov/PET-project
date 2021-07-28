import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

const App = () => {
  const [darkMode, setDarkMode] = useState<''| 'dark-mode'>('');
  const handleDarkMode = () => {
    darkMode ? setDarkMode("") : setDarkMode("dark-mode");
  }
  console.log(darkMode)
  return (
    <div className={"App " + darkMode} >
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={() => handleDarkMode()}> { darkMode ? "set to Light Mode" :"set to Dark Mode" }</button>
      </header>
    </div>
  );
}

export default App;
