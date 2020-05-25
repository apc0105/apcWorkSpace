// export function actionToObject (json) {
//   try {
//     return JSON.parse(json)
//   } catch (e) {
//     console.log('err', e.message)
//   }
//   return []
// }

import { getPermission } from '@/utils/auth'
// console.log(JSON.parse(getPermission()))
export function permissionHandle (permission) {
  let result = false
  const showaction = getPermission() === undefined ? [] : JSON.parse(getPermission())
  showaction.forEach(val => {
    if (val.url === permission) {
      // debugger
      result = true
      // return true
    }
  })
  return result
}
