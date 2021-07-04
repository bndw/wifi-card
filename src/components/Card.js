import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';
import './style.css';

export const Card = () => {
  const [network, setNetwork] = useState({
    ssid: '',
    password: '',
  });
  const [qrvalue, setQrvalue] = useState('');

  const escape = (v) => {
    const needsEscape = ['"', ';', ',', ':', '\\'];

    let escaped = '';
    for (let i = 0; i < v.length; i++) {
      let c = v[i];
      if (needsEscape.includes(c)) {
        c = '\\' + c;
      }
      escaped += c;
    }

    return escaped;
  };

  const onPrint = () => {
    if (network.password.length < 8) {
      alert('Password must be atleast 8 characters');
    } else {
      window.print();
    }
  };

  useEffect(() => {
    const ssid = escape(network.ssid);
    const password = escape(network.password);
    setQrvalue(`WIFI:T:WPA;S:${ssid};P:${password};;`);
  }, [network]);

  return (
    <div>
      <fieldset id="print-area">
        <legend></legend>

        <h1>WiFi Login</h1>
        <hr />

        <div className="details">
          <QRCode className="qrcode" value={qrvalue} size={175} />

          <div className="text">
            <label>Network name</label>
            <input
              id="ssid"
              type="text"
              maxLength="32"
              placeholder="WiFi Network name"
              value={network.ssid}
              onChange={(e) => setNetwork({ ...network, ssid: e.target.value })}
            />
            <label>Password</label>
            <input
              id="password"
              type="text"
              maxLength="63"
              placeholder="Password"
              value={network.password}
              onChange={(e) =>
                setNetwork({ ...network, password: e.target.value })
              }
            />
          </div>
        </div>

        <p>
          <span role="img" aria-label="mobile-phone">
            📸📱
          </span>
          Point your phone's camera at the QR Code to connect automatically
        </p>
      </fieldset>
      <div className="print-btn">
        <button onClick={onPrint}>Print</button>
      </div>
    </div>
  );
};
