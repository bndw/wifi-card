import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import { Translations } from '../translations';
import './style.css';

const Checkbox = ({ label, checked, onChange }) => (
  <label className="checkbox">
    <input type="checkbox" checked={checked} onChange={onChange} />
    <span>{label}</span>
  </label>
);

const RadioGroup = ({ label, name, value, options, onChange, className }) => (
  <fieldset className={`radio-group ${className || ''}`}>
    <legend>{label}</legend>
    {options.map((option) => (
      <label key={option.value} className="radio">
        <input
          type="radio"
          name={name}
          value={option.value}
          checked={value === option.value}
          onChange={onChange}
        />
        <span>{option.label}</span>
      </label>
    ))}
  </fieldset>
);

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

  return (
    <div
      id="settings"
      style={{ maxWidth: props.settings.portrait ? '350px' : '100%' }}
    >
      <div className="input-field">
        <label htmlFor="language">{t('select')}</label>
        <select
          id="language"
          onChange={(e) => props.onLanguageChange(e.target.value)}
          defaultValue={langSelectDefaultValue()}
        >
          {Translations.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>
      </div>

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
      <div className="input-field">
        <label htmlFor="additional-cards">{t('cards.additional')}</label>
        <input
          id="additional-cards"
          type="number"
          min="1"
          value={props.settings.additionalCards}
          onChange={(e) => props.onUpdate({ additionalCards: e.target.value })}
        />
      </div>
      <RadioGroup
        label={t('wifi.password.encryption')}
        name="encryption-mode"
        value={props.settings.encryptionMode}
        options={encryptionModes}
        onChange={(e) => props.onUpdate({ encryptionMode: e.target.value })}
      />
      <RadioGroup
        label={t('wifi.encryption.eapMethod')}
        name="eap-method"
        value={props.settings.eapMethod}
        options={eapMethods}
        className={props.settings.encryptionMode !== 'WPA2-EAP' ? 'hidden' : ''}
        onChange={(e) => props.onUpdate({ eapMethod: e.target.value })}
      />
    </div>
  );
};
