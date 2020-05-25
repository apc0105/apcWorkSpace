export default{
  bind(el, binding, vnode) {
    const dragDom = el

    dragDom.onmousedown = (e) => {
      // 鼠标按下，计算当前元素距离可视区的距离
      let disX = e.clientX
      let disY = e.clientY

      document.onmousemove = function (e) {
        // 通过事件委托，计算移动的距离
        let left = e.clientX - disX
        let top = e.clientY - disY
        disX = e.clientX
        disY = e.clientY

        const data = { left, top }
        if (vnode.componentInstance) {
          vnode.componentInstance.$emit('drag', data)
        } else {
          vnode.elm.dispatchEvent(new CustomEvent('drag', { detail: data }));
        }
      }

      document.onmouseup = function (e) {
        document.onmousemove = null
        document.onmouseup = null
      }
    }
  }
}
