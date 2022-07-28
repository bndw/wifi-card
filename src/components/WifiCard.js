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
import logo from '../../src/images/wifi.png';
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
    const password = !props.settings.encryptionMode
      ? ''
      : escape(props.settings.password);
    const qrval =
      props.settings.encryptionMode === 'WPA2-EAP'
        ? `WIFI:T:${props.settings.encryptionMode};S:${ssid};P:${password};H:${props.settings.hiddenSSID};E:${props.settings.eapMethod};I:${props.settings.eapIdentity};;`
        : `WIFI:T:${props.settings.encryptionMode};S:${ssid};P:${password};H:${props.settings.hiddenSSID};;`;
    setQrvalue(qrval);
  }, [props.settings]);

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

  return (
    <Pane>
      <Card
        id="print-area"
        elevation={3}
        style={{ maxWidth: props.settings.portrait ? portraitWidth() : '100%' }}
      >
        <Pane display="flex" paddingBottom={12}>
          <img alt="icon" src={logo} width="24" height="24" />
          <Heading
            size={700}
            paddingRight={10}
            paddingLeft={10}
            textAlign={props.settings.portrait ? 'center' : 'unset'}
          >
            {t('wifi.login')}
          </Heading>
        </Pane>

        <Pane
          className="details"
          style={{ flexDirection: props.settings.portrait ? 'column' : 'row' }}
        >
          <QRCode
            className="qrcode"
            style={{ padding: '1em' }}
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
              id="eapmethod"
              type="text"
              marginBottom={5}
              readOnly={true}
              spellCheck={false}
              className={`
                ${props.settings.encryptionMode !== 'WPA2-EAP' && 'hidden'}
              `}
              label={eapMethodFieldLabel()}
              value={props.settings.eapMethod}
            />
            <TextareaField
              id="identity"
              type="text"
              marginBottom={5}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="none"
              spellCheck={false}
              className={`
                ${props.settings.encryptionMode !== 'WPA2-EAP' && 'hidden'}
              `}
              label={eapIdentityFieldLabel()}
              placeholder={t('wifi.identity.placeholder')}
              value={props.settings.eapIdentity}
              onChange={(e) => props.onEapIdentityChange(e.target.value)}
              isInvalid={!!props.eapIdentityError}
              validationMessage={
                !!props.eapIdentityError && props.eapIdentityError
              }
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
                ${
                  (props.settings.hidePassword ||
                    !props.settings.encryptionMode) &&
                  'hidden'
                }
              `}
              height={
                props.settings.portrait && props.settings.password.length > 40
                  ? '5em'
                  : 'auto'
              }
              label={passwordFieldLabel()}
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
          <Text size={300} paddingRight={8} paddingLeft={8}>
            {t('wifi.tip')}
          </Text>
        </Paragraph>
      </Card>
    </Pane>
  );
};
