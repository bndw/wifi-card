import QRCode from 'qrcode.react';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './style.css';

export const Card = ({ direction = 'ltr' }) => {
  const { t } = useTranslation();
  const firstLoad = useRef(true);
  const [qrvalue, setQrvalue] = useState('');
  const [settings, setSettings] = useState({
    // Network SSID name
    ssid: '',
    // Network password
    password: '',
    // Show advanced options
    showAdvanced: false,
    // Advanced option: Network encryption mode
    encryptionMode: 'WPA',
    // Advanced option: Hide password on the printed card
    hidePassword: false,
    // Advanced option: Portrait orientation
    portrait: false,
  });

  const escape = (v) => {
    const needsEscape = ['"', ';', ',', ':', '\\'];

    let escaped = '';
    for (const c of v) {
      if (needsEscape.includes(c)) {
        escaped += `\\${c}`;
      } else {
        escaped += c;
      }
    }
    return escaped;
  };

  const onPrint = () => {
    if (settings.ssid.length > 0) {
      if (settings.password.length < 8 && settings.encryptionMode === 'WPA') {
        alert(t('wifi.alert.password.length.8'));
      } else if (
        settings.password.length < 5 &&
        settings.encryptionMode === 'WEP'
      ) {
        alert(t('wifi.alert.password.length.5'));
      } else {
        document.title = 'WiFi Card - ' + settings.ssid;
        window.print();
      }
    } else {
      alert(t('wifi.alert.name'));
    }
  };

  const disableHidePassword = () => {
    const isWEPWithPasswordLengthShorterThat5Characters = () => {
      return settings.encryptionMode === 'WEP' && settings.password.length < 5
        ? true
        : false;
    };

    return settings.encryptionMode === 'WPA' && settings.password.length < 8
      ? true
      : isWEPWithPasswordLengthShorterThat5Characters();
  };

  useEffect(() => {
    if (firstLoad.current && window.innerWidth < 500) {
      firstLoad.current = false;
      setSettings({ ...settings, portrait: true });
    }

    const ssid = escape(settings.ssid);
    const password =
      settings.encryptionMode === 'nopass' ? '' : escape(settings.password);
    setQrvalue(`WIFI:T:${settings.encryptionMode};S:${ssid};P:${password};;`);
  }, [settings]);

  return (
    <div>
      <fieldset
        id="print-area"
        style={{ maxWidth: settings.portrait ? '350px' : '100%' }}
      >
        <h1 style={{ textAlign: settings.portrait ? 'center' : 'unset' }}>
          {t('wifi.login')}
        </h1>

        <div
          className="details"
          style={{ flexDirection: settings.portrait ? 'column' : 'row' }}
        >
          <QRCode
            className="qrcode"
            style={
              !settings.portrait
                ? direction === 'ltr'
                  ? { paddingRight: '1em' }
                  : { paddingLeft: '1em' }
                : {}
            }
            value={qrvalue}
            size={175}
            renderAs="svg"
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
              value={settings.ssid}
              onChange={(e) =>
                setSettings({ ...settings, ssid: e.target.value })
              }
            />
            <label
              className={`
                ${settings.hidePassword && 'no-print hidden'}
                ${settings.encryptionMode === 'nopass' && 'hidden'}
              `}
            >
              {t('wifi.password')}
            </label>
            <textarea
              id="password"
              type="text"
              className={`
                ${settings.hidePassword && 'no-print hidden'}
                ${settings.encryptionMode === 'nopass' && 'hidden'}
              `}
              style={{
                height:
                  settings.portrait && settings.password.length > 40
                    ? '5em'
                    : 'auto',
              }}
              maxLength="63"
              placeholder={t('wifi.password.placeholder')}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="none"
              spellCheck="false"
              value={settings.password}
              onChange={(e) => {
                setSettings({ ...settings, password: e.target.value });
              }}
            />
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
        <button
          id="settings"
          onClick={() =>
            setSettings({ ...settings, showAdvanced: !settings.showAdvanced })
          }
        >
          {t('button.settings')}
        </button>

        <button id="print" onClick={onPrint}>
          {t('button.print')}
        </button>
      </div>

      <div
        id="settings"
        className={`${settings.showAdvanced || 'hidden'}`}
        style={{ maxWidth: settings.portrait ? '350px' : '100%' }}
      >
        <div id="encryption-mode">
          <label>
            {t('wifi.password.encryption')}:{direction === 'rtl' ? ' ' : ''}
          </label>
          <span dir="ltr">
            <input
              type="radio"
              name="encrypt-select"
              id="encrypt-none"
              value="nopass"
              onChange={(e) => {
                setSettings({
                  ...settings,
                  encryptionMode: e.target.value,
                });
              }}
            />
            <label htmlFor="encrypt-none">None</label>
            <input
              type="radio"
              name="encrypt-select"
              id="encrypt-wpa-wpa2-wpa3"
              value="WPA"
              onChange={(e) =>
                setSettings({ ...settings, encryptionMode: e.target.value })
              }
              defaultChecked
            />
            <label htmlFor="encrypt-wpa-wpa2-wpa3">WPA/WPA2/WPA3</label>
            <input
              type="radio"
              name="encrypt-select"
              id="encrypt-wep"
              value="WEP"
              onChange={(e) =>
                setSettings({ ...settings, encryptionMode: e.target.value })
              }
            />
            <label htmlFor="encrypt-wep">WEP</label>
          </span>
        </div>

        <div id="hide-password">
          <input
            type="checkbox"
            id="hide-password-checkbox"
            disabled={disableHidePassword()}
            className={settings.encryptionMode === 'nopass' ? 'hidden' : ''}
            onChange={() =>
              setSettings({
                ...settings,
                hidePassword: !settings.hidePassword,
              })
            }
          />
          <label
            htmlFor="hide-password-checkbox"
            className={settings.encryptionMode === 'nopass' ? 'hidden' : ''}
          >
            {t('wifi.password.hide')}
          </label>
        </div>

        <div id="portrait-orientation">
          <input
            type="checkbox"
            id="portrait"
            onChange={() =>
              setSettings({ ...settings, portrait: !settings.portrait })
            }
          />
          <label htmlFor="portrait">{t('button.rotate')}</label>
        </div>
      </div>
    </div>
  );
};
