import { Button, Heading, Link, Pane, Paragraph } from 'evergreen-ui';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import logo from '../src/images/wifi.png';
import { Settings } from './components/Settings';
import { WifiCard } from './components/WifiCard';
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
  const [errors, setErrors] = useState({
    ssidError: '',
    passwordError: '',
  });

  const onChangeLanguage = (language) => {
    html.style.direction = RTL_LANGUAGES.includes(language) ? 'rtl' : 'ltr';
    i18n.changeLanguage(language);
  };

  const onPrint = () => {
    if (settings.ssid.length > 0) {
      if (settings.password.length < 8 && settings.encryptionMode === 'WPA') {
        setErrors({
          ...errors,
          passwordError: t('wifi.alert.password.8'),
        });
      } else if (
        settings.password.length < 5 &&
        settings.encryptionMode === 'WEP'
      ) {
        setErrors({
          ...errors,
          passwordError: t('wifi.alert.password.length.5'),
        });
      } else {
        document.title = 'WiFi Card - ' + settings.ssid;
        window.print();
      }
    } else {
      setErrors({
        ...errors,
        ssidError: t('wifi.alert.name'),
      });
    }
  };

  const onSSIDChange = (ssid) => {
    setErrors({ ...errors, ssidError: '' });
    setSettings({ ...settings, ssid });
  };
  const onPasswordChange = (password) => {
    setErrors({ ...errors, passwordError: '' });
    setSettings({ ...settings, password });
  };
  const onEncryptionModeChange = (encryptionMode) => {
    setSettings({ ...settings, encryptionMode });
  };
  const onOrientationChange = (portrait) => {
    setSettings({ ...settings, portrait });
  };
  const onHidePasswordChange = (hidePassword) => {
    setSettings({ ...settings, hidePassword });
  };
  const onFirstLoad = () => {
    firstLoad.current = false;
  };

  useEffect(() => {
    /* handle the edge case of the initial render requiring RTL direction */
    if (RTL_LANGUAGES.includes(i18n.language)) {
      html.style.direction = 'rtl';
    }
  });

  return (
    <Pane>
      <Pane display="flex">
        <img alt="icon" src={logo} width="32" height="32" />
        <Heading size={900} paddingLeft={16}>
          {t('title')}
        </Heading>
      </Pane>

      <Pane>
        <Paragraph marginTop={12}>{t('desc.use')}</Paragraph>

        <Paragraph marginTop={12}>
          {t('desc.privacy')}{' '}
          <Link href="https://github.com/bndw/wifi-card">
            {t('desc.source')}
          </Link>
          .
        </Paragraph>
      </Pane>

      <WifiCard
        direction={RTL_LANGUAGES.includes(i18n.language) ? 'rtl' : 'ltr'}
        settings={settings}
        ssidError={errors.ssidError}
        passwordError={errors.passwordError}
        onSSIDChange={onSSIDChange}
        onPasswordChange={onPasswordChange}
      />

      <Settings
        settings={settings}
        firstLoad={firstLoad}
        onFirstLoad={onFirstLoad}
        onLanguageChange={onChangeLanguage}
        onEncryptionModeChange={onEncryptionModeChange}
        onOrientationChange={onOrientationChange}
        onHidePasswordChange={onHidePasswordChange}
      />

      <Button
        id="print"
        appearance="primary"
        height={40}
        marginRight={16}
        onClick={onPrint}
      >
        {t('button.print')}
      </Button>
    </Pane>
  );
}

export default App;
