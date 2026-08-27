import { QRCodeSVG as QRCode } from 'qrcode.react';
import { useTranslation } from 'react-i18next';
import logo from '../images/wifi.png';
import './style.css';

const escape = (v) => v.replace(/([\\";,:])/g, '\\$1');

const buildQrValue = (settings) => {
  let opts = {};

  opts.T = settings.encryptionMode || 'nopass';
  if (settings.encryptionMode === 'WPA2-EAP') {
    opts.E = settings.eapMethod;
    opts.I = settings.eapIdentity;
  }
  opts.S = escape(settings.ssid);
  opts.P = escape(settings.password);
  if (settings.hiddenSSID) {
    opts.H = true;
  }

  let data = '';
  Object.entries(opts).forEach(([k, v]) => (data += `${k}:${v};`));
  return `WIFI:${data};`;
};

const CameraIcon = () => (
  <svg
    className="tip-icon"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
    <circle cx="12" cy="13" r="4" />
  </svg>
);

const MobilePhoneIcon = () => (
  <svg
    className="tip-icon"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="6" y="2" width="12" height="20" rx="2" />
    <line x1="10" y1="18" x2="14" y2="18" />
  </svg>
);

const TextareaField = ({ id, label, validationMessage, style, ...rest }) => (
  <div className="input-field">
    <label htmlFor={id}>{label}</label>
    <textarea
      id={id}
      aria-invalid={!!validationMessage || undefined}
      style={style}
      {...rest}
    />
    {validationMessage ? (
      <p className="error-message" role="alert">
        {validationMessage}
      </p>
    ) : null}
  </div>
);

export const WifiCard = (props) => {
  const { t } = useTranslation();
  const qrvalue = buildQrValue(props.settings);

  const portraitWidth = () => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    return isMobile ? '100%' : '280px';
  };

  const passwordFieldLabel = () => {
    const hiddenPassword =
      props.settings.hidePassword || !props.settings.encryptionMode;
    return hiddenPassword ? '' : t('wifi.password');
  };

  const eapIdentityFieldLabel = () => {
    const hiddenIdentity = props.settings.encryptionMode !== 'WPA2-EAP';
    return hiddenIdentity ? '' : t('wifi.identity');
  };

  const eapMethodFieldLabel = () => {
    return !eapIdentityFieldLabel() ? '' : t('wifi.encryption.eapMethod');
  };

  const keyid = props.keyid ?? '';
  const suffixKeyID = (prefix) => `${prefix}-${keyid}`;

  return (
    <div
      className="card-print"
      style={{ maxWidth: props.settings.portrait ? portraitWidth() : '100%' }}
    >
      <div className="card-header">
        <img alt="icon" src={logo} width="24" height="24" />
        <h2
          style={{
            textAlign: props.settings.portrait ? 'center' : 'unset',
          }}
        >
          {t('wifi.login')}
        </h2>
      </div>

      <div
        className="details"
        style={{ flexDirection: props.settings.portrait ? 'column' : 'row' }}
      >
        <QRCode
          className="qrcode"
          style={{ marginBottom: props.settings.portrait ? '1em' : '0' }}
          value={qrvalue}
          size={150}
        />

        <div className="card-fields">
          <TextareaField
            id={suffixKeyID('ssid')}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="none"
            spellCheck={false}
            maxLength="32"
            label={t('wifi.name')}
            placeholder={t('wifi.name.placeholder')}
            value={props.settings.ssid}
            onChange={(e) => props.onUpdate({ ssid: e.target.value })}
            validationMessage={!!props.ssidError && props.ssidError}
          />
          {props.settings.encryptionMode === 'WPA2-EAP' && (
            <>
              <TextareaField
                id={suffixKeyID('eapmethod')}
                readOnly={true}
                spellCheck={false}
                label={eapMethodFieldLabel()}
                value={props.settings.eapMethod}
              />

              <TextareaField
                id={suffixKeyID('identity')}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="none"
                spellCheck={false}
                label={eapIdentityFieldLabel()}
                placeholder={t('wifi.identity.placeholder')}
                value={props.settings.eapIdentity}
                onChange={(e) =>
                  props.onUpdate({ eapIdentity: e.target.value })
                }
                validationMessage={
                  !!props.eapIdentityError && props.eapIdentityError
                }
              />
            </>
          )}
          {!(props.settings.hidePassword || !props.settings.encryptionMode) && (
            <TextareaField
              id={suffixKeyID('password')}
              maxLength="63"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="none"
              spellCheck={false}
              style={
                props.settings.portrait && props.settings.password.length > 40
                  ? { height: '5em' }
                  : undefined
              }
              label={passwordFieldLabel()}
              placeholder={t('wifi.password.placeholder')}
              value={props.settings.password}
              onChange={(e) => props.onUpdate({ password: e.target.value })}
              validationMessage={!!props.passwordError && props.passwordError}
            />
          )}
        </div>
      </div>
      {!props.settings.hideTip && (
        <>
          <hr />
          <p className="tip">
            <CameraIcon />
            <MobilePhoneIcon />
            <span className="tip-text">{t('wifi.tip')}</span>
          </p>
        </>
      )}
    </div>
  );
};
