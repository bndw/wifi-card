import {
  CameraIcon,
  Card,
  Heading,
  MobilePhoneIcon,
  Pane,
  Paragraph,
  Text,
  TextareaField,
} from 'evergreen-ui';
import QRCode from 'qrcode.react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './style.css';

export const WifiCard = (props) => {
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
      <Card
        id="print-area"
        elevation={3}
        style={{ maxWidth: props.settings.portrait ? '350px' : '100%' }}
      >
        <Heading
          size={700}
          textAlign={props.settings.portrait ? 'center' : 'unset'}
        >
          {t('wifi.login')}
        </Heading>

        <Pane
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
            size={150}
          />

          <Pane width={'100%'}>
            <TextareaField
              id="ssid"
              type="text"
              marginBottom={5}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="none"
              spellCheck={false}
              maxLength="32"
              label={t('wifi.name')}
              placeholder={t('wifi.name.placeholder')}
              value={props.settings.ssid}
              onChange={(e) => props.onSSIDChange(e.target.value)}
              isInvalid={!!props.ssidError}
              validationMessage={!!props.ssidError && props.ssidError}
            />
            <TextareaField
              id="password"
              type="text"
              maxLength="63"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="none"
              spellCheck={false}
              className={`
                ${props.settings.hidePassword && 'no-print hidden'}
                ${props.settings.encryptionMode === 'nopass' && 'hidden'}
              `}
              height={
                props.settings.portrait && props.settings.password.length > 40
                  ? '5em'
                  : 'auto'
              }
              label={t('wifi.password')}
              placeholder={t('wifi.password.placeholder')}
              value={props.settings.password}
              onChange={(e) => props.onPasswordChange(e.target.value)}
              isInvalid={!!props.passwordError}
              validationMessage={!!props.passwordError && props.passwordError}
            />
          </Pane>
        </Pane>
        <hr />
        <Paragraph>
          <CameraIcon />
          <MobilePhoneIcon />
          <Text paddingLeft={8}>{t('wifi.tip')}</Text>
        </Paragraph>
      </Card>
    </Pane>
  );
};
