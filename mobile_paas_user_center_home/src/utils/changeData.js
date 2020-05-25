export const localDate = function (value) {
  let date = new Date(value),
    Month = date.getMonth() + 1,
    Day = date.getDate(),
    //Day=parseInt(date / 60 / 60 / 24, 10);
    Hours = date.getHours(),
    // Hours = parseInt((date / 60 / 60) % 24, 10);
    Minutes = date.getMinutes(),
    // Minutes = parseInt((date / 60) % 60, 10);  这个转换的时间有点误差，不过倒计时可以用这个
    Seconds = date.getSeconds(),
    //Seconds = parseInt(date % 60, 10);  这个转换的时间有点误差，不过倒计时可以用这个
    Y = date.getFullYear() + '-',
    M = Month >= 10 ? Month + '' : '0' + Month + '-',
    D = Day >= 10 ? Day + ' ' : '0' + Day + ' ',
    H = Hours >= 10 ? Hours + ':' : '0' + Hours + ':',
    Mi = Minutes >= 10 ? Minutes + ':' : '0' + Minutes + ':',
    S = Seconds >= 10 ? Seconds : '0' + Seconds;
  return Y + M + D + H + Mi + S;
  // return Y + M + D;
  // return M + D;
}