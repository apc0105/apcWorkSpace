import accounting from 'accounting'
import { number2text, money2cny } from '@/form-design/utils/stringUtils'

export default (tableDatas, elements, cell2element, startIndex = 0) => {
  const sums = [];
  const offset = startIndex
  elements.forEach((item, index) => {
    const cellData = cell2element(item)
    const elementData = cellData || {}
    const values = tableDatas.map(item => item[elementData.key]);
    const _index = index + offset
    if (item.sum == 1) {
      sums[_index] = values.reduce((prev, curr) => {
        const value = Number(accounting.unformat(curr));
        if (!isNaN(value)) {
          return prev + value;
        } else {
          return prev;
        }
      }, 0);
    } else {
      sums[_index] = null
    }
  })
  elements.forEach((item, index) => {
    const cellData = cell2element(item)
    const elementData = cellData || {}
    const _index = index + offset
    if (sums[_index] == null) {
      sums[_index] = '-'
    } else {
      const digit = elementData.digit || 0
      const currency = elementData.currency || '￥'
      const thousandth = ','
      let val = sums[_index]
      if (elementData.numberType == 'amount') {
        if (item.sumCny == 1) {
          val = money2cny(val, elementData.digit)
        } else {
          val = accounting.formatMoney(val, currency, digit, thousandth)
        }
      } else {
        if (item.sumCny == 1) {
          val = number2text(val, elementData.digit)
        } else {
          val = accounting.formatNumber(val, digit, thousandth)
        }
      }
      sums[_index] = `合计：${val}`
    }
  })
  return sums;
}
