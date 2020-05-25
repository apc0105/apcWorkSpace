export default{
  bind(el, binding = {}, vnode) {
    el.onclick = (event) => {
      const { value = {} }=binding
      const msg = value.msg || vnode.context.i18n('message.confirmDelete')
      const title = vnode.context.i18n('message.confirmTitle')
      const cancel = vnode.context.i18n('operation.cancel')
      const confirm = vnode.context.i18n('operation.confirm')
      vnode.context.$confirm(msg, title, {
        confirmButtonText: confirm,
        cancelButtonText: cancel,
        type: 'warning'
      }).then(() => {
        if (vnode.componentInstance) {
          vnode.componentInstance.$emit('confirm')
        } else {
          vnode.elm.dispatchEvent(new CustomEvent('confirm'));
        }
      })
    }
  }
}
