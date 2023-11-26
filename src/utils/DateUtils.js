window.__USER_LANG = navigator.language || 'pt-BR';
import _ from 'lodash';

class DateUtils {
  parse(date) {
    try {
      if (_.isNumber(date)) {
        date = new Date(date);
      } else if (_.isString(date)) {
        if (!date.includes('T')) {
          date += 'T00:00:00';
        }
        date = new Date(date);
      }
    } catch (e) {
      console.warn(`Error while parsing [${date}] as Date`, e);
    }
    return date;
  }

  toSafeDateObject(value) {
    return new Date(`${value}T12:00:00`);
  }

  formatDate(date) {
    date = this.parse(date);
    return date?.toLocaleDateString?.(window.__USER_LANG) ?? '';
  }

  toISOFormat(date) {
    return new Date(date).toISOString().split('T')[0];
  }

  diffInMonths(date1, date2) {
    date1 = this.parse(date1);
    date2 = this.parse(date2);
    const monthDiff = date1.getMonth() - date2.getMonth();
    const yearDiff = date1.getYear() - date2.getYear();

    return monthDiff + yearDiff * 12;
  }
}

export default new DateUtils();
