import {
  Checkbox,
  Pane,
  RadioGroup,
  SelectField,
  TextInputField,
} from 'evergreen-ui';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
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
    const t = Translations.filter((t) => t.id === i18n.language);
    if (t.length !== 1) {
      return 'en-US';
    }
    return t[0].id;
  };

  const onAdditionalCardsChange = (additionalCardsStr) => {
    const amount = parseInt(additionalCardsStr);
    amount >= 1 && props.onUpdate({ additionalCards: amount });
  };

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
        onChange={() => props.onUpdate({ portrait: !props.settings.portrait })}
      />
      <Checkbox
        label={t('wifi.password.hide')}
        checked={props.settings.hidePassword}
        onChange={() =>
          props.onUpdate({ hidePassword: !props.settings.hidePassword })
        }
      />
      <Checkbox
        label={t('wifi.name.hiddenSSID')}
        checked={props.settings.hiddenSSID}
        onChange={() =>
          props.onUpdate({ hiddenSSID: !props.settings.hiddenSSID })
        }
      />

      <Checkbox
        label={t('cards.tip.hide')}
        checked={props.settings.hideTip}
        onChange={() => props.onUpdate({ hideTip: !props.settings.hideTip })}
      />
      <TextInputField
        type="number"
        width={300}
        label={t('cards.additional')}
        value={props.settings.additionalCards}
        onChange={(e) => onAdditionalCardsChange(e.target.value)}
      />
      <RadioGroup
        label={t('wifi.password.encryption')}
        size={16}
        value={props.settings.encryptionMode}
        options={encryptionModes}
        onChange={(e) => props.onUpdate({ encryptionMode: e.target.value })}
      />
      <RadioGroup
        label={t('wifi.encryption.eapMethod')}
        size={16}
        value={props.settings.eapMethod}
        options={eapMethods}
        className={`
          ${props.settings.encryptionMode !== 'WPA2-EAP' && 'hidden'}
        `}
        onChange={(e) => props.onUpdate({ eapMethod: e.target.value })}
      />
    </Pane>
  );
};
