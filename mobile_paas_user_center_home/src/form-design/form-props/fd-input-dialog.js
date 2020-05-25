import pureProp from './pureProp'
import pureDefault from './pureDefault'
import layoutProps from "./layout-props";
import nextId from "./next-id";
import InputDialogTables from'@/components/InputDialog/tables'

const OPTIONS = []
for (let key in InputDialogTables) {
  OPTIONS.push(key)
}

const name = 'fd-input-dialog'
export default {
  name: name,
  text: 'label.flow.formdesign.fd.inputdialog',
  group: 'label.flow.formdesign.fdgroup.basic',
  props: {
    basic: {
      type: 'prop-object',
      name: 'label.flow.formdesign.props.basic',
      visible: true,
      props: {
        key: pureProp({ type: 'prop-field-select', name: 'label.flow.formdesign.props.key', required: 1 }),
        name: pureProp({ type: 'fd-input', name: 'label.flow.formdesign.props.name' }),
        placeholder: pureProp({ type: 'fd-input', name: 'label.flow.formdesign.props.placeholder' }),
      },
    },
    input: {
      type: 'prop-object',
      name: 'label.flow.formdesign.props.input',
      visible: false,
      props: {
        readonly: pureProp({ type: 'fd-switch', name: 'label.flow.formdesign.props.readonly' }),
        shown: pureProp({ type: 'fd-switch', name: 'label.flow.formdesign.props.shown' }),
        datasource: pureProp({
          type: 'fd-select',
          name: 'label.flow.formdesign.props.datasource',
          options: OPTIONS,
          required: 1,
        }),
        datasourceTitle: pureProp({
          type: 'fd-input',
          name: 'label.flow.formdesign.props.datasourceTitle',
          required: 1,
        }),
        multiple: pureProp({ type: 'fd-switch', name: 'label.flow.formdesign.props.multiple' }),
      }
    },
    validate: {
      type: 'prop-object',
      name: 'label.flow.formdesign.props.validate',
      visible: false,
      props: {
        required: pureProp({ type: 'fd-switch', name: 'label.flow.formdesign.props.required' }),
      }
    },
    ...layoutProps,
  },
  defaultValue(config){
    return pureDefault(config, {
      type: name,
      name: '数据源',
      readonly: 0,
      required: 0,
      multiple: 0,
      id: nextId(),
    })
  }
}
