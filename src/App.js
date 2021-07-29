import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from './components/Card';
import './style.css';
import logo from '../src/images/wifi.png';

/* List of languages that require RTL direction (alphabetic order). */
const RTL_LANGUAGES = ['ar', 'fa-IR'];

function App() {
  const html = document.querySelector('html');
  const { t, i18n } = useTranslation();

  const changeLanguage = (language) => {
    html.style.direction = RTL_LANGUAGES.includes(language) ? 'rtl' : 'ltr';
    i18n.changeLanguage(language);
  };

  /* handle the edge case of the initial render requiring RTL direction */
  if (RTL_LANGUAGES.includes(i18n.language)) {
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
          <option value="en-US">en-US</option>
          <option value="zh-HK">繁體中文🇭🇰</option>
          <option value="zh-CN">简体中文</option>
          <option value="es">es</option>
          <option value="pt">Português</option>
          <option value="ja">日本語</option>
          <option value="fa-IR">Persian</option>
          <option value="ru-RU">Русский</option>
          <option value="uk-UA">Українська</option>
          <option value="nl-NL">Nederlands</option>
          <option value="fr-FR">French - FR (Français)</option>
          <option value="pt-BR">pt-BR</option>
          <option value="tr-TR">Turkish (Türkçe)</option>
          <option value="ar">Arabic - العربية</option>
          <option value="hi-IN">Hindi (हिन्दी)</option>
        </select>
      </div>

      <p className="tag">{t('desc.use')}</p>

      <p className="tag">
        {t('desc.privacy')}{' '}
        <a href="https://github.com/bndw/wifi-card">{t('desc.source')}</a>.
      </p>

      <Card direction={RTL_LANGUAGES.includes(i18n.language) ? 'rtl' : 'ltr'} />
    </div>
  );
}

export default App;
