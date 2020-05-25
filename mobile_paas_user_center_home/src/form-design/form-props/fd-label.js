import pureProp from './pureProp'
import pureDefault from './pureDefault'
import { labelLayout } from "./layout-props";
import nextId from "./next-id";


const LABEL_ALIGN_OPTIONS = [
  { key: 'left', label: 'label.flow.formdesign.labelalign.left', },
  { key: 'center', label: 'label.flow.formdesign.labelalign.center', },
  { key: 'right', label: 'label.flow.formdesign.labelalign.right', },
]

const name = 'fd-label'
export default {
  name: name,
  text: 'label.flow.formdesign.fd.label',
  group: 'label.flow.formdesign.fdgroup.basic',
  props: {
    basic: {
      type: 'prop-object',
      name: 'label.flow.formdesign.props.basic',
      visible: true,
      props: {
        name: pureProp({ type: 'fd-input', name: 'label.flow.formdesign.props.name' }),
        labelAlign: pureProp({
          type: 'fd-radio',
          name: 'label.flow.formdesign.props.labelAlign',
          options: LABEL_ALIGN_OPTIONS,
          required: 1,
          itemBtnStyle: 1,
          valueProp: 'key',
          labelProp: 'label',
          defaultValue: 'left'
        }),
        fontSize: pureProp({
          type: 'fd-input',
          name: 'label.flow.formdesign.props.fontSize',
          number: 1,
          required: 1,
          suffixFormat: 'px'
        }),
        fontColor: pureProp({ type: 'fd-color', name: 'label.flow.formdesign.props.fontColor', alpha: 1 }),
      },
    },
    ...labelLayout,
  },
  defaultValue(config){
    return pureDefault(config, {
      type: name,
      name: '标签',
      fontSize: '14px',
      fontColor: '#606266',
      labelAlign: 'left',
      marginTop: '0px',
      marginLeft: '8px',
      marginRight: '8px',
      marginBottom: '0px',
      paddingTop: '8px',
      paddingLeft: '8px',
      paddingRight: '8px',
      paddingBottom: '8px',
      id: nextId(),
    })
  }
}
