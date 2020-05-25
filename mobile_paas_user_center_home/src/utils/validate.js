/**
 * Created by jiachenpan on 16/11/18.
 */

export function isvalidUsername (str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

/* 合法uri */
export function validateURL (textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return urlregex.test(textval)
}
export function checkUrl (rule, value, callback) {
  if (!validateURL(value)) {
    callback(new Error('请输入正确的URL'))
  } else {
    callback()
  }
}
// export function checkUrl(urlString) {
//   var reg = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/
//   return reg.test(urlString)
// }
/* 小写字母 */
export function validateLowerCase (str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/* 大写字母 */
export function validateUpperCase (str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/* 大小写字母 */
export function validatAlphabets (str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

// 手机号验证
export function isvalidPhone (str) {
  const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
  return reg.test(str)
}

// 非空验证
export function isvalidRequire (str) {
  const reg = /[#\$\^\&\*<>\?\{\}\\\[\]\"]/
  if (str) {
    if (reg.test(str)) {
      return false
    } else if (str.trim() !== '') {
      return true
    } else {
      return false
    }
  }
}
// 特殊字符验证
export function isvalidSpecial (str) {
  if (str) {
    if (str.length !== 0) {
      const reg = /[#\ \$\^\&\*<>\?\{\}\\\[\]\"]/
      return !reg.test(str)
    } else {
      return true
    }
  } else {
    return true
  }
}

// 数字验证
export function isvalidNumber (str) {
  if (str) {
    if (str.length !== 0) {
      const reg = /^[0-9]+$/
      return reg.test(str)
    } else {
      return true
    }
  }
}
// 金额验证（保留两位小数）
export function isvalidMoney (str) {
  if (str) {
    if (str.length !== 0) {
      const reg = /(^(([1-9]{1}\d*)|(0{1}))(\.\d{1,2})?$)/
      return reg.test(str)
    } else {
      return true
    }
  }
}

// 固话校验
export function isGmobile (str) {
  const reg = /^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/
  return reg.test(str)
}
// 中文校验

export function isvalidChinese (str) {
  const reg = /[\u4e00-\u9fa5]/
  return reg.test(str)
}
// 身份证号
export function isvalidIdCard (str) {
  const reg = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/
  return reg.test(str)
}

// 汉字，字母校验
export function isvalidWord (str) {
  const reg = /^[\u4E00-\u9FA5A-Za-z0-9.]+$/
  return reg.test(str)
}

// 数字跟字母

export function isvalidNumWord (str) {
  const reg = /^(?![^a-zA-Z]+$)(?!\D+$)/
  return reg.test(str)
}
// 字母跟数字
export function isvalidNumLetter (str) {
  const reg = /[^\w\.\/]/
  return reg.test(str)
}
export function checkData (rule, value, callback) {
  if (value) {
    if (/[\u4E00-\u9FA5]/g.test(value) || !isvalidSpecial(value)) {
      callback(new Error('不能输入汉字和特殊字符!'))
    } else {
      callback()
    }
  }
  callback()
}
export function checkDataxi (rule, value, callback) {
  if (value) {
    if (/[\u4E00-\u9FA5]/g.test(value)) {
      callback(new Error('不能输入汉字!'))
    } else {
      callback()
    }
  }
  callback()
}
// 非空
export function validateRequire (rule, value, callback) {
  if (!isvalidRequire(value)) {
    callback(new Error('请输入必填项'))
  } else {
    callback()
  }
}
// 数字验证
export function validNumber (rule, value, callback) {
  if (!isvalidNumber(value)) {
    callback(new Error('只能输入数字，且为正整数'))
  } else {
    callback()
  }
}
// 金额验证
export function validMoney (rule, value, callback) {
  if (!isvalidMoney(value)) {
    callback(new Error('只能输入数字,最多保留两位小数'))
  } else {
    callback()
  }
}
// 数字验证
export function validNumberWord (rule, value, callback) {
  if (!isvalidNumWord(value)) {
    callback(new Error('密码至少包含数字跟字母'))
  } else {
    callback()
  }
}
// 手机号
export function validPhone (rule, value, callback) {
  if (!value) {
    callback(new Error('请输入电话号码'))
  } else if (!isvalidPhone(value)) {
    callback(new Error('请输入正确的11位手机号码'))
  } else {
    callback()
  }
}
// 只能输入字母
export function isValidatAlphabets (rule, value, callback) {
  if (!validatAlphabets(value)) {
    callback(new Error('数据只能输入字母'))
  } else {
    callback()
  }
}
// 非空
export function validRequire (rule, value, callback) {
  if (!value) {
    callback(new Error('请选择所属单位'))
  } else {
    callback()
  }
}
// 身份证号
export function validId (rule, value, callback) {
  if (!value) {
    callback(new Error('请输入身份证号码'))
  } else if (!isvalidIdCard(value)) {
    callback(new Error('请输入正确的身份证号码'))
  } else {
    callback()
  }
}

// 汉字跟字母
export function validWord (rule, value, callback) {
  if (!value) {
    callback(new Error(''))
  } else if (!isvalidWord(value)) {
    callback(new Error('只能输入汉字或字母'))
  } else {
    callback()
  }
}

export function validateLength (rule, value, callback) {
  if (parseInt(value) > 100) {
    callback(new Error('信息完整度不能超过100%'))
  } else {
    callback()
  }
}
// 特殊字符
export function validSpecial (rule, value, callback) {
  if (!isvalidSpecial(value)) {
    callback(new Error('数据不能包含特殊字符'))
  } else {
    callback()
  }
}

// 中文
export function validateChinese (rule, value, callback) {
  if (!isvalidChinese(value)) {
    callback(new Error('只能输入中文'))
  } else {
    callback()
  }
}

// 中文
export function validateGmobile (rule, value, callback) {
  if (!isGmobile(value)) {
    callback(new Error('固话格式错误'))
  } else {
    callback()
  }
}
