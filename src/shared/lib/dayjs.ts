import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';

export const initDayJs = () => {
  dayjs.locale('ko');
  dayjs.extend(localizedFormat);
};
