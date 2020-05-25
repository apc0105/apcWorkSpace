import pureProp from './pureProp'
import pureDefault from './pureDefault'
import layoutProps from "./layout-props";
import nextId from "./next-id";

const name = 'fd-text'
export default {
  name: name,
  text: 'label.flow.formdesign.fd.text',
  group: 'label.flow.formdesign.fdgroup.basic',
  props: {
    basic: {
      type: 'prop-object',
      name: 'label.flow.formdesign.props.basic',
      visible: true,
      props: {
        // key: pureProp({ type: 'prop-field-select', name: 'label.flow.formdesign.props.key', required: 1 }),
        name: pureProp({ type: 'fd-input', name: 'label.flow.formdesign.props.name' }),
        text: pureProp({
          type: 'prop-rich', name: 'label.flow.formdesign.props.text',
          onChange: (val, vo) => {
            if (vo) {
              vo.timestampKey = new Date().getTime()
            }
          }
        }),
      },
    },
    ...layoutProps,
  },
  defaultValue(config){
    return pureDefault(config, {
      type: name,
      name: '描述文字',
      text: '',
      labelShown: 0,
      controlBgColor: 'rgb(250,247,229)',
      controlBorderColor: 'rgb(246,235,208)',
      controlBorderWidth: '1px',
      controlBorderStyle: 'solid',
      controlBorderRadius: '4px',
      marginTop: '0px',
      marginLeft: '8px',
      marginRight: '8px',
      marginBottom: '0px',
      paddingTop: '8px',
      paddingLeft: '8px',
      paddingRight: '8px',
      paddingBottom: '8px',
      timestampKey: new Date().getTime(),
      id: nextId(),
    })
  }
}
