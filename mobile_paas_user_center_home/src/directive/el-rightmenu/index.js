import rightmenu from './rightmenu'

const install = function (Vue) {
  Vue.directive('el-rightmenu', rightmenu)
}

if (window.Vue) {
  window['el-rightmenu'] = rightmenu
  Vue.use(install); // eslint-disable-line
}

rightmenu.install = install
export default rightmenu
