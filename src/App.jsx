import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import logo from './images/wifi.png';
import { Settings } from './components/Settings';
import { WifiCard } from './components/WifiCard';
import './style.css';
import { Translations } from './translations';

function App() {
  const { t, i18n } = useTranslation();
  const [settings, setSettings] = useState(() => ({
    ssid: '',
    password: '',
    encryptionMode: 'WPA',
    eapMethod: 'PWD',
    eapIdentity: '',
    hidePassword: false,
    hiddenSSID: false,
    portrait: window.innerWidth < 500,
    additionalCards: 1,
    hideTip: false,
  }));

  const [errors, setErrors] = useState({
    ssidError: '',
    passwordError: '',
    eapIdentityError: '',
  });

  const htmlDirection = useCallback(
    (languageID) => {
      languageID = languageID || i18n.language;
      const rtl = Translations.filter((t) => t.id === languageID)[0]?.rtl;
      return rtl ? 'rtl' : 'ltr';
    },
    [i18n.language]
  );

  const update = (patch) => {
    setSettings((s) => ({ ...s, ...patch }));
    setErrors((e) => {
      const cleared = { ...e };
      if ('ssid' in patch) {
        cleared.ssidError = '';
      }
      if ('password' in patch || 'encryptionMode' in patch) {
        cleared.passwordError = '';
      }
      if ('eapIdentity' in patch) {
        cleared.eapIdentityError = '';
      }
      return cleared;
    });
  };

  const onChangeLanguage = (language) => {
    i18n.changeLanguage(language);
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
    const previousTitle = document.title;
    document.title = 'WiFi Card - ' + settings.ssid;
    window.print();
    document.title = previousTitle;
  };

  useEffect(() => {
    document.documentElement.dir = htmlDirection(i18n.language);
  }, [i18n.language, htmlDirection]);

  const cardCount = Math.max(1, parseInt(settings.additionalCards, 10) || 1);

  return (
    <div>
      <header className="app-header">
        <img alt="icon" src={logo} width="32" height="32" />
        <h1>{t('title')}</h1>
      </header>
      <div>
        <p>{t('desc.use')}</p>

        <p>
          {t('desc.privacy')}{' '}
          <a href="https://github.com/bndw/wifi-card">{t('desc.source')}</a>.
        </p>
      </div>
      <div>
        <WifiCard
          settings={settings}
          ssidError={errors.ssidError}
          passwordError={errors.passwordError}
          eapIdentityError={errors.eapIdentityError}
          onUpdate={update}
        />
      </div>
      <Settings
        settings={settings}
        onLanguageChange={onChangeLanguage}
        onUpdate={update}
      />
      <button id="print" type="button" onClick={onPrint}>
        {t('button.print')}
      </button>
      <div id="print-area">
        {[...Array(cardCount)].map((el, idx) => (
          <WifiCard
            keyid={idx}
            key={`card-nr-${idx}`}
            settings={settings}
            ssidError={errors.ssidError}
            passwordError={errors.passwordError}
            eapIdentityError={errors.eapIdentityError}
            onUpdate={update}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
