const operatorMap = {
  '=': (a, b) => a == b,
  '>': (a, b) => a > b,
  '>=': (a, b) => a >= b,
  '<=': (a, b) => a <= b,
  '!=': (a, b) => a != b,
}


export default (show, vo) => {
  if (!show || !show.rules || show.rules.length == 0) {
    return true
  }
  let flag = 0;
  show.rules.forEach(rule => {
    if (operatorMap[rule.operator](rule.condition, vo[rule.prop])) {
      flag += 1
    }
  })
  if (show.logic == 'and') {
    return flag == show.rules.length
  } else {
    return flag > 0
  }
}
