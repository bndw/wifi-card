import QRCode from 'qrcode.react';
import { useEffect, useRef, useState } from 'react';
import './style.css';

export const Card = () => {
  const firstLoad = useRef(true);
  const [qrvalue, setQrvalue] = useState('');
  const [network, setNetwork] = useState({
    ssid: "",
    encryptionMode: "not-set",
    password: "",
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
    if (network.password.length < 8 && network.encryptionMode === "WPA") {
      alert('Password must be at least 8 characters');
    } else if (network.password.length < 5 && network.encryptionMode === "WEP") {
      alert('Password must be at least 5 characters');
    } else if (network.encryptionMode === "not-set") {
      alert('Please set an encryption mode')
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
    const encryptionMode = escape(network.encryptionMode)
    setQrvalue(`WIFI:T:${encryptionMode};S:${ssid};P:${password};;`);
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
              onChange={(e) => {
                setNetwork({ ...network, password: e.target.value })
              }}
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

            <br/><br/>

            <label>Encryption: </label>
            <input
              type="radio"
              name="encrypt-select"
              id="encrypt-none"
              value=""
              onChange={(e) =>
                setNetwork({ ...network, encryptionMode: e.target.value })
              }
            />
            <label
              for="encrypt-none">
                None
            </label>
            <input
              type="radio"
              name="encrypt-select"
              id="encrypt-wpa-wpa2"
              value="WPA"
              onChange={(e) =>
                setNetwork({ ...network, encryptionMode: e.target.value })
              }
            />
            <label
              for="encrypt-wpa-wpa2">
                WPA/WPA2
            </label>
            <input
              type="radio"
              name="encrypt-select"
              id="encrypt-wep"
              value="WEP"
              onChange={(e) =>
                setNetwork({ ...network, encryptionMode: e.target.value })
              }
            />
            <label
              for="encrypt-wep">
                WEP
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
