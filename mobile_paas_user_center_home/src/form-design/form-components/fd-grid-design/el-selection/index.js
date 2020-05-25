import selection from './selection'

const install = function (Vue) {
  Vue.directive('el-selection', selection)
}

if (window.Vue) {
  window['el-selection'] = selection
  Vue.use(install); // eslint-disable-line
}

selection.install = install
export default selection
