import * as Localization from 'expo-localization';
import { NativeModules } from 'react-native';
import { EN, RU } from '~constants/languages';

const detectLanguage = () => {
  // Prefer new expo-localization API when available
  const firstLocale = (Localization as any)?.getLocales?.()[0];
  const fromGetLocales = firstLocale?.languageCode
    ? String(firstLocale.languageCode)
    : undefined;

  const localeCode = (fromGetLocales || (Localization as any)?.locale || NativeModules?.I18nManager?.localeIdentifier || EN).toString();
  const normalized = localeCode.replace(/-/g, '_').toLowerCase();
  const languagePart = normalized.split('_')[0];
  return languagePart === RU ? RU : EN;
};

export default detectLanguage;
