import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from './components/Card';
import './style.css';
import logo from '../src/images/wifi.png';

function App() {
  const { t, i18n } = useTranslation();

  return (
    <div className="App">
      <h1>
        <img alt="icon" src={logo} width="32" height="32" />
        &nbsp; {t('title')}
      </h1>

      <div>
        <label>{t('select')}</label>
        <select onChange={(e) => i18n.changeLanguage(e.target.value)}>
          <option value="en-US">en-US</option>
          <option value="简体中文">简体中文</option>
          <option value="pt-BR">pt-BR</option
          <option value="es">es</option>
        </select>
      </div>

      <p className="tag">{t('desc.use')}</p>

      <p className="tag">
        {t('desc.privacy')}{' '}
        <a href="https://github.com/bndw/wifi-card">{t('desc.source')}</a>.
      </p>

      <Card />
    </div>
  );
}

export default App;
