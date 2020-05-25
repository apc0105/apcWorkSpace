import { formLayout } from './layout-props'
import pureProp from './pureProp'

export default {
  name: 'form-config',
  props: {
    basic: {
      type: 'prop-object',
      name: 'label.flow.formdesign.props.basic',
      visible: true,
      props: {
        title: pureProp({ type: 'fd-input', name: 'label.flow.formdesign.config.title' })
      }
    },
    design: {
      type: 'prop-object',
      name: 'label.flow.formdesign.props.design',
      visible: false,
      props: {
        pageScroll: pureProp({
          type: 'fd-switch',
          name: 'label.flow.formdesign.config.pageScroll',
          labelWidth: '110px'
        }),
        fixed: pureProp({
          type: 'fd-switch',
          name: 'label.flow.formdesign.config.fixed',
          labelWidth: '110px'
        }),
        bgColor: pureProp({ type: 'fd-color', name: 'label.flow.formdesign.config.bgColor', alpha: 1 }),
        formWidth: pureProp({
          type: 'fd-input',
          name: 'label.flow.formdesign.config.formWidth',
          number: 1,
          suffixFormat: 'px'
        })
      }
    },
    ...formLayout
  },
  defaultValue(config) {
    return {
      id: 'form-config',
      title: '表单标题',
      fixed: 1,
      pageScroll: 0,
      formWidth: '800px',
      bgColor: '#ffffff',
      labelAlign: 'right',
      labelWidth: '90px',
      width: '100%',
      controlBgColor: '#ffffff',
      controlBorderWidth: '1px',
      controlBorderStyle: 'solid',
      controlBorderColor: '#DCDFE6',
      controlBorderRadius: '0px'
    }
  }
}
