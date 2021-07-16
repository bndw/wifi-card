import { createContext, useContext } from 'react';
import intl from 'react-intl-universal';

// common locale data
require('intl/locale-data/jsonp/en.js');
require('intl/locale-data/jsonp/zh.js');

export const LanguageContext = createContext({
  lang: 'en-US',
});

export const Language = () => {
  const { setLocale } = useContext(LanguageContext);

  // app locale data
  const locales = {
    'en-US': require('../locales/en-US.js'),
    'zh-CN': require('../locales/zh-CN.js'),
  };

  const initIntl = async (locale) => {
    await intl.init({
      currentLocale: locale,
      locales,
    });
    console.log(`init intl: ${locale}`);
  };

  const onChange = (event) => {
    initIntl(event.target.value);
    // update context to rerender all relative components
    setLocale(event.target.value);
  };

  return (
    <div>
      <p style={{ width: '200em' }}>
        {intl.get('Choose Language')}：
        <select onChange={onChange} defaultValue="en-US">
          <option value="en-US">English</option>
          <option value="zh-CN">中文</option>
        </select>
      </p>
    </div>
  );
};
