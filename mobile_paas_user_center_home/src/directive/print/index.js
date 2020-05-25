import Print from './install'
Print.install = function(Vue) {
  Vue.directive('print', Print)
}

export default Print
