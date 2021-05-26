/**
 * 时间格式化函数
 * @param {String} type 传入时间类型，默认为时间戳
 * @param {Number} time 时间戳
 * @param {String} formatMethod 格式化方式，默认英文 yyyy-MM-dd D hh:mm:ss
 * @returns 格式化后的字符串
 */
export const timeFormatter = (type = 'timestamp', time, formatMethod = 'yyyy-MM-dd D hh:mm:ss') => {
  let currentTime;
  switch (type) {
    case 'timestamp':
      currentTime = new Date(time);
      break;
    default:
      currentTime = new Date(time);
      break;
  }
  const year = currentTime.getFullYear();
  const month = currentTime.getMonth() + 1;
  const date = currentTime.getDate();
  const day = currentTime.getDay();
  const chineseWeekDay = ['天', '一', '二', '三', '四', '五', '六'];
  const englishWeekDay = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const englishWeekDayFull = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const hour = currentTime.getHours();
  const minute = currentTime.getMinutes();
  const second = currentTime.getSeconds();
  // 两位日期转换
  const doubleMonth = month < 10 ? '0' + month : month;
  const doubleDate = date < 10 ? '0' + date : date;
  const doubleHour = hour < 10 ? '0' + hour : hour;
  const doubleMinute = minute < 10 ? '0' + minute : minute;
  const doubleSecond = second < 10 ? '0' + second : second;

  switch (formatMethod) {
    case 'yyyy-MM-dd DD hh:mm:ss':
      return year + '-' + doubleMonth + '-' + doubleDate + ' ' + englishWeekDayFull[day] + ' ' + doubleHour + ':' + doubleMinute + ':' + doubleSecond
    case 'yyyy-MM-dd DD hh:mm':
      return year + '-' + doubleMonth + '-' + doubleDate + ' ' + englishWeekDayFull[day] + ' ' + doubleHour + ':' + doubleMinute
    case 'yyyy-MM-dd DD':
      return year + '-' + doubleMonth + '-' + doubleDate + ' ' + englishWeekDayFull[day] + ' '

    case 'yyyy-MM-dd D hh:mm:ss':
      return year + '-' + doubleMonth + '-' + doubleDate + ' ' + englishWeekDay[day] + ' ' + doubleHour + ':' + doubleMinute + ':' + doubleSecond
    case 'yyyy-MM-dd D hh:mm':
      return year + '-' + doubleMonth + '-' + doubleDate + ' ' + englishWeekDay[day] + ' ' + doubleHour + ':' + doubleMinute
    case 'yyyy-MM-dd D':
      return year + '-' + doubleMonth + '-' + doubleDate + ' ' + englishWeekDay[day] + ' '

    case 'yyyy-MM-dd hh:mm:ss':
      return year + '-' + doubleMonth + '-' + doubleDate + ' ' + doubleHour + ':' + doubleMinute + ':' + doubleSecond
    case 'yyyy-MM-dd hh:mm':
      return year + '-' + doubleMonth + '-' + doubleDate + ' ' + doubleHour + ':' + doubleMinute
    case 'yyyy-MM-dd':
      return year + '-' + doubleMonth + '-' + doubleDate

    case 'yyyy/MM/dd hh:mm:ss':
      return year + '/' + doubleMonth + '/' + doubleDate + ' ' + doubleHour + ':' + doubleMinute + ':' + doubleSecond
    case 'yyyy/MM/dd hh:mm':
      return year + '/' + doubleMonth + '/' + doubleDate + ' ' + doubleHour + ':' + doubleMinute
    case 'yyyy/MM/dd':
      return year + '/' + doubleMonth + '/' + doubleDate

    case 'hh:mm:ss':
      return doubleHour + ':' + doubleMinute + ':' + doubleSecond
    case 'hh:mm':
      return doubleHour + ':' + doubleMinute
    case 'hh':
      return doubleHour

    case 'yyyy年MM月dd日 星期 hh:mm:ss':
      return year + '年' + doubleMonth + '月' + doubleDate + '日 星期' + chineseWeekDay[day] + ' ' + doubleHour + ':' + doubleMinute + ':' + doubleSecond
    case 'yyyy年MM月dd日 星期 hh:mm':
      return year + '年' + doubleMonth + '月' + doubleDate + '日 星期' + chineseWeekDay[day] + ' ' + doubleHour + ':' + doubleMinute
    case 'yyyy年MM月dd日 星期':
      return year + '年' + doubleMonth + '月' + doubleDate + '日 星期' + chineseWeekDay[day]

    case 'yyyy年MM月dd日 hh:mm:ss':
      return year + '年' + doubleMonth + '月' + doubleDate + '日' + doubleHour + ':' + doubleMinute + ':' + doubleSecond
    case 'yyyy年MM月dd日 hh:mm':
      return year + '年' + doubleMonth + '月' + doubleDate + '日' + doubleHour + ':' + doubleMinute + ':' + doubleSecond
    case 'yyyy年MM月dd日':
      return year + '年' + doubleMonth + '月' + doubleDate + '日'

    default:
      return year + '-' + doubleMonth + '-' + doubleDate + ' ' + englishWeekDay[day] + ' ' + doubleHour + ':' + doubleMinute + ':' + doubleSecond
  }
}