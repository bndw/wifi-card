import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import logo from '../src/images/wifi.png';
import { Card } from './components/Card';
import { Settings } from './components/Settings';
import './style.css';

/* List of languages that require RTL direction (alphabetic order). */
const RTL_LANGUAGES = ['ar', 'fa-IR'];

function App() {
  const html = document.querySelector('html');
  const { t, i18n } = useTranslation();
  const firstLoad = useRef(true);
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

  const changeLanguage = (language) => {
    html.style.direction = RTL_LANGUAGES.includes(language) ? 'rtl' : 'ltr';
    i18n.changeLanguage(language);
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

  useEffect(() => {
    /* handle the edge case of the initial render requiring RTL direction */
    if (RTL_LANGUAGES.includes(i18n.language)) {
      html.style.direction = 'rtl';
    }
  });

  return (
    <div className="App">
      <h1>
        <img alt="icon" src={logo} width="32" height="32" />
        &nbsp; {t('title')}
      </h1>

      <p className="tag">{t('desc.use')}</p>

      <p className="tag">
        {t('desc.privacy')}{' '}
        <a href="https://github.com/bndw/wifi-card">{t('desc.source')}</a>.
      </p>

      <Card
        direction={RTL_LANGUAGES.includes(i18n.language) ? 'rtl' : 'ltr'}
        settings={settings}
        onSSIDChange={(v) => setSettings({ ...settings, ssid: v })}
        onPasswordChange={(v) => setSettings({ ...settings, password: v })}
      />

      <Settings
        settings={settings}
        firstLoad={firstLoad}
        onFirstLoad={() => (firstLoad.current = false)}
        onLanguageChange={(v) => changeLanguage(v)}
        onEncryptionModeChange={(v) =>
          setSettings({ ...settings, encryptionMode: v })
        }
        onOrientationChange={(v) => setSettings({ ...settings, portrait: v })}
        onHidePasswordChange={(v) =>
          setSettings({ ...settings, hidePassword: v })
        }
      />
      <div className="buttons">
        <button id="print" onClick={onPrint}>
          {t('button.print')}
        </button>
      </div>
    </div>
  );
}

export default App;
