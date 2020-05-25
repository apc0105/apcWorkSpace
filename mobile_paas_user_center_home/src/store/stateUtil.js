/** api 状态 */
export const apiStatus = {
  /** 初始化 */
  init: 'init',
  /** 加载中 */
  loading: 'loading',
  /** 成功 */
  success: 'success',
  /** 错误 */
  error: 'error'
}
export const initApi = (data = {}) => ({
  status: apiStatus.init,
  message: '',
  data
})

export const isInit = (state) => state && apiStatus.init === state.status
export const isLoading = (state) => state && apiStatus.loading === state.status
export const isSuccess = (state) => state && apiStatus.success === state.status
export const isError = (state) => state && apiStatus.error === state.status

export const appendDataList = (oldData, data) => {
  if (data.dataList && data.pager && data.pager.current > 1) {
    const beforeData = oldData.dataList || []
    data.dataList = beforeData.concat(data.dataList)
  }
}

export const getStateNode = (state, key) => {
  const keys = key.split('.')
  let node = state
  keys.forEach(key => node = node[key])
  return node
}

export const mixinMutations = (MutationKey, MutationDataKey) => ({
  [MutationKey]: (state, payload) => {
    const { key, status, message } = payload
    const node = getStateNode(state, key)
    if (status) {
      node.status = status
    }
    node.message = message
  },
  [MutationDataKey]: (state, payload) => {
    const { key, status, message, data, pageAppend } = payload
    const node = getStateNode(state, key)
    node.status = status
    node.message = message
    if (apiStatus.success === status) {
      if (pageAppend) {
        // 追加页面数据
        appendDataList(node.data, data)
      }
      node.data = data
    }
  }
})

export const mixinActions = (key, api, MutationKey, MutationDataKey) => ({ commit }, payload) => {
  if (typeof key == 'function') {
    key = key(payload)
  }
  commit(MutationKey, { key, status: apiStatus.loading, message: '加载中...' })
  return new Promise((resolve, reject) => {
    // console.log('api key:', key, payload);
    api(payload).then(response => {
      const data = response.data
      commit(MutationDataKey, {
        key,
        status: apiStatus.success,
        data: data,
        pageAppend: payload ? payload.pageAppend : false
      })
      resolve(data)
    }).catch(error => {
      commit(MutationDataKey, { key, status: apiStatus.error, message: error ? error.message : null })
      reject(error)
    })
  })
}
// commit action payload
export const mixinSimpleActions = (api, MutationKey, commitNow) => ({ commit }, payload) => {
  if (commitNow) {
    MutationKey && commit(MutationKey, payload)
  }
  return new Promise((resolve, reject) => {
    api(payload).then(response => {
      if (!commitNow) {
        MutationKey && commit(MutationKey, payload)
      }
      const data = response.data
      resolve(data)
    }).catch(error => {
      reject(error)
    })
  })
}

// commit api response
export const mixinApiActions = (api, MutationKey) => ({ commit }, payload) => {
  return new Promise((resolve, reject) => {
    api(payload).then(response => {
      const data = response.data
      MutationKey && commit(MutationKey, data)
      resolve(data)
    }).catch(error => {
      reject(error)
    })
  })
}

// commit direct payload
export const mixinPayloadActions = (key, MutationKey) => ({ commit }, payload) => {
  MutationKey && commit(MutationKey, { key, data: payload, status: apiStatus.success })
}

export const mixinPayloadMutations = (MutationKey, callback) => ({
  [MutationKey]: (state, payload) => {
    const { key, data } = payload
    state[key] = data
    callback && callback(state)
  }
})

