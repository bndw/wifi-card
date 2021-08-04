import { Checkbox, Pane, RadioGroup, SelectField } from 'evergreen-ui';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import './style.css';

export const Settings = (props) => {
  const { t } = useTranslation();
  const [encryptionModes] = useState([
    { label: 'None', value: 'nopass' },
    { label: 'WPA/WPA2/WPA3', value: 'WPA' },
    { label: 'WEP', value: 'WEP' },
  ]);

  const disableHidePassword = () => {
    const isWEPWithPasswordLengthShorterThat5Characters = () => {
      return props.settings.encryptionMode === 'WEP' &&
        props.settings.password.length < 5
        ? true
        : false;
    };

    return props.settings.encryptionMode === 'WPA' &&
      props.settings.password.length < 8
      ? true
      : isWEPWithPasswordLengthShorterThat5Characters();
  };

  useEffect(() => {
    if (props.firstLoad.current && window.innerWidth < 500) {
      props.onFirstLoad();
      props.onOrientationChange(true);
    }
  });

  return (
    <Pane
      id="settings"
      style={{ maxWidth: props.settings.portrait ? '350px' : '100%' }}
    >
      <SelectField
        height={40}
        label={t('select')}
        selected={i18n.language}
        onChange={(e) => props.onLanguageChange(e.target.value)}
      >
        <option value="en-US">English</option>V
        <option value="ar">Arabic - العربية</option>
        <option value="ca">Catalan - Català</option>
        <option value="zh-HK">Chinese Hong Kong - 简体中文</option>
        <option value="zh-CN">Chinese Simplified - 简体中文</option>
        <option value="nl-NL">Dutch - Nederlands</option>
        <option value="fr-FR">French - Français</option>
        <option value="de-DE">German - Deutsch</option>
        <option value="hi-IN">Hindi - हिन्दी</option>
        <option value="id-ID">Indonesian</option>
        <option value="it-IT">Italian</option>
        <option value="ja">Japanese - 日本語</option>
        <option value="oc">Occitan</option>
        <option value="fa-IR">Persian Iran - فارسی</option>
        <option value="pl-PL">Polish - Polski</option>
        <option value="pt">Portuguese - Português</option>
        <option value="pt-BR">Portuguese - Português brasileiro</option>
        <option value="ru-RU">Russian - Русский</option>
        <option value="es">Spanish - Español</option>
        <option value="tr-TR">Turkish - Türkçe</option>
        <option value="uk-UA">Ukrainian - Українська</option>
      </SelectField>

      <RadioGroup
        label={t('wifi.password.encryption')}
        size={16}
        value={props.settings.encryptionMode}
        options={encryptionModes}
        onChange={(e) => props.onEncryptionModeChange(e.target.value)}
      />

      <Checkbox
        label={t('wifi.password.hide')}
        checked={props.settings.hidePassword}
        disabled={disableHidePassword()}
        onChange={() =>
          props.onHidePasswordChange(!props.settings.hidePassword)
        }
      />
      <Checkbox
        label={t('button.rotate')}
        checked={props.settings.portrait}
        onChange={() => props.onOrientationChange(!props.settings.portrait)}
      />
    </Pane>
  );
};
