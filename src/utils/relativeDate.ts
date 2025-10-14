import isToday from 'date-fns/isToday';
import isYesterday from 'date-fns/isYesterday';
import i18n from '~translations/i18n';
import { RU } from '~constants/languages';
import { getT } from '~translations/i18n';

const showRelativeDate = (date: number) => {
  if (isToday(new Date(date))) {
    return getT('common')('today');
  } else if (isYesterday(new Date(date))) {
    return getT('common')('yesterday');
  } else {
    const locale = i18n.language === RU ? 'ru-RU' : 'en-EN';
    return new Date(date).toLocaleDateString(locale);
  }
};

export default showRelativeDate;
