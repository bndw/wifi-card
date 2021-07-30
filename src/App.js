import React from 'react';
import { useTranslation } from 'react-i18next';
import logo from '../src/images/wifi.png';
import { Card } from './components/Card';
import './style.css';

function App() {
  const html = document.querySelector('html');
  const { t, i18n } = useTranslation();

  const changeLanguage = (language) => {
    if (language === 'fa-IR') {
      html.style.direction = 'rtl';
    } else {
      html.style.direction = 'ltr';
    }
    i18n.changeLanguage(language);
  };

  if (i18n.language === 'fa-IR') {
    html.style.direction = 'rtl';
  }

  return (
    <div className="App">
      <h1>
        <img alt="icon" src={logo} width="32" height="32" />
        &nbsp; {t('title')}
      </h1>

      <div>
        <label>{t('select')}</label>
        <select
          value={i18n.language}
          onChange={(e) => changeLanguage(e.target.value)}
        >
          <option value="en-US">English - US (English)</option>
          <option value="zh-HK">Chinese - Hong Kong (简体中文)</option>
          <option value="zh-CN">Chinese - Simplified (简体中文)</option>
          <option value="es">Spanish (Español)</option>
          <option value="pt">Portuguese (Português)</option>
          <option value="pt-BR">Portuguese (Brazil)</option>
          <option value="ja">Japanese (日本語)</option>
          <option value="fa-IR">Persian - Iran (فارسی)</option>
          <option value="ru-RU">Russian - Russia (Русский)</option>
          <option value="uk-UA">Ukrainian - Ukraine (Українська)</option>
          <option value="nl-NL">Dutch - Netherlands (Nederlands)</option>
          <option value="fr-FR">French - FR (Français)</option>
          <option value="tr-TR">Turkish - Turkey (Türkçe)</option>
          <option value="hi-IN">Hindi - India (हिन्दी)</option>
          <option value="ca">Catalan (català)</option>
          <option value="pl-PL">Polish - Poland (polski)</option>
        </select>
      </div>

      <p className="tag">{t('desc.use')}</p>

      <p className="tag">
        {t('desc.privacy')}{' '}
        <a href="https://github.com/bndw/wifi-card">{t('desc.source')}</a>.
      </p>

      <Card direction={i18n.language === 'fa-IR' ? 'rtl' : 'ltr'} />
    </div>
  );
}

export default App;
