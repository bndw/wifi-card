import React from 'react';
import Card from './components/Card';
import './style.css';

function App() {
  return (
    <div className="App">

      <h1>WiFi Card</h1>

      <p className="tag">
        Print a simple card with your WiFi login details. Tape it to the fridge, keep it in your wallet, etc.
      </p>

      <p className="tag">
        Your information is never sent to the server.
        View the <a href="https://github.com/bndw/wifi-details">source code</a>.
      </p>

      <Card />

    </div>
  );
}

export default App;
