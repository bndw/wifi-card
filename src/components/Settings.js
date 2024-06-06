import {
  Checkbox,
  Pane,
  RadioGroup,
  SelectField,
  TextInputField,
} from 'evergreen-ui';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Translations } from '../translations';
import './style.css';

export const Settings = (props) => {
  const { t } = useTranslation();
  const encryptionModes = [
    { label: t('wifi.password.encryption.none'), value: '' },
    { label: 'WPA/WPA2/WPA3', value: 'WPA' },
    { label: 'WPA2-EAP', value: 'WPA2-EAP' },
    { label: 'WEP', value: 'WEP' },
  ];
  const eapMethods = [{ label: 'PWD', value: 'PWD' }];

  const langSelectDefaultValue = () => {
    const t = Translations.filter((t) => t.id === props.settings.language);
    if (t.length !== 1) {
      return 'en-US';
    }
    return props.settings.language;
  };

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
        onChange={(e) => props.onLanguageChange(e.target.value)}
        defaultValue={langSelectDefaultValue()}
      >
        {Translations.map((t) => (
          <option key={t.id} value={t.id}>
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
      <Checkbox
        label={t('wifi.name.hiddenSSID')}
        checked={props.settings.hiddenSSID}
        onChange={() => props.onHiddenSSIDChange(!props.settings.hiddenSSID)}
      />

      <Checkbox
        label={t('cards.tip.hide')}
        checked={props.settings.hideTip}
        onChange={() => props.onHideTipChange(!props.settings.hideTip)}
      />
      <TextInputField
        type="number"
        width={300}
        label={t('cards.additional')}
        value={props.settings.additionalCards}
        onChange={(e) => props.onAdditionalCardsChange(e.target.value)}
      />
      <RadioGroup
        label={t('wifi.password.encryption')}
        size={16}
        value={props.settings.encryptionMode}
        options={encryptionModes}
        onChange={(e) => props.onEncryptionModeChange(e.target.value)}
      />
      <RadioGroup
        label={t('wifi.encryption.eapMethod')}
        size={16}
        value={props.settings.eapMethod}
        options={eapMethods}
        className={`
          ${props.settings.encryptionMode !== 'WPA2-EAP' && 'hidden'}
        `}
        onChange={(e) => props.onEapMethodChange(e.target.value)}
      />
    </Pane>
  );
};
