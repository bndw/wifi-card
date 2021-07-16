import QRCode from 'qrcode.react';
import { useEffect, useRef, useState } from 'react';
import './style.css';

export const Card = () => {
  const firstLoad = useRef(true);
  const [qrvalue, setQrvalue] = useState('');
  const [network, setNetwork] = useState({
    ssid: '',
    encryptionMode: 'WPA',
    password: '',
    hidePassword: false,
  });
  const [portrait, setPortrait] = useState(false);
  const [error, setError] = useState('');

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
  const onEncryptionTypeChange = (ev) => {
    if (ev.target.value === 'nopass') {
      //DO Something to disable password input area

      //Set PAssword Field to Empty
      setNetwork({ ...network, password: '', encryptionMode: ev.target.value });
    } else setNetwork({ ...network, encryptionMode: ev.target.value });
  };
  const onSSIDChange = (ev) => {
    setError('');
    setNetwork({ ...network, ssid: ev.target.value });
  };
  const onPasswordChange = (ev) => {
    setError('');
    if (network.encryptionMode === 'nopass') {
      setNetwork({ ...network, password: '' });
    } else setNetwork({ ...network, password: ev.target.value });
  };
  const onPrint = () => {
    if (network.ssid.length > 0) {
      if (network.password.length < 8 && network.encryptionMode === 'WPA') {
        setError('Password must be at least 8 characters');
      } else if (
        network.password.length < 5 &&
        network.encryptionMode === 'WEP'
      ) {
        setError('Password must be at least 5 characters');
      } else {
        window.print();
      }
    } else {
      setError('Network name cannot be empty');
    }
  };
  useEffect(() => {
    if (firstLoad.current && window.innerWidth < 500) {
      firstLoad.current = false;
      setPortrait(true);
    }

    const ssid = escape(network.ssid);
    const password = escape(network.password);
    if (network.encryptionMode !== 'nopass') {
      setQrvalue(`WIFI:T:${network.encryptionMode};S:${ssid};P:${password};;`);
    } else
      setQrvalue(`WIFI:T:${network.encryptionMode};S:${ssid};P:${password};;`);
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
              onChange={onSSIDChange}
            />
            <label className={network.hidePassword ? 'no-print' : ''}>
              Password
            </label>
            <textarea
              id="password"
              type="text"
              className={network.hidePassword ? 'no-print' : ''}
              style={{
                height:
                  portrait && network.password.length > 40 ? '5em' : 'auto',
              }}
              maxLength="63"
              placeholder="Password"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="none"
              spellCheck="false"
              value={network.password}
              onChange={onPasswordChange}
            />

            <div className="no-print">
              <input
                type="checkbox"
                id="hide-password-checkbox"
                onChange={() =>
                  setNetwork({
                    ...network,
                    hidePassword: !network.hidePassword,
                  })
                }
              />
              <label for="hide-password-checkbox">
                Hide password field before printing
              </label>
            </div>

            <div className="no-print">
              <label>Encryption:</label>
              <input
                type="radio"
                name="encrypt-select"
                id="encrypt-none"
                value="nopass"
                onChange={onEncryptionTypeChange}
              />
              <label for="encrypt-none">None</label>
              <input
                type="radio"
                name="encrypt-select"
                id="encrypt-wpa-wpa2"
                value="WPA"
                onChange={onEncryptionTypeChange}
                defaultChecked
              />
              <label for="encrypt-wpa-wpa2">WPA/WPA2</label>
              <input
                type="radio"
                name="encrypt-select"
                id="encrypt-wep"
                value="WEP"
                onChange={onEncryptionTypeChange}
              />
              <label for="encrypt-wep">WEP</label>
            </div>
          </div>
        </div>
        <hr />
        <p>
          <span role="img" aria-label="mobile-phone">
            📸📱
          </span>
          Point your phone's camera at the QR Code to connect automatically
        </p>
      </fieldset>
      {error !== '' && <span className="error">{error}</span>}
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
