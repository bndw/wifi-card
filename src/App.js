import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from './components/Card';
import './style.css';
import logo from '../src/images/wifi.png';

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
          <option value="en-US">en-US</option>
          <option value="zh-CN">简体中文</option>
          <option value="es">es</option>
          <option value="pt">Português</option>
          <option value="ja">日本語</option>
          <option value="fa-IR">Persian</option>
          <option value="ru-RU">Русский</option>
          <option value="uk-UA">Українська</option>
          <option value="nl-NL">Nederlands</option>
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
