import React from 'react';
import { Card } from './components/Card';
import './style.css';
import logo from './images/wifi.png';

function App() {
  return (
    <div className="App">
      <h1>
      <img src={logo} width="32" height="32" />
        &nbsp; WiFi Card
      </h1>

      <p className="tag">
        Print a simple card with your WiFi login details. Tape it to the fridge,
        keep it in your wallet, etc.
      </p>

      <p className="tag">
        Your WiFi information is never sent to the server. No tracking,
        analytics, or fingerprinting are used on this website. View the{' '}
        <a href="https://github.com/bndw/wifi-card">source code</a>.
      </p>

      <Card />
    </div>
  );
}

export default App;
