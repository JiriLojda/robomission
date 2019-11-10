import csLocaleData from 'react-intl/locale-data/cs';
import enLocaleData from 'react-intl/locale-data/en';
import { addLocaleData, IntlProvider } from 'react-intl';
import { getDomainLabels } from '../utils/url';
import messagesCs from './messages-cs.ts';
import messagesEn from './messages-en.ts';
import Text from './Text';


addLocaleData([...csLocaleData, ...enLocaleData]);
const availableDomains = ['cs', 'en'];
const defaultLocale = 'cs';
const allMessages = {
  cs: messagesCs,
  en: messagesEn,
};

function getPreferredLanguage() {
  return window.navigator.languages
    ? window.navigator.languages[0]
    : (window.navigator.language || window.navigator.userLanguage)
}

export function getLocale() {
  const browserPreferred = getPreferredLanguage();

  return availableDomains.includes(browserPreferred) ? browserPreferred : defaultLocale;
}


export function getLocalizationSetting() {
  const locale = getLocale();
  const messages = allMessages[locale];
  return { locale, messages };
}


// temporary hack to allow easily localizing non-component messages in 3rd
// party librarires (Blockly), TODO: unhack
const { intl } = new IntlProvider(getLocalizationSetting(), {}).getChildContext();

export function translate(id, values = {}) {
  return intl.formatMessage({ id, values });
}

export function possiblyTranslate(id, fallback) {
  const locale = getLocale();
  const messages = allMessages[locale];
  if (id in messages) {
    return translate(id);
  }
  return fallback;
}

export { Text };
