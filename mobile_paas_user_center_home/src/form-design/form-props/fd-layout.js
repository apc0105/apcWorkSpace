import pureProp from "./pureProp";
import pureDefault from './pureDefault'
import { layoutLayout } from "./layout-props";
import nextId from "./next-id";

const name = 'fd-layout'
export default {
  name: name,
  text: 'label.flow.formdesign.fd.layout',
  group: 'label.flow.formdesign.fdgroup.layout',
  props: {
    basic: {
      type: 'prop-object',
      name: 'label.flow.formdesign.props.basic',
      visible: true,
      props: {
        cells: pureProp({
          type: 'fd-counter',
          name: 'label.flow.formdesign.props.cells',
          min: 1,
          max: 4,
          width: '60%',
          onChange: (val, vo) => {
            if (!vo.cellElement) vo.cellElement = []
            const cellElement = vo.cellElement
            const value = []
            for (let i = 0; i < val; i++) {
              if (i < cellElement.length) {
                value.push(cellElement[i])
              } else {
                value.push({ weight: 1, elementId: null })
              }
            }
            vo.cellElement = value
          }
        }),
        cellElement: pureProp({
          type: 'prop-cells',
          labelAlign: 'top',
          name: 'label.flow.formdesign.props.cellElement',
          marginLeft: "8px",
          marginRight: "8px",
        }),
      },
    },
    ...layoutLayout,
  },
  defaultValue(config){
    return pureDefault(config, {
      type: name,
      cells: 2,
      cellElement: [{ weight: 1 }, { weight: 1 }],
      width: '100%',
      size: 'mini',
      labelShown: 0,
      controlBorderWidth: '1px',
      controlBorderStyle: 'solid',
      controlBorderColor: '#EBEEF5',
      controlBgColor: '#FFFFFF',
      marginTop: '-1px',
      marginBottom: '0px',
      marginLeft: '8px',
      marginRight: '8px',
      id: nextId(),
    })
  }
}
