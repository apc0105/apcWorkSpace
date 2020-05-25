const emit = (vnode, event, data) => {
  if (vnode.componentInstance) {
    vnode.componentInstance.$emit(event, { detail: data })
  } else {
    vnode.elm.dispatchEvent(new CustomEvent(event, { detail: data }));
  }
}

const isDiffElement = (source, target) => {
  // return source != target
  return false
}

const getChildByClass = (parent, className) => {
  var tags = parent.getElementsByTagName('*');
  for (var i = 0; i < tags.length; i++) {
    try {
      if (tags[i].className && tags[i].className.indexOf(className) >= 0) {
        return tags[i]
      }
      const temp = getChildByClass(tags[i], className)
      if (temp) {
        return temp
      }
    } catch (e) {
    }
  }
  return null;
}

const holder = {
  source: {},
  checkEventStop(source, target, tag){
    if (!source || !source.group) {
      return true
    }
    if (!target || !target.group) {
      return true
    }
    if (source.elementId && target.elementId && source.elementId == target.elementId) {
      // console.log(source.elementId, target.elementId, tag)
      return true;
    }
    if (source.group != target.group) {
      // console.log(source.group, target.group, tag)
      return true
    }
    return false
  },
  checkDragTarget(e, value){
    return false
  }
}

export default{
  bind(el, binding, vnode) {
    const { value = {} }=binding
    // const { enterClassName, overClassName, dragClassName }=value
    holder.handleDragStart = function (e) {
      if (holder.checkDragTarget(e, value)) {
        return
      }
      // e.target.classList.add(dragClassName);
      e.dataTransfer.effectAllowed = 'move';
      holder.source = value
      emit(vnode, 'dragStart', {
        el: el,
        event: e,
        data: value,
      });
    };


    holder.handleDrag = function (e) {
      emit(vnode, 'dragMove', {
        el: el,
        event: e,
        data: value,
        source: holder.source,
      });
    };

    holder.handleDragEnd = function (e) {
      emit(vnode, 'dragEnd', {
        el: el,
        event: e,
        data: value,
        source: holder.source,
      });
      // e.target.classList.remove(overClassName, enterClassName, dragClassName);
    };

    /*----------------------------------------------------------------------*/


    holder.handleDragOver = function (e) {
      if (holder.checkEventStop(holder.source, value, 'handleDragOver')) {
        return false
      }
      if (e.preventDefault) {
        e.preventDefault();
      }
      e.dataTransfer.dropEffect = 'move';
      // e.target.classList.add(overClassName);
      emit(vnode, 'dragOver', {
        el: el,
        event: e,
        data: value,
        source: holder.source,
      });
      if (holder.dragLeaveEl == el) {
        clearTimeout(holder.dragLeaveTimer)
      }
      return false;
    };

    holder.handleDragEnter = function (e) {
      if (isDiffElement(e.target, el)) {
        return false
      }
      if (holder.checkEventStop(holder.source, value, 'handleDragEnter')) {
        return false
      }
      emit(vnode, 'dragEnter', {
        el: el,
        event: e,
        data: value,
        source: holder.source,
      })
      ;
    };

    holder.handleDragLeave = function (e) {
      if (isDiffElement(e.target, el)) {
        return false
      }
      if (holder.checkEventStop(holder.source, value, 'handleDragLeave')) {
        return false
      }
      holder.dragLeaveEl = el
      holder.dragLeaveTimer = setTimeout(() => {
        emit(vnode, 'dragLeave', {
          el: el,
          event: e,
          data: value,
          source: holder.source,
        });
      }, 1)
    };


    holder.handleDrop = function (e) {
      if (holder.checkEventStop(holder.source, value, 'handleDrop')) {
        return false
      }
      e.preventDefault();
      if (e.stopPropagation) {
        e.stopPropagation();
      }
      emit(vnode, 'dragDrop', {
        el: el,
        event: e,
        data: value,
        source: holder.source,
      });

      return false;
    };

    holder.handleUp = function (e) {
      emit(vnode, 'dropEnd', {
        el: el,
        event: e,
        data: value,
        source: holder.source,
      });
      return false;
    }

    holder.registerDragStart = function (e) {
      if (value.dragEnable) {
        el.setAttribute('draggable', 'true');
        el.addEventListener('dragstart', holder.handleDragStart, false);
        el.addEventListener('dragend', holder.handleDragEnd, false);
        el.addEventListener('drag', holder.handleDrag, false);
      } else {
        holder.unregisterDrag()
      }
    }

    holder.unregisterDrag = function (e) {
      el.removeAttribute('draggable');
      el.removeEventListener('dragstart', holder.handleDragStart, false);
      el.removeEventListener('dragend', holder.handleDragEnd, false);
      el.removeEventListener('drag', holder.handleDrag, false);
    }

    holder.initDrag = function () {
      if (value.dragSource) {
        const dragSource = getChildByClass(el, value.dragSource)
        if (dragSource) {
          dragSource.addEventListener('mouseenter', holder.registerDragStart, false);
          dragSource.addEventListener('mouseleave', holder.unregisterDrag, false);
          dragSource.addEventListener('dragend', holder.unregisterDrag, false);
        } else {
          holder.registerDragStart()
        }
      } else {
        holder.registerDragStart()
      }
    }

    // setup the listeners
    if (value.dropEnable) {
      el.addEventListener('dragenter', holder.handleDragEnter, false);
      el.addEventListener('dragover', holder.handleDragOver, true);
      el.addEventListener('dragleave', holder.handleDragLeave, true);
      el.addEventListener('drop', holder.handleDrop, false);
      el.addEventListener('drop', holder.handleUp, true);
    }

    // if (value.dragSource) {
    //   const dragSource = getChildByClass(el, value.dragSource)
    //   if (dragSource) {
    //     dragSource.addEventListener('mouseenter', holder.registerDragStart, false);
    //     dragSource.addEventListener('mouseleave', holder.unregisterDrag, false);
    //     dragSource.addEventListener('dragend', holder.unregisterDrag, false);
    //   } else {
    //     holder.registerDragStart()
    //   }
    // } else {
    //   holder.registerDragStart()
    // }

    holder.initDrag()

  },
  unbind: function (el, binding, vnode) {
    el.removeAttribute('draggable');

    el.removeEventListener('dragstart', holder.handleDragStart, false);
    el.removeEventListener('dragend', holder.handleDragEnd, false);
    el.removeEventListener('drag', holder.handleDrag, false);

    el.removeEventListener('dragenter', holder.handleDragEnter, false);
    el.removeEventListener('dragover', holder.handleDragOver, false);
    el.removeEventListener('dragleave', holder.handleDragLeave, false);
    el.removeEventListener('drop', holder.handleDrop, false);
    el.removeEventListener('drop', holder.handleUp, true);
  },
  update: function (el, binding, vnode) {
    const { value = {} }=binding
    holder.unregisterDrag()
    holder.initDrag()
    return
    if (value.dragEnable) {
      el.setAttribute('draggable', 'true');
    } else {
      el.removeAttribute('draggable');
    }
  }
}
