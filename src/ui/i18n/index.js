
import i18n from 'react-native-i18n';
export default i18n.t.bind(i18n);

i18n.fallbacks = true;

import * as enUS from './strings/en-us';
i18n.translations['en'] = enUS;
