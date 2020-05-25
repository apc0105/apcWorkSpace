import confirm from './confirm'

const install = function (Vue) {
  Vue.directive('el-confirm', confirm)
}

if (window.Vue) {
  window['el-confirm'] = confirm
  Vue.use(install); // eslint-disable-line
}

confirm.install = install
export default confirm
