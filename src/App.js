import { Button, Heading, Link, Pane, Paragraph } from 'evergreen-ui';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import logo from '../src/images/wifi.png';
import { Settings } from './components/Settings';
import { WifiCard } from './components/WifiCard';
import './style.css';
import { Translations } from './translations';
import useHashParam from './components/useHashParam';

function App() {
  const getHashSearchParams = (location) => {
    const hash = location.hash.slice(1);
    const [prefix, query] = hash.split('?');

    return [prefix, new URLSearchParams(query)];
  };
  const getHashParam = (key, location = window.location) => {
    const [_, searchParams] = getHashSearchParams(location);
    return searchParams.get(key);
  };
  const setHashParam = (key, value, location = window.location) => {
    const [prefix, searchParams] = getHashSearchParams(location);

    if (typeof value === 'undefined') {
      searchParams.delete(key);
    } else {
      searchParams.set(key, value);
    }

    const search = searchParams.toString();
    location.hash = search ? `${prefix}?${search}` : prefix;
  };

  let pssid = getHashParam('ssid'); //params.get('ssid') || '';
  let ppassword = getHashParam('password') || '';
  let pencryptionMode =
    getHashParam('encryptionMode') !== null
      ? getHashParam('encryptionMode')
      : 'WPA';
  let peapMethod = getHashParam('eapMethod') || 'PWD';
  let peapIdentity = getHashParam('eapIdentity') || '';
  let phidePassword =
    getHashParam('hidePassword') === null
      ? false
      : getHashParam('hidePassword').toLowerCase() === 'true'
        ? true
        : false;
  let phiddenSSID =
    getHashParam('hiddenSSID') === null
      ? false
      : getHashParam('hiddenSSID').toLowerCase() === 'true'
        ? true
        : false;
  let pportrait =
    getHashParam('portrait') === null
      ? false
      : getHashParam('portrait').toLowerCase() === 'true'
        ? true
        : false || false;
  let padditionalCards = getHashParam('additionalCards') || 1;
  let phideTip =
    getHashParam('hideTip') === null
      ? false
      : getHashParam('hideTip').toLowerCase() === 'true'
        ? true
        : false;
  let planguage =
    getHashParam('lng') === null || getHashParam('lng').toLowerCase() === ''
      ? 'en-US'
      : getHashParam('lng');

  // ########################
  const html = document.querySelector('html');

  const { t, i18n } = useTranslation();
  const firstLoad = useRef(true);
  const [settings, setSettings] = useState({
    // Network SSID name
    ssid: pssid,
    // Network password
    password: ppassword,
    // Settings: Network encryption mode
    encryptionMode: pencryptionMode,
    // Settings: EAP Method
    eapMethod: peapMethod,
    // Settings: EAP identity
    eapIdentity: peapIdentity,
    // Settings: Hide password on the printed card
    hidePassword: phidePassword,
    // Settings: Mark your network as hidden SSID
    hiddenSSID: phiddenSSID,
    // Settings: Portrait orientation
    portrait: pportrait,
    // Settings: Additional cards
    additionalCards: padditionalCards,
    // Settings: Show tip (legend) on card
    hideTip: phideTip,
    // Display language
    lng: planguage,
  });

  const [errors, setErrors] = useState({
    ssidError: '',
    passwordError: '',
    eapIdentityError: '',
  });

  const htmlDirection = (languageID) => {
    languageID = languageID || i18n.language;
    const rtl = Translations.filter((t) => t.id === languageID)[0]?.rtl;
    return rtl ? 'rtl' : 'ltr';
  };

  const onChangeLanguage = (language) => {
    html.style.direction = htmlDirection(language);
    i18n.changeLanguage(language);

    setSettings({ ...settings, lng: language });
  };

  const onPrint = () => {
    if (!settings.ssid.length) {
      setErrors({
        ...errors,
        ssidError: t('wifi.alert.name'),
      });
      return;
    }
    if (settings.password.length < 8 && settings.encryptionMode === 'WPA') {
      setErrors({
        ...errors,
        passwordError: t('wifi.alert.password.length.8'),
      });
      return;
    }
    if (settings.password.length < 5 && settings.encryptionMode === 'WEP') {
      setErrors({
        ...errors,
        passwordError: t('wifi.alert.password.length.5'),
      });
      return;
    }
    if (
      settings.password.length < 1 &&
      settings.encryptionMode === 'WPA2-EAP'
    ) {
      setErrors({
        ...errors,
        passwordError: t('wifi.alert.password'),
      });
      return;
    }
    if (
      settings.eapIdentity.length < 1 &&
      settings.encryptionMode === 'WPA2-EAP'
    ) {
      setErrors({
        ...errors,
        eapIdentityError: t('wifi.alert.eapIdentity'),
      });
      return;
    }
    document.title = 'WiFi Card - ' + settings.ssid;
    window.print();
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
    setErrors({ ...errors, passwordError: '' });
    setSettings({ ...settings, encryptionMode });
  };
  const onEapMethodChange = (eapMethod) => {
    setSettings({ ...settings, eapMethod });
  };
  const onEapIdentityChange = (eapIdentity) => {
    setErrors({ ...errors, eapIdentityError: '' });
    setSettings({ ...settings, eapIdentity });
  };
  const onOrientationChange = (portrait) => {
    setSettings({ ...settings, portrait });
  };
  const onHidePasswordChange = (hidePassword) => {
    setSettings({ ...settings, hidePassword });
  };
  const onHiddenSSIDChange = (hiddenSSID) => {
    setSettings({ ...settings, hiddenSSID });
  };
  const onAdditionalCardsChange = (additionalCardsStr) => {
    const amount = parseInt(additionalCardsStr);
    amount >= 1 && setSettings({ ...settings, additionalCards: amount });
  };
  const onHideTipChange = (hideTip) => {
    setSettings({ ...settings, hideTip });
  };
  const onFirstLoad = () => {
    html.style.direction = htmlDirection();
    firstLoad.current = false;
  };

  const generateUrl = () => {
    Object.entries(settings).map(([key, value]) => {
      //console.log(key+" = " + value)
      setHashParam(key, value);
      if (key === 'ssid') setName(value);
      return true;
    });
  };
  const [name, setName] = useHashParam('name');

  useEffect(() => {
    // Ensure the page direction is set properly on first load
    if (htmlDirection() === 'rtl') {
      html.style.direction = 'rtl';
    }
    generateUrl();
  });

  return (
    <Pane>
      Hello{' '}
      {name ? name + '! You name is stored in hash params #️⃣' : 'visitor!'}
      <Pane display="flex">
        <img alt="icon" src={logo} width="32" height="32" />
        <Heading size={900} paddingRight={16} paddingLeft={16}>
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
      <Pane>
        <WifiCard
          settings={settings}
          ssidError={errors.ssidError}
          passwordError={errors.passwordError}
          eapIdentityError={errors.eapIdentityError}
          onSSIDChange={onSSIDChange}
          onEapIdentityChange={onEapIdentityChange}
          onPasswordChange={onPasswordChange}
        />
      </Pane>
      <Settings
        settings={settings}
        firstLoad={firstLoad}
        onFirstLoad={onFirstLoad}
        onLanguageChange={onChangeLanguage}
        onEncryptionModeChange={onEncryptionModeChange}
        onEapMethodChange={onEapMethodChange}
        onOrientationChange={onOrientationChange}
        onHidePasswordChange={onHidePasswordChange}
        onHiddenSSIDChange={onHiddenSSIDChange}
        onAdditionalCardsChange={onAdditionalCardsChange}
        onHideTipChange={onHideTipChange}
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
      <Pane id="print-area">
        {settings.additionalCards >= 1 &&
          [...Array(settings.additionalCards)].map((el, idx) => (
            <WifiCard
              keyid={idx}
              key={`card-nr-${idx}`}
              settings={settings}
              ssidError={errors.ssidError}
              passwordError={errors.passwordError}
              eapIdentityError={errors.eapIdentityError}
              onSSIDChange={onSSIDChange}
              onEapIdentityChange={onEapIdentityChange}
              onPasswordChange={onPasswordChange}
            />
          ))}
      </Pane>
    </Pane>
  );
}

export default App;
