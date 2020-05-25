/**
 * 字符串转化为数字
 * @param val
 * @returns {number}
 */
export const str2number = (val, digit) => {
  try {
    if (digit > 0 && endWithDot(val)) {
      return val
    }
    const n = Number.parseFloat(val)
    return Number.isNaN(n) ? 0 : n
  } catch (e) {
    return 0
  }
}


export const endWithDot = val => {
  if (val && typeof val == 'string' && val.substring(val.length - 1) == '.') {
    return true
  } else {
    return false
  }
}

export const hashCode = (str) => {
  var hash = 0;
  if (str.length == 0) return hash;
  for (var i = 0; i < str.length; i++) {
    var c = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + c;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
}

/** 数字金额大写转换(可以处理整数,小数,负数) */
export const number2text = (n = 0, digitLength = 0) => {
  var digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
  var unit = [['点', '万', '亿'], ['', '拾', '佰', '仟']];
  var head = n < 0 ? '欠' : '';
  n = Math.abs(n);
  var s = '';
  for (var i = 0; i < digitLength; i++) {
    s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + '').replace(/零./, '');
  }
  s = s || '';
  n = Math.floor(n);

  for (var i = 0; i < unit[0].length && n > 0; i++) {
    var p = '';
    for (var j = 0; j < unit[1].length && n > 0; j++) {
      p = digit[n % 10] + unit[1][j] + p;
      n = Math.floor(n / 10);
    }
    s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
  }
  return head + s;
}

/** 数字金额大写转换(可以处理整数,小数,负数) */
export const money2cny = (n = 0) => {
  var fraction = ['角', '分'];
  var digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
  var unit = [['元', '万', '亿'], ['', '拾', '佰', '仟']];
  var head = n < 0 ? '欠' : '';
  n = Math.abs(n);
  var s = '';
  for (var i = 0; i < fraction.length; i++) {
    s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
  }
  s = s || '整';
  n = Math.floor(n);

  for (var i = 0; i < unit[0].length && n > 0; i++) {
    var p = '';
    for (var j = 0; j < unit[1].length && n > 0; j++) {
      p = digit[n % 10] + unit[1][j] + p;
      n = Math.floor(n / 10);
    }
    s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
  }
  return head + s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整');
}
