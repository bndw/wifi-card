import {
  CameraIcon,
  Card,
  Heading,
  MobilePhoneIcon,
  Pane,
  Paragraph,
  Text,
  TextareaField,
  TextInput,
} from 'evergreen-ui';
import QRCode from 'qrcode.react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import logo from '../../src/images/wifi.png';
import './style.css';

export const LinkField = (props) => {
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
    let opts = {};

   
  }, [props.settings]);



  return (

    <Card
    className="card-print"
    elevation={3}
  >
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
          label={t('linkField.label')}
          placeholder={t('linkField.placeholder')}
          value={props.settings.ssid}
          onChange={(e) => props.onSSIDChange(e.target.value)}
          isInvalid={!!props.ssidError}
          validationMessage={!!props.ssidError && props.ssidError}
        />
      </Pane>
    </Card>
  );
};
