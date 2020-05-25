import pureProp from "./pureProp";
import pureDefault from './pureDefault'
import layoutProps from "./layout-props";
import nextId from "./next-id";

const name = 'fd-textarea'
export default {
  name: name,
  text: 'label.flow.formdesign.fd.textarea',
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
        defaultValue: pureProp({ type: 'fd-input', name: 'label.flow.formdesign.props.defaultValue' }),
        readonly: pureProp({ type: 'fd-switch', name: 'label.flow.formdesign.props.readonly' }),
        shown: pureProp({ type: 'fd-switch', name: 'label.flow.formdesign.props.shown' }),
        autosize: pureProp({ type: 'fd-switch', name: 'label.flow.formdesign.props.autosize' }),
        minRows: pureProp({
          type: 'fd-counter',
          name: 'label.flow.formdesign.props.minRows',
          step: 1,
          min: 0,
          max: 99
        }),
        maxRows: pureProp({
          type: 'fd-counter',
          name: 'label.flow.formdesign.props.maxRows',
          step: 1,
          min: 0,
          max: 99
        }),
      }
    },
    validate: {
      type: 'prop-object',
      name: 'label.flow.formdesign.props.validate',
      visible: false,
      props: {
        required: pureProp({ type: 'fd-switch', name: 'label.flow.formdesign.props.required' }),
        regx: pureProp({ type: 'fd-input', name: 'label.flow.formdesign.props.regx', }),
        minLength: pureProp({
          type: 'fd-counter',
          name: 'label.flow.formdesign.props.minLength',
          min: 0,
          max: 999
        }),
        maxLength: pureProp({
          type: 'fd-counter',
          name: 'label.flow.formdesign.props.maxLength',
          min: 0,
          max: 999
        }),
      }
    },
    ...layoutProps,
  },
  defaultValue(config){
    return pureDefault(config, {
      type: name,
      name: '文本域',
      readonly: 0,
      autofill: 0,
      required: 0,
      digit: 0,
      id: nextId(),
    })
  }
}
