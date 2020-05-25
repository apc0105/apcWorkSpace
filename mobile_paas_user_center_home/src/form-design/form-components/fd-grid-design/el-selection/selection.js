const emit = (vnode, event, data) => {
  if (typeof vnode.context[event] == 'function') {
    vnode.context[event](data)
  }
}

const selection = {
  init(el, binding, vnode) {
    const value = binding.value || {}
    if (!value.enable) {
      return selection.unbind(el, binding, vnode)
    }
    const showRange = value.showRange
    const context = {
      startStyle: null,
      moveStyle: null,
      isMouseDown: false,
      isMoved: false,
    }

    const initSelection = () => {
      const id = 'el-selection-box'
      let element = document.getElementById(id)
      if (element) {
        return element
      }
      // 创建div
      element = document.createElement("div");
      element.className = 'el-selection-box'
      element.setAttribute('id', id);
      document.body.appendChild(element);
      return element
    }

    let selectionDiv = null;
    if (showRange) {
      selectionDiv = initSelection()
    }

    const holder = {}

    holder.mousedown = e => {
      if (e.button != 0) {
        return holder.closeRange(e)
      }
      if (showRange) {
        context.startX = e.pageX
        context.startY = e.pageY
        selectionDiv.style = context.startStyle = `top:${e.pageX}px;left:${e.pageY}px;`;
        selectionDiv.addEventListener("mousemove", holder.mousemove, false)
      }
      context.isMouseDown = true;
      emit(vnode, value.selectionStart || 'selectionStart')
    }
    holder.mousemove = e => {
      if (e.buttons == 0) {
        return
      }
      if (context.isMouseDown) {
        if (showRange) {
          const styles = []
          context.width = Math.abs(e.pageX - context.startX)
          context.height = Math.abs(e.pageY - context.startY)
          styles.push(`width:${context.width}px`)
          styles.push(`height:${context.height}px`)
          if (e.pageX > context.startX) {
            styles.push(`left:${context.startX}px`)
          } else {
            styles.push(`left:${context.startX - context.width}px`)
          }
          if (e.pageY > context.startY) {
            styles.push(`top:${context.startY}px`)
          } else {
            styles.push(`top:${context.startY - context.height}px`)
          }
          selectionDiv.style = context.moveStyle = styles.join(';');
        }
        context.isMoved = true
        emit(vnode, value.selectionMove || 'selectionMove')
      }
    }
    holder.mouseup = e => {
      if (context.isMouseDown && context.isMoved) {
        context.isMoved = false;
        context.isMouseDown = false;
        holder.closeRange(e)
        emit(vnode, value.selectionEnd || 'selectionEnd')
      } else {
        emit(vnode, value.selectionClose || 'selectionClose')
      }
    }

    holder.closeRange = e => {
      if (showRange) {
        selectionDiv.style = context.moveStyle + ';display:none;'
        selectionDiv.removeEventListener("mousemove", this, true);
      }
    }

    el.addEventListener("mousedown", holder.mousedown, false)
    el.addEventListener("mouseup", holder.mouseup, false)
    el.addEventListener("mousemove", holder.mousemove, false)
    document.addEventListener("mouseup", holder.mouseup, false)
  },
  bind(el, binding, vnode){
    selection.init(el, binding, vnode)
  },
  update(el, binding, vnode){
    // selection.unbind(el, binding, vnode)
    // selection.init(el, binding, vnode)
  },
  unbind(el, binding, vnode){
    el.removeEventListener("mousedown", this, true);
    el.removeEventListener("mousemove", this, true);
    el.removeEventListener("mouseup", this, true);
    document.removeEventListener("mouseup", this, true);
  }
}

export default selection
