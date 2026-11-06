import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  CUSTOM_STYLE,
  CUSTOM_STYLE_CLASSES,
  STYLE_PRESETS,
  activeCss,
} from '../customStyles';
import i18n from '../i18n';
import { Translations } from '../translations';
import './style.css';

const Checkbox = ({ label, checked, onChange }) => (
  <label className="checkbox">
    <input type="checkbox" checked={checked} onChange={onChange} />
    <span>{label}</span>
  </label>
);

const SegmentedControl = ({ label, name, value, options, onChange }) => (
  <fieldset className="segmented">
    <legend>{label}</legend>
    <div className="segmented-options">
      {options.map((option) => (
        <label key={option.value}>
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={onChange}
          />
          <span>
            {option.swatch}
            {option.label}
          </span>
        </label>
      ))}
    </div>
  </fieldset>
);

const Swatch = ({ background, border, ink }) => (
  <i
    className="swatch"
    style={{ backgroundColor: background, borderColor: border }}
    aria-hidden="true"
  >
    <i style={{ backgroundColor: ink }} />
    <i style={{ backgroundColor: ink }} />
  </i>
);

const StyleEditor = (props) => {
  const { t } = useTranslation();
  const { settings } = props;
  const replacesCustom =
    settings.cardStyle !== CUSTOM_STYLE && settings.customCss.trim();

  return (
    <div className="style-editor">
      <button type="button" className="link-button back" onClick={props.onBack}>
        {t('style.back')}
      </button>
      <h3>{t('style.editor')}</h3>
      {replacesCustom && <p className="style-note">{t('style.replaces')}</p>}
      <textarea
        id="custom-css"
        autoFocus
        aria-label={t('style.editor')}
        spellCheck={false}
        placeholder=".wc-card { border-radius: 16px; }"
        value={activeCss(settings)}
        onChange={(e) =>
          props.onUpdate({ cardStyle: CUSTOM_STYLE, customCss: e.target.value })
        }
      />
      {props.droppedRules.length > 0 && (
        <p className="style-warning" role="alert">
          {t('style.warning.dropped')} {props.droppedRules.join(', ')}
        </p>
      )}
      {props.qrWarning && (
        <p className="style-warning" role="alert">
          {t(props.qrWarning)}
        </p>
      )}
      <details className="style-reference">
        <summary>{t('style.reference')}</summary>
        <dl>
          {CUSTOM_STYLE_CLASSES.map(([name, description]) => (
            <div key={name}>
              <dt>{name}</dt>
              <dd>{description}</dd>
            </div>
          ))}
        </dl>
      </details>
    </div>
  );
};

const SettingsGroup = ({ title, children }) => (
  <section className="settings-group">
    <h3>{title}</h3>
    {children}
  </section>
);

export const LanguageSelect = (props) => {
  const { t } = useTranslation();

  const langSelectDefaultValue = () => {
    const t = Translations.filter((t) => t.id === i18n.language);
    if (t.length !== 1) {
      return 'en-US';
    }
    return t[0].id;
  };

  return (
    <select
      id="language"
      aria-label={t('select')}
      onChange={(e) => props.onChange(e.target.value)}
      defaultValue={langSelectDefaultValue()}
    >
      {Translations.map((t) => (
        <option key={t.id} value={t.id}>
          {t.name}
        </option>
      ))}
    </select>
  );
};

export const Settings = (props) => {
  const { t } = useTranslation();
  const encryptionModes = [
    { label: t('wifi.password.encryption.none'), value: '' },
    { label: 'WPA/WPA2/WPA3', value: 'WPA' },
    { label: 'WPA2-EAP', value: 'WPA2-EAP' },
    { label: 'WEP', value: 'WEP' },
  ];
  const eapMethods = [{ label: 'PWD', value: 'PWD' }];
  const [editing, setEditing] = useState(false);
  const [editorVisited, setEditorVisited] = useState(false);
  const styleOptions = STYLE_PRESETS.map((preset) => ({
    label: t(`style.${preset.id}`),
    value: preset.id,
    swatch: <Swatch {...preset.swatch} />,
  }));
  styleOptions.push({
    label: t('style.custom'),
    value: CUSTOM_STYLE,
    swatch: <i className="swatch swatch-custom" aria-hidden="true" />,
  });
  const openEditor = () => {
    setEditorVisited(true);
    setEditing(true);
  };

  if (editing) {
    return (
      <div id="settings">
        <StyleEditor
          settings={props.settings}
          droppedRules={props.droppedRules}
          qrWarning={props.qrWarning}
          onUpdate={props.onUpdate}
          onBack={() => setEditing(false)}
        />
      </div>
    );
  }

  return (
    <div id="settings">
      <SettingsGroup title={t('settings.network')}>
        <SegmentedControl
          label={t('wifi.password.encryption')}
          name="encryption-mode"
          value={props.settings.encryptionMode}
          options={encryptionModes}
          onChange={(e) => props.onUpdate({ encryptionMode: e.target.value })}
        />
        {props.settings.encryptionMode === 'WPA2-EAP' && (
          <SegmentedControl
            label={t('wifi.encryption.eapMethod')}
            name="eap-method"
            value={props.settings.eapMethod}
            options={eapMethods}
            onChange={(e) => props.onUpdate({ eapMethod: e.target.value })}
          />
        )}
        <Checkbox
          label={t('wifi.name.hiddenSSID')}
          checked={props.settings.hiddenSSID}
          onChange={() =>
            props.onUpdate({ hiddenSSID: !props.settings.hiddenSSID })
          }
        />
      </SettingsGroup>

      <SettingsGroup title={t('settings.card')}>
        <SegmentedControl
          label={t('style.label')}
          name="card-style"
          value={props.settings.cardStyle}
          options={styleOptions}
          onChange={(e) => {
            props.onUpdate({ cardStyle: e.target.value });
            if (
              e.target.value === CUSTOM_STYLE &&
              !props.settings.customCss.trim()
            ) {
              openEditor();
            }
          }}
        />
        {props.qrWarning && (
          <p className="style-warning" role="alert">
            {t(props.qrWarning)}
          </p>
        )}
        <button
          type="button"
          className="link-button customize"
          autoFocus={editorVisited}
          onClick={openEditor}
        >
          {t('style.customize')}
        </button>
        <Checkbox
          label={t('button.rotate')}
          checked={props.settings.portrait}
          onChange={() =>
            props.onUpdate({ portrait: !props.settings.portrait })
          }
        />
        <Checkbox
          label={t('wifi.password.hide')}
          checked={props.settings.hidePassword}
          onChange={() =>
            props.onUpdate({ hidePassword: !props.settings.hidePassword })
          }
        />
        <Checkbox
          label={t('cards.tip.hide')}
          checked={props.settings.hideTip}
          onChange={() => props.onUpdate({ hideTip: !props.settings.hideTip })}
        />
      </SettingsGroup>

      <SettingsGroup title={t('settings.print')}>
        <div className="input-field">
          <label htmlFor="additional-cards">{t('cards.additional')}</label>
          <input
            id="additional-cards"
            type="number"
            min="1"
            value={props.settings.additionalCards}
            onChange={(e) =>
              props.onUpdate({ additionalCards: e.target.value })
            }
          />
        </div>
        <button id="print" type="button" onClick={props.onPrint}>
          {t('button.print')}
        </button>
      </SettingsGroup>
    </div>
  );
};
