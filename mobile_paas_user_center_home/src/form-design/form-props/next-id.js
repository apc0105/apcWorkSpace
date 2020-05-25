// let GLOBAL_ELEMENT_ID = new Date().getTime()
// const nextId = () => GLOBAL_ELEMENT_ID++
//
// export default nextId

import uuid from '@/form-design/utils/uuid'

export default () => uuid(32)
