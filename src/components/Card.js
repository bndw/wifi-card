import QRCode from 'qrcode.react';
import { useEffect, useRef, useState } from 'react';
import './style.css';

export const Card = () => {
  const firstLoad = useRef(true);
  const [qrvalue, setQrvalue] = useState('');
  const [network, setNetwork] = useState({
    ssid: '',
    password: '',
    hidePassword: false,
  });
  const [portrait, setPortrait] = useState(false);

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
      alert('Password must be at least 8 characters');
    } else {
      window.print();
    }
  };

  useEffect(() => {
    if (firstLoad.current && window.innerWidth < 500) {
      firstLoad.current = false;
      setPortrait(true);
    }

    const ssid = escape(network.ssid);
    const password = escape(network.password);
    setQrvalue(`WIFI:T:WPA;S:${ssid};P:${password};;`);
  }, [network]);

  return (
    <div>
      <fieldset
        id="print-area"
        style={{ maxWidth: portrait ? '350px' : '100%' }}
      >
        <h1 style={{ textAlign: portrait ? 'center' : 'left' }}>WiFi Login</h1>

        <div
          className="details"
          style={{ flexDirection: portrait ? 'column' : 'row' }}
        >
          <QRCode
            className="qrcode"
            style={{ paddingRight: portrait ? '' : '1em' }}
            value={qrvalue}
            size={175}
          />

          <div className="inputs">
            <label>Network name</label>
            <textarea
              id="ssid"
              type="text"
              maxLength="32"
              placeholder="WiFi Network name"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="none"
              spellCheck="false"
              value={network.ssid}
              onChange={(e) => setNetwork({ ...network, ssid: e.target.value })}
            />
            <label className={network.hidePassword ? 'hide-password' : ''}>
              Password
            </label>
            <textarea
              id="password"
              type="text"
              style={{
                height:
                  portrait && network.password.length > 40 ? '5em' : 'auto',
              }}
              className={network.hidePassword ? 'hide-password' : ''}
              maxLength="63"
              placeholder="Password"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="none"
              spellCheck="false"
              value={network.password}
              onChange={(e) =>
                setNetwork({ ...network, password: e.target.value })
              }
            />

            <input
              type="checkbox"
              id="hide-password-checkbox"
              className="hide-password"
              onChange={() =>
                setNetwork({ ...network, hidePassword: !network.hidePassword })
              }
            />
            <label for="hide-password-checkbox" className="hide-password">
              Hide password field before printing
            </label>
          </div>
        </div>

        <p>
          <span role="img" aria-label="mobile-phone">
            📸📱
          </span>
          Point your phone's camera at the QR Code to connect automatically
        </p>
      </fieldset>

      <div className="buttons">
        <button id="rotate" onClick={() => setPortrait(!portrait)}>
          Rotate
        </button>
        <button id="print" onClick={onPrint}>
          Print
        </button>
      </div>
    </div>
  );
};
