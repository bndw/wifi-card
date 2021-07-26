import QRCode from 'qrcode.react';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './style.css';

export const Card = ({ direction = 'ltr' }) => {
  const firstLoad = useRef(true);
  const [qrvalue, setQrvalue] = useState('');
  const [network, setNetwork] = useState({
    ssid: '',
    encryptionMode: 'WPA',
    password: '',
    hidePassword: false,
  });
  const [portrait, setPortrait] = useState(false);
  const { t } = useTranslation();
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
    if (network.ssid.length > 0) {
      if (network.password.length < 8 && network.encryptionMode === 'WPA') {
        alert(t('wifi.alert.password.length.8'));
      } else if (
        network.password.length < 5 &&
        network.encryptionMode === 'WEP'
      ) {
        alert(t('wifi.alert.password.length.5'));
      } else {
        document.title = 'WiFi Card - ' + network.ssid;
        window.print();
      }
    } else {
      alert(t('wifi.alert.name'));
    }
  };

  useEffect(() => {
    if (firstLoad.current && window.innerWidth < 500) {
      firstLoad.current = false;
      setPortrait(true);
    }

    const ssid = escape(network.ssid);
    const password = escape(network.password);
    setQrvalue(`WIFI:T:${network.encryptionMode};S:${ssid};P:${password};;`);
  }, [network]);

  return (
    <div>
      <fieldset
        id="print-area"
        style={{ maxWidth: portrait ? '350px' : '100%' }}
      >
        <h1 style={{ textAlign: portrait ? 'center' : 'unset' }}>
          {t('wifi.login')}
        </h1>

        <div
          className="details"
          style={{ flexDirection: portrait ? 'column' : 'row' }}
        >
          <QRCode
            className="qrcode"
            style={
              !portrait
                ? direction === 'ltr'
                  ? { paddingRight: '1em' }
                  : { paddingLeft: '1em' }
                : {}
            }
            value={qrvalue}
            size={175}
          />

          <div className="inputs">
            <label>{t('wifi.name')}</label>
            <textarea
              id="ssid"
              type="text"
              maxLength="32"
              placeholder={t('wifi.name.placeholder')}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="none"
              spellCheck="false"
              value={network.ssid}
              onChange={(e) => setNetwork({ ...network, ssid: e.target.value })}
            />
            <label
              className={`
                ${network.hidePassword && 'no-print hidden'}
                ${network.encryptionMode === 'nopass' && 'hidden'}
              `}
            >
              {t('wifi.password')}
            </label>
            <textarea
              id="password"
              type="text"
              className={`
                ${network.hidePassword && 'no-print hidden'}
                ${network.encryptionMode === 'nopass' && 'hidden'}
              `}
              style={{
                height:
                  portrait && network.password.length > 40 ? '5em' : 'auto',
              }}
              maxLength="63"
              placeholder={t('wifi.password.placeholder')}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="none"
              spellCheck="false"
              value={network.password}
              onChange={(e) => {
                setNetwork({ ...network, password: e.target.value });
              }}
            />

            <div className="no-print">
              <input
                type="checkbox"
                id="hide-password-checkbox"
                className={network.encryptionMode === 'nopass' ? 'hidden' : ''}
                onChange={() =>
                  setNetwork({
                    ...network,
                    hidePassword: !network.hidePassword,
                  })
                }
              />
              <label
                for="hide-password-checkbox"
                className={network.encryptionMode === 'nopass' ? 'hidden' : ''}
              >
                {t('wifi.password.hide')}
              </label>
            </div>

            <div className="no-print">
              <label>{t('wifi.password.encryption')}:</label>
              <input
                type="radio"
                name="encrypt-select"
                id="encrypt-none"
                value="nopass"
                onChange={(e) => {
                  setNetwork({
                    ...network,
                    encryptionMode: e.target.value,
                    password: '',
                  });
                }}
              />
              <label for="encrypt-none">None</label>
              <input
                type="radio"
                name="encrypt-select"
                id="encrypt-wpa-wpa2-wpa3"
                value="WPA"
                onChange={(e) =>
                  setNetwork({ ...network, encryptionMode: e.target.value })
                }
                defaultChecked
              />
              <label for="encrypt-wpa-wpa2-wpa3">WPA/WPA2/WPA3</label>
              <input
                type="radio"
                name="encrypt-select"
                id="encrypt-wep"
                value="WEP"
                onChange={(e) =>
                  setNetwork({ ...network, encryptionMode: e.target.value })
                }
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
          {t('wifi.tip')}
        </p>
      </fieldset>

      <div className="buttons">
        <button id="rotate" onClick={() => setPortrait(!portrait)}>
          {t('button.rotate')}
        </button>
        <button id="print" onClick={onPrint}>
          {t('button.print')}
        </button>
      </div>
    </div>
  );
};
