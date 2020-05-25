export function transform (sNodes, id, pid, children) {
  // debugger
  let i
  let l
  const key = id// 自身id
  const parentKey = pid// 父id
  const childKey = children// 子
  if (!key || key === '' || !sNodes) return []
  if (Object.prototype.toString.call(sNodes) === '[object Array]') {
    const r = []
    const tmpMap = []
    for (i = 0, l = sNodes.length; i < l; i++) {
      tmpMap[sNodes[i][key]] = sNodes[i]
    }
    for (i = 0, l = sNodes.length; i < l; i++) {
      if (tmpMap[sNodes[i][parentKey]] && sNodes[i][key] !== sNodes[i][parentKey]) {
        if (!tmpMap[sNodes[i][parentKey]][childKey]) { tmpMap[sNodes[i][parentKey]][childKey] = [] }
        tmpMap[sNodes[i][parentKey]][childKey].push(sNodes[i])
      } else {
        r.push(sNodes[i])
      }
    }
    return r
  } else {
    return [sNodes]
  }
}
const nodeChildren = (childrenKey, node, newChildren) => {
  if (!node) {
    return null
  }
  const key = childrenKey
  if (typeof newChildren !== 'undefined') {
    node[key] = newChildren
  }
  return node[key]
}
/**
 * 把普通数组转为一颗树
 * @param {String,String} param0
 * @param {Array} sNodes
 */
export function transformToTreeFormat ({ key, parentKey }, sNodes) {
  //如果接受的字迹key值为空，则直接返回空数组
  if (!key || key === '' || !sNodes) return []
  const childrenKey = 'children'
  if (Object.prototype.toString.call(sNodes) === '[object Array]') {
    const r = []
    const tmpMap = {}
    for (let i = 0, l = sNodes.length; i < l; i += 1) {
      tmpMap[sNodes[i][key]] = sNodes[i]
    }

    for (let i = 0, l = sNodes.length; i < l; i += 1) {
      const p = tmpMap[sNodes[i][parentKey]]
      if (p && sNodes[i][key] !== sNodes[i][parentKey]) {
        let children = nodeChildren(childrenKey, p)
        if (!children) {
          children = nodeChildren(childrenKey, p, [])
        }
        children.push(sNodes[i])
      } else {
        r.push(sNodes[i])
      }
    }
    return r
  }
  return [sNodes]
}