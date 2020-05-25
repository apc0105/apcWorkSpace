const rightmenu = {
  init(el, binding, vnode) {
    const value = binding.value || {}
    const menus = value.menus || []
    if (!menus || !value.enable) {
      return
    }

    const closeContextMenu = (e) => {
      e = e || event || window.event;
      e.stopPropagation();//阻止冒泡事件
      e.cancelBubble = true;//阻止冒泡事件ie
      e.preventDefault();//阻止默认事件
    }

    const initMask = (e, callback) => {
      const id = 'el-rightmenu-mask';
      let element = document.getElementById(id)
      if (element) {
        element.style = `display:block;`
        element.addEventListener("contextmenu", closeContextMenu)
        return element
      }
      element = document.createElement("div");
      element.className = 'el-rightmenu-mask'
      element.setAttribute('id', id);
      document.body.appendChild(element);
      callback(element)
      return element
    }

    const initBox = (e, callback) => {
      // 菜单位置
      var menuX = e.pageX || e.pageY ? e.pageX : e.clientX + document.body.scrollLeft - document.body.clientLeft;//获取pageX 兼容ie
      var menuY = e.pageX || e.pageY ? e.pageY : e.clientY + document.body.scrollTop - document.body.clientTop;

      const id = 'el-rightmenu-box'
      let element = document.getElementById(id)
      if (element) {
        element.style = `top:${menuY}px;left:${menuX}px;display:block;`
        element.innerHTML = null
        return element
      }
      // 创建div
      element = document.createElement("div");
      element.className = 'el-rightmenu-box'
      element.setAttribute('id', id);
      document.body.appendChild(element);
      element.style = `top:${menuY}px;left:${menuX}px;display:block;`
      callback(element)
      return element
    }


    const contextmenu = e => {
      // debugger;
      closeContextMenu(e)
      //关闭菜单
      const close = () => {
        mask.style = 'display:none;'
        boxDiv.style = 'display:none;'
        el.style.zIndex = null
        el.style.position = null;
        el.removeEventListener("click", this, true)
      }

      const mask = initMask(e, element => {
        element.addEventListener("click", close)
      })

      const boxDiv = initBox(e, element => {
        element.addEventListener("click", close)
      })

      el.style.position = "relative";
      el.style.zIndex = 999999

      // 指令的绑定值进行遍历 生成菜单的节点
      menus.map((item) => {
        let optionp = document.createElement("div");
        optionp.className = 'el-rightmenu-item'
        // 设置节点文字不可选中
        optionp.setAttribute("unselectable", "on");

        /**
         * 兼容用户没有callback的情况
         */
        optionp.onclick = function () {
          close()
          vnode.context[item.callback](item);
        }

        /**
         * 兼容在展开的选项上右击会出现默认右键，以及禁用穿透事件
         */
        optionp.addEventListener("contextmenu", closeContextMenu)
        // 如果用户设置了icon

        // 设置文字内容
        optionp.innerHTML = item.content;
        // 追加选项到总菜单
        boxDiv.appendChild(optionp);
      })
      //    追加到页面
      document.body.appendChild(boxDiv);
    }

    el.addEventListener("contextmenu", contextmenu)
    el.addEventListener("click", close)
  },
  bind(el, binding, vnode) {
    rightmenu.init(el, binding, vnode)
  },
  update(el, binding, vnode) {
    rightmenu.unbind(el, binding, vnode)
    rightmenu.init(el, binding, vnode)
  },
  unbind(el) {
    // 解绑时候移除右键监听防止影响其他页面
    el.removeEventListener("contextmenu", this, true);
    el.removeEventListener("click", this, true)
  }
}

export default rightmenu
