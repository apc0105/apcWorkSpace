import Print from './printarea.js'
/**
 * @file 打印
 * 指令`v-print`,默认打印整个窗口
 * 传入参数`v-print="'#id'"` , 参数为需要打印局部的盒子标识.
 */
export default {
  directiveName: 'print',
  bind(el, binding, vnode) {
    const vue = vnode.context
    let closeBtn = true
    let id = ''
    el.addEventListener('click', event => {
      vue.$nextTick(() => {
        if (typeof binding.value === 'string') {
          id = binding.value
        } else if (typeof binding.value === 'object' && !!binding.value.id) {
          id = binding.value.id
          const ids = id.replace(new RegExp('#', 'g'), '')
          const elsdom = document.getElementById(ids)
          if (!elsdom) {
            console.log('id in Error')((id = ''))
          }
        }
        // 局部打印
        if (id) {
          localPrint()
        } else {
          // 直接全局打印
          window.print()
        }
      })
    })

    const localPrint = () => {
      vue.$nextTick(() => {
        if (closeBtn) {
          closeBtn = false
          new Print({
            el: `#${id}`,
            endCallback() {
              closeBtn = true
            }
          })
        }
      })
    }
  },

  update(el, binding) {},

  unbind(el) {}
}
