import G6Editor from '@antv/g6-editor'
import passIcon from '@/assets/image/pass.png'
import errorIcon from '@/assets/image/flow-error.png'
import editIcon from '@/assets/image/edit.png'

function handleNode(type) {
  const ret = {}
  if (type === 'rhombus') {
    ret.x = 108
    ret.y = 9
  } else if (type === 'capsule') {
    ret.x = 55
    ret.y = 5
  } else {
    ret.x = 65
    ret.y = 5
  }
  return ret
}

const NodeType = {
  pass: {
    icon: passIcon,
    text: 'pass'
  },
  error: {
    icon: 'error',
    text: errorIcon
  },
  edit: {
    icon: editIcon,
    text: 'edit'
  }
}

// 节点注册
// 矩形(审批通过形状)
function registerNode(type, isPass) {
  G6Editor.Flow.registerNode(
    `flow-${type}-${isPass}`,
    {
      draw(item) {
        const group = item.getGraphicGroup()
        const model = item.getModel()
        const style = this.getStyle(item)
        const path = this.getPath(item)
        const size = this.getSize(item)
        const width = +size[0]
        const height = +size[1]
        const imgRet = handleNode(type)
        const keyShape = group.addShape('path', {
          attrs: {
            path,
            x: -40,
            y: -13,
            width,
            height,
            type: 'node',
            fill: style.fill,
            fillOpacity: style.fillOpacity,
            lineWidth: style.lineWidth,
            radius: style.radius,
            shadowBlur: style.shadowBlur,
            shadowColor: style.shadowColor,
            shadowOffsetX: style.shadowOffsetX,
            shadowOffsetY: style.shadowOffsetY,
            stroke: style.stroke
          }
        })
        group.addShape('text', {
          attrs: {
            x: 2,
            y: 0,
            fill: '#595959',
            text: model.label,
            textBaseline: 'middle',
            textAlign: 'center'
          }
        })
        group.addShape('image', {
          attrs: {
            x: width - imgRet.x,
            y: imgRet.y,
            width: 16,
            height: 16,
            img: NodeType[isPass].icon
          }
        })

        return keyShape
      }
    },
    `flow-${type}`
  )
}

registerNode('rect', 'pass')
registerNode('rect', 'error')
registerNode('rect', 'edit')

registerNode('capsule', 'pass')
registerNode('capsule', 'error')
registerNode('capsule', 'edit')

registerNode('rhombus', 'pass')
registerNode('rhombus', 'error')
registerNode('rhombus', 'edit')

// flow-polyline-round
// flow-smooth
// flow-polyline
