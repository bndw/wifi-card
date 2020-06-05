import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';
import './style.css';

const Card = () => {
  const [ssid, setSsid] = useState('');
  const [password, setPassword] = useState('');
  const [qrvalue, setQrvalue] = useState('');

  useEffect(() => {
    setQrvalue(`WIFI:T:WPA;S:${ssid};P:${password};;`);
  }, [ssid, password]);

  return (
    <div>
      <fieldset id="print-area">
        <legend></legend>

        <h1>WiFi Login</h1>
        <hr/>

        <div className="details">
          <QRCode className="qrcode" value={qrvalue} size={175} />

          <div className="text">
            <label>Network name</label>
            <input id="ssid" type="text" maxlength="32" placeholder="WiFi Network name" value={ssid} onChange={event => setSsid(event.target.value)} />
            <label>Password</label>
            <input id="password" type="text" maxlength="64" placeholder="Password" value={password} onChange={event => setPassword(event.target.value)} />
          </div>
        </div>

        <p><span role="img" aria-label="mobile-phone">📸📱</span>Point your phone's camera at the QR Code to connect automatically</p>
      </fieldset>
      <div className="print-btn">
        <button onClick={window.print}>Print</button>
      </div>
    </div>
  )
}

export default Card;
