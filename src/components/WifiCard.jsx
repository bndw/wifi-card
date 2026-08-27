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
    <Card
      className="card-print"
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
          style={{ marginBottom: props.settings.portrait ? '1em' : '0' }}
          value={qrvalue}
          size={150}
        />

        <Pane width={'100%'}>
          <TextareaField
            id={suffixKeyID('ssid')}
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
            onChange={(e) => props.onUpdate({ ssid: e.target.value })}
            isInvalid={!!props.ssidError}
            validationMessage={!!props.ssidError && props.ssidError}
          />
          {props.settings.encryptionMode === 'WPA2-EAP' && (
            <>
              <TextareaField
                id={suffixKeyID('eapmethod')}
                type="text"
                marginBottom={5}
                readOnly={true}
                spellCheck={false}
                label={eapMethodFieldLabel()}
                value={props.settings.eapMethod}
              />

              <TextareaField
                id={suffixKeyID('identity')}
                type="text"
                marginBottom={5}
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
                isInvalid={!!props.eapIdentityError}
                validationMessage={
                  !!props.eapIdentityError && props.eapIdentityError
                }
              />
            </>
          )}
          {!(props.settings.hidePassword || !props.settings.encryptionMode) && (
            <TextareaField
              id={suffixKeyID('password')}
              type="text"
              maxLength="63"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="none"
              spellCheck={false}
              height={
                props.settings.portrait && props.settings.password.length > 40
                  ? '5em'
                  : 'auto'
              }
              marginBottom={5}
              label={passwordFieldLabel()}
              placeholder={t('wifi.password.placeholder')}
              value={props.settings.password}
              onChange={(e) => props.onUpdate({ password: e.target.value })}
              isInvalid={!!props.passwordError}
              validationMessage={!!props.passwordError && props.passwordError}
            />
          )}
        </Pane>
      </Pane>
      {!props.settings.hideTip && (
        <>
          <hr />
          <Paragraph>
            <CameraIcon />
            <MobilePhoneIcon />
            <Text size={300} paddingRight={8} paddingLeft={8}>
              {t('wifi.tip')}
            </Text>
          </Paragraph>
        </>
      )}
    </Card>
  );
};
