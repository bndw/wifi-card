import React, { useState, useContext, useEffect } from 'react';
import { Card } from './components/Card';
import './style.css';
import logo from '../src/images/wifi.png';
import { LanguageContext } from './components/Language';
import intl from 'react-intl-universal';

const App = () => {
  const [locale, setLocale] = useState('en-US');
  const [localeInit, setlocaleInit] = useState(false);

  // app locale data
  const locales = {
    'en-US': require('./locales/en-US.js'),
    'zh-CN': require('./locales/zh-CN.js'),
  };

  const initIntl = async (locale) => {
    await intl.init({
      currentLocale: locale,
      locales,
    });
    console.log(`init intl: ${locale}`);
  };

  useEffect(() => {
    async function init() {
      await initIntl(locale);
      setlocaleInit(true);
    }
    init();
  }, []);

  return (
    localeInit && (
      <LanguageContext.Provider value={{ locale, setLocale }}>
        <div className="App">
          <h1>
            <img alt="icon" src={logo} width="32" height="32" />
            &nbsp; {intl.get('WiFi Card')}
          </h1>

          <p className="tag">{intl.get('App_Tips1')}</p>

          <p className="tag">
            {intl.get('App_Tips2')}{' '}
            <a href="https://github.com/bndw/wifi-card">
              {intl.get('source code')}
            </a>
            .
          </p>

          <Card />
        </div>
      </LanguageContext.Provider>
    )
  );
};

export default App;
