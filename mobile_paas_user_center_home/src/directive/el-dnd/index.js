import dnd from './dnd'

const install = function (Vue) {
  Vue.directive('el-dnd', dnd)
}

if (window.Vue) {
  window['el-dnd'] = dnd
  Vue.use(install); // eslint-disable-line
}

dnd.install = install
export default dnd
