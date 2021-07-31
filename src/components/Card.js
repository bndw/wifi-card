import { Card as ECard, Pane } from 'evergreen-ui';
import QRCode from 'qrcode.react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './style.css';

export const Card = (props) => {
  const { t } = useTranslation();
  const [qrvalue, setQrvalue] = useState('');

  const escape = (v) => {
    const needsEscape = ['"', ';', ',', ':', '\\'];

    let escaped = '';
    for (const c of v) {
      if (needsEscape.includes(c)) {
        escaped += `\\${c}`;
      } else {
        escaped += c;
      }
    }
    return escaped;
  };

  useEffect(() => {
    const ssid = escape(props.settings.ssid);
    const password =
      props.settings.encryptionMode === 'nopass'
        ? ''
        : escape(props.settings.password);
    setQrvalue(
      `WIFI:T:${props.settings.encryptionMode};S:${ssid};P:${password};;`
    );
  }, [props.settings]);

  const setEncryptionMode = (e) =>
    setNetwork({
      ...network,
      encryptionMode: e.target.value,
    });

  const checkDirectionAndSetPadding =
    direction === 'ltr' ? { paddingRight: '1em' } : { paddingLeft: '1em' };

  return (
    <Pane>
      <ECard
        id="print-area"
        elevation={3}
        style={{ maxWidth: props.settings.portrait ? '350px' : '100%' }}
      >
        <h1 style={{ textAlign: props.settings.portrait ? 'center' : 'unset' }}>
          {t('wifi.login')}
        </h1>

        <div
          className="details"
          style={{ flexDirection: props.settings.portrait ? 'column' : 'row' }}
        >
          <QRCode
            className="qrcode"
            style={
              !props.settings.portrait
                ? props.direction === 'ltr'
                  ? { paddingRight: '1em' }
                  : { paddingLeft: '1em' }
                : {}
            }
            value={qrvalue}
            size={175}
          />

          <div className="inputs">
            <label>{t('wifi.name')}</label>
            <textarea
              id="ssid"
              type="text"
              maxLength="32"
              placeholder={t('wifi.name.placeholder')}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="none"
              spellCheck="false"
              value={props.settings.ssid}
              onChange={(e) => props.onSSIDChange(e.target.value)}
            />
            <label
              className={`
                ${props.settings.hidePassword && 'no-print hidden'}
                ${props.settings.encryptionMode === 'nopass' && 'hidden'}
              `}
            >
              {t('wifi.password')}
            </label>
            <textarea
              id="password"
              type="text"
              className={`
                ${props.settings.hidePassword && 'no-print hidden'}
                ${props.settings.encryptionMode === 'nopass' && 'hidden'}
              `}
              style={{
                height:
                  props.settings.portrait && props.settings.password.length > 40
                    ? '5em'
                    : 'auto',
              }}
              maxLength="63"
              placeholder={t('wifi.password.placeholder')}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="none"
              spellCheck="false"
              value={props.settings.password}
              onChange={(e) => props.onPasswordChange(e.target.value)}
            />
          </div>
        </div>
        <hr />
        <p>
          <span role="img" aria-label="mobile-phone">
            📸📱
          </span>
          {t('wifi.tip')}
        </p>
      </ECard>
    </Pane>
  );
};
