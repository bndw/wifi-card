import { Checkbox, Pane, RadioGroup, SelectField } from 'evergreen-ui';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import { Translations } from '../translations';
import './style.css';

export const Settings = (props) => {
  const { t } = useTranslation();
  const [encryptionModes] = useState([
    { label: 'None', value: '' },
    { label: 'WPA/WPA2/WPA3', value: 'WPA' },
    { label: 'WEP', value: 'WEP' },
  ]);

  useEffect(() => {
    if (props.firstLoad.current && window.innerWidth < 500) {
      props.onFirstLoad();
      props.onOrientationChange(true);
    }
  });

  return (
    <Pane id="settings" maxWidth={props.settings.portrait ? '350px' : '100%'}>
      <SelectField
        width={300}
        inputHeight={38}
        label={t('select')}
        selected={i18n.language}
        onChange={(e) => props.onLanguageChange(e.target.value)}
      >
        {Translations.map((t) => (
          <option key={t.id} value={t.id} selected={t.id === i18n.language}>
            {t.name}
          </option>
        ))}
      </SelectField>

      <Checkbox
        label={t('button.rotate')}
        checked={props.settings.portrait}
        onChange={() => props.onOrientationChange(!props.settings.portrait)}
      />
      <Checkbox
        label={t('wifi.password.hide')}
        checked={props.settings.hidePassword}
        onChange={() =>
          props.onHidePasswordChange(!props.settings.hidePassword)
        }
      />
      <RadioGroup
        label={t('wifi.password.encryption')}
        size={16}
        value={props.settings.encryptionMode}
        options={encryptionModes}
        onChange={(e) => props.onEncryptionModeChange(e.target.value)}
      />
    </Pane>
  );
};
